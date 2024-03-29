
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { Toaster } from 'react-hot-toast'
import { StrictMode } from 'react'
import axios from 'axios'

axios.defaults.baseURL = "https://chat-bot-mern-stack.vercel.app/";
axios.defaults.withCredentials = true;
const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab, serif",
    allVariants: { color: "White" }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(

  <AuthProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Toaster position='top-right' />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </AuthProvider>


)
