# NFT Collection - Assignment 9

## Overview

This project implements two NFT smart contracts deployed on the Ethereum Sepolia test network:

1. **ERC-721 Soulbound Student Visit Card**
2. **ERC-1155 Game Character Collection**

The project demonstrates the implementation of both NFT standards using Solidity, Hardhat, TypeScript, Viem, and audited OpenZeppelin contracts.

---

# Contracts

## SoulboundVisitCardERC721.sol

ERC-721 NFT representing a student visit card.

### Features

- Uses OpenZeppelin ERC-721 implementation
- Only the contract owner can mint
- Exactly one NFT per student
- Metadata includes student information and image URI
- Soulbound behavior (transfers are permanently disabled)
- Approvals are disabled
- Fully compatible with the ERC-721 metadata standard

---

## GameCharacterCollectionERC1155.sol

ERC-1155 collection representing game character NFTs.

### Features

- Uses OpenZeppelin ERC-1155 implementation
- 10 predefined game character token IDs
- Owner-only minting
- Batch minting support
- Batch transfers
- Metadata stored on Lighthouse IPFS
- Compatible with ERC-1155 wallets and marketplaces

### Character IDs

| ID | Character |
|----|-----------|
| 1 | Warrior |
| 2 | Mage |
| 3 | Archer |
| 4 | Assassin |
| 5 | Healer |
| 6 | Tank |
| 7 | Dragon |
| 8 | Elf |
| 9 | Knight |
| 10 | Necromancer |

---

# Tech Stack

- Solidity 0.8.28
- Hardhat
- TypeScript
- OpenZeppelin Contracts
- Viem
- Ethereum Sepolia Testnet
- Lighthouse IPFS

---

# Installation

Install dependencies:

```bash
npm install
```

Configure the `.env` file:

```text
SEPOLIA_URL=YOUR_RPC_URL
PRIVATE_KEY=YOUR_PRIVATE_KEY
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY
```

---

# Compilation

Compile contracts:

```bash
npx hardhat compile
```

---

# Deployment

Deploy the Soulbound contract:

```bash
npx hardhat run scripts/deploy-nft.ts --network sepolia
```

Deploy the ERC-1155 collection:

```bash
npx hardhat run scripts/deploy-game-collection.ts --network sepolia
```

---

# Minting

Mint the Soulbound Visit Card:

```bash
npx hardhat run scripts/mint-visit-card.ts --network sepolia
```

Mint all game characters:

```bash
npx hardhat run scripts/mint-game-characters.ts --network sepolia
```

---

# URI Update

Set the ERC-1155 metadata base URI:

```bash
npx hardhat run scripts/set-game-uri.ts --network sepolia
```

---

# Batch Transfer

Transfer multiple ERC-1155 NFTs:

```bash
npx hardhat run scripts/batch-transfer-game-characters.ts --network sepolia
```

---

# Soulbound Test

Attempt to transfer the ERC-721 token:

```bash
npx hardhat run scripts/try-transfer-visit-card.ts --network sepolia
```

Expected output:

```text
Transfer failed as expected.
Soulbound protection works.
```

---

# Metadata

ERC-721 metadata is available through:

- `tokenURI()`

ERC-1155 metadata is available through:

- `uri(id)`

Current ERC-1155 metadata URI:

```text
https://gateway.lighthouse.storage/ipfs/bafybeigyypxnyih2h6p66uy5gn73pkgk4vq6dip4nfdnfynlwifk3johu4/{id}.json
```

NFT images are also stored on Lighthouse IPFS and referenced from the metadata using standard `ipfs://` URIs.

Each metadata file contains:

- character name
- description
- image URI
- attributes (e.g. Strength, Magic, Rarity)

---

# Deployed Contracts (Sepolia)

## SoulboundVisitCardERC721

```text
0xc12ad7a217b36650b9c4575973c618e26bc38636
```

## GameCharacterCollectionERC1155

```text
0xd85c92629b855c95cbcb0078ea394c614c9bfbe3
```

---

# Transaction Hashes

## ERC-721 Soulbound Mint

```text
0x40d88abda19dacb760f2ff9db6c82fcc5a7bbdffadc0ca96128e5e94c771d998
```

---

## ERC-1155 URI Update

```text
0xcd2832fe57d96e924a016c6a4d26447d320931f2afd20978ac16071b2d0d38dc
```

---

## ERC-1155 Batch Mint

```text
0x7b8153830462352abe9cba1f240fec6a86b2065754d6a34d7a4bb103ccc2c9ee
```

---

## ERC-1155 Batch Transfer

```text
0xaf079b66143dc3c3e50b04aa434bfe88d69593cb12752c3172e9b80a338e386c
```

---

# Proof of Functionality

- Soulbound ERC-721 NFT successfully minted.
- Soulbound transfer protection successfully verified.
- ERC-1155 metadata uploaded to Lighthouse IPFS.
- ERC-1155 URI successfully updated.
- All 10 game character NFTs successfully minted.
- ERC-1155 batch transfer successfully executed.

---

# Security Notes

- Only the contract owner can mint NFTs.
- ERC-721 tokens are permanently Soulbound.
- ERC-721 approvals are disabled.
- ERC-1155 uses the audited OpenZeppelin implementation.
- Metadata is stored on decentralized IPFS storage.
- NFT images are stored on Lighthouse IPFS.
- ERC-721 and ERC-1155 are implemented as separate contracts.

---

# Assignment Requirements Checklist

| Requirement | Status |
|-------------|--------|
| ERC-721 Soulbound contract | ✅ |
| ERC-1155 contract | ✅ |
| Owner-only minting | ✅ |
| Soulbound protection | ✅ |
| Metadata support | ✅ |
| One NFT per student | ✅ |
| 10 ERC-1155 token IDs | ✅ |
| Batch minting | ✅ |
| Batch transfer | ✅ |
| IPFS metadata | ✅ |
| Deployment on Sepolia | ✅ |
| README documentation | ✅ |
| Transaction hashes included | ✅ |

---

# Project Status

- ✅ ERC-721 Soulbound contract implemented
- ✅ ERC-1155 Game Character Collection implemented
- ✅ Contracts compiled successfully
- ✅ Contracts deployed on Sepolia
- ✅ ERC-721 Soulbound NFT minted
- ✅ Soulbound protection verified
- ✅ ERC-1155 metadata uploaded to Lighthouse IPFS
- ✅ ERC-1155 URI updated
- ✅ ERC-1155 batch mint completed
- ✅ ERC-1155 batch transfer completed
- ✅ Proof of functionality included
- ✅ Assignment completed successfully