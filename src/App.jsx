import React, { useState } from 'react'
import Hero from './components/UI/Hero'
import Dashboard from './components/UI/Dashboard'
import RestaurantScene from './components/Scene/RestaurantScene'
import HUD from './components/UI/HUD'
import useSimulation from './hooks/useSimulation'

function App() {
  const [activeScenarioId, setActiveScenarioId] = useState(1)
  const { step, message, instruction, score, nextStep, reset } = useSimulation(activeScenarioId)

  const handleSelectScenario = (id) => {
    setActiveScenarioId(id)
  }

  return (
    <div className="min-h-screen bg-charcoal-950 flex flex-col">
      <Hero />
      
      <div className="relative">
        <HUD 
          message={message} 
          instruction={instruction} 
          score={score} 
          onReset={reset} 
        />
        <RestaurantScene step={step} onAction={nextStep} />
      </div>

      <Dashboard 
        onSelectScenario={handleSelectScenario} 
        activeScenarioId={activeScenarioId} 
      />
      
      <footer className="bg-charcoal-950 text-charcoal-500 text-center py-6 border-t border-gold-900/20">
        <p>&copy; 2026 Integrated Restaurant Service XR Simulation. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
