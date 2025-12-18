import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.re_password) {
      alert("Password dan Konfirmasi Password tidak sama!");
      setIsLoading(false);
      return;
    }

    try {
      await api.post("/auth/users/", formData);

      alert("Registrasi Berhasil! Silakan Login.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        const firstError = Object.values(errorData)[0];
        alert(`Gagal: ${firstError}`);
      } else {
        alert("Terjadi kesalahan saat registrasi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center ">
          Daftar Akun Baru
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              required
              className="mt-1 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="mt-1 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              *Minimal 8 karakter, jangan terlalu umum
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Konfirmasi Password
            </label>
            <input
              type="password"
              name="re_password"
              required
              className="mt-1 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white p-2 rounded font-semibold transition ${
              isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Memproses..." : "Daftar Sekarang"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login disini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
