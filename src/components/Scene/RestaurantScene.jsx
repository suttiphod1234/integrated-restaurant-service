import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, Environment, ContactShadows, Float } from '@react-three/drei'
import { VRButton, XR, Controllers, Interactive } from '@react-three/xr'
import * as THREE from 'three'
import Character from './Character'

// Shared Luxury Materials
const goldMat = new THREE.MeshStandardMaterial({ color: '#e5a510', roughness: 0.2, metalness: 0.8 })
const darkMat = new THREE.MeshStandardMaterial({ color: '#1a1a1a', roughness: 0.7 })
const glassMat = new THREE.MeshPhysicalMaterial({ color: '#ffffff', transmission: 1, opacity: 1, metalness: 0, roughness: 0, ior: 1.5, thickness: 0.1 })
const plateMat = new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: 0.1, metalness: 0.1, clearcoat: 1 })

function ReceptionDesk({ position, onClick }) {
  const [hovered, setHover] = useState(false)
  const actualGold = hovered ? new THREE.MeshStandardMaterial({ color: '#ffcf40', roughness: 0.1, metalness: 0.9 }) : goldMat

  return (
    <Interactive onSelect={onClick} onHover={() => setHover(true)} onBlur={() => setHover(false)}>
      <group position={position} onClick={onClick} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
        {/* Desk Base */}
        <mesh position={[0, 0.4, 0]} material={darkMat}>
          <boxGeometry args={[2, 0.8, 0.6]} />
        </mesh>
        {/* Desk Countertop (Gold) */}
        <mesh position={[0, 0.825, 0]} material={actualGold}>
          <boxGeometry args={[2.1, 0.05, 0.7]} />
        </mesh>
        {/* Desk Privacy Glass */}
        <mesh position={[0, 1.1, 0.3]} material={glassMat}>
          <boxGeometry args={[2.1, 0.5, 0.05]} />
        </mesh>
      </group>
    </Interactive>
  )
}

function FineDiningTable({ position, onClick }) {
  const [hovered, setHover] = useState(false)
  const actualGold = hovered ? new THREE.MeshStandardMaterial({ color: '#ffcf40', roughness: 0.1, metalness: 0.9 }) : goldMat

  return (
    <Interactive onSelect={onClick} onHover={() => setHover(true)} onBlur={() => setHover(false)}>
      <group position={position} onClick={onClick} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
        {/* Table Base */}
        <mesh position={[0, 0.05, 0]} material={darkMat}>
          <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
        </mesh>
        {/* Table Leg */}
        <mesh position={[0, 0.4, 0]} material={actualGold}>
          <cylinderGeometry args={[0.05, 0.1, 0.7, 16]} />
        </mesh>
        {/* Tablecloth / Top */}
        <mesh position={[0, 0.775, 0]} material={plateMat}>
          <cylinderGeometry args={[0.8, 0.8, 0.05, 32]} />
        </mesh>
        
        {/* Place Setting 1 */}
        <group position={[-0.4, 0.81, 0]}>
          <mesh material={darkMat}><cylinderGeometry args={[0.2, 0.2, 0.02, 32]} /></mesh> {/* Plate */}
          <mesh position={[0.2, 0.1, -0.2]} material={glassMat}><cylinderGeometry args={[0.04, 0.04, 0.2, 16]} /></mesh> {/* Glass */}
        </group>
        
        {/* Place Setting 2 */}
        <group position={[0.4, 0.81, 0]} rotation={[0, Math.PI, 0]}>
          <mesh material={darkMat}><cylinderGeometry args={[0.2, 0.2, 0.02, 32]} /></mesh> {/* Plate */}
          <mesh position={[0.2, 0.1, -0.2]} material={glassMat}><cylinderGeometry args={[0.04, 0.04, 0.2, 16]} /></mesh> {/* Glass */}
        </group>
        
        {/* Centerpiece (Floating candle) */}
        <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
          <mesh position={[0, 0.9, 0]} material={actualGold}>
            <sphereGeometry args={[0.05, 16, 16]} />
          </mesh>
        </Float>
      </group>
    </Interactive>
  )
}

export default function RestaurantScene({ step, onAction }) {
  const handleDeskClick = () => {
    if (step === 'ARRIVED') onAction()
  }

  const handleTableClick = () => {
    if (step === 'GREETED' || step === 'SEATED') onAction()
  }

  let characterTarget = [-2, 0, 1] // Near Desk
  let characterAction = 'IDLE'

  if (step === 'GREETED') {
    characterAction = 'GREET'
  } else if (step === 'SEATED') {
    characterTarget = [2, 0, 1.2] // Near Table
    characterAction = 'IDLE'
  } else if (step === 'ORDER_TAKEN') {
    characterTarget = [2, 0, 1.2] // Near Table
    characterAction = 'GREET'
  }

  return (
    <div className="relative h-[500px] w-full bg-charcoal-900 border-t border-b border-gold-900/50 overflow-hidden">
      <VRButton className="absolute z-20 bottom-4 right-4 bg-gold-600 hover:bg-gold-500 text-white font-bold py-2 px-4 rounded shadow-lg transition-colors" />
      <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
        <XR>
          <Controllers />
          
          <color attach="background" args={['#0f0f0f']} />
          <ambientLight intensity={0.2} />
          <spotLight position={[0, 5, 0]} angle={0.5} penumbra={1} intensity={2} color="#ffebd6" castShadow />
          <pointLight position={[-3, 2, 0]} intensity={1} color="#f5be2c" />
          <pointLight position={[3, 2, 0]} intensity={1} color="#f5be2c" />
          
          {/* Environment for reflections */}
          <Environment preset="city" />

          {/* Contact Shadows for realism */}
          <ContactShadows resolution={1024} scale={10} blur={2} opacity={0.5} far={10} color="#000000" />
          
          {/* Reception Desk */}
          <ReceptionDesk position={[-2.5, 0, 0]} onClick={handleDeskClick} />
          
          {/* Dining Table */}
          <FineDiningTable position={[2.5, 0, 0]} onClick={handleTableClick} />
          
          {/* Animated Character */}
          <Character action={characterAction} targetPosition={characterTarget} />
          
          <Grid
            infiniteGrid
            fadeDistance={20}
            fadeStrength={5}
            cellSize={0.5}
            cellThickness={0.5}
            cellColor={'#333333'}
            sectionSize={2.5}
            sectionThickness={1}
            sectionColor={'#e5a510'}
          />
          
          <OrbitControls maxPolarAngle={Math.PI / 2 - 0.05} />
        </XR>
      </Canvas>
      <div className="absolute bottom-2 left-2 right-2 text-center text-charcoal-400 text-sm py-2 bg-charcoal-950/80 backdrop-blur-sm rounded z-10 pointer-events-none">
        {step === 'ARRIVED' && "Click the Reception Desk to greet guests."}
        {step === 'GREETED' && "Click the Dining Table to seat guests."}
        {step === 'SEATED' && "Click the Dining Table to take order."}
        {step === 'ORDER_TAKEN' && "Scenario complete! Great job."}
      </div>
    </div>
  )
}
