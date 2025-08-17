// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {RandomnessReceiverBase} from "randomness-solidity/RandomnessReceiverBase.sol";

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

    mapping(address => uint256) public playerCharacterCount;

    event CharacterRequested(address indexed player, uint256 requestId, uint256 requestPrice);
    event CharacterGenerated(address indexed player, string character, uint256 requestId);

    constructor(address randomnessSender, address owner)
        RandomnessReceiverBase(randomnessSender, owner)
    {}

    function requestCharacterWithDirectFunding(
        address player,
        uint32 callbackGasLimit
    ) external payable returns (uint256 requestId, uint256 requestPrice) {
        (requestId, requestPrice) = _requestRandomnessPayInNative(callbackGasLimit);
        require(msg.value >= requestPrice, "Insufficient ETH sent");

        requestToPlayer[requestId] = player;

        emit CharacterRequested(player, requestId, requestPrice);
    }

    function requestCharacterWithSubscription(
        address player,
        uint32 callbackGasLimit
    ) external returns (uint256 requestId) {
        requestId = _requestRandomnessWithSubscription(callbackGasLimit);
        requestToPlayer[requestId] = player;

        emit CharacterRequested(player, requestId, 0);
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
        playerCharacterCount[player]++;

        emit CharacterGenerated(player, newCharacter, requestId);

        delete requestToPlayer[requestId];
    }

    function getCharacters(address player) external view returns (string[] memory) {
        return playerCharacters[player];
    }

    function getCharacterCount(address player) external view returns (uint256) {
        return playerCharacterCount[player];
    }
}
