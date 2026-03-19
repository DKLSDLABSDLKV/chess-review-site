import React from 'react'
import useGameStore from '../store/gameStore.js'

const SpeechBubble = () => {
  const { speaking } = useGameStore()
  
  if (!speaking) return null

  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-white/95 text-gray-900 rounded-2xl px-8 py-4 max-w-md shadow-2xl border border-gray-200 z-40 animate-bounce-slow">
      <div className="font-semibold text-lg mb-2">Magnus speaking...</div>
      <div className="text-sm opacity-75 italic leading-relaxed">
        "Analyzing your brilliant Knight f3. White maintains a 0.8 pawn advantage. Perfect chess!"
      </div>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white" />
    </div>
  )
}

export default SpeechBubble

