import { network } from "hardhat";
import { parseGwei } from "viem";

const { viem } = await network.connect();

async function main() {
  const contractAddress =
    "0xd85c92629b855c95cbcb0078ea394c614c9bfbe3" as `0x${string}`;

  const studentAddress =
    "0x90Ba964984c4EDcE1841ED54cd06CEa4b1F471e9" as `0x${string}`;

  const collection = await viem.getContractAt(
    "GameCharacterCollectionERC1155",
    contractAddress
  );

  const ids = [1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n, 9n, 10n];
  const amounts = [1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n];

  const tx = await collection.write.mintBatchCharacters(
    [
      studentAddress,
      ids,
      amounts,
      "0x",
    ],
    {
      gas: 200_000n,
      maxFeePerGas: parseGwei("3"),
      maxPriorityFeePerGas: parseGwei("1"),
    }
  );

  console.log("10 game character NFTs minted to student wallet!");
  console.log("ERC-1155 batch mint tx:", tx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});