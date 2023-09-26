import React from 'react'
import Route from './route/route'
import { createRoot } from 'react-dom/client'





const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Route />
  </React.StrictMode>
)