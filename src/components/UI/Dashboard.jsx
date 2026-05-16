import React from 'react'
import { motion } from 'framer-motion'

const scenarios = [
  { id: 1, title: 'Episode 1: Walk-in Rush', description: 'Handle multiple customers arriving simultaneously.' },
  { id: 2, title: 'Episode 2: Food Allergy', description: 'Customer asks about allergens. Check ingredients.' },
  { id: 3, title: 'Episode 3: Complaint Handling', description: 'Manage a food delay complaint professionally.' },
  { id: 4, title: 'Episode 4: Split Bill', description: 'Process separate payments for a group.' },
  { id: 5, title: 'Episode 5: VIP Dining', description: 'Deliver premium hospitality standards.' },
]

export default function Dashboard({ onSelectScenario, activeScenarioId }) {
  return (
    <div className="bg-charcoal-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gold-500 mb-8 text-center">Training Scenarios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario) => (
            <motion.div
              key={scenario.id}
              whileHover={{ scale: 1.03 }}
              onClick={() => onSelectScenario(scenario.id)}
              className={`bg-charcoal-800 border ${activeScenarioId === scenario.id ? 'border-gold-500' : 'border-gold-900/50'} rounded-lg p-6 hover:border-gold-500 transition-colors cursor-pointer`}
            >
              <h3 className="text-xl font-semibold text-gold-400 mb-2">{scenario.title}</h3>
              <p className="text-charcoal-300">{scenario.description}</p>
              <div className="mt-4 flex justify-end">
                <span className="text-gold-500 text-sm font-medium hover:text-gold-400">
                  {activeScenarioId === scenario.id ? 'Active' : 'Launch →'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
