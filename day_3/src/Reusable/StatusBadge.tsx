import type { HTMLAttributes, ReactNode } from 'react'

export type StatusBadgeProps = {
  /** Shown text is always supplied by the parent (e.g. "Online", "Offline"). */
  label: ReactNode
} & HTMLAttributes<HTMLSpanElement>

/**
 * One badge for every status: the parent decides the word and the look
 * (className / style). This file does not map "Online" → green; the caller does.
 */
export function StatusBadge({ label, className, style, ...rest }: StatusBadgeProps) {
  return (
    <span className={className} style={style} {...rest}>
      {label}
    </span>
  )
}
