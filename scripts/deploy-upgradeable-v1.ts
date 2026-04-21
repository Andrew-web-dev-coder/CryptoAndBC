import { network } from "hardhat";
import { encodeFunctionData, parseUnits } from "viem";

const { viem, networkName } = await network.connect();

async function main() {
  console.log(`Deploying V1 implementation and proxy to ${networkName}...`);

  const [owner] = await viem.getWalletClients();
  const publicClient = await viem.getPublicClient();

 
  const recipientAddress = "0xB6BD4993dd10aAB4fD548BB84f464e95655A5A23" as `0x${string}`;

  const initialSupply = parseUnits("1000000", 18);

  const implementation = await viem.deployContract("MyTokenV1");
  console.log("V1 implementation:", implementation.address);

  const initData = encodeFunctionData({
    abi: implementation.abi,
    functionName: "initialize",
    args: [owner.account.address, initialSupply],
  });

  const proxy = await viem.deployContract("MyProxy", [implementation.address, initData]);
  console.log("Proxy deployed at:", proxy.address);

  const token = await viem.getContractAt("MyTokenV1", proxy.address);

  const mintHash = await token.write.mint([recipientAddress, parseUnits("500", 18)], {
    account: owner.account,
  });
  await publicClient.waitForTransactionReceipt({ hash: mintHash });
  console.log("Mint tx:", mintHash);

  const transferHash = await token.write.transfer([recipientAddress, parseUnits("100", 18)], {
    account: owner.account,
  });
  await publicClient.waitForTransactionReceipt({ hash: transferHash });
  console.log("Transfer tx:", transferHash);

  const ownerBalance = await token.read.balanceOf([owner.account.address]);
  const recipientBalance = await token.read.balanceOf([recipientAddress]);
  const version = await token.read.version();

  console.log("Owner balance:", ownerBalance.toString());
  console.log("Recipient balance:", recipientBalance.toString());
  console.log("Version via proxy:", version);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});