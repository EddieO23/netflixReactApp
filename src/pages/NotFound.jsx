import React from "react";
import { Link } from "react-router-dom";

function NotFound({ content = "Oops. Page not found..." }) {
  return (
    <div className="flex-cols flex min-h-screen items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-2xl text-gray-200">{content}</p>
        <Link
          to={"/"}
          className="mt-6 inline-block rounded-lg bg-slate-700 px-6 py-4 text-white transition-colors hover:bg-slate-900"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
