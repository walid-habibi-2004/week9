import { DataDisplay } from './DataDisplay'

/**
 * Parent: holds the “source of truth” for what the UI should show right now.
 * It does not embed two different bespoke components — it renders the same
 * `DataDisplay` twice and passes different props down (waterfall).
 */
export function RobotArmStatus() {
  const armTemperatureC = 45
  const currentTask = 'Moving to cup'

  return (
    <section className="robot-arm-status" aria-labelledby="robot-arm-status-heading">
      <h2 id="robot-arm-status-heading">Robot arm status</h2>
      {/*
        Waterfall: parent → child via props.
        - First DataDisplay gets the temperature (formatted here in the parent).
        - Second DataDisplay gets the task string.
      */}
      <div className="robot-arm-status__grid">
        <DataDisplay label="Temperature" value={`${armTemperatureC}°C`} />
        <DataDisplay label="Current task" value={currentTask} />
      </div>
    </section>
  )
}
