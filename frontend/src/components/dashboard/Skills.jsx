import React, { useState } from "react";
import api from "../../api";

export default function Skills({ profile, refresh }) {
  const [skillName, setSkillName] = useState("");

  if (!profile)
    return <p className="text-red-500">Harap isi biodata terlebih dahulu.</p>;

  const handleAddSkill = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/skills/", { name: skillName });
      setSkillName("");
      refresh();
    } catch (error) {
      alert("Gagal menambah skill");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus skill ini?")) return;
    try {
      await api.delete(`/api/skills/${id}/`);
      refresh();
    } catch (error) {
      alert("Gagal menghapus");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Kelola Skill</h2>

      <form onSubmit={handleAddSkill} className="flex gap-2 mb-6">
        <input
          className="border p-2 rounded flex-1"
          placeholder="Contoh: Python, Public Speaking"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          required
        />
        <button className="bg-green-600 text-white px-4 rounded">Tambah</button>
      </form>

      <div className="flex flex-wrap gap-2">
        {profile.skills &&
          profile.skills.map((skill) => (
            <div
              key={skill.id}
              className="bg-gray-100 px-3 py-1 rounded flex items-center gap-2"
            >
              <span>{skill.name}</span>
              <button
                onClick={() => handleDelete(skill.id)}
                className="text-red-500 font-bold hover:text-red-700"
              >
                ×
              </button>
            </div>
          ))}
        {(!profile.skills || profile.skills.length === 0) && (
          <p className="text-gray-500">Belum ada skill.</p>
        )}
      </div>
    </div>
  );
}
