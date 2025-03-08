import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import NavBar from './Components/NavBar.tsx'
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Analytics />
    <App />
    <NavBar
      startPos={
        4
        // localStorage.getItem('navbarPositionIndex') !== null
        // ? parseInt(localStorage.getItem('navbarPositionIndex') as string)
        // : 4 // Bottom center
      }
    />
  </StrictMode>
)
