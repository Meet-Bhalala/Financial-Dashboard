import { NavLink } from "react-router-dom";
import { LayoutDashboard, Wallet, BarChart3, Settings, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { closeMobileSidebar } from "../../store/slices/uiSlice";

const linkClass = (isActive) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium cursor-pointer transition-colors ${
    isActive
      ? "bg-blue-50 text-blue-700 dark:bg-zinc-800/60 dark:text-zinc-300"
      : "text-slate-600 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-950"
  }`

function SidebarContent(
  { 
    onNavigate, 
    role 
  }
) {
  const handleNavigate = () => {
    onNavigate?.();
  };

  return (
    <nav className="space-y-2">
      <NavLink to="/dashboard" onClick={handleNavigate} className={({ isActive }) => linkClass(isActive)}>
        <LayoutDashboard size={18} /> Dashboard
      </NavLink>
      <NavLink to="/transactions" onClick={handleNavigate} className={({ isActive }) => linkClass(isActive)}>
        <Wallet size={18} /> Transactions
      </NavLink>
      <NavLink to="/insights" onClick={handleNavigate} className={({ isActive }) => linkClass(isActive)}>
        <BarChart3 size={18} /> Insights
      </NavLink>

      {role === "admin" && (
        <NavLink to="/settings" onClick={handleNavigate} className={({ isActive }) => linkClass(isActive)}>
          <Settings size={18} /> Settings
        </NavLink>
      )}
    </nav>
  );
}

export default function Sidebar({ sidebarOpen }) {
  const dispatch = useDispatch();
  const mobileOpen = useSelector((s) => s.ui.mobileSidebarOpen);
  const role = useSelector((s) => s.role.currentRole);

  return (
    <>
      {/* Desktop */}
      <aside
        className={`${
          sidebarOpen ? "hidden md:block" : "hidden"
        } w-64 shrink-0 self-start border-r border-slate-200 bg-white p-4 dark:border-zinc-700 dark:bg-black md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:overflow-y-auto`}
      >
        <SidebarContent role={role} onNavigate={() => dispatch(closeMobileSidebar())} />
      </aside>

      {/* Mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => dispatch(closeMobileSidebar())}
          />
          <aside className="absolute left-0 top-0 h-full w-72 border-r border-slate-200 bg-white p-4 shadow-xl dark:border-zinc-700 dark:bg-black">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900 dark:text-zinc-100">Menu</h2>
              <button
                onClick={() => dispatch(closeMobileSidebar())}
                className="rounded-lg border border-slate-300 p-2 dark:border-zinc-700"
              >
                <X size={16} />
              </button>
            </div>
            <SidebarContent role={role} onNavigate={() => dispatch(closeMobileSidebar())} />
          </aside>
        </div>
      )}
    </>
  );
}