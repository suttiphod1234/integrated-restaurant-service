import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid } from '@react-three/drei'
import Character from './Character'

function InteractiveBox({ position, color, onClick, label }) {
  const [hovered, setHover] = useState(false)
  
  return (
    <mesh 
      position={position}
      onClick={onClick}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? '#f5be2c' : color} />
    </mesh>
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
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
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
        <InteractiveBox 
          position={[2, 0.5, 0]} 
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
      </Canvas>
      <div className="absolute bottom-2 left-2 right-2 text-center text-charcoal-400 text-sm py-2 bg-charcoal-950/80 backdrop-blur-sm rounded">
        {step === 'ARRIVED' && "Click the Dark Gold box (Desk) to greet guests."}
        {step === 'GREETED' && "Click the Light Gold box (Table) to seat guests."}
        {step === 'SEATED' && "Click the Light Gold box (Table) to take order."}
        {step === 'ORDER_TAKEN' && "Scenario complete! Great job."}
      </div>
    </div>
  )
}
