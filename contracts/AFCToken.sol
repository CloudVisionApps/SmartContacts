// contracts/AFCToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./StakingToken.sol";

contract AFCToken is Context, ERC20, StakingToken {

  /**
   * @dev Constructor that gives _msgSender() all of existing tokens.
   */
  constructor () public ERC20("A4crypto", "AFC") {
      _mint(_msgSender(), 10000 * (10 ** uint256(decimals())));
  }

  function decimals() public view virtual override returns (uint8) {
    return 18;
  }

}
