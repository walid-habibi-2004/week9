export type StatusRowProps = {
  deviceName: string
  status: string
  /** Any valid CSS color (e.g. `#22c55e`, `green`). */
  indicatorColor: string
}

/** One hardware line: name + status text + colored status dot. */
export function StatusRow({ deviceName, status, indicatorColor }: StatusRowProps) {
  return (
    <div className="ab-status-row">
      <span
        className="ab-status-row__dot"
        style={{ backgroundColor: indicatorColor }}
        aria-hidden
      />
      <span className="ab-status-row__device">{deviceName}</span>
      <span className="ab-status-row__status">{status}</span>
    </div>
  )
}
