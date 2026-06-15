import { useState, useEffect } from 'react'

// Initial state representing the typical Lagos hustle
const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'NEPA gone again. Buy fuel for the generator.',
    column: 'now',
    createdAt: '10:15 AM'
  },
  {
    id: 'task-2',
    title: 'Pick up client contract package at the park.',
    column: 'soon',
    createdAt: '11:30 AM'
  },
  {
    id: 'task-3',
    title: 'Reply three pending urgent client emails.',
    column: 'later',
    createdAt: '12:05 PM'
  }
]

const COLUMNS = [
  { id: 'now', title: 'Now', label: 'Urgent & Critical' },
  { id: 'soon', title: 'Soon', label: 'Do Next' },
  { id: 'later', title: 'Later', label: 'Flexible' }
]

const TRANSLATIONS = {
  logoBadge: 'Lagos Hustle Edition',
  title: 'The Wahala Sorter',
  subtitle: 'Every builder wakes up with a list of chaos. Drag, sort, and conquer your daily wahala fast.',
  inputLabel: 'What is the Wahala?',
  inputPlaceholder: 'e.g., NEPA gone again. Refuel the generator...',
  sortToLabel: 'Sort To',
  optionNow: 'Now',
  optionSoon: 'Soon',
  optionLater: 'Later',
  btnSubmit: 'Add to Board',
  emptyIcon: '',
  emptyText: 'No wahala here!',
  deleteTaskLabel: 'Delete Task',
  deleteBtnChar: '✕',
  timeIcon: ''
}

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('wahala_tasks')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Error parsing tasks from localStorage:', e)
      }
    }
    return INITIAL_TASKS
  })
  const [taskTitle, setTaskTitle] = useState('')
  const [targetColumn, setTargetColumn] = useState('now')

  // Theme state: checks localStorage, defaults to system preferences
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || saved === 'light') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  // Apply theme to documentElement class and attribute
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.setAttribute('data-theme', 'light')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  // Persist tasks in localStorage
  useEffect(() => {
    localStorage.setItem('wahala_tasks', JSON.stringify(tasks))
  }, [tasks])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  // Drag and drop states
  const [draggingTaskId, setDraggingTaskId] = useState(null)
  const [dragOverColumnId, setDragOverColumnId] = useState(null)

  // Format current time as a friendly timestamp
  const getFormattedTime = () => {
    const now = new Date()
    let hours = now.getHours()
    const minutes = now.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0' + minutes : minutes
    return `${hours}:${minutesStr} ${ampm}`
  }

  // Handle adding a new task
  const handleAddTask = (e) => {
    e.preventDefault()
    if (!taskTitle.trim()) return

    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      title: taskTitle.trim(),
      column: targetColumn,
      createdAt: getFormattedTime()
    }

    setTasks((prev) => [newTask, ...prev])
    setTaskTitle('')
  }

  // Handle deleting a task
  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  // Native HTML5 Drag and Drop Handlers
  const handleDragStart = (e, taskId) => {
    setDraggingTaskId(taskId)
    e.dataTransfer.setData('text/plain', taskId)
  }

  const handleDragEnd = () => {
    setDraggingTaskId(null)
    setDragOverColumnId(null)
  }

  const handleDragOver = (e) => {
    // Required to allow drop behavior
    e.preventDefault()
  }

  const handleDragEnter = (e, columnId) => {
    e.preventDefault()
    setDragOverColumnId(columnId)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    // Reset dragOverColumnId if exiting the column area completely
    if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) {
      setDragOverColumnId(null)
    }
  }

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault()
    const taskId = e.dataTransfer.getData('text/plain') || draggingTaskId

    if (taskId) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, column: targetColumnId } : task
        )
      )
    }

    setDraggingTaskId(null)
    setDragOverColumnId(null)
  }

  return (
    <div className="app-wrapper">
      {/* Centered layout container */}
      <div className="app-container">
        {/* Header - Aligned with board width */}
        <header className="header">
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="moon-icon"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sun-icon"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </button>
          <span className="logo-badge">{TRANSLATIONS.logoBadge}</span>
          <h1 className="title">{TRANSLATIONS.title}</h1>
          <p className="subtitle">
            {TRANSLATIONS.subtitle}
          </p>
        </header>
        {/* Task Creation Form */}
        <form onSubmit={handleAddTask} className="form-container">
          <div className="input-group">
            <label htmlFor="task-input" className="input-label">{TRANSLATIONS.inputLabel}</label>
            <input
              id="task-input"
              type="text"
              className="text-input"
              placeholder={TRANSLATIONS.inputPlaceholder}
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              maxLength={100}
              required
            />
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="column-select" className="input-label">{TRANSLATIONS.sortToLabel}</label>
              <select
                id="column-select"
                className="select-input"
                value={targetColumn}
                onChange={(e) => setTargetColumn(e.target.value)}
              >
                <option value="now">{TRANSLATIONS.optionNow}</option>
                <option value="soon">{TRANSLATIONS.optionSoon}</option>
                <option value="later">{TRANSLATIONS.optionLater}</option>
              </select>
            </div>

            <button type="submit" className="submit-btn">
              {TRANSLATIONS.btnSubmit}
            </button>
          </div>
        </form>

        {/* Board */}
        <main className="board">
          {COLUMNS.map((col) => {
            const colTasks = tasks.filter((task) => task.column === col.id)
            const isOver = dragOverColumnId === col.id

            return (
              <section
                key={col.id}
                className={`column column-${col.id} ${isOver ? 'drag-over' : ''}`}
                onDragOver={handleDragOver}
                onDragEnter={(e) => handleDragEnter(e, col.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, col.id)}
                aria-label={`${col.title} Priority Column`}
              >
                <div className="column-header">
                  <div className="column-title-group">
                    <span className="column-indicator"></span>
                    <div className="column-title-text">
                      <h2 className="column-title">{col.title}</h2>
                      <span className="column-label">{col.label}</span>
                    </div>
                  </div>
                  <span className="column-badge" aria-label={`${colTasks.length} tasks`}>
                    {colTasks.length}
                  </span>
                </div>

                <div className="tasks-list">
                  {colTasks.length === 0 ? (
                    <div className="empty-state">
                      <span className="empty-icon">{TRANSLATIONS.emptyIcon}</span>
                      <p>{TRANSLATIONS.emptyText}</p>
                    </div>
                  ) : (
                    colTasks.map((task) => (
                      <article
                        key={task.id}
                        className={`task-card animate-pop-in ${draggingTaskId === task.id ? 'dragging' : ''
                          }`}
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, task.id)}
                        onDragEnd={handleDragEnd}
                      >
                        <div className="task-card-header">
                          <h3 className="task-title">{task.title}</h3>
                          <button
                            type="button"
                            className="delete-btn"
                            onClick={() => handleDeleteTask(task.id)}
                            aria-label={TRANSLATIONS.deleteTaskLabel}
                          >
                            {TRANSLATIONS.deleteBtnChar}
                          </button>
                        </div>

                        <div className="task-meta">
                          <span className="badge-tag">{task.column}</span>
                          <span className="task-timestamp">
                            {TRANSLATIONS.timeIcon} {task.createdAt}
                          </span>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </section>
            )
          })}
        </main>
      </div>
    </div>
  )
}

export default App
