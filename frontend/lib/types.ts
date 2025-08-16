export interface LeaderboardEntry {
    rank: number
    playerAddress: string
    characterName: string
    characterClass: string
    rarity: "Common" | "Rare" | "Epic" | "Legendary"
    totalPower: number
    topStat: string
    topStatValue: number
    avatar: string
}
