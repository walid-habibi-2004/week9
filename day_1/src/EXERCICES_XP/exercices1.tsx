import {
  createContext,
  useContext,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'

export type Theme = 'light' | 'dark'

type ThemePalette = {
  bg: string
  surface: string
  text: string
  muted: string
  border: string
  accent: string
}

const palettes: Record<Theme, ThemePalette> = {
  light: {
    bg: '#f8fafc',
    surface: '#ffffff',
    text: '#0f172a',
    muted: '#64748b',
    border: '#e2e8f0',
    accent: '#4f46e5',
  },
  dark: {
    bg: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    muted: '#94a3b8',
    border: '#334155',
    accent: '#818cf8',
  },
}

type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
  palette: ThemePalette
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  const toggleTheme = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme,
      palette: palettes[theme],
    }),
    [theme],
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

export function ThemeSwitcher() {
  const { theme, toggleTheme, palette } = useTheme()

  const btnStyle: CSSProperties = {
    cursor: 'pointer',
    padding: '10px 18px',
    borderRadius: 8,
    border: `2px solid ${palette.border}`,
    background: palette.surface,
    color: palette.text,
    fontWeight: 600,
    fontSize: 14,
    boxShadow: `0 1px 2px ${theme === 'light' ? 'rgba(15,23,42,0.06)' : 'rgba(0,0,0,0.35)'}`,
  }

  return (
    <button type="button" onClick={toggleTheme} style={btnStyle}>
      {theme === 'light' ? 'Switch to dark' : 'Switch to light'}
    </button>
  )
}

function ThemedCard({ title, children }: { title: string; children: ReactNode }) {
  const { palette } = useTheme()

  const cardStyle: CSSProperties = {
    textAlign: 'left',
    padding: '16px 20px',
    borderRadius: 12,
    border: `1px solid ${palette.border}`,
    background: palette.surface,
    color: palette.text,
    boxShadow:
      '0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.06)',
  }

  const titleStyle: CSSProperties = {
    margin: '0 0 8px',
    fontSize: 16,
    fontWeight: 600,
    color: palette.accent,
  }

  const bodyStyle: CSSProperties = {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.5,
    color: palette.muted,
  }

  return (
    <article style={cardStyle}>
      <h3 style={titleStyle}>{title}</h3>
      <p style={bodyStyle}>{children}</p>
    </article>
  )
}

/** Exercise 1 demo: wrap app (or subtree) with ThemeProvider and render this. */
export function Exercise1Demo() {
  const { theme, palette } = useTheme()

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
  }

  const rowStyle: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  }

  const badgeStyle: CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    padding: '4px 10px',
    borderRadius: 999,
    background: palette.surface,
    border: `1px solid ${palette.border}`,
    color: palette.muted,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  }

  const gridStyle: CSSProperties = {
    display: 'grid',
    gap: 12,
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  }

  return (
    <section style={sectionStyle} aria-labelledby="ex1-title">
      <h2 id="ex1-title" style={headerStyle}>
        Exercise 1 — Theme switcher
      </h2>
      <p style={subStyle}>
        Toggle uses <code style={{ color: palette.accent }}>useState</code> in
        the provider; children read theme with{' '}
        <code style={{ color: palette.accent }}>useContext</code>.
      </p>
      <div style={rowStyle}>
        <ThemeSwitcher />
        <span style={badgeStyle}>Current: {theme}</span>
      </div>
      <div style={gridStyle}>
        <ThemedCard title="Context">
          This card gets colors from the same context as the switcher — no prop
          drilling.
        </ThemedCard>
        <ThemedCard title="Pattern">
          Provider holds state; any descendant can call{' '}
          <code style={{ color: palette.accent }}>useTheme()</code>.
        </ThemedCard>
      </div>
    </section>
  )
}
