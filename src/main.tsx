import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/index.tsx'
import AuthProvider from './context/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
     
  </React.StrictMode>,
)
