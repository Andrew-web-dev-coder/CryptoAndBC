import { network } from "hardhat";
import { parseGwei } from "viem";

const { viem } = await network.connect();

async function main() {
  const contractAddress =
    "0xd85c92629b855c95cbcb0078ea394c614c9bfbe3" as `0x${string}`;

  const collection = await viem.getContractAt(
    "GameCharacterCollectionERC1155",
    contractAddress
  );

  const [owner] = await viem.getWalletClients();

  const from = owner.account.address;

  const to = "0xB6BD4993dd10aAB4fD548BB84f464e95655A5A23" as `0x${string}`;

  const ids = [1n, 2n];
  const amounts = [1n, 1n];

  const tx = await collection.write.safeBatchTransferFrom(
    [from, to, ids, amounts, "0x"],
    {
      gas: 150_000n,
      maxFeePerGas: parseGwei("3"),
      maxPriorityFeePerGas: parseGwei("1"),
    }
  );

  console.log("ERC-1155 batch transfer completed!");
  console.log("Batch transfer tx:", tx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});