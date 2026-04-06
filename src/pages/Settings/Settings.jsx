import React,{useEffect, useState} from "react";
import  toast  from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Settings() {

  const role= useSelector((state) => state.role.currentRole);

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
    if (role !== "admin") {
      toast.error("Viewer cannot update settings");
      return;
    }
    localStorage.setItem("settings", JSON.stringify(form));
    toast.success("Settings saved!");
  }

  return (
    <div className="w-full p-4 md:p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-black"
      >
        <h2 className="text-xl font-semibold text-slate-900 dark:text-zinc-100">Settings</h2>
        <p className="mb-6 mt-1 text-sm text-slate-500 dark:text-zinc-400">
          Admin can update and save preferences.
        </p>

        <div className="space-y-4">
          <input
            name="company"
            value={form.company}
            onChange={saveForm}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={saveForm}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          />
          <select
            name="timezone"
            value={form.timezone}
            onChange={saveForm}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          >
            <option>Asia/Kolkata</option>
            <option>UTC</option>
            <option>America/New_York</option>
            <option>Europe/London</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}