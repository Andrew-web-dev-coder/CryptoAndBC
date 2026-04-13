import { network } from "hardhat";

const { viem, networkName } = await network.connect();

async function main() {
  console.log(`Deploying Greeting to ${networkName}...`);

  const contract = await viem.deployContract("Greeting", ["Andrei"]);
  console.log("Contract deployed to:", contract.address);

  const result = await contract.read.greet();
  console.log("greet() returns:", result);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});