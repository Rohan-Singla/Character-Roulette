// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../src/CharacterRoulette.sol";

contract CharacterRouletteTestWrapper is CharacterRoulette {
    constructor(address randomnessSender, address owner) 
        CharacterRoulette(randomnessSender, owner) 
    {}

    // Expose the internal onRandomnessReceived for testing
    function testOnRandomnessReceived(uint256 requestId, bytes32 randomness) external {
        onRandomnessReceived(requestId, randomness);
    }
}
