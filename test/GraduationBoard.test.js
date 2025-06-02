const { expect } = require("chai");

describe("GraduationBoard", function () {
  let board, owner, user;

  beforeEach(async function () {
    const Board = await ethers.getContractFactory("GraduationBoard");
    [owner, user] = await ethers.getSigners();
    board = await Board.deploy();
    await board.deployed();
  });

  it("should register a graduate", async function () {
    await board.registerGraduate("Alice", "Blockchain University");
    const graduate = await board.graduates(owner.address);
    expect(graduate.name).to.equal("Alice");
    expect(graduate.school).to.equal("Blockchain University");
    expect(graduate.registered).to.equal(true);
  });

  it("should allow others to leave messages with ETH", async function () {
    await board.registerGraduate("Alice", "Blockchain University");

    await board.connect(user).leaveMessage(
      owner.address,
      "恭喜畢業！",
      { value: ethers.utils.parseEther("0.01") }
    );

    const messages = await board.getMessages(owner.address);
    expect(messages.length).to.equal(1);
    expect(messages[0].content).to.equal("恭喜畢業！");
    expect(messages[0].sender).to.equal(user.address);
  });

  it("should not allow double registration", async function () {
    await board.registerGraduate("Alice", "Blockchain University");
    await expect(
      board.registerGraduate("Alice Again", "Another School")
    ).to.be.revertedWith("Already registered");
  });
});
