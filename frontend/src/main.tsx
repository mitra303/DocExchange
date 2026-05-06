import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";
import App from './App.tsx'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />

    {/* 👇 YAHI ADD KARNA HAI */}
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: "10px",
          padding: "12px",
          fontSize: "14px",
        },
      }}
    />

  </StrictMode>,
)