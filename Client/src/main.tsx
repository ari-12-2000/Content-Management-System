import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'; 
import App from './App.tsx'
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3000/api/Users/";
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
