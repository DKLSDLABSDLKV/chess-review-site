import { useEffect, useRef, useCallback } from 'react'
import useGameStore from '../store/gameStore.js'

export const useStockfish = () => {
  const workerRef = useRef(null)
  const gameStore = useGameStore()
  const gameStoreRef = useRef(gameStore)

  useEffect(() => {
    gameStoreRef.current = gameStore
  }, [gameStore])

  const initStockfish = useCallback(() => {
    if (workerRef.current) return

    workerRef.current = new Worker('/stockfish-worker.js')

    workerRef.current.onmessage = (event) => {
      const { type, data } = event.data
      
      if (type === 'ready') {
        console.log('Stockfish ready')
      } else if (type === 'response') {
        // Parse Stockfish output
        if (data.startsWith('info depth ')) {
          // Parse eval
          const depthMatch = data.match(/depth (\\d+)/)
          const scoreMatch = data.match(/score cp ([-\\d]+)/) || data.match(/score mate ([-\\d]+)/)
          const pvMatch = data.match(/pv ([\\w\\d]+)/)
          
          if (scoreMatch && gameStoreRef.current.moveIndex !== undefined) {
            const score = scoreMatch[1]
            const cp = score.startsWith('mate') ? (score > 0 ? 1000 : -1000) : parseInt(score)
            gameStoreRef.current.setEval(gameStoreRef.current.moveIndex, cp / 100)
          }
        }
      }
    }

    workerRef.current.postMessage({ type: 'init' })
  }, [])

  const analyzePosition = useCallback((fen) => {
    if (!workerRef.current) return

    workerRef.current.postMessage({ 
      command: `position fen ${fen}`,
      type: 'command'
    })
    workerRef.current.postMessage({ 
      command: 'go depth 20',
      type: 'command'
    })
  }, [])

  const classifyMove = (ownEval, bestEval, color) => {
    const delta = Math.abs(bestEval - ownEval)
    if (delta < 0.05) return 'best'
    if (delta < 0.15) return 'excellent'
    if (delta < 0.3) return 'good'
    if (delta < 0.7) return 'inaccuracy'
    if (delta < 1.5) return 'mistake'
    return 'blunder'
  }

  useEffect(() => {
    initStockfish()
  }, [initStockfish])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      analyzePosition(gameStore.fen)
    }, 200)

    return () => clearTimeout(timeoutId)
  }, [gameStore.fen, analyzePosition])

  return {
    analyzePosition,
    classifyMove
  }
}

