import React from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <div className="relative bg-charcoal-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-700 mb-6">
            Integrated Restaurant Service
          </h1>
          <p className="text-xl md:text-2xl text-charcoal-300 mb-8 max-w-3xl mx-auto">
            Professional 3D & AR Hospitality Training Simulation. Experience real-world scenarios in a luxury environment.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold px-8 py-3 rounded-md hover:from-gold-400 hover:to-gold-500 transition-all shadow-lg shadow-gold-500/20">
              Start Simulation
            </button>
            <button className="border border-gold-500 text-gold-500 font-semibold px-8 py-3 rounded-md hover:bg-gold-500/10 transition-all">
              Launch AR
            </button>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-charcoal-900 to-transparent"></div>
    </div>
  )
}
