// Stockfish Web Worker
let stockfish = null

self.onmessage = function(event) {
  const message = event.data

  if (message.type === 'init') {
    importScripts('https://cdn.jsdelivr.net/npm/stockfish.wasm@latest/stockfish.js')
    stockfish = new Worker('https://cdn.jsdelivr.net/npm/stockfish.wasm@latest/stockfish.wasm')
    
    stockfish.onmessage = function(e) {
      const msg = e.data
      self.postMessage({ type: 'response', data: msg })
    }
    
    stockfish.postMessage('uci')
    stockfish.postMessage('isready')
    self.postMessage({ type: 'ready' })
  } else if (stockfish && message.command) {
    stockfish.postMessage(message.command)
  }
}

