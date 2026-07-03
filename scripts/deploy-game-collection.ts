import { network } from "hardhat";

const { viem, networkName } = await network.connect();

async function main() {
  console.log(`Deploying GameCharacterCollectionERC1155 to ${networkName}...`);

  const collection = await viem.deployContract(
    "GameCharacterCollectionERC1155",
    []
  );

  console.log("GameCharacterCollectionERC1155 deployed to:", collection.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});