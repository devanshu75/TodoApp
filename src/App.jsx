import "./App.css";
import Hero from "./components/Hero";
import AddTask from "./components/AddTask";
import TaskItem from "./components/TaskItem";
import initialTasks from "./utils/data";

import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

const STORAGE_KEY = "todo_tasks";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  function handleAddTask(taskName) {
    const newTask = {
      id: nanoid(),
      taskName,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  }

  function toggleTask(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function editTask(id, newName) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, taskName: newName } : task
      )
    );
  }

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <Hero />
      <div className="container">
        <div className="btn-group">
          <AddTask onAddTask={handleAddTask} />
          <div className="task-controls">
            <div className="task-stats">
              <span className="task-label">Total Tasks</span>
              <span className="task-count">{tasks.length}</span>
            </div>

            <div className="filter-bar">
              <button
                className={filter === "all" ? "active" : ""}
                onClick={() => setFilter("all")}
              >
                All
              </button>

              <button
                className={filter === "completed" ? "active" : ""}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>

              <button
                className={filter === "pending" ? "active" : ""}
                onClick={() => setFilter("pending")}
              >
                Pending
              </button>
            </div>
          </div>
        </div>

        <div className="list-container">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              taskName={task.taskName}
              completed={task.completed}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
