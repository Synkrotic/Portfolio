import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import NavBar from './Components/NavBar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <NavBar />
  </StrictMode>
)
