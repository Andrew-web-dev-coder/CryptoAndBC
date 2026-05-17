import { network } from "hardhat";

const { viem, networkName } = await network.connect();

async function main() {
  console.log(`Deploying NFT contracts to ${networkName}...`);

  const visitCard = await viem.deployContract("SoulboundVisitCardERC721");
  console.log("SoulboundVisitCardERC721 deployed to:", visitCard.address);

  const gameCollection = await viem.deployContract("GameCharacterCollectionERC1155");
  console.log("GameCharacterCollectionERC1155 deployed to:", gameCollection.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});