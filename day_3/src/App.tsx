import { useMemo, useState, type CSSProperties } from 'react'
import { HardwareHealthConcept, SystemHealthPanel } from './dailly_challange'
import { RobotArmStatus } from './Pass Data Using Props'
import {
  AgnosticActionCard,
  AgnosticButton,
  StatusBadge,
} from './Reusable'
import './Reusable/Reusable.css'
import './App.css'

/** Parent-owned icon snippets — the reusable card never hardcodes which icon to show. */
function IconCart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="9" cy="20" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="17" cy="20" r="1.5" fill="currentColor" stroke="none" />
      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19" />
    </svg>
  )
}

function IconTrash() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6" />
    </svg>
  )
}

function IconHelp() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
    </svg>
  )
}

type MachineState = 'Online' | 'Offline'

const BADGE_LOOK_BY_STATE: Record<
  MachineState,
  { className: string; style: CSSProperties }
> = {
  Online: {
    className: 'demo-status-badge',
    style: { backgroundColor: '#15803d', color: '#ecfdf5' },
  },
  Offline: {
    className: 'demo-status-badge',
    style: { backgroundColor: '#b91c1c', color: '#fef2f2' },
  },
}

export default function App() {
  const [machine, setMachine] = useState<MachineState>('Online')
  const badgeLook = BADGE_LOOK_BY_STATE[machine]

  const buttonPresets = useMemo(
    () =>
      [
        {
          key: 'brew',
          label: 'Brew Espresso',
          style: { backgroundColor: '#166534', color: '#f0fdf4' },
        },
        {
          key: 'stop',
          label: 'Stop Machine',
          style: { backgroundColor: '#991b1b', color: '#fef2f2' },
        },
      ] as const,
    [],
  )

  return (
    <main className="app-reusable-demo">
      <h1>Reusable, agnostic components</h1>
      <p className="lede">
        The components under <code>src/Reusable</code> are templates: they do not
        choose their own labels or colors. The parent passes text, icons, and styles
        (or maps like the status badges below).
      </p>

      <h2>One shell, many holograms</h2>
      <p className="lede">
        <code>AgnosticActionCard</code> only needs <code>accentColor</code>,{' '}
        <code>icon</code>, and <code>headline</code> from outside. Optional{' '}
        <code>children</code> add things like a progress strip.
      </p>
      <div className="card-row">
        <AgnosticActionCard
          accentColor="#38bdf8"
          icon={<IconCart />}
          headline="Order button"
        />
        <AgnosticActionCard
          accentColor="#f87171"
          icon={<IconTrash />}
          headline="Delete inventory"
        />
        <AgnosticActionCard
          accentColor="#fbbf24"
          icon={<IconHelp />}
          headline="Check status"
        >
          <div className="demo-progress" aria-hidden>
            <div className="demo-progress__bar" />
          </div>
        </AgnosticActionCard>
      </div>

      <h2>AutoBarista-style status</h2>
      <p className="lede">
        One <code>StatusBadge</code>: the parent maps <code>Online</code> /{' '}
        <code>Offline</code> to colors. Toggle the machine state to see the same
        component with different props.
      </p>
      <div className="badge-row">
        <StatusBadge label={machine} {...badgeLook} />
        <AgnosticButton
          type="button"
          className="agnostic-btn"
          style={{ backgroundColor: '#334155', color: '#f8fafc' }}
          onClick={() =>
            setMachine((m) => (m === 'Online' ? 'Offline' : 'Online'))
          }
        >
          Toggle machine
        </AgnosticButton>
      </div>

      <h2>Buttons without fixed copy or palette</h2>
      <p className="lede">
        <code>AgnosticButton</code> renders whatever children you pass; color comes
        from <code>style</code> or <code>className</code> here in the parent.
      </p>
      <div className="demo-toolbar">
        {buttonPresets.map((b) => (
          <AgnosticButton
            key={b.key}
            type="button"
            className="agnostic-btn"
            style={b.style}
          >
            {b.label}
          </AgnosticButton>
        ))}
      </div>

      <h2>Pass data using props (waterfall)</h2>
      <p className="lede">
        <code>RobotArmStatus</code> owns the values (45°C, &quot;Moving to cup&quot;).
        It renders two <code>DataDisplay</code> children and passes each piece of data
        down as props — parent to child, one direction.
      </p>
      <RobotArmStatus />

      <h2>Daily challenge: System Health Panel</h2>
      <p className="lede">
        AutoBarista admin view built only from <code>Card</code> and{' '}
        <code>StatusRow</code> (<code>src/dailly_challange</code>).
      </p>
      <SystemHealthPanel />
      <HardwareHealthConcept />
    </main>
  )
}
