# Laporan Pengujian Integrasi

## 1. Tujuan Pengujian
Memastikan bahwa Backend (Django REST Framework) dan Frontend (simulasi klien) terintegrasi dengan baik, khususnya pada fitur-fitur utama yang digunakan dalam User Journey mahasiswa.

## 2. Skenario Pengujian
Pengujian dilakukan menggunakan script otomatis yang meniru perilaku Frontend ReactJS terhadap API Backend. Skenario mencakup:
1.  **Registrasi User:** `POST /auth/users/`
2.  **Login (JWT):** `POST /auth/jwt/create/`
3.  **Fetch Profil User:** `GET /api/users/me/`
4.  **Create/Update Profil Mahasiswa:** `PATCH /api/students/me/` (atau `POST /api/students/` jika belum ada)
5.  **Menambah Skill:** `POST /api/skills/`
6.  **Melihat Daftar Publik:** `GET /api/students/` (Tanpa autentikasi)

## 3. Hasil Pengujian
| Langkah | Status | Keterangan |
| :--- | :---: | :--- |
| **Registrasi** | ✅ Berhasil | User berhasil dibuat atau terdeteksi sudah ada. |
| **Login** | ✅ Berhasil | Token JWT (Access & Refresh) berhasil diterima. |
| **Get User Info** | ✅ Berhasil | Data user (`username`, `email`) valid sesuai token. |
| **Update Profil** | ✅ Berhasil | Profil mahasiswa berhasil dibuat/diupdate dengan data (NIM, Prodi, Bio). |
| **Add Skill** | ✅ Berhasil | Skill baru berhasil ditambahkan ke profil. |
| **Public List** | ✅ Berhasil | Data mahasiswa muncul di endpoint publik tanpa token (akses guest). |

## 4. Analisis Teknis
- **Autentikasi:** Flow JWT berjalan lancar. Token yang dihasilkan valid untuk mengakses endpoint terproteksi (`/api/users/me/`, `/api/skills/`).
- **Permissions:** Endpoint publik `/api/students/` dapat diakses tanpa login (ReadOnly), sesuai dengan requirement pengunjung publik. Endpoint modifikasi data terlindungi dengan baik.
- **Data Persistence:** Data yang dikirim tersimpan di database SQLite dan dapat diambil kembali.

## 5. Kesimpulan
Backend dan Frontend (berdasarkan logika API yang diuji) **terintegrasi dengan baik**. API Endpoints merespons sesuai dengan format yang diharapkan oleh kode Frontend. Tidak ditemukan isu kritis yang menghambat fungsi utama aplikasi.
