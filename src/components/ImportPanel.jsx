 import React, { useState, useCallback } from 'react'
import { useGameStore } from '../store/useGameStore.js'
import { loadSharedPGN } from '../utils/shareUtils.js'

const ImportPanel = () => {
  const [pgn, setPgn] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
const loadPGN = createGameStore((state) => state.loadPGN)

  const handlePastePGN = () => {
    setLoading(true)
    setError('')
    loadPGN(pgn)
    setLoading(false)
  }

  const importChessCom = async (username) => {
    setLoading(true)
    try {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const response = await fetch(`https://api.chess.com/pub/player/${username}/games/${year}/${month}`)
      const data = await response.json()
      if (data.games && data.games.length > 0) {
        const lastGame = data.games[0].pgn
        setPgn(lastGame)
        loadPGN(lastGame)
      }
    } catch (e) {
      setError('Invalid Chess.com username')
    } finally {
      setLoading(false)
    }
  }

  const importLichess = async (username) => {
    setLoading(true)
    try {
      const response = await fetch(`https://lichess.org/api/games/user/${username}?max=1`)
      const pgnText = await response.text()
      setPgn(pgnText)
      loadPGN(pgnText)
    } catch (e) {
      setError('Invalid Lichess username')
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    const shared = loadSharedPGN()
    if (shared) {
      setPgn(shared)
      loadPGN(shared)
    }
  }, [])

  return (
    <div className="lg:col-span-1 bg-black/50 p-6 rounded-2xl border border-white/20 backdrop-blur-md space-y-4">
      <h2 className="text-2xl font-bold">📥 Import Game</h2>
      
      <div>
        <label className="block text-sm font-semibold mb-2">Paste PGN</label>
        <textarea
          value={pgn}
          onChange={(e) => setPgn(e.target.value)}
          className="w-full p-3 bg-gray-900 border border-gray-600 rounded-xl text-white placeholder-gray-400 resize-vertical h-32 font-mono text-sm"
          placeholder="Paste PGN (e.g. 1. e4 e5 2. Nf3 Nc6...)"
        />
      </div>

      <button
        onClick={handlePastePGN}
        disabled={loading || !pgn.trim()}
        className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 disabled:opacity-50 p-3 rounded-xl font-semibold transition-all"
      >
        {loading ? 'Loading...' : 'Load Game'}
      </button>

      <div className="pt-4 border-t border-white/10">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs mb-1">Chess.com</label>
            <input
              type="text"
              placeholder="username"
              className="w-full p-2 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm"
              onKeyPress={(e) => {
                if (e.key === 'Enter') importChessCom(e.target.value)
              }}
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Lichess</label>
            <input
              type="text"
              placeholder="username"
              className="w-full p-2 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm"
              onKeyPress={(e) => {
                if (e.key === 'Enter') importLichess(e.target.value)
              }}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-900/50 border border-red-500 rounded-xl text-red-200 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={() => navigator.clipboard.writeText(window.location.href)}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 p-3 rounded-xl font-semibold transition-all"
      >
        📎 Copy Share Link
      </button>
    </div>
  )
}

export default ImportPanel

