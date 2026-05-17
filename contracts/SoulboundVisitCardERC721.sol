// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SoulboundVisitCardERC721 is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    mapping(address => bool) public hasVisitCard;

    event VisitCardMinted(address indexed student, uint256 indexed tokenId, string tokenURI);

    constructor()
        ERC721("Student Visit Card", "SVC")
        Ownable(msg.sender)
    {}

    function mintVisitCard(
        address student,
        string memory metadataURI
    ) external onlyOwner {
        require(student != address(0), "Invalid student address");
        require(!hasVisitCard[student], "Student already has a visit card");

        uint256 tokenId = _nextTokenId;
        _nextTokenId++;

        hasVisitCard[student] = true;

        _safeMint(student, tokenId);
        _setTokenURI(tokenId, metadataURI);

        emit VisitCardMinted(student, tokenId, metadataURI);
    }

    function approve(address, uint256) public pure override(ERC721, IERC721) {
        revert("Soulbound: approvals disabled");
    }

    function setApprovalForAll(address, bool) public pure override(ERC721, IERC721) {
        revert("Soulbound: approvals disabled");
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721) returns (address) {
        address from = _ownerOf(tokenId);

        if (from != address(0) && to != address(0)) {
            revert("Soulbound: transfers disabled");
        }

        return super._update(to, tokenId, auth);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}