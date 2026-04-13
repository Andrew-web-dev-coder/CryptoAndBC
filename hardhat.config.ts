import { defineConfig } from "hardhat/config";
import hardhatViem from "@nomicfoundation/hardhat-viem";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [hardhatViem],
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
});