// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/CharacterRoulette.sol";
import "./wrapper.sol";

contract CharacterRouletteTest is Test {
    CharacterRouletteTestWrapper roulette;
    address owner = address(1);
    address player = address(2);
    address randomnessSender = address(3);

    function setUp() public {
        roulette = new CharacterRouletteTestWrapper(randomnessSender, owner);
    }

    function testGenerateCharacter() public {
        // Simulate a request
        uint256 requestId = 123;
        roulette.requestCharacterWithDirectFunding{value: 0.001 ether}(player, 200_000);

        // Fake randomness
        bytes32 fakeRandomness = bytes32(uint256(5));

        // Call the internal function via the wrapper
        roulette.testOnRandomnessReceived(requestId, fakeRandomness);

        // Check if the character was added
        string[] memory chars = roulette.getCharacters(player);
        assert(chars.length == 1);
    }
}
