import { network } from "hardhat";
import { parseEther } from "viem";

const { viem } = await network.connect();

async function main() {
  const contractAddress = "0x54d74a538bc58d9a6d4a19b9407f49e3fdb66351" as `0x${string}`;

  const multisig = await viem.getContractAt("MultiSigWallet", contractAddress);

  const to = "0xB6BD4993dd10aAB4fD548BB84f464e95655A5A23" as `0x${string}`;
  const value = parseEther("0.0003");
  const data = "0x" as `0x${string}`;

  const hash = await multisig.write.submitTransaction([to, value, data]);

  console.log("Transaction submitted!");
  console.log("Submit tx:", hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});