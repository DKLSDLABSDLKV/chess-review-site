import { useEffect } from 'react'
import { Chess } from 'chess.js'
import useGameStore from '../store/gameStore.js'

export const useChessGame = () => {
  const {
    pgn, fen, moveIndex, moves, evals, classifications,
    loadPGN, goToMove, nextMove, prevMove
  } = useGameStore()

  const chess = new Chess(fen)

  useEffect(() => {
    if (pgn) {
      try {
        loadPGN(pgn)
      } catch (e) {
        console.error('Invalid PGN', e)
      }
    }
  }, [pgn, loadPGN])

  const jumpToIndex = (index) => {
    goToMove(index)
  }

  const isFirst = moveIndex === 0
  const isLast = moveIndex === moves.length

  return {
    chess,
    fen,
    moveIndex,
    moves,
    evals,
    classifications,
    isFirst,
    isLast,
    nextMove,
    prevMove,
    jumpToIndex,
    loadPGN
  }
}

