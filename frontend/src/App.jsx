import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TalentDetail from "./pages/TalentDetail";
import AdminDashboard from "./admin/AdminDashboard";
import CVBuilder from "./mahasiswa/CVBuilder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/talent/:id" element={<TalentDetail />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/mahasiswa" element={<CVBuilder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
