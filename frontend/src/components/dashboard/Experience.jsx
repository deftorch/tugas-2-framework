import React, { useState } from "react";
import api from "../../api";

export default function Experience({ profile, refresh }) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    start_date: "",
    end_date: "",
    is_current: false, 
  });

  const [loading, setLoading] = useState(false);

  if (!profile)
    return (
      <p className="text-red-500 font-semibold">
        Harap lengkapi Biodata terlebih dahulu.
      </p>
    );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckbox = (e) => {
    setFormData({
      ...formData,
      is_current: e.target.checked,
      end_date: e.target.checked ? "" : formData.end_date, 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.is_current && !formData.end_date) {
      alert("Harap isi Tanggal Selesai atau centang 'Masih Menjabat'");
      setLoading(false);
      return;
    }

    try {
      await api.post("/api/experiences/", {
        title: formData.title,
        company: formData.company,
        start_date: formData.start_date,
        end_date: formData.is_current ? null : formData.end_date,
      });

      setFormData({
        title: "",
        company: "",
        start_date: "",
        end_date: "",
        is_current: false,
      });

      alert("Pengalaman berhasil ditambahkan!");
      refresh(); 
    } catch (error) {
      console.error(error);
      alert("Gagal menambah pengalaman. Pastikan semua field terisi benar.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus pengalaman ini?")) return;

    try {
      await api.delete(`/api/experiences/${id}/`);
      refresh();
    } catch (error) {
      alert("Gagal menghapus data.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Sekarang";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Riwayat Organisasi & Pekerjaan
      </h2>

      <div className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-100">
        <h3 className="font-semibold text-lg mb-4 text-blue-900">
          Tambah Pengalaman Baru
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Posisi / Jabatan
              </label>
              <input
                type="text"
                name="title"
                placeholder="Contoh: Ketua Panitia, Staff Magang"
                value={formData.title}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Nama Organisasi / Perusahaan
              </label>
              <input
                type="text"
                name="company"
                placeholder="Contoh: BEM FKI, PT. Telkom"
                value={formData.company}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Tanggal Mulai
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Tanggal Selesai
              </label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                disabled={formData.is_current}
                className={`w-full border p-2 rounded ${
                  formData.is_current ? "bg-gray-200 text-gray-400" : ""
                }`}
              />
              <div className="mt-2 flex items-center">
                <input
                  type="checkbox"
                  id="currentJob"
                  checked={formData.is_current}
                  onChange={handleCheckbox}
                  className="mr-2"
                />
                <label
                  htmlFor="currentJob"
                  className="text-sm text-gray-700 select-none cursor-pointer"
                >
                  Masih menjabat / bekerja di sini
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition w-full md:w-auto font-medium"
          >
            {loading ? "Menyimpan..." : "+ Tambah Pengalaman"}
          </button>
        </form>
      </div>

      <h3 className="font-bold text-xl mb-4 border-b pb-2">Daftar Riwayat</h3>
      <div className="space-y-4">
        {profile.experiences && profile.experiences.length > 0 ? (
          profile.experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white border rounded-lg p-4 shadow-sm flex justify-between items-start hover:shadow-md transition"
            >
              <div>
                <h4 className="font-bold text-lg text-gray-800">{exp.title}</h4>
                <p className="text-blue-700 font-medium">{exp.company}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {formatDate(exp.start_date)} — {formatDate(exp.end_date)}
                </p>
              </div>
              <button
                onClick={() => handleDelete(exp.id)}
                className="text-red-500 bg-red-50 hover:bg-red-100 p-2 rounded text-sm font-semibold transition"
              >
                Hapus
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded border border-dashed border-gray-300">
            <p className="text-gray-500">
              Belum ada pengalaman yang ditambahkan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
