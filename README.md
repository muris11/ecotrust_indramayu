# 🌿 EcoTrust SIKC - Indramayu Intelligence

<div align="center">
  <img width="1200" height="475" alt="EcoTrust Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
  
  [![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.14-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white)](https://aistudio.google.com/)
</div>

---

## 📖 Overview

**EcoTrust SIKC** (Sistem Informasi Kota Cerdas) adalah aplikasi berbasis web yang dirancang untuk menganalisis data lingkungan di Kabupaten Indramayu, khususnya terkait isu **Pengelolaan Sampah** dan **Mitigasi Banjir**. 

Aplikasi ini mengimplementasikan konsep **Data Warehouse (DW)** dan **Business Intelligence (BI)** untuk mentransformasi data mentah menjadi wawasan strategis bagi pemerintah daerah dan masyarakat.

## 🚀 Key Features

- **Data Modeling (Star Schema)**: Visualisasi arsitektur tabel fakta dan dimensi.
- **OLAP Cube Analysis**: Simulasi operasi Slice, Dice, dan Drill-down untuk eksplorasi data.
- **KPI Tracking**: Monitoring indikator kinerja utama seperti volume sampah harian dan intensitas banjir.
- **Decision Support System (DSS)**: Rekomendasi solusi berbasis data untuk wilayah prioritas (Jatibarang, Indramayu, Karangampel).
- **AI Assistant Chatbot**: Didukung oleh **Google Gemini 1.5 Flash** untuk menjawab pertanyaan seputar konsep BI dan data lingkungan Indramayu.

## 🛠️ Tech Stack

- **Core**: React 19 + TypeScript
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS 4 + Lucide Icons
- **Animation**: Motion (formerly Framer Motion)
- **Charts**: Recharts
- **AI**: @google/genai (Gemini SDK)

## 💻 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Google AI Studio API Key](https://aistudio.google.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/muris11/ecotrust_indramayu.git
    cd ecotrust_indramayu
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Buat file `.env` di root directory dan tambahkan API Key Gemini Anda:
    ```env
    GEMINI_API_KEY="YOUR_API_KEY_HERE"
    APP_URL="http://localhost:3000"
    ```

4.  **Run locally:**
    ```bash
    npm run dev
    ```
    Aplikasi akan berjalan di `http://localhost:3000`.

## 📄 Documentation

Laporan lengkap Tugas Individu 2 (Analytical Questions, Stakeholder, & KPI Smart City) tersedia dalam format PDF dan dapat diunduh langsung melalui dashboard aplikasi.

## 👤 Author

**Muhammad Rifqy Saputra**
- NIM: 2307046
- Jurusan: Teknik Informatika
- Kelas: 3B - Sistem Informasi Kota Cerdas
- Institusi: Politeknik Negeri Indramayu (POLINDRA)

---
<div align="center">
  Built with ❤️ for Indramayu Smart City
</div>