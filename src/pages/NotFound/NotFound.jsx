import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
     return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3">
            <h2 className="text-3xl font-bold">404</h2>
            <p className="text-slate-500">Page not found</p>
            <Link to="/" className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                Back to Dashboard
            </Link>
        </div>
  );
}