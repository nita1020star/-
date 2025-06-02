import React, { useEffect, useState } from "react";
import RegisterForm from "./components/RegisterForm";
import LeaveMessageForm from "./components/LeaveMessageForm";
import MessageList from "./components/MessageList";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");

  // 檢查是否已授權過
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

  // 主動請求 MetaMask 錢包授權
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
      alert("請安裝 MetaMask！");
    }
  };

  useEffect(() => {
    checkWallet();
  }, []);

  return (
    <div>
      <h1>🎓 區塊鏈畢業留言板</h1>
      <p>當前錢包：{currentAccount || "尚未連接"}</p>

      {!currentAccount && (
        <button onClick={connectWallet}>🔌 連接錢包</button>
      )}

      {/* 傳送帳號給表單元件 */}
      <RegisterForm currentAccount={currentAccount} />
      <LeaveMessageForm currentAccount={currentAccount} />
      <MessageList />
    </div>
  );
}

export default App;

