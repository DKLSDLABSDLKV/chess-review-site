import React from 'react'
import useGameStore from '../store/gameStore.js'

const EvalBar = () => {
  const { evals, moveIndex } = useGameStore()
  const currentEval = evals[moveIndex] || 0

  const getBarPosition = (evalScore) => {
    if (evalScore > 2) return 90
    if (evalScore > 0.5) return 70 + evalScore * 10
    if (evalScore > -0.5) return 50 + evalScore * 20
    if (evalScore > -2) return 30 + Math.abs(evalScore) * 10
    return 10
  }

  const getLabel = (evalScore) => {
    if (Math.abs(evalScore) < 0.2) return 'Equal'
    if (evalScore > 0) return `+${evalScore.toFixed(1)}`
    return evalScore.toFixed(1)
  }

  const barPosition = getBarPosition(currentEval)

  return (
    <div className="relative h-12 bg-gray-900 rounded-2xl overflow-hidden border-2 border-gray-700">
      {/* Advantage gradient */}
      <div 
        className="absolute h-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 transition-all duration-300"
        style={{ left: `${barPosition}%` }}
      />
      {/* White advantage indicator */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full border-2 border-white/50" />
      
      {/* Label */}
      <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-lg">
        {getLabel(currentEval)}
      </div>
      
      {/* Zero line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/30" />
    </div>
  )
}

export default EvalBar

