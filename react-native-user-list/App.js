import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import AppContent from "./src/App";

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}