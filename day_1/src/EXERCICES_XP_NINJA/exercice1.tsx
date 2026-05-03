import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useState,
  type CSSProperties,
  type Dispatch,
  type FormEvent,
  type ReactNode,
} from 'react'
import { useTheme } from '../EXERCICES_XP/exercices1'

export type Task = {
  id: string
  text: string
  completed: boolean
}

export type TaskAction =
  | { type: 'ADD'; text: string }
  | { type: 'TOGGLE_COMPLETE'; id: string }
  | { type: 'REMOVE'; id: string }

function newTaskId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'ADD': {
      const text = action.text.trim()
      if (!text) return state
      return [...state, { id: newTaskId(), text, completed: false }]
    }
    case 'TOGGLE_COMPLETE':
      return state.map((t) =>
        t.id === action.id ? { ...t, completed: !t.completed } : t,
      )
    case 'REMOVE':
      return state.filter((t) => t.id !== action.id)
    default:
      return state
  }
}

type TaskContextValue = {
  tasks: Task[]
  dispatch: Dispatch<TaskAction>
}

const TaskContext = createContext<TaskContextValue | null>(null)

export function useTasks() {
  const ctx = useContext(TaskContext)
  if (!ctx) {
    throw new Error('useTasks must be used within TaskProvider')
  }
  return ctx
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(taskReducer, [])

  const value = useMemo(
    () => ({
      tasks,
      dispatch,
    }),
    [tasks],
  )

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

/** Adds a task via context + reducer. */
export function AddTaskForm() {
  const { dispatch } = useTasks()
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

  const btnStyle: CSSProperties = {
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

/** Lists tasks from context; each row uses `TaskRow`. */
export function TaskList() {
  const { tasks } = useTasks()
  const { palette } = useTheme()

  const emptyStyle: CSSProperties = {
    margin: 0,
    padding: '16px',
    textAlign: 'center',
    fontSize: 14,
    color: palette.muted,
    border: `1px dashed ${palette.border}`,
    borderRadius: 8,
  }

  const ulStyle: CSSProperties = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  }

  if (tasks.length === 0) {
    return <p style={emptyStyle}>No tasks yet. Add one above.</p>
  }

  return (
    <ul style={ulStyle}>
      {tasks.map((task) => (
        <TaskRow key={task.id} task={task} />
      ))}
    </ul>
  )
}

/** Displays one task; complete + remove go through the reducer. */
export function TaskRow({ task }: { task: Task }) {
  const { dispatch } = useTasks()
  const { palette } = useTheme()

  const rowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 12px',
    borderRadius: 8,
    border: `1px solid ${palette.border}`,
    background: palette.surface,
  }

  const checkStyle: CSSProperties = {
    width: 18,
    height: 18,
    cursor: 'pointer',
    flexShrink: 0,
  }

  const textStyle: CSSProperties = {
    flex: 1,
    margin: 0,
    fontSize: 15,
    color: task.completed ? palette.muted : palette.text,
    textDecoration: task.completed ? 'line-through' : 'none',
    wordBreak: 'break-word',
    textAlign: 'left',
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

  return (
    <li style={rowStyle}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => dispatch({ type: 'TOGGLE_COMPLETE', id: task.id })}
        style={checkStyle}
        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
      />
      <p style={textStyle}>{task.text}</p>
      <button
        type="button"
        style={btnRemove}
        onClick={() => dispatch({ type: 'REMOVE', id: task.id })}
        aria-label={`Remove: ${task.text}`}
      >
        Remove
      </button>
    </li>
  )
}

/** Exercise shell: provider + separate components that only talk via context. */
export function NinjaExercise1Demo() {
  const { palette } = useTheme()

  const sectionStyle: CSSProperties = {
    margin: '24px auto',
    maxWidth: 560,
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
    lineHeight: 1.5,
  }

  return (
    <TaskProvider>
      <section style={sectionStyle} aria-labelledby="ninja-ex1-title">
        <h2 id="ninja-ex1-title" style={headerStyle}>
          Ninja — Task manager
        </h2>
        <p style={subStyle}>
          State lives in <code style={{ color: palette.accent }}>useReducer</code>{' '}
          inside <code style={{ color: palette.accent }}>TaskProvider</code>.
          Add list, task rows, and actions share{' '}
          <code style={{ color: palette.accent }}>useTasks()</code>.
        </p>
        <AddTaskForm />
        <TaskList />
      </section>
    </TaskProvider>
  )
}
