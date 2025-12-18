import { useState } from "react";
import Sidebar from "./sidebar";

export default function AdminLayout({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar expanded={expanded} setExpanded={setExpanded} />

      {/* Konten admin */}
      <main
        className={`
          transition-all duration-300 ease-in-out
          ${expanded ? "ml-72" : "ml-20"}
          p-6 w-full min-h-screen bg-gray-100
        `}
      >
        <h1>andhika klaten</h1>
        {children}
      </main>
    </div>
  );
}
