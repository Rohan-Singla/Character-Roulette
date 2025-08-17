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


## Deployed Contract

**Address:** `0xYourDeployedContractAddressHere`

---

## Tools & Tech Stack

- **Wagmi** – React hooks for Ethereum wallet connection and contract interaction  
- **ViEM** – Ethereum JSON-RPC library for transactions and contract calls  
- **Next.js** – Frontend framework for building a reactive DApp  
- **Tailwind CSS** – Responsive UI styling  
- **Forge (Foundry)** – Smart contract testing and deployment framework  

---

## Key Features

- **Random Character Generation:** Users can generate characters via on-chain randomness  
- **On-Chain Storage:** Characters are stored securely in the contract per player  
- **Progress Feedback:** Live progress bar during generation  
- **Debugging Logs:** Logs for transaction submission, confirmation, and character generation  

---

## Upcoming Feature

- **Leaderboard:** Global leaderboard showing top players based on number or rarity of characters (Work in progress)  

---

## How It Works

1. Player connects wallet to the DApp  
2. Player sends a transaction to request a new character  
3. Transaction triggers a randomness request via Randomness SDK  
4. Smart contract receives randomness and assigns a character  
5. Character is stored on-chain in `playerCharacters` mapping  
6. Frontend polls the contract until character generation completes and updates UI  

---

## Contract Functions

- `requestCharacterWithDirectFunding(address player, uint32 callbackGasLimit)` – Request a random character by paying native ETH  
- `requestCharacterWithSubscription(address player, uint32 callbackGasLimit)` – Request a random character via subscription  
- `onRandomnessReceived(uint256 requestId, bytes32 randomness)` – Internal function called by randomness SDK to assign character  
- `getCharacters(address player)` – Returns all characters owned by the player  
