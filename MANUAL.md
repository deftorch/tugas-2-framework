# Panduan Manual Penggunaan & Instalasi (User Manual)

## Proyek: Aplikasi Talenta Mahasiswa UMS

Panduan ini berisi langkah-langkah untuk menginstal, menjalankan, dan menggunakan aplikasi secara lokal.

---

## 1. Persyaratan Sistem
Pastikan perangkat Anda sudah terinstal:
- **Python** (versi 3.8 atau lebih baru)
- **Node.js** (versi 16 atau lebih baru) & **npm**
- **Git**

---

## 2. Instalasi dan Setup Backend (Django)

1.  **Masuk ke direktori backend:**
    ```bash
    cd backend
    ```

2.  **Buat Virtual Environment (Opsional tapi disarankan):**
    ```bash
    python -m venv venv
    # Aktifkan (Windows)
    venv\Scripts\activate
    # Aktifkan (Linux/Mac)
    source venv/bin/activate
    ```

3.  **Instal Dependensi:**
    Jika ada `requirements.txt`, jalankan:
    ```bash
    pip install -r requirements.txt
    ```
    *Jika belum ada, instal manual paket utama:*
    ```bash
    pip install django djangorestframework django-cors-headers djoser djangorestframework-simplejwt pillow drf-spectacular
    ```

4.  **Migrasi Database:**
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

5.  **Jalankan Server Backend:**
    ```bash
    python manage.py runserver
    ```
    Server akan berjalan di `http://127.0.0.1:8000`.

---

## 3. Instalasi dan Setup Frontend (React)

1.  **Buka terminal baru dan masuk ke direktori frontend:**
    ```bash
    cd frontend
    ```

2.  **Instal Dependensi:**
    ```bash
    npm install
    ```

3.  **Jalankan Server Frontend (Development):**
    ```bash
    npm run dev
    ```
    Server biasanya berjalan di `http://localhost:5173`.

---

## 4. Fitur Utama & Cara Penggunaan

### A. Mahasiswa (Pencari Kerja/Talenta)
1.  **Registrasi:** Buka menu **Daftar**, isi form untuk membuat akun.
2.  **Login:** Masuk dengan username & password yang dibuat.
3.  **Isi CV:** Setelah login, Anda akan diarahkan ke dashboard "CV Builder".
    -   **Langkah 1 (Contact):** Isi data diri. **Penting:** Upload foto profil di sini agar kartu nama Anda menarik.
    -   **Langkah 2 (Experience):** Tambahkan pengalaman kerja/organisasi.
    -   **Langkah 3 (Education):** Tambahkan riwayat pendidikan.
    -   **Langkah 4 (Skills):** Tambahkan keahlian.
    -   **Langkah 5 (About):** Tulis ringkasan diri, link sosial media (LinkedIn/Github).
    -   **Langkah 6 (Finish):** Review CV Anda. Klik **Simpan Biodata ke Database** agar profil Anda muncul di halaman publik. Anda juga bisa **Download PDF**.

### B. Pengunjung Publik (Recruiter/Masyarakat)
1.  **Homepage:** Lihat daftar **Talenta Terbaru** (5 teratas) di halaman depan.
2.  **Pencarian:** Gunakan kolom cari untuk memfilter berdasarkan nama, prodi, atau skill.
3.  **Detail Talenta:** Klik pada kartu mahasiswa untuk melihat detail lengkap (Bio, Pengalaman, Skill).
4.  **Kontak:** Gunakan tombol Email atau LinkedIn di halaman detail untuk menghubungi mahasiswa.

### C. Admin (Moderasi)
1.  **Login Admin:** Gunakan akun superuser (buat dengan `python manage.py createsuperuser`).
2.  **Dashboard Admin:** Akses via `/admin/dashboard` (atau redirect otomatis jika role admin).
3.  **Kelola Status:** Admin dapat mengaktifkan/menonaktifkan profil mahasiswa agar tidak tampil di publik.
4.  **Export Data:** Fitur export data mahasiswa ke CSV.

---

## 5. Dokumentasi API
Backend menyediakan dokumentasi API otomatis yang dapat diakses saat server berjalan:
- **Swagger UI:** `http://127.0.0.1:8000/api/docs/`
- **Redoc:** `http://127.0.0.1:8000/api/redoc/`

---

## 6. Struktur Direktori
- `backend/` : Kode sumber Django (API, Database, Media).
- `frontend/` : Kode sumber React (UI, Pages, Components).
