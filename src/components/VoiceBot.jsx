import React from 'react'
import useVoiceBot from '../hooks/useVoiceBot.js'
import useGameStore from '../store/gameStore.js'

const VoiceBot = () => {
  const { explainCurrentMove, readGameSummary, voiceMode } = useVoiceBot()
  const { speaking, toggleVoiceMode } = useGameStore()
  const [volume, setVolume] = React.useState(1)

  const modes = ['auto', 'on-demand', 'off']

  return (
    <div className="fixed bottom-8 right-8 w-72 bg-black/90 backdrop-blur-xl border border-purple-500/50 rounded-3xl p-6 shadow-2xl z-50 animate-in slide-in-from-bottom-4 duration-500">
      {/* Avatar */}
      <div className={`w-16 h-16 mx-auto mb-4 rounded-full border-4 ${
        speaking ? 'border-purple-400 animate-pulse bg-gradient-to-r from-purple-400 to-pink-400' : 'border-gray-600 bg-gray-800'
      } flex items-center justify-center`}>
        <span className="text-2xl">♔</span>
      </div>
      
      <h3 className="text-xl font-bold text-center text-white mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Magnus
      </h3>
      
      <div className="flex gap-1 mb-4 justify-center">
        {modes.map((mode) => (
          <button
            key={mode}
            onClick={() => toggleVoiceMode(mode)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              voiceMode === mode 
                ? 'bg-purple-600 text-white shadow-lg scale-105' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            {mode === 'auto' ? 'AUTO' : mode.toUpperCase()}
          </button>
        ))}
      </div>
      
      <div className="space-y-2">
        <button
          onClick={explainCurrentMove}
          disabled={speaking}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 disabled:opacity-50 p-3 rounded-2xl font-semibold transition-all shadow-lg"
        >
          🎙️ Explain This Move
        </button>
        <button
          onClick={readGameSummary}
          disabled={speaking}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 p-3 rounded-2xl font-semibold transition-all shadow-lg"
        >
          📖 Read Summary
        </button>
      </div>
      
      <div className="mt-4 flex items-center gap-2">
        <label className="text-sm opacity-75">Vol:</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
        <span className="text-xs opacity-75">{Math.round(volume * 100)}%</span>
      </div>
    </div>
  )
}

export default VoiceBot

