import { useState } from 'react'
import UserWelcome from './UserWelcome.jsx'
import DrinkMenu from './DrinkMenu.jsx'
import RobotArmStatus from './RobotArmStatus.jsx'
import BrewCoffeeButton from './BrewCoffeeButton.jsx'
import ComponentTreeAnswer from './ComponentTreeAnswer.jsx'
import './CoffeeOrderScreen.css'

const DRINKS = ['Espresso', 'Americano', 'Latte']

export default function CoffeeOrderScreen() {
  const [userName] = useState('Alex')
  const [selectedDrink, setSelectedDrink] = useState(DRINKS[0])
  const [armStatus, setArmStatus] = useState('ready')

  function handleBrew() {
    if (armStatus !== 'ready' || !selectedDrink) return
    setArmStatus('busy')
    window.setTimeout(() => {
      setArmStatus('ready')
    }, 2200)
  }

  const brewDisabled = armStatus === 'busy' || !selectedDrink

  return (
    <div className="coffee-order">
      <div className="coffee-order__phone">
        <main className="coffee-order__screen">
          <UserWelcome userName={userName} />
          <DrinkMenu
            drinks={DRINKS}
            selectedDrink={selectedDrink}
            onSelectDrink={setSelectedDrink}
          />
          <RobotArmStatus status={armStatus} />
          <BrewCoffeeButton
            onBrew={handleBrew}
            disabled={brewDisabled}
            selectedDrink={selectedDrink}
          />
        </main>
      </div>
      <ComponentTreeAnswer />
    </div>
  )
}
