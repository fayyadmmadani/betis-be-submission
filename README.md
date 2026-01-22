<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# The Ranger's Outpost API

Backend Service untuk sistem manajemen jalur pendakian, data pendaki, dan perizinan (permits). Dibangun menggunakan **NestJS**, **Prisma**, dan **PostgreSQL**.

## 📋 Prerequisites (Prasyarat)

Sebelum menjalankan aplikasi, pastikan di komputer Anda sudah terinstall:

- [Node.js](https://nodejs.org/en/) (Versi 18 atau terbaru disarankan)
- [PostgreSQL](https://www.postgresql.org/) (Pastikan service database berjalan)
- [Docker & Docker Compose](https://www.docker.com/) (Opsional, jika ingin setup database via Docker)

## ⚙️ Installation

1. Clone repository ini:
   ```bash
   git clone <URL_REPOSITORY_ANDA>
   cd <NAMA_FOLDER_PROJECT>

```

2. Install dependencies:
```bash
npm install

```



## 🔧 Environment Setup (.env)

Aplikasi ini membutuhkan file `.env` untuk konfigurasi database.

1. Buat file bernama `.env` di root folder project.
2. Salin konfigurasi berikut ke dalamnya:

```env
# Sesuaikan USER, PASSWORD, dan DB_NAME dengan PostgreSQL lokal Anda
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DB_NAME?schema=public"

# Port Aplikasi (Default 3000)
PORT=3000

```

> **Catatan:** Jika Anda menggunakan kredensial database yang berbeda (misal username bukan `USER` atau password berbeda), harap sesuaikan bagian `USER:PASSWORD` di atas.

## 🗄️ Database Setup

Anda memiliki dua opsi untuk menyiapkan database:

### Opsi 1: Menggunakan Docker (Disarankan)

Jika Anda memiliki Docker, Anda dapat menjalankan database PostgreSQL secara instan tanpa install manual.

```bash
# Jalankan container database
docker-compose up -d

# Push skema database (Membuat tabel)
npx prisma db push

```

### Opsi 2: Manual (Tanpa Docker)

1. Buat database baru di PostgreSQL Anda dengan nama `DB_NAME` (atau sesuai nama di .env).
2. Jalankan perintah migrasi Prisma untuk membuat tabel:
```bash
npx prisma db push
# Atau jika ingin menggunakan migration history:
# npx prisma migrate dev --name init

```


3. (Opsional) Generate Prisma Client (biasanya otomatis, tapi jika error lakukan ini):
```bash
npx prisma generate

```



## 🚀 Running the App

Setelah database siap, jalankan aplikasi:

```bash
# development mode
npm run start

# watch mode (auto-reload saat coding)
npm run start:dev

# production mode
npm run start:prod

```

Aplikasi akan berjalan di: `http://localhost:3000`

## 📖 API Documentation (Swagger)

Dokumentasi API lengkap tersedia via Swagger UI. Setelah aplikasi berjalan, buka browser dan akses:

👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

Di sana Anda dapat melihat daftar endpoint untuk `Hikers`, `Trails`, dan `Permits` serta mencobanya langsung (Try it out).

## 🧪 Running Tests

Untuk menjalankan End-to-End (E2E) testing:

```bash
npm run test:e2e

```

## 👤 Author

* Nama: Fayyad M Madani
