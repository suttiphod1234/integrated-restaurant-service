import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid } from '@react-three/drei'
import { VRButton, XR, Controllers, Interactive } from '@react-three/xr'
import Character from './Character'

function InteractiveBox({ position, color, onClick, label }) {
  const [hovered, setHover] = useState(false)
  
  return (
    <Interactive onSelect={onClick} onHover={() => setHover(true)} onBlur={() => setHover(false)}>
      <mesh 
        position={position}
        onClick={onClick}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? '#f5be2c' : color} />
      </mesh>
    </Interactive>
  )
}

function InteractiveTable({ position, color, onClick, label }) {
  const [hovered, setHover] = useState(false)
  const actualColor = hovered ? '#f5be2c' : color
  
  return (
    <Interactive onSelect={onClick} onHover={() => setHover(true)} onBlur={() => setHover(false)}>
      <group position={position} onClick={onClick} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
        {/* Table Top */}
        <mesh position={[0, 0.95, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 0.05, 32]} />
          <meshStandardMaterial color={actualColor} />
        </mesh>
        {/* Table Leg */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.9, 16]} />
          <meshStandardMaterial color={'#474747'} />
        </mesh>
        {/* Table Base */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
          <meshStandardMaterial color={'#474747'} />
        </mesh>
      </group>
    </Interactive>
  )
}

export default function RestaurantScene({ step, onAction }) {
  const handleDeskClick = () => {
    if (step === 'ARRIVED') {
      onAction()
    }
  }

  const handleTableClick = () => {
    if (step === 'GREETED' || step === 'SEATED') {
      onAction()
    }
  }

  // Determine character position and action based on step
  let characterTarget = [-2, 1, 1] // Near Desk
  let characterAction = 'IDLE'

  if (step === 'GREETED') {
    characterAction = 'GREET'
  } else if (step === 'SEATED') {
    characterTarget = [2, 1, 1] // Near Table
    characterAction = 'IDLE'
  } else if (step === 'ORDER_TAKEN') {
    characterTarget = [2, 1, 1] // Near Table
    characterAction = 'GREET' // Bowing as thank you
  }

  return (
    <div className="relative h-[500px] w-full bg-charcoal-900 border-t border-b border-gold-900/50">
      <VRButton className="absolute z-20 bottom-4 right-4 bg-gold-600 hover:bg-gold-500 text-white font-bold py-2 px-4 rounded shadow-lg transition-colors" />
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <XR>
          <Controllers />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* Reception Desk */}
        <InteractiveBox 
          position={[-2, 0.5, 0]} 
          color={'#a15f0a'} 
          onClick={handleDeskClick}
          label="Desk"
        />
        
        {/* Dining Table */}
        <InteractiveTable 
          position={[2, 0, 0]} 
          color={'#e5a510'} 
          onClick={handleTableClick}
          label="Table"
        />
        
        {/* Animated Character */}
        <Character action={characterAction} targetPosition={characterTarget} />
        
        <Grid
          infiniteGrid
          fadeDistance={30}
          fadeStrength={5}
          cellSize={0.6}
          cellThickness={1}
          cellColor={'#333333'}
          sectionSize={3}
          sectionThickness={1.5}
          sectionColor={'#e5a510'}
        />
        
        <OrbitControls />
        </XR>
      </Canvas>
      <div className="absolute bottom-2 left-2 right-2 text-center text-charcoal-400 text-sm py-2 bg-charcoal-950/80 backdrop-blur-sm rounded">
        {step === 'ARRIVED' && "Click the Dark Gold box (Desk) to greet guests."}
        {step === 'GREETED' && "Click the Dining Table to seat guests."}
        {step === 'SEATED' && "Click the Dining Table to take order."}
        {step === 'ORDER_TAKEN' && "Scenario complete! Great job."}
      </div>
    </div>
  )
}
