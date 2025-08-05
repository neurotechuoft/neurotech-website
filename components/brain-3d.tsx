"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial, Environment } from "@react-three/drei"
import type * as THREE from "three"

function Brain3DModel({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      // Rotate based on time and mouse position
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2 + mousePosition.y * 0.0005
      meshRef.current.rotation.y += 0.01 + mousePosition.x * 0.00001
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.1

      // Subtle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group>
      {/* Main brain structure */}
      <Sphere
        ref={meshRef}
        args={[2, 64, 64]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color={hovered ? "#06b6d4" : "#8b5cf6"}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive={hovered ? "#06b6d4" : "#8b5cf6"}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </Sphere>

      {/* Neural connections - smaller spheres around the brain */}
      {Array.from({ length: 20 }).map((_, i) => (
        <NeuralNode key={i} index={i} />
      ))}

      {/* Synaptic particles */}
      <SynapticParticles />
    </group>
  )
}

function NeuralNode({ index }: { index: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [active, setActive] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      const radius = 3 + Math.sin(time * 0.5 + index) * 0.5
      const angle = (index / 20) * Math.PI * 2 + time * 0.2

      meshRef.current.position.x = Math.cos(angle) * radius
      meshRef.current.position.y = Math.sin(angle + time * 0.3) * radius * 0.5
      meshRef.current.position.z = Math.sin(angle) * radius

      // Random activation
      if (Math.random() < 0.005) {
        setActive(true)
        setTimeout(() => setActive(false), 1000)
      }
    }
  })

  return (
    <Sphere ref={meshRef} args={[0.05, 8, 8]}>
      <meshStandardMaterial
        color={active ? "#f59e0b" : "#06b6d4"}
        emissive={active ? "#f59e0b" : "#06b6d4"}
        emissiveIntensity={active ? 0.8 : 0.2}
      />
    </Sphere>
  )
}

function SynapticParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 100

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        const time = state.clock.elapsedTime

        // Create flowing particle effect
        positions[i3] += Math.sin(time + i * 0.1) * 0.01
        positions[i3 + 1] += Math.cos(time + i * 0.1) * 0.01
        positions[i3 + 2] += Math.sin(time * 0.5 + i * 0.05) * 0.01

        // Reset particles that go too far
        if (Math.abs(positions[i3]) > 10) positions[i3] = (Math.random() - 0.5) * 10
        if (Math.abs(positions[i3 + 1]) > 10) positions[i3 + 1] = (Math.random() - 0.5) * 10
        if (Math.abs(positions[i3 + 2]) > 10) positions[i3 + 2] = (Math.random() - 0.5) * 10
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#06b6d4" transparent opacity={0.6} />
    </points>
  )
}

export function Brain3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="w-full h-96 relative">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Environment preset="night" />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        <Brain3DModel mousePosition={mousePosition} />
      </Canvas>

      {/* Overlay text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="text-sm text-cyan-400 font-mono mb-2 opacity-80">NEURAL INTERFACE ACTIVE</div>
          <div className="text-xs text-gray-400 font-mono">Move mouse to interact</div>
        </div>
      </div>
    </div>
  )
}
