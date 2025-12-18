import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

export default function TalentDetail() {
  const { id } = useParams(); 
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/api/students/${id}/`)
      .then((res) => {
        setStudent(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center p-10">Loading Profil...</div>;
  if (!student)
    return <div className="text-center p-10">Mahasiswa tidak ditemukan.</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="bg-white shadow p-4 mb-8">
        <div className="container mx-auto">
          <Link to="/" className="text-blue-600 font-semibold hover:underline">
            ← Kembali ke Home
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-gray-200 h-64 md:h-auto">
            {student.photo ? (
              <img
                src={student.photo}
                alt={student.full_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold text-xl">
                NO FOTO
              </div>
            )}
          </div>
          <div className="p-8 md:w-2/3">
            <h1 className="text-3xl font-bold text-gray-900">
              {student.full_name}
            </h1>
            <p className="text-xl text-blue-600 font-medium mb-4">
              {student.prodi}
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              {student.bio || "Belum ada deskripsi diri."}
            </p>

            <div className="flex gap-3">
              {student.email && (
                <a
                  href={`mailto:${student.email}`}
                  className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
                >
                  Kirim Email
                </a>
              )}
              {student.linkedin_link && (
                <a
                  href={student.linkedin_link}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gray-800 text-white px-6 py-2 rounded shadow hover:bg-gray-900 transition"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-bold border-b pb-2 mb-4">
            Keahlian (Skills)
          </h2>
          <div className="flex flex-wrap gap-2">
            {student.skills &&
              student.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill.name}
                </span>
              ))}
            {(!student.skills || student.skills.length === 0) && (
              <p className="text-gray-500">-</p>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-bold border-b pb-2 mb-4">Pengalaman</h2>
          <div className="space-y-6">
            {student.experiences &&
              student.experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-start"
                >
                  <div>
                    <h3 className="font-bold text-lg">{exp.title}</h3>
                    <p className="text-gray-700">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded mt-2 sm:mt-0 inline-block">
                    {exp.start_date} — {exp.end_date || "Sekarang"}
                  </span>
                </div>
              ))}
            {(!student.experiences || student.experiences.length === 0) && (
              <p className="text-gray-500">Belum ada data pengalaman.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
