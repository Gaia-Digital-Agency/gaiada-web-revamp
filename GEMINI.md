# Project: GaiaDa Web Revamp

## 📌 Overview
Proyek ini adalah revamp website GaiaDa menggunakan arsitektur Headless CMS. Menggabungkan fleksibilitas Payload CMS sebagai backend dan kecepatan Next.js sebagai frontend dalam satu monorepo (Payload Next.js Integration).

## 🛠 Tech Stack
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **CMS**: [Payload CMS 3.80](https://payloadcms.com/)
- **Database**: PostgreSQL 18 (Native installation)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Radix UI
- **Animations**: GSAP, Framer Motion, Lenis (Smooth Scroll)
- **Package Manager**: pnpm

## 🏗 Architecture & Flow
- **Single Instance**: Payload CMS berjalan di dalam aplikasi Next.js menggunakan `@payloadcms/next`.
- **Database Connection**: Menggunakan `@payloadcms/db-postgres`. Database berjalan secara native di server (bukan Docker).
- **Media Management**: Upload file dikelola melalui koleksi `Media` dengan dukungan optimasi gambar otomatis dari Payload & Sharp.
- **Dynamic Layouts**: Menggunakan fitur **Blocks** pada Payload CMS. Halaman dibangun secara modular di Admin UI dan dirender secara dinamis di frontend menggunakan komponen `RenderBlocks`.
- **Preview System**: Mendukung Draft Preview dan Live Preview untuk memvalidasi konten sebelum dipublikasikan.
- **Revalidation**: Menggunakan On-demand Revalidation Next.js untuk memperbarui cache frontend secara otomatis saat konten di CMS berubah.

## 📂 Directory Structure
- `src/app/(frontend)`: Kode aplikasi Next.js (Page, Components, Layout).
- `src/app/(payload)`: Konfigurasi dan endpoint admin panel Payload CMS.
- `src/collections`: Definisi skema database/koleksi (Posts, Pages, Media, Team, dll).
- `src/blocks`: Definisi dan komponen UI untuk layout builder blocks.
- `src/globals`: Pengaturan global seperti Header, Footer, dan Site Settings.
- `src/fields`: Reusable fields untuk Payload CMS (e.g., Lexical editor, color picker).
- `scripts/`: Utility scripts untuk seeding, migrasi, dan testing database.

## 💾 Database & Migrations
- **Environment**: Development menggunakan `push: true` di config database untuk sinkronisasi skema otomatis.
- **Production**: Harus menggunakan migrasi manual.
  - `pnpm payload migrate:create` (Buat migrasi baru)
  - `pnpm payload migrate` (Jalankan migrasi yang tertunda)

## 🎨 Development Guidelines
- **TypeScript First**: Selalu gunakan tipe data yang dihasilkan dari `payload-types.ts`. Jalankan `pnpm generate:types` jika ada perubahan skema.
- **Styling**: Gunakan utility classes Tailwind v4. Ikuti desain sistem yang sudah ada di `tailwind.config.mjs` dan komponen Radix UI.
- **Performance**: Gunakan `next/image` untuk gambar dan pastikan animasi GSAP tidak menyebabkan layout shift.
- **Code Style**: Patuhi `.prettierrc.json` dan `.editorconfig`. Jangan abaikan peringatan ESLint.

## 🤖 AI Context & Instructions
- **Context Priority**: Selalu baca file ini sebagai panduan utama.
- **Verification**: Sebelum melakukan commit atau push, pastikan sudah menjalankan `pnpm build` atau minimal `pnpm lint` untuk memvalidasi integritas kode.
- **Security**: Jangan pernah menuliskan atau mengekspos `PAYLOAD_SECRET`, `DATABASE_URL`, atau API keys di dalam kode sumber. Gunakan `.env`.
- **Framework specific**: Gunakan fitur Next.js 16 secara optimal (Server Components by default, Client Components hanya jika diperlukan untuk interaktivitas/animasi).

---
*File ini dibuat secara otomatis oleh Gemini CLI sebagai persistent context proyek.*
