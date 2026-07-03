import { network } from "hardhat";

const { viem } = await network.connect();

async function main() {
  const contract = await viem.getContractAt(
    "GameCharacterCollectionERC1155",
    "0xd85c92629b855c95cbcb0078ea394c614c9bfbe3"
  );

  const owner = await contract.read.owner();

  console.log("Contract owner:", owner);
}

main().catch(console.error);