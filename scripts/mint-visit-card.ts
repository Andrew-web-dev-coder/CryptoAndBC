import { network } from "hardhat";

const { viem } = await network.connect();

async function main() {
  const contractAddress = "0x63b7a3c37812ee69ab27310156c3a0abf85a9ae1";

  const nft = await viem.getContractAt(
    "SoulboundVisitCardERC721",
    contractAddress
  );

  const studentAddress = "0x90Ba964984c4EDcE1841ED54cd06CEa4b1F471e9";

  const metadataURI =
    "https://ipfs.io/ipfs/bafybeigdyrztexamplemetadata";

  const tx = await nft.write.mintVisitCard([
    studentAddress,
    metadataURI,
  ]);

  console.log("Visit card minted!");
  console.log("Mint tx:", tx);
}

main().catch(console.error);