// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GraduationBoard {
    struct Graduate {
        string name;
        string school;
        bool registered;
    }

    struct Message {
        address sender;
        string content;
        uint timestamp;
    }

    mapping(address => Graduate) public graduates;
    mapping(address => Message[]) public messages;

    function registerGraduate(string memory name, string memory school) public {
        require(!graduates[msg.sender].registered, "Already registered");
        graduates[msg.sender] = Graduate(name, school, true);
    }

    function leaveMessage(address graduate, string memory content) public payable {
        require(graduates[graduate].registered, "Not a graduate");
        messages[graduate].push(Message(msg.sender, content, block.timestamp));
    }

    function getMessages(address graduate) public view returns (Message[] memory) {
        return messages[graduate];
    }
}
