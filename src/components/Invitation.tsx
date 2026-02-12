import { motion } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'
import { useEffect } from 'react'
import StoryTimeline from './StoryTimeline'
import RSVP from './RSVP'
import AudioPlayer from './AudioPlayer'

const Invitation = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-cyber-bg text-white overflow-hidden relative">
      <AudioPlayer autoPlay={true} />

      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyber-primary rounded-full blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyber-secondary rounded-full blur-[120px] opacity-20 animate-pulse"></div>
        <div className="scanlines"></div>
      </div>

      <div className="relative z-10">
        {/* Header / Hero */}
        <header className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="space-y-6"
            >
                <p className="text-sm md:text-xl tracking-[0.5em] text-gray-400 uppercase font-minimal">You are invited to the union of</p>
                <h1 className="text-6xl md:text-9xl font-cyber font-bold glitch-text text-transparent bg-clip-text bg-gradient-to-r from-white via-cyber-primary to-white" data-text="ALEX & JORDAN">
                    ALEX & JORDAN
                </h1>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12 text-xl font-ethereal text-cyber-secondary">
                    <div className="flex items-center gap-2">
                        <Calendar size={24} />
                        <span>June 15, 2045</span>
                    </div>
                    <span className="hidden md:block">|</span>
                    <div className="flex items-center gap-2">
                        <MapPin size={24} />
                        <span>Neo-Tokyo Sky Garden</span>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
            >
                <p className="text-xs uppercase tracking-widest text-gray-500 font-minimal">Scroll to Initialize</p>
            </motion.div>
        </header>

        {/* Story Section */}
        <section className="relative z-10 bg-black/50 backdrop-blur-sm border-y border-cyber-primary/20">
            <StoryTimeline />
        </section>

        {/* RSVP Section */}
        <section className="relative z-10 min-h-screen flex items-center bg-gradient-to-b from-cyber-bg to-[#0a0a0a]">
            <RSVP />
        </section>

        <footer className="py-8 text-center text-gray-600 text-xs font-minimal uppercase tracking-widest border-t border-gray-900">
            Vow.AI // System Version 2.0 // Secure Connection Verified
        </footer>
      </div>
    </div>
  )
}

export default Invitation
