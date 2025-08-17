import { baseSepolia } from "wagmi/chains"
import { Chain } from "@rainbow-me/rainbowkit"

export const supportedChains: Array<Chain> = [baseSepolia];

export const CONTRACT_ADDRESS = '0x90f100AE6e34F559BA5e99ec542A17D3E914809D';

export const CONTRACT_ABI = [
    {
        "type": "constructor",
        "inputs": [
            { "name": "randomnessSender", "type": "address", "internalType": "address" },
            { "name": "owner", "type": "address", "internalType": "address" }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "acceptOwnership",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "createSubscriptionAndFundNative",
        "inputs": [],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "getBalance",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getCharacters",
        "inputs": [{ "name": "player", "type": "address", "internalType": "address" }],
        "outputs": [{ "name": "", "type": "string[]", "internalType": "string[]" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "isInFlight",
        "inputs": [{ "name": "requestId", "type": "uint256", "internalType": "uint256" }],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "pendingRequestExists",
        "inputs": [{ "name": "subId", "type": "uint256", "internalType": "uint256" }],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "playerCharacters",
        "inputs": [
            { "name": "", "type": "address", "internalType": "address" },
            { "name": "", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "randomnessSender",
        "inputs": [],
        "outputs": [{ "name": "", "type": "address", "internalType": "contract IRandomnessSender" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "receiveRandomness",
        "inputs": [
            { "name": "requestID", "type": "uint256", "internalType": "uint256" },
            { "name": "randomness", "type": "bytes32", "internalType": "bytes32" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "requestCharacterWithDirectFunding",
        "inputs": [
            { "name": "player", "type": "address", "internalType": "address" },
            { "name": "callbackGasLimit", "type": "uint32", "internalType": "uint32" }
        ],
        "outputs": [
            { "name": "requestId", "type": "uint256", "internalType": "uint256" },
            { "name": "requestPrice", "type": "uint256", "internalType": "uint256" }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "requestCharacterWithSubscription",
        "inputs": [
            { "name": "player", "type": "address", "internalType": "address" },
            { "name": "callbackGasLimit", "type": "uint32", "internalType": "uint32" }
        ],
        "outputs": [{ "name": "requestId", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "requestToPlayer",
        "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "setRandomnessSender",
        "inputs": [{ "name": "_randomnessSender", "type": "address", "internalType": "address" }],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setSubId",
        "inputs": [{ "name": "subId", "type": "uint256", "internalType": "uint256" }],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "subscriptionId",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "topUpSubscriptionNative",
        "inputs": [],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "transferOwnership",
        "inputs": [{ "name": "to", "type": "address", "internalType": "address" }],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "updateSubscription",
        "inputs": [{ "name": "consumers", "type": "address[]", "internalType": "address[]" }],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "Funded",
        "inputs": [
            { "name": "sender", "type": "address", "indexed": true, "internalType": "address" },
            { "name": "amount", "type": "uint256", "indexed": false, "internalType": "uint256" }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "NewSubscriptionId",
        "inputs": [
            { "name": "subscriptionId", "type": "uint256", "indexed": true, "internalType": "uint256" }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "OwnershipTransferRequested",
        "inputs": [
            { "name": "from", "type": "address", "indexed": true, "internalType": "address" },
            { "name": "to", "type": "address", "indexed": true, "internalType": "address" }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "OwnershipTransferred",
        "inputs": [
            { "name": "from", "type": "address", "indexed": true, "internalType": "address" },
            { "name": "to", "type": "address", "indexed": true, "internalType": "address" }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Received",
        "inputs": [
            { "name": "", "type": "address", "indexed": false, "internalType": "address" },
            { "name": "", "type": "uint256", "indexed": false, "internalType": "uint256" }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Withdrawn",
        "inputs": [
            { "name": "recipient", "type": "address", "indexed": true, "internalType": "address" },
            { "name": "amount", "type": "uint256", "indexed": false, "internalType": "uint256" }
        ],
        "anonymous": false
    }
];  