# NFT Collection - Assignment 9

## Overview

This project implements two NFT smart contracts on Ethereum Sepolia:

1. ERC-721 Soulbound Student Visit Card
2. ERC-1155 Game Character Collection

## Contracts

### SoulboundVisitCardERC721.sol

ERC-721 NFT representing a student visit card.

Features:
- Uses OpenZeppelin ERC-721
- Only contract owner can mint
- One unique NFT per student
- Metadata includes student data and image URI
- Soulbound behavior: transfers and approvals are blocked after minting

### GameCharacterCollectionERC1155.sol

ERC-1155 collection of 10 game character NFTs.

Features:
- Uses OpenZeppelin ERC-1155
- 10 distinct token IDs
- Each token represents a game character
- Metadata URI support
- Batch minting
- Batch transfers
- Owner-only minting

## Tech Stack

- Solidity 0.8.28
- Hardhat
- TypeScript
- OpenZeppelin Contracts
- Viem
- Sepolia Testnet

## Deployment

Install dependencies:

```bash
npm install

Configure .env:

SEPOLIA_URL=YOUR_RPC_URL
PRIVATE_KEY=YOUR_PRIVATE_KEY
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY

Deploy contracts:

npx hardhat run scripts/deploy-nft.ts --network sepolia

Minting

Mint ERC-721 soulbound visit card:

npx hardhat run scripts/mint-visit-card.ts --network sepolia

Mint ERC-1155 game characters:

npx hardhat run scripts/mint-game-characters.ts --network sepolia

Mint ERC-1155 game characters directly to student wallet:

npx hardhat run scripts/mint-game-characters-to-student.ts --network sepolia

Transfer Demonstration

ERC-721 soulbound transfer test:

npx hardhat run scripts/try-transfer-visit-card.ts --network sepolia

Expected result:

Transfer failed as expected.
Soulbound protection works.

ERC-1155 batch transfer:

npx hardhat run scripts/transfer-game-characters.ts --network sepolia

Metadata

Metadata is stored off-chain using URI links.

ERC-721 uses tokenURI.

ERC-1155 uses uri(id) with token ID substitution.

Each NFT contains:

unique image URI
character or student name
attributes such as course, year, rarity, strength, speed, or role
Proof of Functionality
Deployed Contracts on Sepolia

ERC-721 Soulbound Visit Card:

0x63b7a3c37812ee69ab27310156c3a0abf85a9ae1

ERC-1155 Game Character Collection:

0x1f7dc247cd185028d308c6cf7e05442575cf3ca0
Transaction Hashes

Soulbound ERC-721 mint transaction:

0x40d88abda19dacb760f2ff9db6c82fcc5a7bbdffadc0ca96128e5e94c771d998

ERC-1155 batch mint transaction:

0xda230bb6e1a3610b708d641d013e75a55950c684b94dd1ec28aac3ca2da03b19

ERC-1155 mint to student wallet transaction:

0x152e946ddc796eb518e97e12f2a5ccac7b6631334ac0196d07edacccb7497
Security Notes
Minting is restricted to the contract owner
ERC-721 token is soulbound and cannot be transferred
ERC-721 approvals are disabled
ERC-1155 supports normal transfers and approvals
Contracts use OpenZeppelin audited implementations
Contracts are separated to avoid standard/interface conflicts
Status
ERC-721 contract implemented
ERC-1155 contract implemented
Contracts deployed on Sepolia
ERC-721 mint completed
Soulbound protection demonstrated
ERC-1155 batch mint completed
ERC-1155 student mint completed