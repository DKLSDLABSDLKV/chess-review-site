import React from 'react'
import useGameStore from '../store/gameStore.js'
import { getColorAccuracy } from '../utils/moveClassifier.js'

const ReviewSummary = () => {
  const { classifications, accuracy } = useGameStore()

  const countByClass = (playerClassifications) => {
    return playerClassifications.reduce((counts, cls) => {
      counts[cls] = (counts[cls] || 0) + 1
      return counts
    }, {})
  }

  const whiteMoves = classifications.filter((_, i) => i % 2 === 0)
  const blackMoves = classifications.filter((_, i) => i % 2 === 1)

  const whiteCounts = countByClass(whiteMoves)
  const blackCounts = countByClass(blackMoves)

  const whiteAcc = getColorAccuracy(classifications, 'white')
  const blackAcc = getColorAccuracy(classifications, 'black')

  const stats = [
    { label: 'White Accuracy', value: `${whiteAcc}%`, color: 'from-white to-gray-200' },
    { label: 'Black Accuracy', value: `${blackAcc}%`, color: 'from-gray-400 to-gray-600' },
    { label: 'Blunders', value: (whiteCounts.blunder || 0) + (blackCounts.blunder || 0), color: 'from-red-500 to-red-600' },
    { label: 'Mistakes', value: (whiteCounts.mistake || 0) + (blackCounts.mistake || 0), color: 'from-orange-500 to-orange-600' },
    { label: 'Total Moves', value: classifications.length, color: 'from-blue-500 to-indigo-500' }
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4 border-b border-white/20 pb-2">📈 Game Summary</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <div key={index} className="p-3 bg-gray-800/50 rounded-xl border border-gray-700">
            <div className="text-sm opacity-75">{stat.label}</div>
            <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <div className="font-semibold">White</div>
          {Object.entries(whiteCounts).map(([cls, count]) => (
            <div key={cls} className="flex justify-between">
              <span>{cls}</span>
              <span>{count}</span>
            </div>
          ))}
        </div>
        <div>
          <div className="font-semibold">Black</div>
          {Object.entries(blackCounts).map(([cls, count]) => (
            <div key={cls} className="flex justify-between">
              <span>{cls}</span>
              <span>{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReviewSummary

