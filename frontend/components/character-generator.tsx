"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAccount, useWaitForTransactionReceipt, useWriteContract, useReadContract } from "wagmi"
import { parseEther } from "viem"
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/config"
import { calculateRequestPriceNative, requestRandomness, verifyRandomness } from "@/lib/randomness"

export function CharacterGenerator() {
  const { address, isConnected } = useAccount()
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [step, setStep] = useState("")
  const [characters, setCharacters] = useState<string[]>([])
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined)
  const [vrfResponse, setVrfResponse] = useState<any>(null)

  const { writeContractAsync } = useWriteContract()
  const { isSuccess: txConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
    query: { enabled: !!txHash },
  })

  const { refetch } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getCharacters",
    args: [address],
    query: { enabled: false },
  })

  useEffect(() => {
    if (!txHash) return

    console.log("✅ Transaction confirmed:", txHash)
    setStep("Fetching randomness and waiting for character generation...")
    setProgress(70)

    const interval = setInterval(async () => {
      try {
        // if (!vrfResponse) {
        //   console.log("🔄 Requesting randomness via Randomness SDK...")
        //   const response = await requestRandomness()
        //   console.log("🌀 Raw VRF response:", response)
        //   const verified = await verifyRandomness(response)
        //   console.log("✅ Verified VRF:", verified)
        //   setVrfResponse(verified)
        // }

        const res = await refetch();
        console.log("📦 Contract response:", res.data)
        // if (res.data && (res.data as string[]).length > characters.length) {
        //   console.log("🎉 New character generated:", res.data)
        //   setCharacters(res.data as string[])
        //   setStep("Character generated successfully!")
        //   setProgress(100)
        //   setIsGenerating(false)
        //   clearInterval(interval)
        // }
      } catch (err) {
        console.error("❌ Error fetching characters:", err)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [txHash, vrfResponse])

  const handleGenerate = async () => {
    if (!isConnected || !address) {
      alert("Connect your wallet first")
      return
    }

    setIsGenerating(true)
    setStep("Sending randomness request to contract...")
    setProgress(20)

    try {
      const callbackGasLimit = 700_000;
      const requestCallBackPrice = await calculateRequestPriceNative(700_000)

      console.log("🚀 Sending requestCharacterWithDirectFunding tx...")
      const hash = await writeContractAsync({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "requestCharacterWithDirectFunding",
        value: requestCallBackPrice,
        args: [address, callbackGasLimit],
      });
      console.log("📤 Transaction sent, hash:", hash)
      setTxHash(hash)
      setStep("Transaction sent, waiting for confirmation...")
      setProgress(40)
    } catch (err) {
      console.error("❌ Transaction failed:", err)
      setIsGenerating(false)
    }
  }

  return (
    <Card className="bg-card border border-border max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Character Roulette</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {!isGenerating ? (
          <div className="space-y-6 text-center">
            <div className="bg-secondary/20 border border-secondary/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Generation Cost</h3>
              <div className="text-3xl font-bold text-primary mb-2">0.001 ETH</div>
            </div>

            <Button
              onClick={handleGenerate}
              size="lg"
              className="bg-accent hover:bg-accent/90 px-8 py-3 text-lg font-semibold"
            >
              Generate Character
            </Button>

            {characters.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Your Characters</h3>
                <ul className="space-y-2">
                  {characters.map((char, idx) => (
                    <li key={idx} className="p-2 border rounded-lg">{char}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4 animate-spin">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Generating Character...</h3>
            <p className="text-muted-foreground mb-4">{step}</p>
            <Progress value={progress} className="w-full" />
            <p className="text-sm mt-2">{Math.round(progress)}% Complete</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
