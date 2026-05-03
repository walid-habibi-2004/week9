/* eslint-disable react-refresh/only-export-components -- challenge exports reducer & types with demo */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type CSSProperties,
  type Dispatch,
  type FormEvent,
  type ReactNode,
} from 'react'
import { ThemeProvider, useTheme } from '../EXERCICES_XP/exercices1'

export type Task = {
  id: string
  text: string
  completed: boolean
}

export type TaskFilter = 'all' | 'active' | 'completed'

export type TaskManagerState = {
  tasks: Task[]
  filter: TaskFilter
}

export type TaskManagerAction =
  | { type: 'ADD'; text: string }
  | { type: 'TOGGLE_COMPLETE'; id: string }
  | { type: 'REMOVE'; id: string }
  | { type: 'EDIT_TASK'; id: string; text: string }
  | { type: 'FILTER_TASKS'; filter: TaskFilter }

function newTaskId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function taskManagerReducer(
  state: TaskManagerState,
  action: TaskManagerAction,
): TaskManagerState {
  switch (action.type) {
    case 'ADD': {
      const text = action.text.trim()
      if (!text) return state
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { id: newTaskId(), text, completed: false },
        ],
      }
    }
    case 'TOGGLE_COMPLETE':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, completed: !t.completed } : t,
        ),
      }
    case 'REMOVE':
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.id),
      }
    case 'EDIT_TASK': {
      const text = action.text.trim()
      if (!text) return state
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, text } : t,
        ),
      }
    }
    case 'FILTER_TASKS':
      return { ...state, filter: action.filter }
    default:
      return state
  }
}

type TaskManagerContextValue = {
  state: TaskManagerState
  filteredTasks: Task[]
  dispatch: Dispatch<TaskManagerAction>
}

const TaskManagerContext = createContext<TaskManagerContextValue | null>(null)

export function useTaskManager() {
  const ctx = useContext(TaskManagerContext)
  if (!ctx) {
    throw new Error('useTaskManager must be used within TaskManagerProvider')
  }
  return ctx
}

const initialState: TaskManagerState = {
  tasks: [],
  filter: 'all',
}

export function TaskManagerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskManagerReducer, initialState)

  const filteredTasks = useMemo(() => {
    switch (state.filter) {
      case 'active':
        return state.tasks.filter((t) => !t.completed)
      case 'completed':
        return state.tasks.filter((t) => t.completed)
      default:
        return state.tasks
    }
  }, [state.tasks, state.filter])

  const value = useMemo(
    () => ({
      state,
      filteredTasks,
      dispatch,
    }),
    [state, filteredTasks, dispatch],
  )

  return (
    <TaskManagerContext.Provider value={value}>
      {children}
    </TaskManagerContext.Provider>
  )
}

function AddTaskForm() {
  const { dispatch } = useTaskManager()
  const [draft, setDraft] = useState('')
  const { palette } = useTheme()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch({ type: 'ADD', text: draft })
    setDraft('')
  }

  const formStyle: CSSProperties = {
    display: 'flex',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
  }

  const inputStyle: CSSProperties = {
    flex: '1 1 180px',
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

  const btnStyle: CSSProperties = {
    cursor: 'pointer',
    padding: '10px 16px',
    borderRadius: 8,
    border: 'none',
    background: palette.accent,
    color: '#fff',
    fontWeight: 600,
    fontSize: 14,
  }

  return (
    <form onSubmit={onSubmit} style={formStyle}>
      <input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="New task…"
        aria-label="New task"
        style={inputStyle}
        autoComplete="off"
      />
      <button type="submit" style={btnStyle}>
        Add task
      </button>
    </form>
  )
}

function FilterBar() {
  const { state, dispatch } = useTaskManager()
  const { palette } = useTheme()

  const filters: { key: TaskFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ]

  const wrap: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  }

  return (
    <div style={wrap} role="group" aria-label="Filter tasks">
      {filters.map(({ key, label }) => {
        const active = state.filter === key
        const btn: CSSProperties = {
          cursor: 'pointer',
          padding: '8px 14px',
          borderRadius: 8,
          border: `1px solid ${palette.border}`,
          background: active ? palette.accent : palette.surface,
          color: active ? '#fff' : palette.text,
          fontWeight: 600,
          fontSize: 13,
        }
        return (
          <button
            key={key}
            type="button"
            style={btn}
            aria-pressed={active}
            onClick={() => dispatch({ type: 'FILTER_TASKS', filter: key })}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

function TaskRow({ task }: { task: Task }) {
  const { dispatch } = useTaskManager()
  const { palette } = useTheme()
  const [editing, setEditing] = useState(false)
  const editInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) {
      editInputRef.current?.focus()
      editInputRef.current?.select()
    }
  }, [editing])

  const commitEdit = () => {
    const raw = editInputRef.current?.value ?? ''
    const text = raw.trim()
    if (text) {
      dispatch({ type: 'EDIT_TASK', id: task.id, text })
    }
    setEditing(false)
  }

  const rowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 12px',
    borderRadius: 8,
    border: `1px solid ${palette.border}`,
    background: palette.surface,
    flexWrap: 'wrap',
  }

  const textStyle: CSSProperties = {
    flex: '1 1 160px',
    margin: 0,
    fontSize: 15,
    color: task.completed ? palette.muted : palette.text,
    textDecoration: task.completed ? 'line-through' : 'none',
    wordBreak: 'break-word',
    textAlign: 'left',
    cursor: editing ? 'default' : 'pointer',
  }

  const inputStyle: CSSProperties = {
    flex: '1 1 200px',
    padding: '8px 10px',
    borderRadius: 6,
    border: `2px solid ${palette.accent}`,
    background: palette.bg,
    color: palette.text,
    fontSize: 15,
    outline: 'none',
    minWidth: 0,
    boxSizing: 'border-box',
  }

  const btnBase: CSSProperties = {
    cursor: 'pointer',
    padding: '6px 10px',
    borderRadius: 6,
    fontSize: 13,
    flexShrink: 0,
    border: `1px solid ${palette.border}`,
    background: palette.bg,
    color: palette.muted,
    fontWeight: 600,
  }

  return (
    <li style={rowStyle}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => dispatch({ type: 'TOGGLE_COMPLETE', id: task.id })}
        style={{ width: 18, height: 18, cursor: 'pointer', flexShrink: 0 }}
        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
      />

      {editing ? (
        <input
          ref={editInputRef}
          key={`edit-${task.id}`}
          type="text"
          defaultValue={task.text}
          style={inputStyle}
          aria-label="Edit task text"
          onBlur={commitEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              commitEdit()
            }
            if (e.key === 'Escape') {
              e.preventDefault()
              setEditing(false)
            }
          }}
        />
      ) : (
        <p
          style={textStyle}
          role="button"
          tabIndex={0}
          onClick={() => setEditing(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setEditing(true)
            }
          }}
        >
          {task.text}
        </p>
      )}

      {!editing && (
        <button
          type="button"
          style={btnBase}
          onClick={() => setEditing(true)}
          aria-label={`Edit task: ${task.text}`}
        >
          Edit
        </button>
      )}
      <button
        type="button"
        style={btnBase}
        onClick={() => dispatch({ type: 'REMOVE', id: task.id })}
        aria-label={`Remove: ${task.text}`}
      >
        Remove
      </button>
    </li>
  )
}

function TaskList() {
  const { filteredTasks, state } = useTaskManager()
  const { palette } = useTheme()

  const ulStyle: CSSProperties = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
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

  if (state.tasks.length === 0) {
    return (
      <p style={emptyStyle}>No tasks yet. Add one above.</p>
    )
  }

  if (filteredTasks.length === 0) {
    return (
      <p style={emptyStyle}>No tasks match this filter.</p>
    )
  }

  return (
    <ul style={ulStyle}>
      {filteredTasks.map((task) => (
        <TaskRow key={task.id} task={task} />
      ))}
    </ul>
  )
}

/** Daily Challenge — extended task manager (edit + filter + useRef). */
export function DailyChallengeDemo() {
  const { palette } = useTheme()

  const sectionStyle: CSSProperties = {
    margin: '24px auto',
    maxWidth: 640,
    padding: '24px',
    borderRadius: 16,
    border: `1px solid ${palette.border}`,
    background: palette.bg,
    color: palette.text,
    textAlign: 'center',
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
    lineHeight: 1.55,
    textAlign: 'left',
  }

  return (
    <section style={sectionStyle} aria-labelledby="daily-challenge-title">
      <h2 id="daily-challenge-title" style={headerStyle}>
        Daily Challenge — Task manager+
      </h2>
      <p style={subStyle}>
        <strong>Edit:</strong> click task text or <strong>Edit</strong>; change text in the field (tracked via{' '}
        <code style={{ color: palette.accent }}>useRef</code>), save with{' '}
        <kbd style={{ fontFamily: 'inherit' }}>Enter</kbd> or blur.{' '}
        <strong>Filter:</strong> reducer actions{' '}
        <code style={{ color: palette.accent }}>FILTER_TASKS</code> and{' '}
        <code style={{ color: palette.accent }}>EDIT_TASK</code>.
      </p>
      <AddTaskForm />
      <FilterBar />
      <TaskList />
    </section>
  )
}

/** Wraps theme + provider so this route works standalone. */
export function DailyChallengeShell() {
  return (
    <ThemeProvider>
      <TaskManagerProvider>
        <DailyChallengeDemo />
      </TaskManagerProvider>
    </ThemeProvider>
  )
}
