import { network } from "hardhat";
import { parseUnits } from "viem";

const { viem, networkName } = await network.connect();

async function main() {
  console.log(`Deploying MyToken to ${networkName}...`);

  const initialSupply = parseUnits("1000000", 18);

  const contract = await viem.deployContract("MyToken", [initialSupply]);

  console.log("MyToken deployed to:", contract.address);

  const totalSupply = await contract.read.totalSupply();
  console.log("Total supply:", totalSupply.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});