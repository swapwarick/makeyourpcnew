
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'
import { SpeedInsights } from '@vercel/speed-insights/react'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <SpeedInsights />
  </StrictMode>
);
