import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineModeEditOutline } from "react-icons/md";

const TaskItem = ({
  id,
  taskName,
  completed,
  onToggle,
  onDelete,
  onEdit,
  createdAt,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");

  function startEditing() {
    setEditedText(taskName);
    setIsEditing(true);
  }

  function handleSave() {
    if (!editedText.trim()) {
      setIsEditing(false);
      return;
    }
    onEdit(id, editedText);
    setIsEditing(false);
  }

  return (
    <div className="todo-container">
      <ul className="todo-list">
        <li className="todo-item">
          <div className="left">
            <input
              type="checkbox"
              className="circle-checkbox"
              id={`task-${id}`}
              checked={completed}
              onChange={() => onToggle(id)}
            />

            <div className="task-content">
              {isEditing ? (
                <input
                  type="text"
                  className="task-input"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={(e) => e.key === "Enter" && handleSave()}
                  autoFocus
                />
              ) : (
                <>
                  <span className={`task-text ${completed ? "completed" : ""}`}>
                    {taskName}
                  </span>

                  <span className="task-date">
                    Created{" "}
                    {new Date(createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="button_container">
            <button
              className="edit"
              aria-label="Edit task"
              title="Edit"
              onClick={startEditing}
            >
              <MdOutlineModeEditOutline />
            </button>

            <button
              className="delete"
              aria-label="Delete task"
              title="Delete"
              onClick={() => onDelete(id)}
            >
              <FaRegTrashAlt />
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default TaskItem;
