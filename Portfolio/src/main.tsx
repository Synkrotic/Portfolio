import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import NavBar from './Components/NavBar.tsx'
import { Analytics } from "@vercel/analytics/react"
// import { SpeedInsights } from "@vercel/speed-insights/next"

const isPhone = window.matchMedia('(max-width: 600px)').matches

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Analytics />
    {/* <SpeedInsights /> */}
    <App />
    <NavBar
      startPos={isPhone ? 1 : 4}
    />
  </StrictMode>
)
