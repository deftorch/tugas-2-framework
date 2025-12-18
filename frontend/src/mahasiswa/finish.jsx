import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useCV } from "./CVContext";
import Preview from "./Preview";
import api from "../api";

export default function FinishForm({ handleLogout }) {
  const { state, prevStep, setStep, updateContact } = useCV();
  const { contact, experience, education, skills, about } = state;
  const previewRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'success' | 'error' | null

  const handlePrint = useReactToPrint({
    contentRef: previewRef,
    documentTitle:
      `CV_${contact.firstName}_${contact.lastName}`.replace(/\s+/g, "_") ||
      "My_CV",
    pageStyle: `
            @page {
                size: 215.9mm 330mm;
                margin: 0;
            }
            @media print {
                html, body {
                    width: 215.9mm;
                    height: 330mm;
                    margin: 0;
                    padding: 0;
                }
            }
        `,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateContact({ [name]: value });
  };

  // Save biodata to backend
  const handleSaveBiodata = async () => {
    setIsSaving(true);
    setSaveStatus(null);

    try {
      const fullName = `${contact.firstName} ${contact.lastName}`.trim();

      // Save/update student profile
      const profileData = {
        full_name: fullName,
        nim: about.nim || contact.nim || "",
        prodi: about.prodi || contact.prodi || "Informatika",
        bio: about.summary || "",
        linkedin_link: contact.linkedin || "",
      };

      // Try to update existing profile first, if not exist create new
      try {
        await api.patch("/api/students/me/", profileData);
      } catch (err) {
        // If profile doesn't exist, create new one
        if (err.response && err.response.status === 404) {
          await api.post("/api/students/", profileData);
        } else {
          throw err;
        }
      }

      // Save skills
      for (const skill of skills) {
        if (skill.name) {
          try {
            await api.post("/api/skills/", { name: skill.name });
          } catch (skillErr) {
            // Skip if skill already exists
            console.log("Skill may already exist:", skill.name);
          }
        }
      }

      // Save experiences
      for (const exp of experience) {
        if (exp.employer && exp.jobTitle) {
          try {
            await api.post("/api/experiences/", {
              title: exp.jobTitle,
              company: exp.employer,
              start_date: exp.startDate || "2024-01-01",
              end_date: exp.current ? null : exp.endDate || "2024-12-31",
              description: exp.description || "",
            });
          } catch (expErr) {
            console.log("Experience may already exist:", exp.jobTitle);
          }
        }
      }

      setSaveStatus("success");
      alert(
        "✅ Biodata berhasil disimpan! Data Anda akan muncul di halaman Talenta Terbaru."
      );
    } catch (error) {
      console.error("Error saving biodata:", error);
      setSaveStatus("error");
      // UBAH BARIS DI BAWAH INI:
      const errorMsg = error.response?.data
        ? JSON.stringify(error.response.data)
        : "Gagal menyimpan biodata. Pastikan Anda sudah login.";
      alert(`❌ Error: ${errorMsg}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Summary counts
  const experienceCount = experience.length;
  const educationCount = education.length;
  const skillsCount = skills.length;
  const hasSummary = about.summary?.trim().length > 0;
  const hasContact = contact.firstName || contact.lastName || contact.email;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          <span className="text-[#2596be]">🎉 Great job!</span> Your CV is ready
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Review your CV, add optional details, and download it as a PDF.
        </p>
      </div>

      {/* Optional Personal Details */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Optional Personal Details
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          These fields are optional and will be shown in the CV sidebar.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {/* Nationality */}
          <div>
            <label
              htmlFor="nationality"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nationality
            </label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              value={contact.nationality}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2596be] focus:border-[#2596be] outline-none transition-all"
              placeholder=""
            />
          </div>

          {/* Visa Status */}
          <div>
            <label
              htmlFor="visaStatus"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Visa Status
            </label>
            <select
              id="visaStatus"
              name="visaStatus"
              value={contact.visaStatus}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2596be] focus:border-[#2596be] outline-none transition-all"
            >
              <option value="">Select...</option>
              <option value="Citizen">Citizen</option>
              <option value="Permanent Resident">Permanent Resident</option>
              <option value="Work Visa">Work Visa</option>
              <option value="Student Visa">Student Visa</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Marital Status */}
          <div>
            <label
              htmlFor="maritalStatus"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Marital Status
            </label>
            <select
              id="maritalStatus"
              name="maritalStatus"
              value={contact.maritalStatus}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2596be] focus:border-[#2596be] outline-none transition-all"
            >
              <option value="">Select...</option>
              <option value="Single">Single / Lajang</option>
              <option value="Married">Married / Menikah</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-[#2596be]/10 to-blue-50 p-6 rounded-xl border border-[#2596be]/20">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">CV Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-[#2596be]">
              {hasContact ? "✓" : "—"}
            </div>
            <div className="text-sm text-gray-600">Contact Info</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-[#2596be]">
              {experienceCount}
            </div>
            <div className="text-sm text-gray-600">Experience(s)</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-[#2596be]">
              {educationCount}
            </div>
            <div className="text-sm text-gray-600">Education(s)</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-[#2596be]">
              {skillsCount}
            </div>
            <div className="text-sm text-gray-600">Skill(s)</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-[#2596be]">
              {hasSummary ? "✓" : "—"}
            </div>
            <div className="text-sm text-gray-600">Summary</div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="pt-4">
        <button
          onClick={handlePrint}
          className="w-full flex items-center justify-center gap-3 bg-[#2596be] hover:bg-[#1e7a9a] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download CV as PDF
        </button>
      </div>

      {/* Simpan Biodata Button */}
      <div className="pt-2">
        <button
          onClick={handleSaveBiodata}
          disabled={isSaving}
          className={`w-full flex items-center justify-center gap-3 ${
            saveStatus === "success"
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
          } text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSaving ? (
            <>
              <svg
                className="animate-spin h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Menyimpan...
            </>
          ) : saveStatus === "success" ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Biodata Tersimpan!
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              Simpan Biodata ke Database
            </>
          )}
        </button>
        <p className="text-xs text-gray-500 text-center mt-2">
          💾 Data akan ditampilkan di halaman "Talenta Terbaru"
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>

        {handleLogout && (
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 bg-[#dc3545] hover:bg-[#c82333] text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Log Out
          </button>
        )}
      </div>

      {/* Hidden Preview for Print */}
      <div className="hidden">
        <Preview ref={previewRef} forPrint={true} />
      </div>
    </div>
  );
}
