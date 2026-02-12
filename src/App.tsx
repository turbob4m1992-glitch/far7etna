import { useState } from 'react'
import Hero3D from './components/Hero3D'
import Invitation from './components/Invitation'

function App() {
  const [unlocked, setUnlocked] = useState(false)

  return (
    <div className="w-full min-h-screen bg-black text-white overflow-hidden relative">
      {!unlocked ? (
        <Hero3D onUnlock={() => setUnlocked(true)} />
      ) : (
        <Invitation />
      )}
    </div>
  )
}

export default App
