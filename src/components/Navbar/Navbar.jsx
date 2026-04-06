import { useDispatch,useSelector } from "react-redux";
import { Menu,Moon,Sun } from "lucide-react";
import { toggleSidebar,openMobileSidebar,toggleTheme} from "../../store/slices/uiSlice";
import { setRole } from "../../store/slices/roleSlice";

export default function Navbar() {
    const dispatch = useDispatch();
    const theme = useSelector((s) => s.ui.theme);
    const currentRole = useSelector((s) => s.role.currentRole);

    return (
     <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6 dark:border-zinc-700 dark:bg-black">
      <div className="flex items-center gap-3">
        <button
          onClick={() => dispatch(openMobileSidebar())}
          className="rounded-lg border border-slate-300 p-2 hover:bg-slate-50 dark:border-zinc-700 dark:hover:bg-zinc-950 md:hidden"
        >
          <Menu size={18} />
        </button>

        <button
          onClick={() => dispatch(toggleSidebar())}
          className="hidden rounded-lg border border-slate-300 p-2 hover:bg-slate-50 dark:border-zinc-700 dark:hover:bg-zinc-950 md:block"
        >
          <Menu size={18} />
        </button>

        <h1 className="text-lg font-semibold text-slate-900 dark:text-zinc-100">Financial Dashboard</h1>
      </div>

      <div className="flex items-center gap-2">
        <select
          value={currentRole}
          onChange={(e) => dispatch(setRole(e.target.value))}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>

        <button
          onClick={() => dispatch(toggleTheme())}
          className="rounded-lg border border-slate-300 p-2 hover:bg-slate-50 dark:border-zinc-700 dark:hover:bg-zinc-950"
        >
          {theme === "light" ? <Moon size={18} className="text-slate-700" /> : <Sun size={18} className="text-yellow-400" />}
        </button>
      </div>
    </header>
  );

}