import { Card } from './Card'
import { StatusRow } from './StatusRow'
import './dailly_challange.css'

/**
 * System Health Panel — composed only of `Card` + `StatusRow`.
 * (Concept tree lives in `HardwareHealthConcept`.)
 */
export function SystemHealthPanel() {
  return (
    <div className="system-health-panel">
      <Card title="Hardware Health">
        <StatusRow
          deviceName="Dobot Arm"
          status="Online"
          indicatorColor="green"
        />
        <StatusRow
          deviceName="Tuya Fingerbot"
          status="Asleep"
          indicatorColor="yellow"
        />
        <StatusRow
          deviceName="Coffee Machine"
          status="Offline"
          indicatorColor="red"
        />
      </Card>
    </div>
  )
}
