import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileBarChart2, Settings,X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { closeMobileSidebar } from "../../store/slices/uiSlice";

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
    isActive
      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
  }`

function SidebarContent(
  { 
    onNavigate 
  }
) {
  return (
    <nav className="space-y-2">
      <NavLink to="/" end className={linkClass} onClick={onNavigate}>
        <LayoutDashboard size={18} /> Dashboard
      </NavLink>
      <NavLink to="/reports" className={linkClass} onClick={onNavigate}>
        <FileBarChart2 size={18} /> Reports
      </NavLink>
      <NavLink to="/settings" className={linkClass} onClick={onNavigate}>
        <Settings size={18} /> Settings
      </NavLink>
    </nav>
  );
}

export default function Sidebar({ sidebarOpen }) {
  const dispatch = useDispatch();
  const mobileOpen = useSelector((s) => s.ui.mobileSidebarOpen);
  return (
     <>
      <aside
        className={`${
          sidebarOpen ? "hidden md:block" : "hidden"
        } w-64 border-r border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900`}
      >
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => dispatch(closeMobileSidebar())} />
          <aside className="absolute left-0 top-0 h-full w-72 border-r border-slate-200 bg-white p-4 shadow-xl dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900 dark:text-slate-100">Menu</h2>
              <button
                onClick={() => dispatch(closeMobileSidebar())}
                className="rounded-lg border border-slate-300 p-2 dark:border-slate-700"
              >
                <X size={16} />
              </button>
            </div>
            <SidebarContent onNavigate={() => dispatch(closeMobileSidebar())} />
          </aside>
        </div>
      )}
    </>
  );
}