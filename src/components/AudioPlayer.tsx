import { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

const AudioPlayer = ({ autoPlay }: { autoPlay: boolean }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log("Auto-play blocked", e))
    }
  }, [autoPlay])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <audio ref={audioRef} loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
      <button
        onClick={togglePlay}
        className="p-4 rounded-full bg-cyber-bg border border-cyber-primary text-cyber-primary hover:bg-cyber-primary hover:text-black transition-all shadow-[0_0_20px_rgba(0,243,255,0.3)]"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
    </div>
  )
}

export default AudioPlayer
