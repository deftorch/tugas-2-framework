# Dokumentasi Teknis API & Struktur Kode

Dokumen ini berfungsi sebagai peta navigasi teknis untuk pengembang, menghubungkan fitur aplikasi dengan implementasi kode di backend (Django REST Framework) dan referensi API.

## 1. Dokumentasi API Interaktif
Proyek ini menggunakan `drf-spectacular` untuk menghasilkan dokumentasi API standar OpenAPI secara otomatis.

Jika server backend berjalan (biasanya di `http://localhost:8000`), Anda dapat mengakses dokumentasi lengkap beserta payload dan response-nya di:

*   **Swagger UI**: `http://localhost:8000/api/docs/` (Antarmuka interaktif untuk mencoba endpoint)
*   **Redoc**: `http://localhost:8000/api/redoc/` (Dokumentasi statis yang lebih rapi)
*   **Schema JSON/YAML**: `http://localhost:8000/api/schema/`

---

## 2. Peta Kode (Code Map)
Bagian ini menjelaskan file-file mana yang bertanggung jawab atas fitur-fitur utama aplikasi.

### Struktur Backend Utama
Kode backend utama terletak di folder `backend/api/`.

| Komponen | Lokasi File | Deskripsi |
| :--- | :--- | :--- |
| **URL Routing** | `backend/api/urls.py` | Mendaftarkan endpoint API dan menghubungkannya ke ViewSet. |
| **Models** | `backend/api/models.py` | Definisi struktur database (Tabel). |
| **Serializers** | `backend/api/serializers.py` | Mengubah data model menjadi JSON dan validasi input. |
| **Views / Logic** | `backend/api/views.py` | Logika bisnis utama API. |

### Pemetaan Fitur ke Kode

#### A. Profil Mahasiswa (Student Profile)
Mengelola data utama mahasiswa.
*   **Endpoint Base**: `/api/students/`
*   **Model**: `StudentProfile` (di `api/models.py`)
    *   Relasi `OneToOne` ke User.
*   **View**: `StudentViewSet` (di `api/views.py`)
    *   `get_queryset`: Mengatur logika filter agar publik hanya melihat profil aktif, tapi user sendiri bisa melihat profilnya walau non-aktif.
    *   `me` (Action): Menangani endpoint `/api/students/me/` untuk mengambil/edit profil user yang sedang login.
    *   `toggle_active`: Action khusus Admin untuk aktivasi profil.

#### B. Riwayat Pendidikan (Education)
*   **Endpoint Base**: `/api/educations/`
*   **Model**: `Education`
*   **View**: `EducationViewSet`
*   **Logic**: Memastikan data pendidikan tersimpan terkait dengan `StudentProfile` user yang sedang login.

#### C. Pengalaman (Experience)
*   **Endpoint Base**: `/api/experiences/`
*   **Model**: `Experience`
*   **View**: `ExperienceViewSet`

#### D. Keahlian (Skills)
*   **Endpoint Base**: `/api/skills/`
*   **Model**: `Skill`
*   **View**: `SkillViewSet`

#### E. Autentikasi (Auth)
Menggunakan library pihak ketiga `djoser` dan `simplejwt`.
*   **Konfigurasi**: Terletak di `backend/config/settings.py` dan `backend/config/urls.py`.
*   **Endpoints**:
    *   `/auth/users/` (Register)
    *   `/auth/jwt/create/` (Login/Get Token)
*   **Custom User Info**: Endpoint `/api/users/me/` (Function `get_current_user` di `api/views.py`) digunakan untuk mengambil detail user (seperti `is_staff`) yang tidak disediakan standar oleh JWT response.

---

## 3. Catatan Pengembangan
*   **Permission Classes**: Sebagian besar endpoint menggunakan `IsAuthenticated`. Profil publik menggunakan `IsAuthenticatedOrReadOnly` (atau logika custom di `get_queryset`).
*   **Image Upload**: `StudentProfile` menangani upload gambar (`profile_picture`). Pastikan folder `media/` dikonfigurasi dengan benar di server.
*   **Frontend Integration**: Frontend (React) berinteraksi dengan API ini menggunakan `axios` (lihat `frontend/src/api.js` jika ada, atau logika fetch di masing-masing komponen).
