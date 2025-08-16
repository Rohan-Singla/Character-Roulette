import { Randomness } from "randomness-js";
import { JsonRpcProvider, Wallet } from "ethers";

const rpc = new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
const wallet = new Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY!, rpc);

const randomness = Randomness.createBaseSepolia(wallet);

export async function requestRandomness() {
  const response = await randomness.requestRandomness();
  return response;
}

export async function verifyRandomness(response: any) {
  return randomness.verify(response, { shouldBlowUp: false });
}
