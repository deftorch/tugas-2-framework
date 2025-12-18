import Sidebar from "./sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar khusus admin */}
      <Sidebar />

      {/* Konten admin */}
      <main className="ml-64 p-6 w-full min-h-screen bg-gray-100">
        {children}
      </main>
    </div>
  );
}
