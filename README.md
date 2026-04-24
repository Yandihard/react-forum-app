# 🚀 Forumify - Modern React Forum App

Forumify adalah aplikasi forum diskusi modern yang dibangun dengan **React**, **Redux**, dan **Tailwind CSS**. Aplikasi ini dirancang dengan prinsip *Clean Architecture* untuk memastikan skalabilitas dan kemudahan pemeliharaan kode, serta antarmuka pengguna yang premium dan responsif.

## ✨ Fitur Utama

- **🔐 Autentikasi Lengkap**: Sistem Login dan Register dengan validasi real-time dan notifikasi modern.
- **💬 Manajemen Diskusi**: Membuat, melihat, dan berpartisipasi dalam berbagai thread diskusi.
- **🔼 Voting System**: Dukungan untuk Upvote, Downvote, dan Neutralize pada setiap thread dan komentar.
- **🏆 Leaderboards**: Papan peringkat pengguna paling aktif berdasarkan kontribusi mereka.
- **👤 User Profile**: Halaman profil personal yang menampilkan informasi pengguna secara elegan.
- **🌓 Dark Mode**: Dukungan tema gelap/terang yang dinamis dan persisten.
- **📱 Responsive Design**: Optimal untuk tampilan mobile (dengan Bottom Navigation) hingga desktop.
- **🪄 Premium UI/UX**:
  - Efek **Glassmorphism** dan **Gradients**.
  - **Skeleton Loading** untuk pengalaman memuat data yang mulus.
  - **Global Modern Popups** untuk umpan balik sukses/gagal.
  - Animasi transisi yang halus.

## 🛠️ Teknologi yang Digunakan

- **Core**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [PostCSS](https://postcss.org/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Loading Progress**: [React Redux Loading Bar](https://github.com/mironov/react-redux-loading-bar)
- **SEO**: [React Helmet](https://github.com/nfl/react-helmet)

## 📁 Struktur Proyek (Clean Architecture)

Proyek ini mengikuti pola arsitektur bersih untuk memisahkan logika bisnis dari UI:

```text
src/
├── application/   # Logic Redux (Store, Actions, Reducers)
├── data/          # API Services & Data Mapping
├── domain/        # Business Entities (Models)
├── presentation/  # UI Components, Pages, Hooks, & Styling
└── App.jsx        # Root Component & Routing
```

## 🚀 Cara Menjalankan Secara Lokal

1. Clone repositori ini:
   ```bash
   git clone https://github.com/Yandihard/react-forum-app.git
   ```
2. Masuk ke direktori proyek:
   ```bash
   cd react-forum-app
   ```
3. Instal dependensi:
   ```bash
   npm install
   ```
4. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```

## 📄 Lisensi

Proyek ini dibuat untuk tujuan edukasi (Dicoding). Hak cipta © 2024.
