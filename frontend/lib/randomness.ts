import { Randomness } from "randomness-js";
import { JsonRpcProvider } from "ethers";

const rpc = new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);

const randomness = Randomness.createBaseSepolia(rpc);

export async function requestRandomness() {
  const response = await randomness.requestRandomness();
  return response;
}

export async function verifyRandomness(response: any) {
  return randomness.verify(response, { shouldBlowUp: false });
}

export async function calculateRequestPriceNative(callbackGasLimit: any) {
  const [requestCallBackPrice] = await randomness.calculateRequestPriceNative(BigInt(callbackGasLimit))
  return requestCallBackPrice
}