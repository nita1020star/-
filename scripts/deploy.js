const hre = require("hardhat");

async function main() {
  console.log("🚀 開始執行 deploy.js");

  const Board = await hre.ethers.getContractFactory("GraduationBoard");
  console.log("Contract factory created");

  const board = await Board.deploy(); // ✅ 這裡會自動部署完成
  await board.waitForDeployment();    // ✅ 使用這個等待部署完成（Hardhat 內部新版做法）

  console.log("Contract deployed to:", await board.getAddress()); // ✅ 用 getAddress() 取部署地址
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});


