import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { DailyChallengeShell } from './DAILY_CHALLENGE/dailyChallenge'
import { WeatherApp } from './MINI_PROJET/WeatherApp'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/daily-challenge" element={<DailyChallengeShell />} />
        <Route path="/*" element={<WeatherApp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
