import React, { useState, useCallback } from 'react'
import { Chessboard } from 'react-chessboard'
import { useGameStore } from '../store/useGameStore.js'
// Icons: use simple emojis instead of lucide-react

const Board = () => {
  const [flip, setFlip] = useState(false)
  const { fen, nextMove, prevMove, moveIndex, moves, isFirst, isLast } = useGameStore()
  const [rightClickedSquares, setRightClickedSquares] = useState({})
  const [moveSound, setMoveSound] = useState(new Audio('/move-sound.mp3')) // Placeholder

  const playMoveSound = () => {
    moveSound.currentTime = 0
    moveSound.play().catch(() => {})
  }

  const safeGameMutate = useCallback((modification) => {
    modification()
  }, [])

  const makeRandomMove = useCallback(() => {
    // Placeholder for random or engine move
    return true
  }, [])

  const onDrop = useCallback((sourceSquare, targetSquare) => {
    // Disable user moves for review mode
    return false
  }, [])

  const toggleFlip = () => setFlip(!flip)

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="chessboard w-80 h-80 lg:w-96 lg:h-96">
        <Chessboard
          position={fen}
          onPieceDrop={onDrop}
          boardOrientation={flip ? 'black' : 'white'}
          arePiecesDraggable={false}
          showBoardNotation
          customBoardStyle={{
            borderRadius: '4px',
          }}
        />
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={prevMove}
          disabled={isFirst}
          className="p-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 rounded-lg transition"
          title="Previous Move"
        >
          ⏪
        </button>
        <button
          onClick={() => useGameStore.getState().goToMove(0)}
          disabled={isFirst}
          className="p-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 rounded-lg transition"
        >
          ⏮️
        </button>
        <span className="px-4 py-2 bg-black/50 rounded font-mono text-sm min-w-[3rem] text-center">
          {moveIndex + 1} / {moves.length + 1}
        </span>
        <button
          onClick={() => useGameStore.getState().goToMove(moves.length)}
          disabled={isLast}
          className="p-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 rounded-lg transition"
        >
          ⏭️
        </button>
        <button
          onClick={nextMove}
          disabled={isLast}
          className="p-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 rounded-lg transition"
          title="Next Move"
        >
          ⏩
        </button>
        <button
          onClick={toggleFlip}
          className="p-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition"
          title="Flip Board"
        >
          ↻
        </button>
      </div>
    </div>
  )
}

export default Board

