import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRarityColor = (rarity: string) => {
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

export const getRankColor = (rank: number) => {
  if (rank === 1) return "text-yellow-400"
  if (rank === 2) return "text-gray-300"
  if (rank === 3) return "text-amber-600"
  return "text-muted-foreground"
}

export const getRankIcon = (rank: number) => {
  if (rank === 1) return "👑"
  if (rank === 2) return "🥈"
  if (rank === 3) return "🥉"
  return `#${rank}`
}

export const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}