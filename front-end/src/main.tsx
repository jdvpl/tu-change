import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TuChangeApp from './TuChangeApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TuChangeApp />
  </StrictMode>,
)
