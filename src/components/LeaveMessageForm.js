import { useState } from "react";
import { ethers } from "ethers";
import abiJson from "../abi/GraduationBoardAbi.json";

const abi = abiJson.abi;
const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

export default function LeaveMessageForm({ currentAccount }) {
  const [targetAddress, setTargetAddress] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!window.ethereum || !currentAccount) {
      alert("請先連接錢包！");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const tx = await contract.leaveMessage(targetAddress, content, {
        value: ethers.parseEther("0.01")
      });
      await tx.wait();
      alert("留言成功！");
    } catch (err) {
      console.error(err);
      alert("留言失敗！");
    }
  };

  return (
    <div>
      <h3>留言給畢業生</h3>
      <input
        placeholder="畢業生地址"
        value={targetAddress}
        onChange={(e) => setTargetAddress(e.target.value)}
      />
      <textarea
        placeholder="留言內容"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSubmit}>送出留言</button>
    </div>
  );
}
