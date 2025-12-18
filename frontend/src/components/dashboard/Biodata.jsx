import React, { useState, useEffect } from "react";
import api from "../../api";

export default function Biodata({ profile, refresh }) {
  const [formData, setFormData] = useState({
    nim: "",
    full_name: "",
    prodi: "",
    bio: "",
    linkedin_link: "",
    photo: null,
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        nim: profile.nim || "",
        full_name: profile.full_name || "",
        prodi: profile.prodi || "",
        bio: profile.bio || "",
        linkedin_link: profile.linkedin_link || "",
        photo: null,
      });
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nim", formData.nim);
    data.append("full_name", formData.full_name);
    data.append("prodi", formData.prodi);
    data.append("bio", formData.bio);
    if (formData.linkedin_link)
      data.append("linkedin_link", formData.linkedin_link);
    if (formData.photo) data.append("photo", formData.photo);

    try {
      if (profile) {
        await api.patch("/api/students/me/", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Profil berhasil diperbarui!");
      } else {
        await api.post("/api/students/", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Profil berhasil dibuat!");
      }
      refresh();
    } catch (error) {
      alert("Gagal menyimpan data. Cek inputan.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Biodata Diri</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="NIM"
            value={formData.nim}
            onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
            required
          />
          <input
            className="border p-2 rounded"
            placeholder="Nama Lengkap"
            value={formData.full_name}
            onChange={(e) =>
              setFormData({ ...formData, full_name: e.target.value })
            }
            required
          />
        </div>
        <input
          className="border p-2 rounded w-full"
          placeholder="Program Studi"
          value={formData.prodi}
          onChange={(e) => setFormData({ ...formData, prodi: e.target.value })}
          required
        />
        <textarea
          className="border p-2 rounded w-full h-24"
          placeholder="Deskripsi Singkat (Bio)"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        />
        <input
          className="border p-2 rounded w-full"
          placeholder="Link LinkedIn (Opsional)"
          value={formData.linkedin_link}
          onChange={(e) =>
            setFormData({ ...formData, linkedin_link: e.target.value })
          }
        />

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Foto Profil
          </label>
          <input
            type="file"
            onChange={(e) =>
              setFormData({ ...formData, photo: e.target.files[0] })
            }
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
