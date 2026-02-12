import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { CheckCircle } from 'lucide-react'

const RSVP = () => {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({ name: '', attending: '', diet: '' })
  const [inputValue, setInputValue] = useState('')
  const [isGenerated, setIsGenerated] = useState(false)

  const questions = [
    {
      key: 'name',
      question: "Identify yourself, traveler.",
      type: 'text',
      placeholder: "Enter your name..."
    },
    {
      key: 'attending',
      question: "Will you join the simulation?",
      type: 'choice',
      options: ["Yes, initiated.", "No, disconnected."]
    },
    {
      key: 'diet',
      question: "Fuel requirements?",
      type: 'text',
      placeholder: "Vegetarian, Vegan, Omni..."
    }
  ]

  const handleNext = (value: string) => {
    const currentKey = questions[step].key
    setFormData(prev => ({ ...prev, [currentKey]: value }))
    setInputValue('')
    setStep(prev => prev + 1)
  }

  const generatePass = () => {
    setIsGenerated(true)
  }

  return (
    <div className="py-20 px-8 max-w-2xl mx-auto min-h-[600px] flex flex-col items-center justify-center relative z-10">
      <h2 className="text-4xl md:text-6xl font-cyber mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyber-secondary to-cyber-primary text-center">RSVP Uplink</h2>

      <div className="w-full bg-black/80 border border-cyber-primary/50 p-8 md:p-12 rounded-2xl shadow-[0_0_50px_rgba(188,19,254,0.1)] backdrop-blur-md relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-primary to-transparent opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-cyber-secondary opacity-30"></div>

        <AnimatePresence mode="wait">
          {!isGenerated ? (
             step < questions.length ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-8"
              >
                <h3 className="text-2xl md:text-3xl font-ethereal text-white text-center">{questions[step].question}</h3>

                {questions[step].type === 'text' ? (
                   <div className="w-full max-w-sm relative group">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full bg-transparent border-b-2 border-gray-700 text-white text-center text-xl py-4 focus:outline-none focus:border-cyber-primary placeholder-gray-600 font-minimal transition-colors"
                        placeholder={questions[step].placeholder}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && inputValue.trim()) {
                                handleNext(inputValue)
                            }
                        }}
                    />
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cyber-primary scale-x-0 group-focus-within:scale-x-100 transition-transform origin-center"></div>
                    <button
                        className="mt-6 w-full py-2 text-xs uppercase tracking-[0.2em] text-cyber-secondary hover:text-white transition-colors disabled:opacity-50"
                        onClick={() => inputValue.trim() && handleNext(inputValue)}
                        disabled={!inputValue.trim()}
                    >
                        Press Enter
                    </button>
                   </div>
                ) : (
                  <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
                    {questions[step].options?.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleNext(opt)}
                        className="px-8 py-4 border border-cyber-primary/50 text-cyber-primary hover:bg-cyber-primary hover:text-black transition-all font-bold font-cyber rounded hover:shadow-[0_0_20px_#00f3ff]"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                <div className="mt-8 flex gap-2">
                    {questions.map((_, idx) => (
                        <div key={idx} className={`h-1 w-8 rounded-full transition-colors ${idx === step ? 'bg-cyber-primary' : idx < step ? 'bg-cyber-secondary' : 'bg-gray-800'}`}></div>
                    ))}
                </div>
              </motion.div>
            ) : (
                <motion.div
                    key="confirm"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-8"
                >
                    <h3 className="text-3xl font-bold font-cyber text-white mb-4">Confirm Data</h3>
                    <div className="w-full bg-white/5 p-6 rounded border border-white/10 text-left space-y-4 font-minimal">
                        <div className="flex justify-between border-b border-white/10 pb-2">
                            <span className="text-gray-400">IDENTITY</span>
                            <span className="text-cyber-primary font-bold">{formData.name}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-2">
                            <span className="text-gray-400">STATUS</span>
                            <span className="text-cyber-primary font-bold">{formData.attending}</span>
                        </div>
                         <div className="flex justify-between border-b border-white/10 pb-2">
                            <span className="text-gray-400">FUEL</span>
                            <span className="text-cyber-primary font-bold">{formData.diet}</span>
                        </div>
                    </div>
                    <button
                        onClick={generatePass}
                        className="px-10 py-4 bg-gradient-to-r from-cyber-secondary to-purple-600 text-white font-bold font-cyber rounded hover:scale-105 transition-transform shadow-[0_0_30px_rgba(188,19,254,0.4)]"
                    >
                        GENERATE PASS
                    </button>
                </motion.div>
            )
          ) : (
            <motion.div
                key="pass"
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                className="flex flex-col items-center py-8"
            >
                <div className="bg-white p-8 rounded-2xl shadow-[0_0_60px_rgba(255,255,255,0.2)] relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyber-primary via-cyber-secondary to-cyber-primary animate-gradient-x"></div>

                    <QRCodeSVG
                        value={JSON.stringify(formData)}
                        size={200}
                        fgColor="#000000"
                        bgColor="#ffffff"
                        level="H"
                    />

                    <div className="mt-6 text-center">
                        <p className="text-black font-bold font-cyber tracking-wider text-xl mb-1">{formData.name.toUpperCase()}</p>
                        <p className="text-gray-400 text-xs uppercase tracking-[0.4em] font-minimal">Authorized Personnel</p>
                    </div>

                    <div className="absolute top-4 right-4">
                        <CheckCircle className="text-green-500 fill-white" size={32} />
                    </div>

                    {/* Holographic sheen effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none transform -skew-x-12 translate-x-full group-hover:animate-shine"></div>
                </div>

                <p className="mt-8 text-cyber-primary animate-pulse font-minimal uppercase tracking-widest text-xs flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                    System Access Granted
                </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default RSVP
