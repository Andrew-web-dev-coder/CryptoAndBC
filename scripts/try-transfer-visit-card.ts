import { network } from "hardhat";

const { viem } = await network.connect();

async function main() {
  const contractAddress = "0x63b7a3c37812ee69ab27310156c3a0abf85a9ae1" as `0x${string}`;

  const nft = await viem.getContractAt(
    "SoulboundVisitCardERC721",
    contractAddress
  );

  const from = "0x90Ba964984c4EDcE1841ED54cd06CEa4b1F471e9" as `0x${string}`;
  const to = "0xB6BD4993dd10aAB4fD548BB84f464e95655A5A23" as `0x${string}`;
  const tokenId = 0n;

  console.log("Trying to transfer soulbound token...");

  try {
    const tx = await nft.write.transferFrom([from, to, tokenId]);
    console.log("Transfer tx:", tx);
  } catch (error) {
    console.log("Transfer failed as expected.");
    console.log("Soulbound protection works.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});