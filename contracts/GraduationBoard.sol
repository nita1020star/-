// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract GraduationBoard {
    struct Graduate {
        string name;
        string school;
        bool registered;
    }

    struct Message {
        address sender;
        string content;
        uint256 timestamp;
    }

    // ✅ 畢業生資訊與留言儲存
    mapping(address => Graduate) public graduates;
    mapping(address => Message[]) public messages;

    // ✅ 加入事件，方便前端讀取留言紀錄
    event MessageLeft(address indexed sender, address indexed graduate, string content, uint256 timestamp);

    // ✅ 註冊畢業生，只能註冊一次
    function registerGraduate(string memory name, string memory school) public {
        require(!graduates[msg.sender].registered, "Already registered");
        graduates[msg.sender] = Graduate(name, school, true);
    }

    // ✅ 留言給畢業生，支援附帶 ETH，並 emit 事件
    function leaveMessage(address graduate, string memory content) public payable {
        require(graduates[graduate].registered, "Not a graduate");

        messages[graduate].push(Message({
            sender: msg.sender,
            content: content,
            timestamp: block.timestamp
        }));

        emit MessageLeft(msg.sender, graduate, content, block.timestamp);
    }

    // ✅ 查詢某位畢業生收到的留言
    function getMessages(address graduate) public view returns (Message[] memory) {
        return messages[graduate];
    }
}

