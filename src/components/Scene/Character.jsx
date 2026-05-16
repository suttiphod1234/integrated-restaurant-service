import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Character({ action, targetPosition }) {
  const groupRef = useRef()
  const speed = 0.03
  const target = useRef(new THREE.Vector3(-2, 0, 1))

  useEffect(() => {
    if (targetPosition) {
      // Keep Y at 0 since the character origin is at its feet
      target.current.set(targetPosition[0], 0, targetPosition[2])
    }
  }, [targetPosition])

  useFrame((state) => {
    if (!groupRef.current) return

    // 1. Movement
    const distance = groupRef.current.position.distanceTo(target.current)
    
    if (distance > 0.1) {
      // Move towards target
      const direction = target.current.clone().sub(groupRef.current.position).normalize()
      groupRef.current.position.add(direction.multiplyScalar(speed))
      
      // Rotate towards target
      const angle = Math.atan2(direction.x, direction.z)
      groupRef.current.rotation.y = angle
      
      // Walking animation (bobbing)
      const time = state.clock.getElapsedTime()
      groupRef.current.position.y = Math.abs(Math.sin(time * 10)) * 0.05
    } else {
      // Arrived at target
      const time = state.clock.getElapsedTime()
      
      if (action === 'GREET') {
        // Tilt forward and back (bowing)
        groupRef.current.rotation.x = Math.abs(Math.sin(time * 4)) * 0.3
        groupRef.current.position.y = 0
      } else {
        // Breathe/Idle (slight floating)
        groupRef.current.position.y = Math.sin(time * 2) * 0.01
        groupRef.current.rotation.x = 0
      }
    }
  })

  // Material definitions
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: '#1a1a1a', roughness: 0.2, metalness: 0.1 })
  const goldMaterial = new THREE.MeshStandardMaterial({ color: '#e5a510', roughness: 0.1, metalness: 0.8 })
  const headMaterial = new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: 0, metalness: 0.1, clearcoat: 1 })

  return (
    <group ref={groupRef} position={[-2, 0, 1]}>
      {/* Body */}
      <mesh position={[0, 0.7, 0]} material={bodyMaterial}>
        <cylinderGeometry args={[0.2, 0.15, 0.8, 32]} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 1.3, 0]} material={headMaterial}>
        <sphereGeometry args={[0.15, 32, 32]} />
      </mesh>
      
      {/* Legs (Base) */}
      <mesh position={[0, 0.15, 0]} material={bodyMaterial}>
        <cylinderGeometry args={[0.15, 0.15, 0.3, 32]} />
      </mesh>

      {/* Gold Bowtie Center */}
      <mesh position={[0, 1.05, 0.16]} material={goldMaterial}>
        <sphereGeometry args={[0.02, 16, 16]} />
      </mesh>
      {/* Gold Bowtie Left */}
      <mesh position={[-0.04, 1.05, 0.15]} rotation={[0, 0, Math.PI / 2]} material={goldMaterial}>
        <coneGeometry args={[0.03, 0.06, 16]} />
      </mesh>
      {/* Gold Bowtie Right */}
      <mesh position={[0.04, 1.05, 0.15]} rotation={[0, 0, -Math.PI / 2]} material={goldMaterial}>
        <coneGeometry args={[0.03, 0.06, 16]} />
      </mesh>
    </group>
  )
}
