import * as chai from "chai";
import { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { network } from "hardhat";
import { parseUnits } from "viem";

chai.use(chaiAsPromised);

describe("MyToken", function () {
  it("Should deploy with correct initial supply", async function () {
    const { viem } = await network.connect();

    const [owner] = await viem.getWalletClients();

    const initialSupply = parseUnits("1000000", 18);
    const contract = await viem.deployContract("MyToken", [initialSupply]);

    const ownerBalance = await contract.read.balanceOf([owner.account.address]);
    const totalSupply = await contract.read.totalSupply();

    expect(ownerBalance).to.equal(initialSupply);
    expect(totalSupply).to.equal(initialSupply);
  });

  it("Should allow owner to mint tokens", async function () {
    const { viem } = await network.connect();

    const [owner, user] = await viem.getWalletClients();
    const publicClient = await viem.getPublicClient();

    const initialSupply = parseUnits("1000000", 18);
    const mintAmount = parseUnits("500", 18);

    const contract = await viem.deployContract("MyToken", [initialSupply]);

    const hash = await contract.write.mint([user.account.address, mintAmount], {
      account: owner.account,
    });

    await publicClient.waitForTransactionReceipt({ hash });

    const userBalance = await contract.read.balanceOf([user.account.address]);
    expect(userBalance).to.equal(mintAmount);
  });

  it("Should transfer tokens between accounts", async function () {
    const { viem } = await network.connect();

    const [owner, user] = await viem.getWalletClients();
    const publicClient = await viem.getPublicClient();

    const initialSupply = parseUnits("1000000", 18);
    const transferAmount = parseUnits("100", 18);

    const contract = await viem.deployContract("MyToken", [initialSupply]);

    const hash = await contract.write.transfer([user.account.address, transferAmount], {
      account: owner.account,
    });

    await publicClient.waitForTransactionReceipt({ hash });

    const ownerBalance = await contract.read.balanceOf([owner.account.address]);
    const userBalance = await contract.read.balanceOf([user.account.address]);

    expect(userBalance).to.equal(transferAmount);
    expect(ownerBalance).to.equal(initialSupply - transferAmount);
  });

  it("Should fail when transferring more than available balance", async function () {
    const { viem } = await network.connect();

    const [owner, user] = await viem.getWalletClients();

    const initialSupply = parseUnits("1000000", 18);
    const tooMuch = parseUnits("999999999", 18);

    const contract = await viem.deployContract("MyToken", [initialSupply]);

    await expect(
      contract.write.transfer([owner.account.address, tooMuch], {
        account: user.account,
      })
    ).to.be.rejected;
  });
});