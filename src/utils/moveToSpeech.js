export const moveToNaturalLanguage = (san, isCheck = false, isCheckmate = false, isPromotion = false) => {
  const pieceMap = {
    'K': 'King',
    'Q': 'Queen',
    'R': 'Rook',
    'B': 'Bishop',
    'N': 'Knight',
    'P': 'Pawn' // default
  }

  let piece = pieceMap[san[0]] || 'Pawn'
  if (san.startsWith('O-O')) return 'castles kingside'
  if (san.startsWith('O-O-O')) return 'castles queenside'

  const isCapture = san.includes('x')
  const promotion = san.endsWith('=Q') ? ' promotes to Queen' : ''
  const check = isCheck ? ' check' : ''
  const mate = isCheckmate ? ' checkmate' : ''

  if (san.includes('=')) {
    return `${piece} ${san.slice(1, -2)}${promotion}${check}${mate}`
  }

  if (isCapture) {
    return `${piece} takes ${san.slice(san.indexOf('x') + 1)}${check}${mate}`
  }

  return `${piece} ${san.toLowerCase()}${check}${mate}`
}

export const evalToSpeech = (evalScore) => {
  const abs = Math.abs(evalScore)
  const sign = evalScore > 0 ? 'White ' : 'Black '
  
  if (abs > 10) {
    const mateIn = Math.round(abs)
    return `${sign}wins with mate in ${mateIn}`
  }
  
  if (abs > 2) {
    return `${sign}has a significant advantage of about ${Math.round(abs)} pawns`
  }
  
  if (abs > 0.5) {
    return `${sign}has a clear advantage`
  }
  
  return 'Position is roughly equal'
}

