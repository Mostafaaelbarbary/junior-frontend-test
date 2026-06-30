import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, editTask, toggleTask } from "../redux/tasksSlice";

function TaskItem({ task }) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedPriority, setEditedPriority] = useState(task.priority);

  const handleSave = () => {
    if (!editedTitle.trim()) {
      return;
    }

    dispatch(
      editTask({
        id: task.id,
        title: editedTitle,
        priority: editedPriority,
      })
    );

    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />

          <select
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <div>
            <h3>{task.title}</h3>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.completed ? "Completed" : "Pending"}</p>
          </div>

          <div className="task-actions">
            <button onClick={() => dispatch(toggleTask(task.id))}>
              {task.completed ? "Undo" : "Complete"}
            </button>

            <button onClick={() => setIsEditing(true)}>Edit</button>

            <button onClick={() => dispatch(deleteTask(task.id))}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;