import { set } from "date-fns";
import React,{useEffect, useState} from "react";
import { toast } from "react-hot-toast";

export default function Settings() {
  const [form,setForm]=useState(
    {
      company:"MRB",
      email:"admin@MRBfine.com",
      timezone:"Asia/Kolkata",
    }
  )

  useEffect(() => {
    const saved = localStorage.getItem("settings");
    if (saved){
      setForm(JSON.parse(saved));
    }
  },[])


  const saveForm=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  }

  const submit=(e)=>{
    e.preventDefault();
    localStorage.setItem("settings", JSON.stringify(form));
    toast.success("Settings saved!");
  }

  return (
    <div className="p-4 md:p-6">
      <form className="max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900" onSubmit={submit}>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Settings</h2>
        <p className="mb-6 mt-1 text-sm text-slate-500 dark:text-slate-400">Saved in localStorage</p>

        <div className="space-y-4">
          <input name="company" value={form.company} onChange={saveForm} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
          <input name="email" type="email" value={form.email} onChange={saveForm} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
          <select name="timezone" value={form.timezone} onChange={saveForm} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
            <option>Asia/Kolkata</option>
            <option>UTC</option>
            <option>America/New_York</option>
            <option>Europe/London</option>
          </select>
        </div>

        <button type="submit" className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </div>
  );
}