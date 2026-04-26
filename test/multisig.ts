import { expect } from "chai";
import { network } from "hardhat";
import { parseEther } from "viem";

const { viem } = await network.connect();

async function expectRevert(promise: Promise<unknown>) {
  let reverted = false;

  try {
    await promise;
  } catch {
    reverted = true;
  }

  expect(reverted).to.equal(true);
}

describe("MultiSigWallet", function () {
  async function deployFixture() {
    const [owner1, owner2, owner3, nonOwner, recipient] =
      await viem.getWalletClients();

    const owners = [
      owner1.account.address,
      owner2.account.address,
      owner3.account.address,
    ] as `0x${string}`[];

    const required = 2n;

    const wallet = await viem.deployContract("MultiSigWallet", [
      owners,
      required,
    ]);

    return {
      wallet,
      owner1,
      owner2,
      owner3,
      nonOwner,
      recipient,
      owners,
      required,
    };
  }

  it("Should deploy with correct owners and required confirmations", async function () {
    const { wallet, owners, required } = await deployFixture();

    const actualOwners = await wallet.read.getOwners();

    expect(actualOwners.map((a) => a.toLowerCase())).to.deep.equal(
      owners.map((a) => a.toLowerCase())
    );

    expect(await wallet.read.required()).to.equal(required);
  });

  it("Should allow owner to submit transaction", async function () {
    const { wallet, recipient } = await deployFixture();

    await wallet.write.submitTransaction([
      recipient.account.address,
      parseEther("0.001"),
      "0x",
    ]);

    expect(await wallet.read.getTransactionCount()).to.equal(1n);

    const tx = await wallet.read.getTransaction([0n]);

    expect(tx[0].toLowerCase()).to.equal(
      recipient.account.address.toLowerCase()
    );

    expect(tx[1]).to.equal(parseEther("0.001"));
    expect(tx[3]).to.equal(false);
    expect(tx[4]).to.equal(0n);
  });

  it("Should allow owners to confirm transaction", async function () {
    const { wallet, owner1, owner2, recipient } = await deployFixture();

    await wallet.write.submitTransaction([
      recipient.account.address,
      parseEther("0.001"),
      "0x",
    ]);

    await wallet.write.confirmTransaction([0n], {
      account: owner1.account,
    });

    await wallet.write.confirmTransaction([0n], {
      account: owner2.account,
    });

    const tx = await wallet.read.getTransaction([0n]);

    expect(tx[4]).to.equal(2n);
  });

  it("Should not allow duplicate confirmations", async function () {
    const { wallet, owner1, recipient } = await deployFixture();

    await wallet.write.submitTransaction([
      recipient.account.address,
      parseEther("0.001"),
      "0x",
    ]);

    await wallet.write.confirmTransaction([0n], {
      account: owner1.account,
    });

    await expectRevert(
      wallet.write.confirmTransaction([0n], {
        account: owner1.account,
      })
    );
  });

  it("Should not allow non-owner to confirm transaction", async function () {
    const { wallet, nonOwner, recipient } = await deployFixture();

    await wallet.write.submitTransaction([
      recipient.account.address,
      parseEther("0.001"),
      "0x",
    ]);

    await expectRevert(
      wallet.write.confirmTransaction([0n], {
        account: nonOwner.account,
      })
    );
  });

  it("Should not execute transaction without enough confirmations", async function () {
    const { wallet, owner1, recipient } = await deployFixture();

    await wallet.write.submitTransaction([
      recipient.account.address,
      parseEther("0.001"),
      "0x",
    ]);

    await wallet.write.confirmTransaction([0n], {
      account: owner1.account,
    });

    await expectRevert(wallet.write.executeTransaction([0n]));
  });

  it("Should execute transaction after required confirmations", async function () {
    const { wallet, owner1, owner2, recipient } = await deployFixture();

    await owner1.sendTransaction({
      to: wallet.address,
      value: parseEther("0.01"),
    });

    await wallet.write.submitTransaction([
      recipient.account.address,
      parseEther("0.001"),
      "0x",
    ]);

    await wallet.write.confirmTransaction([0n], {
      account: owner1.account,
    });

    await wallet.write.confirmTransaction([0n], {
      account: owner2.account,
    });

    await wallet.write.executeTransaction([0n], {
      account: owner1.account,
    });

    const tx = await wallet.read.getTransaction([0n]);

    expect(tx[3]).to.equal(true);
    expect(tx[4]).to.equal(2n);
  });

  it("Should allow owner to revoke confirmation before execution", async function () {
    const { wallet, owner1, recipient } = await deployFixture();

    await wallet.write.submitTransaction([
      recipient.account.address,
      parseEther("0.001"),
      "0x",
    ]);

    await wallet.write.confirmTransaction([0n], {
      account: owner1.account,
    });

    await wallet.write.revokeConfirmation([0n], {
      account: owner1.account,
    });

    const tx = await wallet.read.getTransaction([0n]);

    expect(tx[4]).to.equal(0n);
  });
}); 