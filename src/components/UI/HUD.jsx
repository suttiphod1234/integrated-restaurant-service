import React from 'react'
import { motion } from 'framer-motion'

export default function HUD({ message, instruction, score, onReset }) {
  return (
    <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-start pointer-events-none">
      {/* Left side: Instructions */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-charcoal-900/80 backdrop-blur-md border border-gold-900/50 p-4 rounded-lg max-w-md pointer-events-auto"
      >
        <p className="text-gold-400 font-semibold mb-1">CURRENT TASK</p>
        <p className="text-white text-lg mb-2">{message}</p>
        <p className="text-gold-500 text-sm font-medium">👉 {instruction}</p>
      </motion.div>

      {/* Right side: Score & Reset */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-charcoal-900/80 backdrop-blur-md border border-gold-900/50 p-4 rounded-lg text-right pointer-events-auto"
      >
        <p className="text-gold-400 font-semibold mb-1">SCORE</p>
        <p className="text-white text-3xl font-bold">{score}</p>
        <button 
          onClick={onReset}
          className="mt-2 text-xs text-charcoal-400 hover:text-gold-500 transition-colors"
        >
          Reset Simulation
        </button>
      </motion.div>
    </div>
  )
}
