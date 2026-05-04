import type { ReactNode } from 'react'

export type CardProps = {
  title: string
  children?: ReactNode
}

/** White panel with a heading; body comes from `children`. */
export function Card({ title, children }: CardProps) {
  return (
    <section className="ab-card" aria-labelledby={titleId(title)}>
      <h2 className="ab-card__title" id={titleId(title)}>
        {title}
      </h2>
      <div className="ab-card__body">{children}</div>
    </section>
  )
}

function titleId(title: string) {
  return `ab-card-${title.replace(/\s+/g, '-').toLowerCase()}`
}
