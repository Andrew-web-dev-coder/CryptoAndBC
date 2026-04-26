# MultiSig Wallet (Solidity + Hardhat)

## Overview

This project implements a **Multi-Signature Wallet** smart contract in Solidity.

A multi-sig wallet requires **multiple owners to approve a transaction** before it can be executed, increasing security and preventing single-point failures.

---

## Features

- Multiple owners
- Configurable confirmation threshold
- Submit transactions (ETH transfer)
- Confirm transactions
- Revoke confirmations
- Execute transactions after enough confirmations
- Protection against:
  - duplicate confirmations
  - unauthorized access
  - premature execution

---

## Contract Design

The contract stores:

- `owners[]` — list of wallet owners
- `required` — minimum confirmations required
- `transactions[]` — list of submitted transactions

Each transaction contains:

- `to` — recipient address
- `value` — amount of ETH
- `data` — call data
- `executed` — execution status
- `numConfirmations` — number of confirmations

### Transaction Lifecycle

1. Submit transaction
2. Owners confirm transaction
3. (Optional) Owners revoke confirmation
4. Execute transaction after threshold is reached

---

## Deployment

### 1. Install dependencies

```bash
npm install
2. Configure .env
SEPOLIA_URL=YOUR_RPC_URL
PRIVATE_KEY=YOUR_PRIVATE_KEY
3. Deploy contract
npx hardhat run scripts/deploy-multisig.ts --network sepolia
Usage
1. Send ETH to contract

Send ETH from MetaMask to deployed contract address.

2. Submit transaction
npx hardhat run scripts/submit-tx.ts --network sepolia
3. Confirm transaction

Each owner runs:

npx hardhat run scripts/confirm-tx.ts --network sepolia
4. Execute transaction
npx hardhat run scripts/execute-tx.ts --network sepolia
 Testing

Run tests:

npx hardhat test
Covered cases:
Deployment with correct owners
Transaction submission
Confirmations by multiple owners
Revoking confirmations
Execution after required confirmations
Edge cases:
duplicate confirmations
non-owner actions
insufficient confirmations

All tests passing.

 Security Considerations
Only owners can interact with critical functions
Prevents duplicate confirmations
Uses confirmation threshold before execution
Follows checks-effects-interactions pattern
Protects against unauthorized execution
Example Transaction (Sepolia)

Contract deployed at:

0x54d74a538bc58d9a6d4a19b9407f49e3fdb66351

Example transaction:

Sent ETH to contract
Submitted multi-sig transaction
Confirmed by multiple owners
Executed successfully
Reflection

Multi-signature wallets significantly improve security in decentralized systems.

They prevent:

single private key compromise
accidental transactions
unauthorized fund transfers

They are widely used in:

DAOs
DeFi protocols
treasury management
 Tech Stack
Solidity (0.8.x)
Hardhat
TypeScript
Viem
Ethers.js
Mocha + Chai
Status

--- Contract implemented
--- Deployed on Sepolia
--- Fully tested
--- All features working