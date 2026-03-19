// PGN encode/decode for URL sharing
export const encodePGNForShare = (pgn) => {
  return btoa(unescape(encodeURIComponent(pgn)))
}

export const decodePGNFromShare = (encoded) => {
  try {
    return decodeURIComponent(escape(atob(encoded)))
  } catch {
    return ''
  }
}

// Load from URL hash on mount
export const loadSharedPGN = () => {
  const hash = window.location.hash.slice(1)
  if (hash) {
    return decodePGNFromShare(hash)
  }
  return ''
}

// Update URL hash
export const updateShareURL = (pgn) => {
  const encoded = encodePGNForShare(pgn)
  window.history.replaceState(null, null, `#${encoded}`)
}

