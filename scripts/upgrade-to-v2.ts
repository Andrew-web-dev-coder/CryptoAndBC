import { network } from "hardhat";

const { viem, networkName } = await network.connect();

async function main() {
  console.log(`Upgrading proxy on ${networkName}...`);

  const [owner] = await viem.getWalletClients();
  const publicClient = await viem.getPublicClient();

  const proxyAddress = "0x72296cce0631c4da354ddd6c3cfcc6e2a2755a2f" as `0x${string}`;

  const recipientAddress = "0xB6BD4993dd10aAB4fD548BB84f464e95655A5A23" as `0x${string}`;

  const v2Implementation = await viem.deployContract("MyTokenV2");
  console.log("V2 implementation:", v2Implementation.address);

  const proxyAsV1 = await viem.getContractAt("MyTokenV1", proxyAddress);

  const upgradeHash = await proxyAsV1.write.upgradeToAndCall(
    [v2Implementation.address, "0x"],
    {
      account: owner.account,
    }
  );

  await publicClient.waitForTransactionReceipt({ hash: upgradeHash });
  console.log("Upgrade tx:", upgradeHash);

  const proxyAsV2 = await viem.getContractAt("MyTokenV2", proxyAddress);

  const ownerBalance = await proxyAsV2.read.balanceOf([owner.account.address]);
  const recipientBalance = await proxyAsV2.read.balanceOf([recipientAddress]);
  const version = await proxyAsV2.read.version();

  console.log("Owner balance after upgrade:", ownerBalance.toString());
  console.log("Recipient balance after upgrade:", recipientBalance.toString());
  console.log("Version after upgrade:", version);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});