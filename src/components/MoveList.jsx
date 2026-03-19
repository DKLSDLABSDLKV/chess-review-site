import React from 'react'
import useGameStore from '../store/gameStore.js'
import { getCommentary } from '../utils/commentary.js'
import { Chess } from 'chess.js'

const BADGE_COLORS = {
  best: 'bg-green-500',
  excellent: 'bg-emerald-500',
  good: 'bg-blue-500',
  inaccuracy: 'bg-yellow-500',
  mistake: 'bg-orange-500',
  blunder: 'bg-red-500'
}

const MoveList = () => {
  const { moves, moveIndex, evals, classifications, goToMove } = useGameStore()

  const getMoveColor = (classification) => BADGE_COLORS[classification] || 'bg-gray-500'

  const formatMoveNumber = (index) => {
    const moveNum = Math.floor(index / 2) + 1
    const isWhiteMove = index % 2 === 0
    return `${moveNum}${isWhiteMove ? '.' : '...'}`
  }

  return (
    <div className="max-h-96 overflow-y-auto space-y-1 pr-2">
      {moves.map((move, index) => {
        const isCurrent = index === moveIndex - 1
        const evalScore = evals[index + 1]
        const classification = classifications[index]
        const chess = new Chess()
        chess.load_pgn(moves.slice(0, index + 1).map(m => m.san).join(' '))

        return (
          <div
            key={index}
            onClick={() => goToMove(index + 1)}
            className={`flex items-center p-2 rounded-lg cursor-pointer transition-all hover:bg-white/10 group ${
              isCurrent ? 'bg-purple-500/30 ring-2 ring-purple-400' : ''
            }`}
          >
            <span className="w-10 text-xs font-mono opacity-75 text-right mr-2">
              {formatMoveNumber(index)}
            </span>
            <span className={`font-mono text-sm px-2 py-1 rounded-full text-xs font-semibold ml-2 min-w-[60px] group-hover:scale-105 transition-transform ${
              getMoveColor(classification)
            }`}>
              {classification?.toUpperCase() || '?'}
            </span>
            <span className="font-mono text-sm flex-1 min-w-0 truncate">
              {move.san}
            </span>
            <span className="text-xs font-mono opacity-75 ml-2">
              {evalScore !== undefined ? evalScore.toFixed(1) : ''}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default MoveList

