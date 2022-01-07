// contracts/AFCToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./StakingToken.sol";

contract AFCToken is ERC20, StakingToken {
    constructor(uint256 initialSupply) ERC20("A4crypto", "AFC") {
        _mint(msg.sender, initialSupply);
    }
}
