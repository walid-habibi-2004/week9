export type DataDisplayProps = {
  /** Short heading for what this row shows (e.g. "Temperature"). */
  label: string
  /** The value to show; comes from the parent via props. */
  value: string
}

/**
 * Presentational child: it does not fetch or own robot data — the parent passes
 * everything in through props (waterfall / one-way data flow).
 */
export function DataDisplay({ label, value }: DataDisplayProps) {
  return (
    <div className="data-display">
      <span className="data-display__label">{label}</span>
      <span className="data-display__value">{value}</span>
    </div>
  )
}
