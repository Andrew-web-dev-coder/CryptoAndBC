import { defineConfig } from "hardhat/config";
import hardhatViem from "@nomicfoundation/hardhat-viem";
import hardhatMocha from "@nomicfoundation/hardhat-mocha";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [hardhatViem, hardhatMocha],
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