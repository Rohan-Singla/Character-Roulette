Character Roulette

Character Roulette is a Web3 DApp developed that allows users to generate characters with random stats on-chain using blockchain-native randomness and unbiaseness. Each player can create a character, which is securely generated and stored on the blockchain, ensuring fairness, randomness and transparency.

Project Overview

Players connect their wallet to the DApp on base sepolia network.

A small fee is paid to request a new character in eth.

The system uses on-chain randomness (via [Randomness-Solidity](https://github.com/randa-mu/randomness-solidity)) to generate a character with random stats from a predefined list: Warrior, Mage, Rogue, Paladin, Hunter, Necromancer.

Characters are stored on-chain and can be retrieved anytime using the getCharacters function.

The frontend displays a smooth generation process with progress feedback.

Tools & Technologies Used

Solidity – Smart contract language for Ethereum-compatible blockchains.

Randomness-Solidity (https://github.com/randa-mu/randomness-solidity) – Provides verifiable randomness for on-chain character generation.

Randomness-Js (https://github.com/randa-mu/randomness-js) – Used to request, verify, and derive randomness from the dcipher network, supported by the randomness-solidity contract

Wagmi – React hooks for Ethereum wallet connection and contract interaction.

ViEM – Ethereum JSON-RPC library for transaction and contract calls.

Next.js – Frontend framework for building a reactive DApp interface.

Tailwind CSS – Styling framework for responsive UI components.

Forge (Foundry) – Smart contract testing and deployment framework.

Key Features

Random Character Generation: Users can generate characters by sending a transaction; the randomness is handled on-chain.

On-Chain Storage: Generated characters are securely stored in a smart contract per player address.

Progress Feedback: Users see a live progress bar during character generation.

Debugging Logs: All steps (transaction submission, confirmation, character generation) are logged for easier troubleshooting.

Upcoming Feature

Leaderboard: A global leaderboard showing top players based on the number or rarity of characters generated. (Work in progress)

How It Works

Player connects wallet to the DApp.

Player sends a transaction to request a new character.

Transaction triggers a randomness request using Randomness SDK.

The smart contract receives the randomness and assigns a character.

The character is stored on-chain in the player's playerCharacters mapping.

Frontend polls the contract until the character is generated and updates the UI.

Contract Functions

requestCharacterWithDirectFunding(address player, uint32 callbackGasLimit) – Requests a random character by paying in native ETH.

requestCharacterWithSubscription(address player, uint32 callbackGasLimit) – Requests a random character using a subscription model.

onRandomnessReceived(uint256 requestId, bytes32 randomness) – Internal function called by the randomness SDK to assign a character.

getCharacters(address player) – Returns all characters owned by the player.
