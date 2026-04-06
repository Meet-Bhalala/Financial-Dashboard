import { useState ,useEffect} from 'react'
import { Routes,Route,Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import TransactionModal from './components/TransactionModal/TransactionModal'
import Dashboard from './pages/Dashboard/Dashboard'
import Transactions from './pages/Transactions/Transactions'
import Insights from './pages/Insights/Insights'
import Settings from './pages/Settings/Settings'
import NotFound from './pages/NotFound/NotFound'
import './App.css'

function App() {
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  const theme = useSelector((state) => state.ui.theme);
  const role = useSelector((state) => state.role.currentRole);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  return (
    <>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-black dark:text-zinc-100">
        <Toaster position="top-right" />
        <Navbar />
        <div className="flex items-start">
          <Sidebar sidebarOpen={sidebarOpen} />
          <main className="min-w-0 flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/insights" element={<Insights />} />
              <Route
                path="/settings"
                element={role === "admin" ? <Settings /> : <Navigate to="/dashboard" replace />}
              />
              <Route path="/reports" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        <TransactionModal />
      </div>
    </>
  )
}

export default App
