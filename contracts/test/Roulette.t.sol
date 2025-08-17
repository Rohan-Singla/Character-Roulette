// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/CharacterRoulette.sol";
import "./mocks/CharacterRouletteTestable.sol";

contract CharacterRouletteTest is Test {
    CharacterRouletteTestable roulette;
    address owner = address(0xBEEF);
    address randomnessSender = address(0xCAFE); 
    address player = address(0xABCD);

    function setUp() public {
        vm.deal(player, 10 ether); 
        roulette = new CharacterRouletteTestable(randomnessSender, owner);
    }

    function testRequestCharacterAndFulfill() public {
        vm.startPrank(player);

        (uint256 requestId, ) = roulette.requestCharacterWithDirectFunding{value: 0.1 ether}(
            player,
            500000
        );

        bytes32 fakeRandomness = keccak256("seed123");
        vm.prank(randomnessSender);
        roulette.exposeOnRandomnessReceived(requestId, fakeRandomness);

        string[] memory chars = roulette.getCharacters(player);
        assertEq(chars.length, 1, "Player should have 1 character");

        emit log_string(chars[0]); 
    }
}
