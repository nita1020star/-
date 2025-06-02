// frontend/src/utils/getBoardContract.js

import { ethers } from "ethers";
import abi from "../abi/GraduationBoardAbi.json";
import contractAddress from "../contract/contractAddress";

export default async function getBoardContract() {
  if (!window.ethereum) {
    alert("請先安裝 MetaMask");
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  return contract;
}
