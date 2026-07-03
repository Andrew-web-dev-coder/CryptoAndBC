import { network } from "hardhat";
import { parseGwei } from "viem";

const { viem } = await network.connect();

const CONTRACT_ADDRESS = "0xd85c92629b855c95cbcb0078ea394c614c9bfbe3";

const NEW_URI =
  "https://gateway.lighthouse.storage/ipfs/bafybeigyypxnyih2h6p66uy5gn73pkgk4vq6dip4nfdnfynlwifk3johu4/{id}.json";

async function main() {
  const contract = await viem.getContractAt(
    "GameCharacterCollectionERC1155",
    CONTRACT_ADDRESS
  );

  const tx = await contract.write.setURI([NEW_URI], {
    gas: 100_000n,
    maxFeePerGas: parseGwei("3"),
    maxPriorityFeePerGas: parseGwei("1"),
  });

  console.log("ERC-1155 URI updated!");
  console.log("Transaction hash:", tx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});