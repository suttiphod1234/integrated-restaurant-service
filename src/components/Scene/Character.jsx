import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Capsule } from '@react-three/drei'
import * as THREE from 'three'

export default function Character({ action, targetPosition }) {
  const meshRef = useRef()
  const speed = 0.03
  const target = useRef(new THREE.Vector3(-2, 1, 0))

  useEffect(() => {
    if (targetPosition) {
      target.current.set(...targetPosition)
    }
  }, [targetPosition])

  useFrame((state, delta) => {
    if (!meshRef.current) return

    // 1. Movement
    const distance = meshRef.current.position.distanceTo(target.current)
    
    if (distance > 0.1) {
      // Move towards target
      const direction = target.current.clone().sub(meshRef.current.position).normalize()
      meshRef.current.position.add(direction.multiplyScalar(speed))
      
      // Rotate towards target
      const angle = Math.atan2(direction.x, direction.z)
      meshRef.current.rotation.y = angle
      
      // Walking animation (bobbing)
      const time = state.clock.getElapsedTime()
      meshRef.current.position.y = 1 + Math.abs(Math.sin(time * 10)) * 0.05
    } else {
      // Arrived at target
      const time = state.clock.getElapsedTime()
      
      if (action === 'GREET') {
        // Tilt forward and back (bowing)
        meshRef.current.rotation.x = Math.abs(Math.sin(time * 4)) * 0.3
        meshRef.current.position.y = 1
      } else {
        // Breathe/Idle (slight floating)
        meshRef.current.position.y = 1 + Math.sin(time * 2) * 0.02
        meshRef.current.rotation.x = 0
      }
    }
  })

  return (
    <Capsule 
      ref={meshRef} 
      args={[0.3, 1, 4, 16]} 
      position={[-2, 1, 0]} // Initial position
    >
      <meshStandardMaterial color={'#fdf6d6'} /> {/* Cream/Gold color for staff */}
    </Capsule>
  )
}
