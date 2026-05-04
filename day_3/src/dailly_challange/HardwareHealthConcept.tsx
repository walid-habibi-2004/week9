/**
 * Conceptual structure (Day 2 style): who wraps whom, which props go where.
 */
export function HardwareHealthConcept() {
  const tree = `<Card title="Hardware Health">
  <StatusRow deviceName="Dobot Arm" status="Online" indicatorColor="green" />
  <StatusRow deviceName="Tuya Fingerbot" status="Asleep" indicatorColor="yellow" />
  <StatusRow deviceName="Coffee Machine" status="Offline" indicatorColor="red" />
</Card>`

  return (
    <section className="hardware-health-concept" aria-labelledby="hw-concept-heading">
      <h3 id="hw-concept-heading" className="hardware-health-concept__title">
        Conceptual structure (Card + StatusRow only)
      </h3>
      <pre className="hardware-health-concept__pre">{tree}</pre>
    </section>
  )
}
