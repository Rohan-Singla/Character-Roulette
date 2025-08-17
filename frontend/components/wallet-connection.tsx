"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CharacterGenerator } from "./character-generator"
import { CharacterDisplay } from "./character-display"
import { useAccount } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"

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

type ViewState = "connect" | "generate" | "display"

interface WalletConnectionProps {
  onViewLeaderboard?: () => void
}


export function WalletConnection({ onViewLeaderboard }: WalletConnectionProps) {
  const { isConnected, address } = useAccount()
  const [viewState, setViewState] = useState<ViewState>("connect")
  const [generatedCharacter, setGeneratedCharacter] = useState<Character | null>(null)

  const handleCharacterGenerated = (character: Character) => {
    setGeneratedCharacter(character)
    setViewState("display")
  }

  const handleGenerateAnother = () => {
    setViewState("generate")
  }

  const handleBack = () => {
    setViewState("connect")
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (!isConnected) {
    return (
      <Card className="bg-card border border-border">
        <CardContent className="p-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-card-foreground">Ready to Play?</h2>
          <p className="text-muted-foreground mb-6">
            Connect your wallet to start generating characters and competing on the leaderboard
          </p>

          <div className="flex justify-center">
            <ConnectButton />
          </div>

          <p className="text-xs text-muted-foreground mt-4">Supports MetaMask, Rainbow, Coinbase, and more</p>
        </CardContent>
      </Card>
    )
  }

  if (viewState === "generate") {
    return <CharacterGenerator />
  }

  if (viewState === "display" && generatedCharacter) {
    return (
      <CharacterDisplay
        character={generatedCharacter}
        onGenerateAnother={handleGenerateAnother}
        onViewLeaderboard={() => onViewLeaderboard?.()}
      />
    )
  }

  return (
    <Card className="bg-card border border-accent/20">
      <CardContent className="p-6 text-center">
        <div className="flex items-center justify-center gap-2 text-accent mb-4">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <span className="font-medium">Wallet Connected</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{formatAddress(address!)}</p>
        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => setViewState("generate")}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg font-semibold"
          >
            Generate Character
          </Button>

          <ConnectButton label="Disconnect" />
        </div>
      </CardContent>
    </Card>
  )
}
