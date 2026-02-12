import { motion } from 'framer-motion'
import { Heart, Music, Sparkles, MapPin } from 'lucide-react'

const EVENTS = [
  { time: "2022-05-15", title: "First Glitch", desc: "We met under the neon lights of District 9.", icon: MapPin },
  { time: "2023-11-20", title: "System Sync", desc: "Our algorithms matched perfectly. 99.9% compatibility.", icon: Heart },
  { time: "2024-08-10", title: "The Proposal", desc: "A holographic ring, a promise of forever.", icon: Sparkles },
  { time: "2045-06-15", title: "The Union", desc: "Join us as we merge our source codes.", icon: Music }
]

const StoryTimeline = () => {
  return (
    <div className="py-20 px-8 max-w-4xl mx-auto relative">
      <h2 className="text-3xl md:text-5xl font-cyber text-center mb-16 text-cyber-primary">The Timeline</h2>

      <div className="relative border-l-2 border-cyber-secondary/30 ml-4 md:ml-10 pl-8 md:pl-12 space-y-12">
        {EVENTS.map((event, idx) => {
           const Icon = event.icon;
           return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="relative group"
            >
               {/* Timeline Node */}
              <div className="absolute -left-[45px] md:-left-[61px] w-10 h-10 rounded-full bg-cyber-bg border-2 border-cyber-primary flex items-center justify-center z-10 shadow-[0_0_10px_#00f3ff]">
                 <Icon size={18} className="text-cyber-primary" />
              </div>

              {/* Content Card */}
              <div className="p-6 rounded-xl border border-cyber-primary/20 bg-cyber-bg/50 backdrop-blur-md hover:border-cyber-primary hover:shadow-[0_0_20px_rgba(0,243,255,0.2)] transition-all duration-300">
                <span className="text-sm font-bold text-cyber-secondary tracking-widest block mb-2">{event.time}</span>
                <h3 className="text-2xl font-bold font-ethereal text-white mb-2">{event.title}</h3>
                <p className="text-gray-300 font-minimal leading-relaxed">{event.desc}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default StoryTimeline
