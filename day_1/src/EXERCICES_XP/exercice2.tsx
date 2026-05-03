import { useRef, useState, type CSSProperties } from 'react'
import { useTheme } from './exercices1'

/** Reads length via `inputRef.current.value.length` on each input event. */
export function CharacterCounter({
  label = 'Your message',
  placeholder = 'Type something…',
}: {
  label?: string
  placeholder?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [charCount, setCharCount] = useState(0)
  const { palette } = useTheme()

  const handleInput = () => {
    const el = inputRef.current
    if (!el) return
    setCharCount(el.value.length)
  }

  const fieldStyle: CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px 14px',
    borderRadius: 8,
    border: `1px solid ${palette.border}`,
    background: palette.surface,
    color: palette.text,
    fontSize: 16,
    outline: 'none',
  }

  const labelStyle: CSSProperties = {
    display: 'block',
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 600,
    color: palette.text,
  }

  const metaRow: CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 8,
    fontSize: 13,
    color: palette.muted,
    fontVariantNumeric: 'tabular-nums',
  }

  return (
    <div>
      <label htmlFor="character-counter-input" style={labelStyle}>
        {label}
      </label>
      <input
        ref={inputRef}
        id="character-counter-input"
        type="text"
        placeholder={placeholder}
        onInput={handleInput}
        style={fieldStyle}
        aria-describedby="character-counter-live"
      />
      <p id="character-counter-live" style={metaRow} role="status">
        {charCount} character{charCount === 1 ? '' : 's'}
      </p>
    </div>
  )
}

/** Exercise 2 demo — render inside `ThemeProvider` (same as Exercise 1). */
export function Exercise2Demo() {
  const { palette } = useTheme()

  const sectionStyle: CSSProperties = {
    margin: '24px auto',
    maxWidth: 560,
    padding: '24px',
    borderRadius: 16,
    border: `1px solid ${palette.border}`,
    background: palette.bg,
    color: palette.text,
  }

  const headerStyle: CSSProperties = {
    margin: '0 0 8px',
    fontSize: 22,
    fontWeight: 700,
  }

  const subStyle: CSSProperties = {
    margin: '0 0 20px',
    fontSize: 14,
    color: palette.muted,
    lineHeight: 1.5,
  }

  return (
    <section style={sectionStyle} aria-labelledby="ex2-title">
      <h2 id="ex2-title" style={headerStyle}>
        Exercise 2 — Character counter
      </h2>
      <p style={subStyle}>
        The input is wired with <code style={{ color: palette.accent }}>useRef</code>.
        On each <code style={{ color: palette.accent }}>input</code> event, the handler
        reads <code style={{ color: palette.accent }}>inputRef.current.value.length</code>{' '}
        and updates the counter.
      </p>
      <CharacterCounter />
    </section>
  )
}
