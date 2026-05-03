import {
  useReducer,
  useState,
  type CSSProperties,
  type FormEvent,
} from 'react'
import { useTheme } from '../EXERCICES_XP/exercices1'

export type Todo = {
  id: string
  text: string
}

type TodoState = Todo[]

type TodoAction =
  | { type: 'ADD'; text: string }
  | { type: 'REMOVE'; id: string }

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD': {
      const trimmed = action.text.trim()
      if (!trimmed) return state
      const id =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
      return [...state, { id, text: trimmed }]
    }
    case 'REMOVE':
      return state.filter((t) => t.id !== action.id)
    default:
      return state
  }
}

export function TodoListExercise() {
  const [todos, dispatch] = useReducer(todoReducer, [])
  const [draft, setDraft] = useState('')
  const { palette } = useTheme()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch({ type: 'ADD', text: draft })
    setDraft('')
  }

  const sectionStyle: CSSProperties = {
    margin: '24px auto',
    maxWidth: 560,
    padding: '24px',
    borderRadius: 16,
    border: `1px solid ${palette.border}`,
    background: palette.bg,
    color: palette.text,
    textAlign: 'left',
  }

  const headerStyle: CSSProperties = {
    margin: '0 0 8px',
    fontSize: 22,
    fontWeight: 700,
    textAlign: 'center',
  }

  const formStyle: CSSProperties = {
    display: 'flex',
    gap: 8,
    marginBottom: 16,
  }

  const inputStyle: CSSProperties = {
    flex: 1,
    padding: '10px 12px',
    borderRadius: 8,
    border: `1px solid ${palette.border}`,
    background: palette.surface,
    color: palette.text,
    fontSize: 15,
    outline: 'none',
    boxSizing: 'border-box',
    minWidth: 0,
  }

  const btnPrimary: CSSProperties = {
    cursor: 'pointer',
    padding: '10px 16px',
    borderRadius: 8,
    border: 'none',
    background: palette.accent,
    color: '#fff',
    fontWeight: 600,
    fontSize: 14,
    flexShrink: 0,
  }

  const listStyle: CSSProperties = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  }

  const rowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 12px',
    borderRadius: 8,
    border: `1px solid ${palette.border}`,
    background: palette.surface,
  }

  const textStyle: CSSProperties = {
    flex: 1,
    margin: 0,
    fontSize: 15,
    color: palette.text,
    wordBreak: 'break-word',
  }

  const btnRemove: CSSProperties = {
    cursor: 'pointer',
    padding: '6px 10px',
    borderRadius: 6,
    border: `1px solid ${palette.border}`,
    background: palette.bg,
    color: palette.muted,
    fontSize: 13,
    flexShrink: 0,
  }

  const emptyStyle: CSSProperties = {
    margin: 0,
    padding: '16px',
    textAlign: 'center',
    fontSize: 14,
    color: palette.muted,
    border: `1px dashed ${palette.border}`,
    borderRadius: 8,
  }

  return (
    <section style={sectionStyle} aria-labelledby="gold-ex-todo-title">
      <h2 id="gold-ex-todo-title" style={headerStyle}>
        Gold — Todo list
      </h2>
      <form onSubmit={onSubmit} style={formStyle}>
        <input
          id="gold-todo-input"
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add a todo…"
          aria-label="New todo"
          style={inputStyle}
          autoComplete="off"
        />
        <button type="submit" style={btnPrimary}>
          Add
        </button>
      </form>

      {todos.length === 0 ? (
        <p style={emptyStyle}>No todos yet. Add one above.</p>
      ) : (
        <ul style={listStyle}>
          {todos.map((todo) => (
            <li key={todo.id} style={rowStyle}>
              <p style={textStyle}>{todo.text}</p>
              <button
                type="button"
                style={btnRemove}
                onClick={() => dispatch({ type: 'REMOVE', id: todo.id })}
                aria-label={`Remove: ${todo.text}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
