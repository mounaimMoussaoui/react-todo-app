import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from "./App";
import TodoProvider from "./contexts/TodoProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <TodoProvider>
        <App />
    </TodoProvider>
  // </React.StrictMode>
);

reportWebVitals();
