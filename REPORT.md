# Laporan Analisis Proyek Talenta Mahasiswa UMS

## 1. Ringkasan Eksekutif
Proyek ini adalah aplikasi web "Talenta Mahasiswa UMS" yang bertujuan untuk menampilkan profil dan portofolio mahasiswa. Aplikasi ini dibangun dengan arsitektur **Backend-Frontend terpisah** menggunakan **Django REST Framework (DRF)** dan **ReactJS (Vite)**. Secara umum, aplikasi telah memenuhi sebagian besar persyaratan fungsional dan teknis yang ditetapkan, dengan struktur kode yang rapi dan implementasi fitur yang lengkap.

## 2. Analisis Backend
### a. Arsitektur dan Teknologi
- **Framework:** Django REST Framework (DRF) digunakan dengan benar.
- **Autentikasi:** Implementasi JWT (JSON Web Token) menggunakan `djoser` dan `djangorestframework-simplejwt` telah dikonfigurasi dengan baik.
- **Database:** Menggunakan SQLite (sesuai persyaratan "bebas", meskipun PostgreSQL direkomendasikan untuk produksi).

### b. Model Data
Struktur database (`backend/api/models.py`) mencakup entitas utama:
- `StudentProfile`: Menyimpan biodata, foto, dan status aktif.
- `Skill`: Relasi One-to-Many dengan StudentProfile.
- `Experience`: Relasi One-to-Many dengan StudentProfile.
Desain model relasional sudah tepat dan mendukung fitur yang diminta.

### c. API Endpoints
- CRUD lengkap untuk skill dan experience.
- Endpoint khusus `me` untuk manajemen profil sendiri.
- Endpoint publik untuk daftar mahasiswa (`/api/students/`).
- Fitur admin (`toggle_active`) diimplementasikan dengan benar.

### d. Keamanan & Kualitas Kode
- Penggunaan `IsAuthenticated` dan `IsAuthenticatedOrReadOnly` permissions sudah tepat untuk membatasi akses.
- Tidak ditemukan *hardcoded credentials* yang fatal, namun `SECRET_KEY` di `settings.py` sebaiknya tidak di-commit ke repositori publik di lingkungan produksi nyata (gunakan `.env`).
- **Testing:** File `tests.py` ada tetapi **kosong**. Tidak ada unit test yang ditulis. Ini adalah area utama untuk perbaikan.

## 3. Analisis Frontend
### a. Arsitektur dan Teknologi
- Menggunakan **React** dengan **Vite** sebagai build tool.
- Manajemen state menggunakan **Context API** (`CVContext.jsx`) untuk mengelola data form CV yang kompleks antar komponen (wizard step).
- **Routing:** Menggunakan `react-router-dom` dengan struktur rute yang jelas.

### b. Fitur & UI/UX
- **User Journey:** Alur pendaftaran, login, pengisian CV (wizard), hingga preview dan download CV telah diimplementasikan.
- **Desain:** Menggunakan Tailwind CSS (terlihat dari konfigurasi) untuk styling yang responsif.
- **Bug Fix:** Ditemukan kesalahan penulisan impor komponen (`Preview` vs `preview`) yang menyebabkan gagal build di lingkungan case-sensitive (Linux). Isu ini telah diperbaiki.

## 4. Kepatuhan terhadap Persyaratan
| Persyaratan | Status | Catatan |
| :--- | :---: | :--- |
| Arsitektur Terpisah | ✅ | Backend & Frontend terpisah direktori |
| REST API (DRF) | ✅ | Terimplementasi dengan baik |
| Autentikasi JWT | ✅ | Menggunakan Djoser & SimpleJWT |
| ReactJS & State Mgmt | ✅ | Context API digunakan efektif |
| Fitur Mahasiswa | ✅ | CRUD Profil, Skill, Pengalaman, PDF |
| Fitur Admin (Opsional) | ✅ | Toggle status aktif mahasiswa |
| Fitur Publik | ✅ | List & Detail talenta |
| Deployment | ⚠️ | Belum diverifikasi (perlu URL live) |

## 5. Kesimpulan dan Penilaian
Secara keseluruhan, tugas ini dikerjakan dengan **Sangat Baik**.
- **Kelebihan:** Struktur kode rapi, fitur lengkap (termasuk bonus admin/toggle status), penggunaan Context API yang tepat di React.
- **Kekurangan:** Tidak ada unit testing di backend (`tests.py` kosong).

**Rekomendasi:**
1.  Tambahkan unit test untuk backend, terutama untuk memastikan permission API berjalan sesuai harapan.
2.  Gunakan environment variables untuk `SECRET_KEY` dan kredensial database sebelum deploy ke production.
3.  Pastikan nama file dan import konsisten (PascalCase untuk komponen React) untuk menghindari masalah di sistem operasi yang berbeda (sudah diperbaiki satu kasus).
