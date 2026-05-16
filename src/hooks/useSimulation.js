import { useState, useEffect } from 'react'

const scenarios = {
  1: [ // Walk-in Rush
    { id: 'ARRIVED', message: 'Guests have arrived at the reception. Greet them!', instruction: 'Click the desk to greet guests.' },
    { id: 'GREETED', message: 'You greeted the guests. Now escort them to a table.', instruction: 'Click the table to seat guests.' },
    { id: 'SEATED', message: 'Guests are seated. Take their order.', instruction: 'Click the table to take order.' },
    { id: 'ORDER_TAKEN', message: 'Order taken successfully! Scenario complete.', instruction: 'Great job!' },
  ],
  2: [ // Food Allergy
    { id: 'ARRIVED', message: 'Customer asks about allergens in the dish.', instruction: 'Click the desk to consult with kitchen.' },
    { id: 'CHECKED', message: 'Ingredients checked. Explain to the customer.', instruction: 'Click the table to explain.' },
    { id: 'COMPLETE', message: 'Customer is satisfied. Scenario complete.', instruction: 'Great job!' },
  ],
  3: [ // Complaint Handling
    { id: 'ARRIVED', message: 'Customer complains about food delay.', instruction: 'Click the table to apologize.' },
    { id: 'APOLOGIZED', message: 'You apologized. Offer a solution (e.g., free drink).', instruction: 'Click the desk to fetch solution.' },
    { id: 'COMPLETE', message: 'Complaint resolved. Scenario complete.', instruction: 'Great job!' },
  ],
  4: [ // Split Bill
    { id: 'ARRIVED', message: 'Group requests separate payment.', instruction: 'Click the desk (serving as POS) to start split bill.' },
    { id: 'COMPLETE', message: 'Bill split and processed. Scenario complete.', instruction: 'Great job!' },
  ],
  5: [ // VIP Dining
    { id: 'ARRIVED', message: 'VIP Guest arrives. Deliver premium hospitality.', instruction: 'Click the desk to offer formal greeting.' },
    { id: 'GREETED', message: 'VIP seated. Offer wine recommendation.', instruction: 'Click the table to recommend wine.' },
    { id: 'COMPLETE', message: 'VIP satisfied. Scenario complete.', instruction: 'Great job!' },
  ]
}

export default function useSimulation(scenarioId = 1) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [score, setScore] = useState(0)
  
  const currentScenario = scenarios[scenarioId] || scenarios[1]
  const currentStep = currentScenario[currentStepIndex]

  // Reset step when scenario changes
  useEffect(() => {
    setCurrentStepIndex(0)
    setScore(0)
  }, [scenarioId])

  const nextStep = () => {
    if (currentStepIndex < currentScenario.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
      setScore(score + 20)
    }
  }

  const reset = () => {
    setCurrentStepIndex(0)
    setScore(0)
  }

  return {
    step: currentStep.id,
    message: currentStep.message,
    instruction: currentStep.instruction,
    score,
    nextStep,
    reset,
    isComplete: currentStepIndex === currentScenario.length - 1
  }
}
