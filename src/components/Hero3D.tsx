import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Text, Torus, Sparkles } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'

interface Hero3DProps {
  onUnlock: () => void;
}

const HolographicRing = ({ onClick }: { onClick: () => void }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHover] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <group>
      <Torus
        ref={meshRef}
        args={[2.5, 0.1, 32, 100]} // radius, tube, radialSegments, tubularSegments
        onClick={onClick}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <meshStandardMaterial
          color={hovered ? "#ffe600" : "#00f3ff"}
          emissive={hovered ? "#ffe600" : "#00f3ff"}
          emissiveIntensity={hovered ? 2 : 0.5}
          roughness={0.1}
          metalness={0.8}
          wireframe={true}
        />
      </Torus>

      {/* Inner Glowing Core */}
      <Torus
        args={[2.3, 0.05, 16, 50]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial color="#bc13fe" transparent opacity={0.5} wireframe />
      </Torus>

       <Text
        position={[0, 0, 0]}
        fontSize={0.5}
        font="https://fonts.gstatic.com/s/orbitron/v25/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nygyU.woff"
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {hovered ? "CLICK TO OPEN" : "LOCKED"}
      </Text>
    </group>
  )
}

const WarpTunnel = () => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.05
      // Move particles towards camera to simulate speed
    }
  })

  return (
    <group ref={groupRef}>
      <Sparkles count={500} scale={15} size={4} speed={2} opacity={0.8} color="#00f3ff" />
      <Sparkles count={300} scale={10} size={2} speed={4} opacity={0.5} color="#bc13fe" />
    </group>
  )
}

const Hero3D = ({ onUnlock }: Hero3DProps) => {
  const [exploding, setExploding] = useState(false)

  const handleClick = () => {
    setExploding(true)
    setTimeout(() => {
        onUnlock()
    }, 1500) // Duration of the "warp" effect
  }

  return (
    <div className="w-full h-screen bg-black relative">
       {/* Overlay Text */}
       <div className="absolute top-10 left-0 w-full text-center z-10 pointer-events-auto cursor-pointer" onClick={handleClick}>
          <h1 className="text-4xl md:text-6xl font-cyber text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary animate-pulse">
            VOW.AI
          </h1>
          <p className="text-white/50 tracking-[0.5em] text-sm mt-2 font-minimal">SYSTEM LOCKED</p>
       </div>

      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {exploding ? (
            <WarpTunnel />
        ) : (
            <HolographicRing onClick={handleClick} />
        )}

        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
      </Canvas>

      {/* Warp overlay for transition */}
      {exploding && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white z-50 pointer-events-none"
        />
      )}
    </div>
  )
}

export default Hero3D
