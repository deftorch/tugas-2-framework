import React, { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/jwt/create/", formData);
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);

      // Fetch user info to check role
      const userRes = await api.get("/api/users/me/");
      const user = userRes.data;

      // Redirect based on role
      if (user.is_staff || user.is_superuser) {
        navigate("/admin/dashboard");
      } else {
        navigate("/mahasiswa");
      }
    } catch (error) {
      alert("Login Gagal! Cek username/password.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Login Mahasiswa</h1>
        <input
          className="w-full border p-2 mb-2 rounded"
          placeholder="Username"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <input
          className="w-full border p-2 mb-4 rounded"
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Masuk
        </button>
        <div className="text-center text-sm">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Daftar disini
          </Link>
        </div>
      </form>
    </div>
  );
}
