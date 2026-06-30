import { useEffect } from "react";
import { useSelector } from "react-redux";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="app">
      <h1>React Task Manager</h1>

      <TaskForm />
      <TaskFilter />
      <TaskList />
    </div>
  );
}

export default App;