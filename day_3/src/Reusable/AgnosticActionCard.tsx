import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

export type AgnosticActionCardProps = {
  /** Drives glow / border accent; parent picks the color. */
  accentColor: string
  icon: ReactNode
  headline: ReactNode
  children?: ReactNode
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>

const shellVars = (accent: string): CSSProperties => ({
  ['--card-accent' as string]: accent,
})

/**
 * Same "shell" for order, delete, or status UIs: icon, headline, and optional
 * footer (e.g. a progress bar) all come from props / children.
 */
export function AgnosticActionCard({
  accentColor,
  icon,
  headline,
  children,
  className,
  style,
  ...rest
}: AgnosticActionCardProps) {
  return (
    <div
      className={['agnostic-action-card', className].filter(Boolean).join(' ')}
      style={{ ...shellVars(accentColor), ...style }}
      {...rest}
    >
      <div className="agnostic-action-card__glow" aria-hidden />
      <div className="agnostic-action-card__plate" aria-hidden />
      <div className="agnostic-action-card__hologram">
        <div className="agnostic-action-card__icon">{icon}</div>
        <p className="agnostic-action-card__headline">{headline}</p>
        {children ? (
          <div className="agnostic-action-card__footer">{children}</div>
        ) : null}
      </div>
    </div>
  )
}
