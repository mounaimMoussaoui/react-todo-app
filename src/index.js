import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import TodoProvider from "./contexts/TodoProvider";
import {Routes} from "./routes/Routers";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <TodoProvider>
        <Routes />
    </TodoProvider>
  // </React.StrictMode>
);

reportWebVitals();
