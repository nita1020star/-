// frontend/src/components/MessageList.js
import { useState } from "react";
import { ethers } from "ethers";
import abiJson from "../abi/GraduationBoardAbi.json";

const abi = abiJson.abi;
const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

export default function MessageList() {
  const [target, setTarget] = useState("");
  const [messages, setMessages] = useState([]);

  const handleFetch = async () => {
    if (!window.ethereum) return;

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);

    try {
      const data = await contract.getMessages(target);
      setMessages(data);
    } catch (err) {
      console.error("載入留言失敗", err);
      alert("查詢失敗！");
    }
  };

  return (
    <div>
      <h3>查詢留言</h3>
      <input
        placeholder="畢業生地址"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
      />
      <button onClick={handleFetch}>載入留言</button>

      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <p><strong>送出者:</strong> {msg.sender}</p>
            <p><strong>內容:</strong> {msg.content}</p>
            <p><small>{new Date(Number(msg.timestamp) * 1000).toLocaleString()}</small></p>
          </li>
        ))}
      </ul>
    </div>
  );
}
