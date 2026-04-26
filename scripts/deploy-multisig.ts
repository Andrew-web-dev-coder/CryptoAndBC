import { network } from "hardhat";

const { viem, networkName } = await network.connect();

async function main() {
  const owners = [
    "0x90Ba964984c4EDcE1841ED54cd06CEa4b1F471e9",
    "0xB6BD4993dd10aAB4fD548BB84f464e95655A5A23",
    "0x3cdd5d77c54F511ac0e1de28Ee795AB94324E7fa",
  ] as `0x${string}`[];

  const requiredConfirmations = 2n;

  console.log(`Deploying MultiSigWallet to ${networkName}...`);

  const multiSig = await viem.deployContract("MultiSigWallet", [
    owners,
    requiredConfirmations,
  ]);

  console.log("MultiSigWallet deployed to:", multiSig.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});