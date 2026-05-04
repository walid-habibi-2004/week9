import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type AgnosticButtonProps = {
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

/**
 * Template button: all label, color, and layout come from the parent
 * (children, className, style, etc.). No baked-in copy or theme.
 */
export function AgnosticButton({
  children,
  type = 'button',
  ...rest
}: AgnosticButtonProps) {
  return (
    <button type={type} {...rest}>
      {children}
    </button>
  )
}
