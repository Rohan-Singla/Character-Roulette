"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

interface CharacterDisplayProps {
    character: Character
    onGenerateAnother: () => void
    onViewLeaderboard: () => void
}

export function CharacterDisplay({ character, onGenerateAnother, onViewLeaderboard }: CharacterDisplayProps) {
    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case "Legendary":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
            case "Epic":
                return "bg-purple-500/20 text-purple-400 border-purple-500/30"
            case "Rare":
                return "bg-blue-500/20 text-blue-400 border-blue-500/30"
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500/30"
        }
    }

    const getStatColor = (value: number) => {
        if (value >= 120) return "text-yellow-400"
        if (value >= 100) return "text-purple-400"
        if (value >= 80) return "text-blue-400"
        return "text-gray-400"
    }

    return (
        <Card className="bg-card border border-border max-w-2xl mx-auto">
            <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                    <img
                        src={character.avatar || "/placeholder.svg"}
                        alt={character.name}
                        className="w-32 h-32 rounded-full border-4 border-primary"
                    />
                </div>
                <CardTitle className="text-3xl font-bold text-card-foreground">{character.name}</CardTitle>
                <div className="flex justify-center gap-2 mt-2">
                    <Badge className={getRarityColor(character.rarity)}>{character.rarity}</Badge>
                    <Badge variant="outline" className="border-border">
                        {character.class}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="space-y-6">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">{character.totalPower}</div>
                        <p className="text-muted-foreground">Total Power</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-card-foreground text-center">Character Stats</h3>
                        {Object.entries(character.stats).map(([stat, value]) => (
                            <div key={stat} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="capitalize text-card-foreground font-medium">{stat}</span>
                                    <span className={`font-bold ${getStatColor(value)}`}>{value}</span>
                                </div>
                                <Progress value={(value / 200) * 100} className="h-2" />
                            </div>
                        ))}
                    </div>

                    <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground text-center">
                            Character ID: <span className="font-mono text-primary">{character.id}</span>
                        </p>
                    </div>

                    <div className="flex gap-3 justify-center">
                        <Button
                            onClick={onGenerateAnother}
                            size="lg"
                            className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3"
                        >
                            Generate Another
                        </Button>
                        <Button
                            onClick={onViewLeaderboard}
                            variant="outline"
                            className="border-border hover:bg-secondary px-6 py-3 bg-transparent"
                        >
                            View Leaderboard
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
