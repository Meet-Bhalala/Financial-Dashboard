import { useState ,useEffect} from 'react'
import { Routes,Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Dashboard from './pages/Dashboard/Dashboard'
import Reports from './pages/Reports/Reports'
import Settings from './pages/Settings/Settings'
import NotFound from './pages/NotFound/NotFound'
import './App.css'

function App() {
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  const theme = useSelector((state) => state.ui.theme);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
    }
  }, [theme]);


  return (
    <>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Toaster position="top-right" />
      <Navbar />
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} />
        <main className="min-w-0 flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
    </>
  )
}

export default App
