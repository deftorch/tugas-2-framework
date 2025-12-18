import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

import Biodata from "../components/dashboard/Biodata";
import Skill from "../components/dashboard/Skills";
import Experience from "../components/dashboard/Experience";
import Preview from "../components/dashboard/Preview";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("biodata");
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await api.get("/api/students/me/");
      setProfile(res.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setProfile(null);
      } else {
        console.error("Error fetching profile", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading)
    return <div className="p-10 text-center">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-white shadow-md flex-shrink-0 hidden md:block">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-blue-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Talenta Mahasiswa</p>
        </div>
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab("biodata")}
            className={`block w-full text-left p-2 rounded ${
              activeTab === "biodata"
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
          >
            Biodata & Foto
          </button>
          <button
            onClick={() => setActiveTab("skill")}
            className={`block w-full text-left p-2 rounded ${
              activeTab === "skill"
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
          >
            Skill
          </button>
          <button
            onClick={() => setActiveTab("experience")}
            className={`block w-full text-left p-2 rounded ${
              activeTab === "experience"
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
          >
            Pengalaman
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`block w-full text-left p-2 rounded ${
              activeTab === "preview"
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
          >
            Preview & CV
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left p-2 rounded text-red-600 hover:bg-red-50 mt-4 border-t"
          >
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white p-6 rounded-lg shadow">
          {activeTab === "biodata" && (
            <Biodata profile={profile} refresh={fetchProfile} />
          )}
          {activeTab === "skill" && (
            <Skill profile={profile} refresh={fetchProfile} />
          )}
          {activeTab === "experience" && (
            <Experience profile={profile} refresh={fetchProfile} />
          )}
          {activeTab === "preview" && <Preview profile={profile} />}
        </div>
      </main>
    </div>
  );
}
