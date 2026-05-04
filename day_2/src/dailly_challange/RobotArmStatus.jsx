export default function RobotArmStatus({ status }) {
  const ready = status === 'ready'
  return (
    <div
      className={`coffee-robot${ready ? ' coffee-robot--ready' : ' coffee-robot--busy'}`}
      role="status"
      aria-live="polite"
    >
      <span className="coffee-robot__dot" aria-hidden="true" />
      <span className="coffee-robot__label">
        Robot arm: <strong>{ready ? 'Ready' : 'Busy'}</strong>
      </span>
    </div>
  )
}
