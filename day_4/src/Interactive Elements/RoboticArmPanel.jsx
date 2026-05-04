import { useState } from 'react'
import './RoboticArmPanel.css'

/**
 * Robotic arm — maintenance mode (interactive elements / lesson notes)
 *
 * State: maintenanceModeOn (boolean)
 *   - Starts false → maintenance OFF, arm accepts new orders.
 *
 * When the user clicks the toggle:
 *   - maintenanceModeOn flips to the opposite value.
 *   - If it becomes true: arm rejects new orders (Place order disabled + message).
 *   - If it becomes false: arm accepts orders again.
 *
 * Visual when OFF → ON:
 *   - Panel gets an orange maintenance background and border accent.
 *   - Status text switches to “Maintenance mode — new orders paused”.
 *   - Primary “Place order” control is disabled and styled as inactive.
 */
export default function RoboticArmPanel() {
  const [maintenanceModeOn, setMaintenanceModeOn] = useState(false)

  function onToggleMaintenance() {
    setMaintenanceModeOn((previous) => !previous)
  }

  const acceptsOrders = !maintenanceModeOn

  return (
    <article
      className={`robotic-arm-panel ${maintenanceModeOn ? 'robotic-arm-panel--maintenance' : ''}`}
      aria-labelledby="arm-panel-title"
    >
      <div className="robotic-arm-panel__header">
        <h2 id="arm-panel-title">Robotic arm</h2>
        <div className="robotic-arm-panel__toggle-row">
          <span className="robotic-arm-panel__toggle-label" id="maintenance-label">
            Maintenance mode
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={maintenanceModeOn}
            aria-labelledby="maintenance-label"
            className="robotic-arm-panel__switch"
            onClick={onToggleMaintenance}
          >
            <span className="robotic-arm-panel__switch-thumb" />
            <span className="visually-hidden">
              {maintenanceModeOn ? 'On' : 'Off'}
            </span>
          </button>
        </div>
      </div>

      <p
        className="robotic-arm-panel__status"
        role="status"
        aria-live="polite"
      >
        {maintenanceModeOn
          ? 'Maintenance mode — arm will not accept new orders.'
          : 'Arm is running — new orders accepted.'}
      </p>

      <button
        type="button"
        className="robotic-arm-panel__order"
        disabled={!acceptsOrders}
        title={
          maintenanceModeOn
            ? 'Turn off maintenance mode to place orders'
            : undefined
        }
      >
        Place order
      </button>
    </article>
  )
}
