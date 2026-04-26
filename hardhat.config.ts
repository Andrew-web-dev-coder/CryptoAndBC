import { defineConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import hardhatViem from "@nomicfoundation/hardhat-viem";
import hardhatVerify from "@nomicfoundation/hardhat-verify";
import hardhatMocha from "@nomicfoundation/hardhat-mocha";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [hardhatViem, hardhatVerify, hardhatMocha],
  solidity: {
    version: "0.8.28",
  },

  networks: {
    sepolia: {
      type: "http",
      chainType: "l1",
      url: process.env.SEPOLIA_URL!,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },

  verify: {
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY!,
    },
  },
});