export const classifyMoveByCentipawns = (cpLoss, isBlunderThreshold = 200) => {
  // cpLoss in centipawns (positive loss for player)
  if (cpLoss === 0) return 'best'
  if (cpLoss <= 50) return 'excellent'
  if (cpLoss <= 110) return 'good'
  if (cpLoss <= 240) return 'inaccuracy'
  if (cpLoss <= 540) return 'mistake'
  return 'blunder'
}

export const getColorAccuracy = (classifications, playerColor) => {
  const playerMoves = classifications.filter((cls, i) => {
    const moveNumber = Math.floor(i / 2)
    return playerColor === 'white' ? i % 2 === 0 : i % 2 === 1
  })
  
  const scores = {
    best: 1.0,
    excellent: 0.95,
    good: 0.85,
    inaccuracy: 0.65,
    mistake: 0.35,
    blunder: 0.0
  }

  const total = playerMoves.reduce((sum, cls) => sum + (scores[cls] || 0), 0)
  return Math.round((total / playerMoves.length) * 100)
}

