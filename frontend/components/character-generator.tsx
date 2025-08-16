"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

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

  const characterClasses = ["Warrior", "Mage", "Rogue", "Paladin", "Archer", "Necromancer"]
  const characterNames = [
    "Shadowbane",
    "Stormcaller",
    "Ironheart",
    "Moonwhisper",
    "Flamestrike",
    "Frostborn",
    "Voidwalker",
    "Lightbringer",
    "Bloodfang",
    "Starweaver",
    "Thornspike",
    "Mistral",
  ]

  const generateCharacter = async (): Promise<Character> => {
    const steps = [
      "Connecting to blockchain...",
      "Generating random seed...",
      "Rolling character class...",
      "Calculating base stats...",
      "Determining rarity...",
      "Finalizing character...",
    ]

    for (let i = 0; i < steps.length; i++) {
      setGenerationStep(steps[i])
      setProgress((i + 1) * (100 / steps.length))
      await new Promise((resolve) => setTimeout(resolve, 800))
    }

    // Generate random character
    const rarity =
      Math.random() < 0.05 ? "Legendary" : Math.random() < 0.15 ? "Epic" : Math.random() < 0.35 ? "Rare" : "Common"

    const rarityMultiplier = {
      Common: 1,
      Rare: 1.2,
      Epic: 1.5,
      Legendary: 2,
    }[rarity]

    const baseStats = {
      strength: Math.floor((Math.random() * 50 + 50) * rarityMultiplier),
      agility: Math.floor((Math.random() * 50 + 50) * rarityMultiplier),
      intelligence: Math.floor((Math.random() * 50 + 50) * rarityMultiplier),
      vitality: Math.floor((Math.random() * 50 + 50) * rarityMultiplier),
      luck: Math.floor((Math.random() * 50 + 50) * rarityMultiplier),
    }

    const totalPower = Object.values(baseStats).reduce((sum, stat) => sum + stat, 0)

    return {
      id: `char_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: characterNames[Math.floor(Math.random() * characterNames.length)],
      class: characterClasses[Math.floor(Math.random() * characterClasses.length)],
      rarity,
      stats: baseStats,
      totalPower,
      avatar: `/placeholder.svg?height=200&width=200&query=${rarity.toLowerCase()}+fantasy+character`,
    }
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    setProgress(0)

    try {
      const character = await generateCharacter()
      onCharacterGenerated(character)
    } catch (error) {
      console.error("Character generation failed:", error)
    } finally {
      setIsGenerating(false)
      setProgress(0)
      setGenerationStep("")
    }
  }

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
