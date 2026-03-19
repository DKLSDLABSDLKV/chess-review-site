import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import ImportPanel from './components/ImportPanel.jsx'
import Board from './components/Board.jsx'
import MoveList from './components/MoveList.jsx'
import EvalBar from './components/EvalBar.jsx'
import EvalGraph from './components/EvalGraph.jsx'
import ReviewSummary from './components/ReviewSummary.jsx'
import VoiceBot from './components/VoiceBot.jsx'
import SpeechBubble from './components/SpeechBubble.jsx'
import { useChessGame } from './hooks/useChessGame.js'
import { useStockfish } from './hooks/useStockfish.js'
import useVoiceBot from './hooks/useVoiceBot.js'
import './index.css'

function App() {
  useChessGame()
  useStockfish()
  useVoiceBot()

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <header className="p-6 bg-black/30 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              ♔ Chess Game Review - Magnus AI
            </h1>
            <div className="flex gap-4 text-sm">
              <span>Stockfish 16 | Voice Bot | PGN Import</span>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ImportPanel />
          <div className="lg:col-span-1 space-y-6">
            <Board />
            <EvalBar />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-black/50 p-6 rounded-2xl border border-white/20">
              <h2 className="text-2xl font-bold mb-6">📝 Moves</h2>
              <MoveList />
            </div>
            <ReviewSummary />
            <EvalGraph />
          </div>
        </main>

        <VoiceBot />
        <SpeechBubble />
      </div>
    </Router>
  )
}

export default App

