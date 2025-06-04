import React, { useEffect, useState } from "react";
import RegisterForm from "./components/RegisterForm";
import LeaveMessageForm from "./components/LeaveMessageForm";
import MessageList from "./components/MessageList";
import "./App.css"; // ✅ 你也可以額外在這裡加入樣式檔

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  // ✅ 切換 refreshTrigger，觸發留言牆重新載入
  const triggerRefresh = () => {
    setRefreshTrigger((prev) => !prev);
  };

  // ✅ 自動檢查是否已有授權
  const checkWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      }
    }
  };

  // ✅ 點擊連接錢包
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setCurrentAccount(accounts[0]);
      } catch (error) {
        console.error("❌ 錢包連接失敗", error);
        alert("錢包連接失敗！");
      }
    } else {
      alert("請先安裝 MetaMask！");
    }
  };

  useEffect(() => {
    checkWallet();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "2em", marginBottom: "0.5em" }}>🎓 區塊鏈畢業留言板</h1>
      <p style={{ marginBottom: "1em" }}>
        當前錢包：<strong>{currentAccount || "尚未連接"}</strong>
      </p>

      {!currentAccount && (
        <button
          onClick={connectWallet}
          style={{
            padding: "10px 20px",
            marginBottom: "1.5em",
            backgroundColor: "#6c63ff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          🔌 連接錢包
        </button>
      )}

      <section style={{ marginBottom: "2em", padding: "1em", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>📝 註冊畢業生</h2>
        <RegisterForm currentAccount={currentAccount} />
      </section>

      <section style={{ marginBottom: "2em", padding: "1em", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>💬 留言給畢業生</h2>
        <LeaveMessageForm currentAccount={currentAccount} triggerRefresh={triggerRefresh} />
      </section>

      <section style={{ padding: "1em", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>📜 留言牆</h2>
        <MessageList currentAccount={currentAccount} refreshTrigger={refreshTrigger} />
      </section>
    </div>
  );
}

export default App;

