// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;
import "./ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";


contract NFT is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  constructor() ERC721 ("SquareNFT", "SQUARE") {
    console.log("Deploying contract");
  }

  function mintNFT() public {
    uint256 newItemId = _tokenIds.current();
    _safeMint(msg.sender, newItemId);
    _setTokenURI(newItemId, "https://jsonkeeper.com/b/YLNG");
    console.log("NFT w/ ID %s creado para el address to %s", newItemId, msg.sender);
    _tokenIds.increment();
  }
}
