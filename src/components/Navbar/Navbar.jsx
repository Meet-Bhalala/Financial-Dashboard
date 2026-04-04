import { useDispatch,useSelector } from "react-redux";
import { Menu,Moon,Sun } from "lucide-react";
import { toggleSidebar,openMobileSidebar,toggleTheme} from "../../store/slices/uiSlice";

export default function Navbar() {
    const dispatch = useDispatch();
    const theme = useSelector((s) => s.ui.theme);
    return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center gap-3">
        <button onClick={() => dispatch(openMobileSidebar())} className="rounded-lg border border-slate-300 p-2 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 md:hidden">
          <Menu size={18} />
        </button>

        <button onClick={() => dispatch(toggleSidebar())} className="hidden rounded-lg border border-slate-300 p-2 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 md:block">
          <Menu size={18} />
        </button>

        <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Clean SaaS Dashboard</h1>
      </div>

      <button
        onClick={() => dispatch(toggleTheme())}
        className="rounded-lg border border-slate-300 p-2 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
      >
        {theme === "light" ? <Moon size={18} className="text-slate-700" /> : <Sun size={18} className="text-yellow-400" />}
      </button>
    </header>
  );

}