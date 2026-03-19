import { useEffect, useRef, useCallback } from 'react'
import useGameStore from '../store/gameStore.js'
import { moveToNaturalLanguage, evalToSpeech } from '../utils/moveToSpeech.js'
import { classifyMoveByCentipawns } from '../utils/moveClassifier.js'
import { getCommentary } from '../utils/commentary.js'

const useVoiceBot = () => {
  const store = useGameStore()
  const synthesisRef = useRef(null)
  const queueRef = useRef([])
  const isInitializedRef = useRef(false)

  useEffect(() => {
    synthesisRef.current = window.speechSynthesis
    synthesisRef.current.cancel() // Clear any ongoing

    const voices = synthesisRef.current.getVoices()
    isInitializedRef.current = true

    return () => {
      synthesisRef.current?.cancel()
    }
  }, [])

  const speak = useCallback((text, options = {}) => {
    if (!isInitializedRef.current || !synthesisRef.current) return

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.95
    utterance.pitch = 0.9
    utterance.volume = options.volume || 1

    // Select best male voice
    const voices = synthesisRef.current.getVoices()
    const preferredVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('deep') || 
      voice.name.toLowerCase().includes('male') ||
      voice.lang.startsWith('en')
    ) || voices[0]

    utterance.voice = preferredVoice

    utterance.onend = () => {
      if (queueRef.current.length > 0) {
        const next = queueRef.current.shift()
        synthesisRef.current.speak(next)
      } else {
        store.setSpeaking(false)
      }
    }

    utterance.onerror = () => {
      store.setSpeaking(false)
    }

    store.setSpeaking(true)
    queueRef.current.push(utterance)
    
    if (queueRef.current.length === 1) {
      synthesisRef.current.speak(utterance)
    }
  }, [store])

  const explainCurrentMove = useCallback(() => {
    const { moves, moveIndex, evals } = store
    if (moveIndex === 0 || moveIndex > moves.length) return

    const move = moves[moveIndex - 1]
    const classification = store.classifications[moveIndex - 1] || 'unknown'
    const prevEval = evals[moveIndex - 1] || 0
    const currentEval = evals[moveIndex] || 0

    const moveText = moveToNaturalLanguage(move.san, move.flags.includes('c'))
    const comment = getCommentary(classification)
    const evalChange = evalToSpeech(currentEval - prevEval)

    const fullText = `${moveText}. ${comment} ${evalChange}`

    speak(fullText)
  }, [store, speak])

  const readGameSummary = useCallback(() => {
    const { accuracy } = store
    speak(`Game complete. White accuracy ${accuracy.white}%, Black ${accuracy.black}%. Analysis complete.`)
  }, [store, speak])

  useEffect(() => {
    if (store.voiceMode === 'auto' && store.moveIndex > 0) {
      // Debounce to avoid spam
      const timeout = setTimeout(explainCurrentMove, 500)
      return () => clearTimeout(timeout)
    }
  }, [store.moveIndex, store.voiceMode, explainCurrentMove])

  return {
    speak,
    explainCurrentMove,
    readGameSummary,
    voiceMode: store.voiceMode
  }
}

export default useVoiceBot

