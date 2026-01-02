import { useState } from "react";

const AddTask = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(taskName);
    setTaskName("");
  };

  return (
    <div className="search_wrapper">
      <div className="search_container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Create a new task..."
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
          <button type="submit">Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
