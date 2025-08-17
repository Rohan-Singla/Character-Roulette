"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi"
import RandomnessABI from "@/lib/abi/Randomness.json" // ABI you compiled with Foundry
import { parseEther } from "viem"

const RANDOMNESS_CONTRACT = "0xYourRandomnessAddressHere"

interface Character {
  id: string
  name: string
  class: string
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
  stats: {
    strength: number
    agility: number
    intelligence: number
    vitality: number
    luck: number
  }
  totalPower: number
  avatar: string
}

interface CharacterGeneratorProps {
  onCharacterGenerated: (character: Character) => void
  onBack: () => void
}

export function CharacterGenerator({ onCharacterGenerated, onBack }: CharacterGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generationStep, setGenerationStep] = useState("")
  const { data: txHash, writeContract } = useWriteContract()
  const { address, isConnected } = useAccount();

  const { isLoading: waitingTx, isSuccess: txConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const handleGenerate = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first.")
      return
    }

    setIsGenerating(true)
    setProgress(20)
    setGenerationStep("Sending randomness request...")

    try {
      await writeContract({
        abi: RandomnessABI,
        address: RANDOMNESS_CONTRACT,
        functionName: "requestRandomWords",
        value: parseEther("0.001"),
        args: [],
      })

      setGenerationStep("Waiting for VRF response...")
      setProgress(50)
    } catch (err) {
      console.error(err)
      setIsGenerating(false)
      return
    }
  };

  return (
    <Card className="bg-card border border-border max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-card-foreground">Character Generation</CardTitle>
        <p className="text-muted-foreground">Using blockchain randomness to create your unique character</p>
      </CardHeader>
      <CardContent className="p-6">
        {!isGenerating ? (
          <div className="text-center space-y-6">
            <div className="bg-secondary/20 border border-secondary/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">Generation Cost</h3>
              <div className="text-3xl font-bold text-primary mb-2">0.001 ETH</div>
              <p className="text-sm text-muted-foreground">Gas fees will be calculated at generation time</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-card border border-border rounded-lg p-3">
                <div className="font-semibold text-accent">5%</div>
                <div className="text-muted-foreground">Legendary</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-3">
                <div className="font-semibold text-primary">10%</div>
                <div className="text-muted-foreground">Epic</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-3">
                <div className="font-semibold text-secondary">20%</div>
                <div className="text-muted-foreground">Rare</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-3">
                <div className="font-semibold text-muted-foreground">65%</div>
                <div className="text-muted-foreground">Common</div>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Button
                onClick={handleGenerate}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg font-semibold"
              >
                Generate Character
              </Button>
              <Button variant="outline" onClick={onBack} className="border-border hover:bg-secondary bg-transparent">
                Back
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4 animate-spin">⚡</div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">Generating Your Character</h3>
              <p className="text-muted-foreground mb-4">{generationStep}</p>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}% Complete</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
