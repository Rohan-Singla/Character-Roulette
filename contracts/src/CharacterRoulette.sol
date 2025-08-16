// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {RandomnessReceiverBase} from "randomness-solidity/src/RandomnessReceiverBase.sol";

contract CharacterRoulette is RandomnessReceiverBase {
    mapping(address => string[]) public playerCharacters;

    mapping(uint256 => address) public requestToPlayer;

    string[] internal characters = [
        "Warrior",
        "Mage",
        "Rogue",
        "Paladin",
        "Hunter",
        "Necromancer"
    ];

    constructor(address randomnessSender, address owner)
        RandomnessReceiverBase(randomnessSender, owner)
    {}

    function requestCharacterWithDirectFunding(
        address player,
        uint32 callbackGasLimit
    ) external payable returns (uint256 requestId, uint256 requestPrice) {
        (requestId, requestPrice) = _requestRandomnessPayInNative(callbackGasLimit);
        requestToPlayer[requestId] = player;
    }

    function requestCharacterWithSubscription(
        address player,
        uint32 callbackGasLimit
    ) external returns (uint256 requestId) {
        requestId = _requestRandomnessWithSubscription(callbackGasLimit);
        requestToPlayer[requestId] = player;
    }

    function onRandomnessReceived(uint256 requestId, bytes32 randomness)
        internal
        override
    {
        address player = requestToPlayer[requestId];
        require(player != address(0), "Unknown request");

        uint256 randIndex = uint256(randomness) % characters.length;
        string memory newCharacter = characters[randIndex];

        playerCharacters[player].push(newCharacter);
    }

    function getCharacters(address player) external view returns (string[] memory) {
        return playerCharacters[player];
    }
}
