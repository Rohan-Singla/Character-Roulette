"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { mockLeaderboard } from "@/lib/data"
import { formatAddress, getRankColor, getRankIcon, getRarityColor } from "@/lib/utils"


export default function LeaderboardPage() {
  const [selectedTab, setSelectedTab] = useState("power");

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="absolute inset-0 crypto-grid opacity-30"></div>

      <div className="container mx-auto px-4 py-16 relative z-10 max-w-6xl">
        <div className="text-center mb-12 fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">Leaderboard</h1>
          <p className="text-xl text-muted-foreground mb-6">Top players and their legendary characters</p>
          <Link href="/">
            <Button variant="outline" className="border-border hover:bg-secondary bg-transparent">
              Back to Game
            </Button>
          </Link>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-card border border-border">
            <TabsTrigger
              value="power"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Total Power
            </TabsTrigger>
            <TabsTrigger
              value="rarity"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              By Rarity
            </TabsTrigger>
            <TabsTrigger
              value="recent"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Recent
            </TabsTrigger>
          </TabsList>

          <TabsContent value="power" className="space-y-4">
            <div className="grid gap-4">
              {mockLeaderboard.map((entry) => (
                <Card
                  key={entry.rank}
                  className={`bg-card border transition-all duration-300 hover:border-primary/50 ${
                    entry.rank <= 3 ? "border-primary/30" : "border-border"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      <div className="text-center min-w-[60px]">
                        <div className={`text-3xl font-bold ${getRankColor(entry.rank)}`}>
                          {entry.rank <= 3 ? getRankIcon(entry.rank) : `#${entry.rank}`}
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        <img
                          src={entry.avatar || "/placeholder.svg"}
                          alt={entry.characterName}
                          className="w-16 h-16 rounded-full border-2 border-primary"
                        />
                      </div>

                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-card-foreground">{entry.characterName}</h3>
                          <Badge className={getRarityColor(entry.rarity)}>{entry.rarity}</Badge>
                          <Badge variant="outline" className="border-border">
                            {entry.characterClass}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Player: {formatAddress(entry.playerAddress)}</p>
                      </div>

                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary mb-1">{entry.totalPower}</div>
                        <p className="text-sm text-muted-foreground">Total Power</p>
                        <p className="text-xs text-accent mt-1">
                          Best: {entry.topStat} ({entry.topStatValue})
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rarity" className="space-y-6">
            {["Legendary", "Epic", "Rare", "Common"].map((rarity) => {
              const rarityEntries = mockLeaderboard.filter((entry) => entry.rarity === rarity)
              if (rarityEntries.length === 0) return null

              return (
                <div key={rarity}>
                  <h2 className="text-2xl font-bold mb-4 text-card-foreground flex items-center gap-3">
                    <Badge className={getRarityColor(rarity)}>{rarity}</Badge>
                    <span className="text-muted-foreground text-lg">({rarityEntries.length})</span>
                  </h2>
                  <div className="grid gap-3">
                    {rarityEntries.map((entry) => (
                      <Card key={entry.rank} className="bg-card border border-border">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={entry.avatar || "/placeholder.svg"}
                              alt={entry.characterName}
                              className="w-12 h-12 rounded-full border-2 border-primary"
                            />
                            <div className="flex-grow">
                              <h3 className="font-bold text-card-foreground">{entry.characterName}</h3>
                              <p className="text-sm text-muted-foreground">{formatAddress(entry.playerAddress)}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-primary">{entry.totalPower}</div>
                              <p className="text-xs text-muted-foreground">Rank #{entry.rank}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            })}
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <div className="text-center py-8">
              <div className="text-6xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">Recent Activity</h3>
              <p className="text-muted-foreground">Recent character generations and power updates will appear here</p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16 text-center">
          <Card className="bg-card border border-border max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-card-foreground">Leaderboard Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-2xl font-bold text-yellow-400">2</div>
                  <div className="text-sm text-muted-foreground">Legendary Characters</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">3</div>
                  <div className="text-sm text-muted-foreground">Epic Characters</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">847</div>
                  <div className="text-sm text-muted-foreground">Highest Power</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">645</div>
                  <div className="text-sm text-muted-foreground">Average Power</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
