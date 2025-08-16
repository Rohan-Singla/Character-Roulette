"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { WalletConnection } from "@/components/wallet-connection"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CharacterRoulettePage() {
  const router = useRouter();
  const features = [
    {
      title: "Provably Fair",
      description: "Blockchain-verified randomness ensures every spin is completely unbiased",
      icon: "🔗",
    },
    {
      title: "True Randomness",
      description: "Cryptographic algorithms guarantee fair character generation",
      icon: "🎲",
    },
    {
      title: "Competitive Rankings",
      description: "Climb the leaderboard with your strongest characters",
      icon: "🏆",
    },
  ]

  const handleViewLeaderboard = () => {
    router.push("/leaderboard");
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="absolute inset-0 crypto-grid opacity-30"></div>

      <div className="container mx-auto px-4 py-16 relative z-10 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div></div>
          <Link href="/leaderboard">
            <Button variant="outline" className="border-border hover:bg-secondary bg-transparent">
              View Leaderboard
            </Button>
          </Link>
        </div>

        <div className="text-center mb-20 fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary">Character Roulette</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            Generate unique blockchain characters with provably fair randomness
          </p>
          <p className="text-lg text-muted-foreground">
            Every spin is cryptographically verified • Compete on global leaderboards
          </p>
        </div>
        <div className="text-center mb-16">
          <div className="max-w-2xl mx-auto">
            <WalletConnection onViewLeaderboard={handleViewLeaderboard} />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
