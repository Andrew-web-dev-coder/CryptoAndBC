// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameCharacterCollectionERC1155 is ERC1155, Ownable {
    uint256 public constant WARRIOR = 1;
    uint256 public constant MAGE = 2;
    uint256 public constant ARCHER = 3;
    uint256 public constant ASSASSIN = 4;
    uint256 public constant HEALER = 5;
    uint256 public constant TANK = 6;
    uint256 public constant DRAGON = 7;
    uint256 public constant ELF = 8;
    uint256 public constant KNIGHT = 9;
    uint256 public constant NECROMANCER = 10;

    constructor()
        ERC1155("https://gateway.lighthouse.storage/ipfs/bafybeigyypxnyih2h6p66uy5gn73pkgk4vq6dip4nfdnfynlwifk3johu4/{id}.json")
        Ownable(msg.sender)
    {}

    function isValidCharacter(uint256 id) public pure returns (bool) {
        return id >= WARRIOR && id <= NECROMANCER;
    }

    function mintCharacter(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external onlyOwner {
        require(isValidCharacter(id), "Invalid character ID");
        _mint(to, id, amount, data);
    }

    function mintBatchCharacters(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) external onlyOwner {
        for (uint256 i = 0; i < ids.length; i++) {
            require(isValidCharacter(ids[i]), "Invalid character ID");
        }

        _mintBatch(to, ids, amounts, data);
    }

    function setURI(string memory newuri) external onlyOwner {
        _setURI(newuri);
    }
}