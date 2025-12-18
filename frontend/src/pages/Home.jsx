import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get("/api/students/")
      .then((res) => {
        // Filter only active students (backup safety in case backend filter fails)
        const activeStudents = res.data.filter(student => student.is_active !== false);
        setStudents(activeStudents);
        setFilteredStudents(activeStudents);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    const results = students.filter(
      (student) =>
        student.full_name.toLowerCase().includes(query) ||
        student.prodi.toLowerCase().includes(query) ||
        student.skills.some((skill) => skill.name.toLowerCase().includes(query))
    );
    setFilteredStudents(results);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-900 text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="font-bold text-2xl tracking-tight">Talenta UMS</h1>
          <div>
            <Link
              to="/login"
              className="text-white hover:text-blue-200 mr-4 font-medium"
            >
              Login Mahasiswa
            </Link>
            <Link
              to="/register"
              className="bg-white text-blue-900 px-4 py-2 rounded font-bold hover:bg-gray-100 transition"
            >
              Daftar
            </Link>
          </div>
        </div>
      </nav>

      <header className="bg-blue-800 text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Temukan Talenta Terbaik UMS
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Platform showcase portofolio mahasiswa Universitas Muhammadiyah
            Surakarta. Cari partner project atau kandidat profesional di sini.
          </p>

          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Cari nama, prodi, atau skill..."
              className="w-full p-4 rounded-full text-gray-800 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto p-8">
        {search === "" && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-600 pl-4">
              Talenta Terbaru
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {students.slice(0, 3).map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-gray-400 pl-4">
            {search ? `Hasil Pencarian "${search}"` : "Jelajahi Semua Talenta"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
            {filteredStudents.length === 0 && (
              <p className="text-gray-500 col-span-full text-center py-10">
                Tidak ditemukan talenta yang cocok.
              </p>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-gray-400 text-center py-6 mt-10">
        <p>&copy; 2025 Miaw. All rights reserved.</p>
      </footer>
    </div>
  );
}

function StudentCard({ student }) {
  return (
    <Link
      to={`/talent/${student.id}`}
      className="block bg-white rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden group"
    >
      <div className="h-48 overflow-hidden bg-gray-200">
        {student.photo ? (
          <img
            src={student.photo}
            alt={student.full_name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Photo
          </div>
        )}
      </div>
      <div className="p-4">
        <h4 className="font-bold text-lg text-gray-800 truncate">
          {student.full_name}
        </h4>
        <p className="text-blue-600 text-sm mb-2">{student.prodi}</p>
        <div className="flex flex-wrap gap-1 mt-2 h-16 overflow-hidden content-start">
          {student.skills.slice(0, 3).map((skill) => (
            <span
              key={skill.id}
              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
            >
              {skill.name}
            </span>
          ))}
          {student.skills.length > 3 && (
            <span className="text-xs text-gray-400 px-1">
              +{student.skills.length - 3} lainnya
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
