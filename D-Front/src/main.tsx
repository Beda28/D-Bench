import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import MainPage from './pages/main'
import SigninPage from './pages/signin'
import SignupPage from './pages/signup'
import AppPage from './pages/app'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/app" element={<AppPage />} />
    </Routes>
  </BrowserRouter>
)
