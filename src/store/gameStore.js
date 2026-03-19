import { create } from 'zustand'
import { Chess } from 'chess.js'

const createGameStore = create((set, get) => ({
  // State
  pgn: '',
  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  moveIndex: 0,
  moves: [],
  evals: [],
  classifications: [],
  accuracy: { white: 0, black: 0 },
  bestMoves: [],
  gameSummary: {
    whiteBlunders: 0,
    blackBlunders: 0,
    // etc
  },
  voiceMode: 'auto', // auto, on-demand, off
  speaking: false,

  // Actions
  loadPGN: (pgn) => {
    const chess = new Chess()
    chess.load_pgn(pgn)
    const history = chess.history({ verbose: true })
    const fen = chess.fen()
    set({ 
      pgn,
      fen,
      moveIndex: 0,
      moves: history,
      evals: new Array(history.length + 1).fill(0),
      classifications: new Array(history.length).fill(''),
      accuracy: { white: 0, black: 0 }
    })
  },

  goToMove: (index) => {
    const chess = new Chess(get().fen)
    // Reset to start and replay up to index
    chess.reset()
    for (let i = 0; i < index; i++) {
      chess.move(get().moves[i].san)
    }
    set({ 
      moveIndex: index,
      fen: chess.fen()
    })
  },

  nextMove: () => {
    const state = get()
    if (state.moveIndex < state.moves.length) {
      set({ moveIndex: state.moveIndex + 1 })
      get().goToMove(state.moveIndex + 1)
    }
  },

  prevMove: () => {
    const state = get()
    if (state.moveIndex > 0) {
      set({ moveIndex: state.moveIndex - 1 })
      get().goToMove(state.moveIndex - 1)
    }
  },

  setEval: (index, evalScore) => set(state => ({
    evals: state.evals.map((e, i) => i === index ? evalScore : e)
  })),

  setClassification: (index, classification) => set(state => ({
    classifications: state.classifications.map((c, i) => i === index ? classification : c)
  })),

  toggleVoiceMode: (mode) => set({ voiceMode: mode }),

  setSpeaking: (speaking) => set({ speaking })
}))

export default createGameStore

