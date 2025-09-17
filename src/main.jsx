import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { AlertProvider } from './context/Alert.jsx';
import { GoalProvider } from './hooks/useGoals.jsx';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AlertProvider>
      <GoalProvider>
        <App />
      </GoalProvider>
    </AlertProvider>
  </BrowserRouter>
)
