const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("MessageSender", function () {
  async function deployMessageSenderFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const MessageSender = await ethers.getContractFactory("MessageSender");
    const messageSender = await MessageSender.deploy();

    return { messageSender, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { messageSender, owner } = await loadFixture(deployMessageSenderFixture);

      expect(await messageSender.owner()).to.equal(owner.address);
    });
  });

  describe("Message sending", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called from another account", async function () {
        const { messageSender, owner, otherAccount } = await loadFixture(
          deployMessageSenderFixture
        );

        // We use messageSender.connect() to send a transaction from another account
        await expect(messageSender.connect(otherAccount).sendMessage("Hello"))
          .to.be.revertedWith("You aren't the owner");
      });

      it("Shouldn't fail if the owner calls it", async function () {
        const { messageSender, owner } = await loadFixture(
          deployMessageSenderFixture
        );

        // Transactions are sent using the first signer by default
        await expect(messageSender.sendMessage("Hello")).not.to.be.reverted;
      });
    });

    describe("Events", function () {
      it("Should emit an event on message sending", async function () {
        const { messageSender, owner } = await loadFixture(
          deployMessageSenderFixture
        );

        await expect(messageSender.sendMessage("Hello"))
          .to.emit(messageSender, "MessageSent")
          .withArgs("Hello", anyValue); // We accept any value as `when` arg
      });
    });

    describe("Message retrieval", function () {
      it("Should retrieve the right message", async function () {
        const { messageSender, owner } = await loadFixture(
          deployMessageSenderFixture
        );

        const message = "Hello";
        await messageSender.sendMessage(message);

        expect(await messageSender.getMessage()).to.equal(message);
      });
    });
  });
});
