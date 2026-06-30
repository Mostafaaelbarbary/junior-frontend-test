import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/tasksSlice";

function TaskFilter() {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.tasks.filter);

  return (
    <div className="task-filter">
      <label>Filter by priority: </label>

      <select
        value={currentFilter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
      >
        <option value="All">All</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  );
}

export default TaskFilter;