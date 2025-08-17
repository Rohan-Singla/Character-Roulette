// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../../src/CharacterRoulette.sol";

contract CharacterRouletteTestable is CharacterRoulette {
    constructor(address randomnessSender, address owner)
        CharacterRoulette(randomnessSender, owner)
    {}

    function exposeOnRandomnessReceived(uint256 requestId, bytes32 randomness) external {
        onRandomnessReceived(requestId, randomness);
    }
}
