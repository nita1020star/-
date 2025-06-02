import { useState } from "react";
import { ethers } from "ethers";
import artifact from "../abi/GraduationBoardAbi.json";
const abi = artifact.abi;

const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"; // 例如 "0x123abc..."

export default function RegisterForm({ currentAccount }) {
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");

  const registerGraduate = async () => {
    if (!window.ethereum || !currentAccount) {
      alert("請先連接錢包！");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      const tx = await contract.registerGraduate(name, school);
      await tx.wait();
      alert("🎓 註冊成功！");
    } catch (err) {
      console.error(err);
      alert("註冊失敗！");
    }
  };

  return (
    <div>
      <h3>註冊畢業生</h3>
      <input placeholder="姓名" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="學校" value={school} onChange={(e) => setSchool(e.target.value)} />
      <button onClick={registerGraduate}>送出註冊</button>
    </div>
  );
}
