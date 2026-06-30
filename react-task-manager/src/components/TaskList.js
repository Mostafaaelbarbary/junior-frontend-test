import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";

function TaskList() {
  const { tasks, filter } = useSelector((state) => state.tasks);

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) => task.priority === filter);

  if (filteredTasks.length === 0) {
    return <p className="empty-message">No tasks found.</p>;
  }

  return (
    <div className="task-list">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;