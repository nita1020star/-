import { useState, useEffect } from "react";
import { ethers } from "ethers";
import abiJson from "../abi/GraduationBoardAbi.json";

const abi = abiJson.abi;
const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// 👉 手動指定要顯示留言的畢業生地址清單
const graduateList = [
  ethers.getAddress("0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199"),
  ethers.getAddress("0xbad5a428dcb4c4efa8e2a2b801e9727d84950aea")
];

export default function MessageList() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = async () => {
    if (!window.ethereum) return;
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum); // 如果你用 ethers v5 請改成 Web3Provider
      const contract = new ethers.Contract(contractAddress, abi, provider);

      let allMessages = [];

      for (const addr of graduateList) {
        const data = await contract.getMessages(addr);
        console.log(`📩 從 ${addr} 抓到的留言資料：`, data); // ✅ debug 用

        const formatted = data.map((msg) => ({
          ...msg,
          graduate: addr
        }));
        allMessages = allMessages.concat(formatted);
      }

      setMessages(allMessages);
    } catch (err) {
      console.error("❌ 載入留言失敗", err);
      alert("查詢失敗：" + (err?.reason || err?.message));
    } finally {
      setLoading(false);
    }
  };

  // 頁面載入時自動抓取一次
  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div>
      <h3>留言牆</h3>
      <button onClick={fetchAll} disabled={loading}>
        {loading ? "載入中..." : "🔁 手動刷新留言"}
      </button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {messages.length === 0 ? (
          <p>目前尚無留言</p>
        ) : (
          messages.map((msg, index) => (
            <li key={index} className="message-bubble">
              <p>
                <strong>畢業生:</strong> {msg.graduate}
              </p>
              <p>
                <strong>送出者:</strong> {msg.sender}
              </p>
              <p>
                <strong>內容:</strong> {msg.content}
              </p>
              <p style={{ fontSize: "0.8em", color: "#666" }}>
                {new Date(Number(msg.timestamp) * 1000).toLocaleString()}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

