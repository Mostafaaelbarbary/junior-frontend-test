import { createSlice } from "@reduxjs/toolkit";

const getTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
};

const initialState = {
  tasks: getTasksFromLocalStorage(),
  filter: "All",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: Date.now(),
        title: action.payload.title,
        priority: action.payload.priority,
        completed: false,
      });
    },

    editTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);

      if (task) {
        task.title = action.payload.title;
        task.priority = action.payload.priority;
      }
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    toggleTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);

      if (task) {
        task.completed = !task.completed;
      }
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  toggleTask,
  setFilter,
} = tasksSlice.actions;

export default tasksSlice.reducer;