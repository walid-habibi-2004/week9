import SessionBrewCounter from './Add State to a Component/SessionBrewCounter.jsx'
import RoboticArmPanel from './Interactive Elements/RoboticArmPanel.jsx'
import OrderQueue from './dailly_challange/OrderQueue.jsx'
import './App.css'

function App() {
  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard__header">
        <h1>Admin dashboard</h1>
        <p className="admin-dashboard__subtitle">Session metrics</p>
      </header>
      <main className="admin-dashboard__main">
        <SessionBrewCounter />
        <RoboticArmPanel />
        <OrderQueue />
      </main>
    </div>
  )
}

export default App
