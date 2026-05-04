import { useState } from 'react'
import './SessionBrewCounter.css'

/**
 * SessionBrewCounter — state design (lesson notes)
 *
 * State variable:     brewCount
 * Starting value:     0  (no coffees counted yet this session)
 * What increases it:  onBrewComplete — runs when a brew is finished
 *                      (here: admin clicks “Record brew”; in production this
 *                      could be wired to hardware or a websocket event)
 */
export default function SessionBrewCounter() {
  const [brewCount, setBrewCount] = useState(0)

  function onBrewComplete() {
    setBrewCount((previous) => previous + 1)
  }

  return (
    <article className="session-brew-counter" aria-labelledby="brew-counter-title">
      <h2 id="brew-counter-title">Session brews</h2>
      <p className="session-brew-counter__meta">
        Coffees made since this dashboard was opened.
      </p>
      <p className="session-brew-counter__count" aria-live="polite">
        <span className="session-brew-counter__value">{brewCount}</span>
        <span className="session-brew-counter__label">
          {brewCount === 1 ? 'brew' : 'brews'}
        </span>
      </p>
      <button type="button" className="session-brew-counter__action" onClick={onBrewComplete}>
        Record brew
      </button>
    </article>
  )
}
