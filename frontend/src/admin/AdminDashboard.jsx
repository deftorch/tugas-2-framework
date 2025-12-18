import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Sidebar from "./sidebar";
import { FiChevronRight, FiSearch, FiDownload, FiFilter, FiChevronDown } from "react-icons/fi";

export default function AdminDashboard() {
    const [expanded, setExpanded] = useState(true);
    const [user, setUser] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [togglingId, setTogglingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("default");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check if user is admin
                const userRes = await api.get("/api/users/me/");
                if (!userRes.data.is_staff && !userRes.data.is_superuser) {
                    navigate("/dashboard");
                    return;
                }
                setUser(userRes.data);

                // Fetch all students
                const studentsRes = await api.get("/api/students/");
                setStudents(studentsRes.data);
            } catch (error) {
                console.error("Error fetching data", error);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [navigate]);

    const toggleStudentActive = async (studentId, e) => {
        e.stopPropagation();
        setTogglingId(studentId);
        try {
            const res = await api.post(`/api/students/${studentId}/toggle_active/`);
            setStudents(students.map(s =>
                s.id === studentId ? { ...s, is_active: res.data.is_active } : s
            ));

            // Update selected student if it's the one being toggled
            if (selectedStudent?.id === studentId) {
                setSelectedStudent(prev => ({ ...prev, is_active: res.data.is_active }));
            }
        } catch (error) {
            console.error("Error toggling student status", error);
        } finally {
            setTogglingId(null);
        }
    };

    const handleCardClick = (student) => {
        setSelectedStudent(selectedStudent?.id === student.id ? null : student);
    };

    const handleExport = () => {
        const headers = ["ID", "Name", "NIM", "Prodi", "Status"];
        const csvContent = [
            headers.join(","),
            ...filteredStudents.map(s => [
                s.id,
                `"${s.full_name}"`,
                s.nim,
                `"${s.prodi}"`,
                s.is_active !== false ? "Active" : "Inactive"
            ].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "students_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Filter and Sort Logic
    const filteredStudents = students.filter(student => {
        const term = searchTerm.toLowerCase();
        // SEARCH ONLY BY NAME
        return student.full_name?.toLowerCase().includes(term);
    }).sort((a, b) => {
        if (sortOrder === "asc") {
            return a.full_name.localeCompare(b.full_name);
        } else if (sortOrder === "desc") {
            return b.full_name.localeCompare(a.full_name);
        } else if (sortOrder === "active_first") {
            // Active (true) first, then Inactive (false)
            return (b.is_active === false ? 0 : 1) - (a.is_active === false ? 0 : 1);
        } else if (sortOrder === "inactive_first") {
            // Inactive (false) first, then Active (true)
            return (a.is_active === false ? 0 : 1) - (b.is_active === false ? 0 : 1);
        }
        return 0;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar expanded={expanded} setExpanded={setExpanded} />

            {/* Main Content */}
            <main
                className={`
                    transition-all duration-300 ease-in-out
                    ${expanded ? "ml-72" : "ml-20"}
                    flex-1 bg-gray-100 p-8
                `}
            >
                {/* Header */}
                <div className="max-w-4xl mx-auto mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                    <p className="text-gray-600">Selamat datang, {user?.username}</p>
                </div>

                {/* Controls */}
                <div className="max-w-4xl mx-auto mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Search with Integrated Count */}
                    <div className="relative w-full md:w-1/2">
                        <div className="relative">
                            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-12 pr-20 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium text-sm">
                                {filteredStudents.length} CV
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 items-center">
                        {/* Export */}
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        >
                            <FiDownload className="text-lg" />
                            Export
                        </button>

                        {/* Custom Sort Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors"
                            >
                                <FiFilter className="text-gray-500" />
                                <span className="font-medium text-gray-700 min-w-[100px] text-left">
                                    {sortOrder === "default" && "Sort: Default"}
                                    {sortOrder === "asc" && "Name (A-Z)"}
                                    {sortOrder === "desc" && "Name (Z-A)"}
                                    {sortOrder === "active_first" && "Active First"}
                                    {sortOrder === "inactive_first" && "Inactive First"}
                                </span>
                                <FiChevronDown className={`text-gray-400 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isSortOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setIsSortOpen(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-20 overflow-hidden">
                                        <div className="py-1">
                                            {[
                                                { value: "default", label: "Sort: Default" },
                                                { value: "asc", label: "Name (A-Z)" },
                                                { value: "desc", label: "Name (Z-A)" },
                                                { value: "active_first", label: "Active First" },
                                                { value: "inactive_first", label: "Inactive First" }
                                            ].map((option) => (
                                                <button
                                                    key={option.value}
                                                    className={`
                                                        w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors
                                                        ${sortOrder === option.value ? 'text-blue-600 font-bold bg-blue-50' : 'text-gray-700'}
                                                    `}
                                                    onClick={() => {
                                                        setSortOrder(option.value);
                                                        setIsSortOpen(false);
                                                    }}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Student Cards */}
                <div className="max-w-4xl mx-auto space-y-4">
                    {filteredStudents.map((student) => (
                        <div
                            key={student.id}
                            onClick={() => handleCardClick(student)}
                            className={`
                                bg-white rounded-2xl px-6 py-4 flex items-center gap-4 cursor-pointer
                                transition-all duration-200 hover:shadow-lg border-2
                                ${student.is_active === false ? 'border-red-300 opacity-60' : 'border-transparent'}
                                ${selectedStudent?.id === student.id ? 'ring-2 ring-blue-500' : ''}
                            `}
                        >
                            {/* Avatar */}
                            {student.photo ? (
                                <img
                                    src={student.photo}
                                    alt={student.full_name}
                                    className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                                />
                            ) : (
                                <div className="w-14 h-14 rounded-full bg-[#2596be] flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold text-xl">
                                        {student.full_name?.charAt(0)?.toUpperCase() || 'M'}
                                    </span>
                                </div>
                            )}

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-gray-900 truncate">
                                    {student.full_name || 'Mahasiswa'}
                                </h3>
                                <p className="text-gray-500 text-sm truncate">
                                    {student.bio || student.prodi || 'Deskripsi singkat'}
                                </p>
                            </div>

                            {/* Toggle Switch */}
                            <button
                                onClick={(e) => toggleStudentActive(student.id, e)}
                                disabled={togglingId === student.id}
                                className={`
                                    relative w-12 h-6 rounded-full transition-colors duration-200 flex-shrink-0
                                    ${student.is_active !== false ? 'bg-green-500' : 'bg-gray-400'}
                                    ${togglingId === student.id ? 'opacity-50' : ''}
                                `}
                                title={student.is_active !== false ? 'Klik untuk nonaktifkan' : 'Klik untuk aktifkan'}
                            >
                                <span
                                    className={`
                                        absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow
                                        ${student.is_active !== false ? 'left-7' : 'left-1'}
                                    `}
                                />
                            </button>

                            {/* Chevron */}
                            <FiChevronRight className="text-gray-400 text-2xl flex-shrink-0" />
                        </div>
                    ))}

                    {filteredStudents.length === 0 && (
                        <div className="bg-white rounded-2xl p-8 text-center text-gray-500">
                            Belum ada data mahasiswa
                        </div>
                    )}
                </div>

                {/* Student Detail Panel */}
                {selectedStudent && (
                    <div className="max-w-4xl mx-auto mt-6 bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-start gap-6">
                            {selectedStudent.photo ? (
                                <img
                                    src={selectedStudent.photo}
                                    alt={selectedStudent.full_name}
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-[#2596be] flex items-center justify-center">
                                    <span className="text-white font-bold text-3xl">
                                        {selectedStudent.full_name?.charAt(0)?.toUpperCase() || 'M'}
                                    </span>
                                </div>
                            )}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {selectedStudent.full_name}
                                    </h2>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedStudent.is_active !== false
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                        {selectedStudent.is_active !== false ? 'Aktif' : 'Nonaktif'}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-1">NIM: {selectedStudent.nim}</p>
                                <p className="text-gray-600 mb-1">Prodi: {selectedStudent.prodi}</p>
                                <p className="text-gray-600 mb-3">{selectedStudent.bio}</p>

                                {selectedStudent.skills?.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {selectedStudent.skills.map((skill) => (
                                            <span
                                                key={skill.id}
                                                className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                                            >
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
