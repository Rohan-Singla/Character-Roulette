// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/CharacterRoulette.sol";

contract DeployCharacterRoulette is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        address randomnessSender = vm.envAddress("RANDOMNESS_SENDER"); 
        address owner = vm.addr(deployerPrivateKey);

        vm.startBroadcast(deployerPrivateKey);

        new CharacterRoulette(randomnessSender, owner);

        vm.stopBroadcast();
    }
}
