import { network } from "hardhat";

const { viem } = await network.connect();

async function main() {
  const contractAddress = "0x54d74a538bc58d9a6d4a19b9407f49e3fdb66351" as `0x${string}`;
  const multisig = await viem.getContractAt("MultiSigWallet", contractAddress);

  const txIndex = 0n;

  const hash = await multisig.write.executeTransaction([txIndex]);

  console.log("Transaction executed!");
  console.log("Execute tx:", hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});