# Fitur Proyek Talenta Mahasiswa UMS

Dokumen ini menjelaskan fitur-fitur utama yang tersedia dalam aplikasi Talenta Mahasiswa UMS, baik dari sisi pengguna (Mahasiswa/Publik) maupun Administrator.

## 1. Autentikasi & Manajemen Pengguna
Sistem menggunakan autentikasi berbasis JWT (JSON Web Tokens) untuk keamanan.

*   **Registrasi Akun**: Pengguna baru dapat mendaftar akun.
*   **Login**: Pengguna masuk menggunakan username dan password untuk mendapatkan token akses.
*   **Role Based Access**:
    *   **Mahasiswa**: Dapat mengisi data diri dan membangun CV.
    *   **Admin**: Memiliki akses ke dashboard admin untuk mengelola data.

## 2. Fitur Mahasiswa (CV Builder)
Fitur utama bagi mahasiswa untuk membangun profil profesional mereka. Jika mahasiswa belum memiliki profil, mereka akan diarahkan langsung ke halaman ini setelah login.

### a. Pengisian Biodata Diri (Biodata)
Mahasiswa dapat mengisi informasi pribadi yang lengkap:
*   Foto Profil
*   Nama Lengkap, NIM, Prodi
*   Kontak (Email, No HP, LinkedIn)
*   Informasi Tambahan (Kota Domisili, Kebangsaan, Status Pernikahan, Status Visa)
*   Ringkasan Diri (Summary)

### b. Riwayat Pendidikan (Education)
Mahasiswa dapat menambahkan riwayat pendidikan formal:
*   Nama Institusi
*   Gelar/Degree
*   Bidang Studi
*   Tanggal Mulai & Selesai
*   Deskripsi

### c. Pengalaman Kerja/Organisasi (Experience)
Mahasiswa dapat menambahkan pengalaman profesional atau organisasi:
*   Posisi/Jabatan
*   Nama Perusahaan/Organisasi
*   Lokasi
*   Tanggal Mulai & Selesai
*   Deskripsi Tanggung Jawab

### d. Keahlian (Skills)
Mahasiswa dapat mendaftarkan keahlian (hard skill/soft skill) dan memberikan tingkat kemahiran (misal: "Beginner", "Intermediate", "Expert").

### e. Preview & Edit
*   **Preview**: Melihat tampilan akhir profil/CV seperti yang akan dilihat oleh publik.
*   **Edit**: Mengubah data yang sudah tersimpan. Frontend membedakan antara data baru (create) dan data lama (update).

## 3. Fitur Publik (Pencarian Bakat)
Halaman depan aplikasi yang dapat diakses oleh siapa saja (atau pengguna terdaftar tergantung konfigurasi izin).

*   **Daftar Talent**: Menampilkan kartu profil mahasiswa yang aktif.
*   **Pencarian & Filter**: Mencari mahasiswa berdasarkan nama, prodi, atau skill.
*   **Detail Talent**: Melihat profil lengkap mahasiswa (`/talent/:id`), termasuk pendidikan, pengalaman, dan skill.

## 4. Fitur Administrator
Fitur khusus untuk pengelola sistem.

*   **Dashboard Admin**: Ringkasan data sistem.
*   **Manajemen Status Aktif**: Admin dapat mengaktifkan atau menonaktifkan profil mahasiswa agar muncul atau disembunyikan dari daftar publik (Endpoint `toggle_active`).

## 5. Fitur Teknis Lainnya
*   **API Documentation**: Tersedia dokumentasi Swagger UI dan Redoc secara otomatis.
*   **Responsive Design**: Antarmuka frontend dibangun menggunakan React dan Tailwind CSS yang responsif untuk berbagai perangkat.
