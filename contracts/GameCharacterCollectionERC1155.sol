// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameCharacterCollectionERC1155 is ERC1155, Ownable {
    uint256 public constant WARRIOR = 1;
    uint256 public constant MAGE = 2;
    uint256 public constant ARCHER = 3;

    constructor()
        ERC1155("https://example.com/metadata/{id}.json")
        Ownable(msg.sender)
    {}

    function mintCharacter(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external onlyOwner {
        require(id == WARRIOR || id == MAGE || id == ARCHER, "Invalid character ID");
        _mint(to, id, amount, data);
    }

    function mintBatchCharacters(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) external onlyOwner {
        for (uint256 i = 0; i < ids.length; i++) {
            require(ids[i] == WARRIOR || ids[i] == MAGE || ids[i] == ARCHER, "Invalid character ID");
        }

        _mintBatch(to, ids, amounts, data);
    }

    function setURI(string memory newuri) external onlyOwner {
        _setURI(newuri);
    }
}