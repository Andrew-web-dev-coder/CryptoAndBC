import { network } from "hardhat";
import { encodeFunctionData, parseUnits } from "viem";

const { viem, networkName } = await network.connect();

async function main() {
  console.log(`Deploying V1 implementation and proxy to ${networkName}...`);

  const [owner, user] = await viem.getWalletClients();
  const publicClient = await viem.getPublicClient();

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

  const mintHash = await token.write.mint([user.account.address, parseUnits("500", 18)], {
    account: owner.account,
  });
  await publicClient.waitForTransactionReceipt({ hash: mintHash });
  console.log("Mint tx:", mintHash);

  const transferHash = await token.write.transfer([user.account.address, parseUnits("100", 18)], {
    account: owner.account,
  });
  await publicClient.waitForTransactionReceipt({ hash: transferHash });
  console.log("Transfer tx:", transferHash);

  const ownerBalance = await token.read.balanceOf([owner.account.address]);
  const userBalance = await token.read.balanceOf([user.account.address]);
  const version = await token.read.version();

  console.log("Owner balance:", ownerBalance.toString());
  console.log("User balance:", userBalance.toString());
  console.log("Version via proxy:", version);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});