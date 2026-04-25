export const DIST_DATA = [
  { name: 'Indramayu', complaints: 210, volume: 62, floods: 11 },
  { name: 'Jatibarang', complaints: 260, volume: 85, floods: 17 },
  { name: 'Karangampel', complaints: 180, volume: 55, floods: 11 },
];

export const MONTHLY_TRENDS = [
  { month: 'Jan', complaints: 270, volume: 77, floods: 15 },
  { month: 'Feb', complaints: 270, volume: 85, floods: 16 },
  { month: 'Mar', complaints: 110, volume: 40, floods: 8 },
];

export const CATEGORY_DATA = [
  { name: 'Sampah', value: 450, volume: 132, floods: 26, color: '#10B981' },
  { name: 'Banjir', value: 200, volume: 70, floods: 13, color: '#059669' },
];

export const ANALYTICAL_QUESTIONS = [
  "Kecamatan mana yang memiliki jumlah pengaduan masyarakat tertinggi?",
  "Kecamatan mana yang memiliki volume sampah paling tinggi?",
  "Kategori masalah apa yang paling dominan berdasarkan jumlah pengaduan?",
  "Apakah wilayah dengan volume sampah tinggi memiliki kejadian banjir lebih banyak?",
  "Pada bulan apa jumlah pengaduan lingkungan paling tinggi?",
  "Kecamatan mana yang harus menjadi prioritas penanganan lingkungan?",
  "Bagaimana perbandingan masalah sampah dan banjir berdasarkan data yang tersedia?"
];

export const STAKEHOLDERS = [
  { name: "Dinas Lingkungan Hidup", needs: "Data volume sampah, jumlah pengaduan, dan wilayah bermasalah", goal: "Menentukan prioritas pengangkutan sampah dan program kebersihan" },
  { name: "BPBD / Dinas Penanggulangan Bencana", needs: "Data kejadian banjir berdasarkan kecamatan dan waktu", goal: "Menentukan wilayah rawan banjir dan rencana mitigasi" },
  { name: "Pemerintah Kota / Bappeda", needs: "Ringkasan KPI lingkungan, tren masalah, dan wilayah prioritas", goal: "Mendukung perencanaan kebijakan Smart City" },
  { name: "Pemerintah Kecamatan", needs: "Data masalah lingkungan di wilayah masing-masing", goal: "Menentukan tindakan cepat di tingkat kecamatan" },
  { name: "Masyarakat", needs: "Informasi pengaduan, kondisi lingkungan, dan tindak lanjut pemerintah", goal: "Meningkatkan transparansi pelayanan publik" },
  { name: "Petugas Lapangan", needs: "Informasi lokasi prioritas sampah dan banjir", goal: "Mengoptimalkan jadwal kerja dan distribusi petugas" }
];

export const KPI_LIST = [
  { name: "Total Pengaduan Masyarakat", def: "Jumlah seluruh pengaduan masyarakat terkait sampah dan banjir", target: "Menurun setiap bulan" },
  { name: "Total Volume Sampah", def: "Jumlah volume sampah yang tercatat per wilayah", target: "Terkendali dan tidak meningkat tajam" },
  { name: "Total Kejadian Banjir", def: "Jumlah kejadian banjir pada setiap kecamatan", target: "Menurun" },
  { name: "Kecamatan Prioritas Lingkungan", def: "Kecamatan dengan kombinasi pengaduan, sampah, dan banjir tertinggi", target: "Menjadi prioritas penanganan" },
  { name: "Kategori Masalah Dominan", def: "Jenis masalah dengan jumlah pengaduan tertinggi", target: "Menentukan fokus program" },
  { name: "Tren Pengaduan Bulanan", def: "Perubahan jumlah pengaduan dari bulan ke bulan", target: "Mengetahui peningkatan atau penurunan masalah" }
];

export const OLAP_OPERATIONS = [
  { n: "Roll-Up", d: "Agregasi data dari detail ke ringkasan. (ex: Bulan ke Tahun)", c: "text-brand-600", bg: "bg-brand-50 border-brand-100" },
  { n: "Drill-Down", d: "Memecah data ringkasan menjadi lebih detail. (ex: Kab ke Kec)", c: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
  { n: "Slice", d: "Mengambil 1 dimensi (ex: Hanya lihat data Bulan Jan)", c: "text-accent-600", bg: "bg-accent-50 border-accent-100" },
  { n: "Dice", d: "Mengambil sub-cube (ex: Bulan Jan + Kab Indramayu)", c: "text-slate-600", bg: "bg-slate-100 border-slate-200" },
];

export const SAMPLE_CUBE_DATA = [
  { b: "Jan", k: "Sampah", l: "Indramayu", v: "120" },
  { b: "Jan", k: "Sampah", l: "Jatibarang", v: "150" },
  { b: "Feb", k: "Banjir", l: "Karangampel", v: "80" },
];

export const AI_INSIGHTS = [
  { type: 'Critical', title: 'Jatibarang Prioritas Utama', desc: 'Jatibarang memiliki total pengaduan tertinggi (260), volume sampah 85 ton/hari, dan kejadian banjir 17.', action: 'Fokuskan Penanganan' },
  { type: 'Alert', title: 'Sampah Masalah Dominan', desc: 'Kategori sampah memiliki total 450 pengaduan, jauh lebih tinggi dibandingkan banjir (200 pengaduan).', action: 'Optimalisasi Pengelolaan' },
  { type: 'Warning', title: 'Korelasi Sampah & Banjir', desc: 'Jatibarang memiliki volume sampah tertinggi dan kejadian banjir tertinggi. Ada indikasi risiko banjir berkaitan dengan sampah.', action: 'Normalisasi Drainase' },
  { type: 'Info', title: 'Tren Pengaduan Tinggi', desc: 'Januari dan Februari sama-sama memiliki 270 pengaduan, namun Februari memiliki volume sampah & banjir lebih tinggi.', action: 'Antisipasi Kuartal 1' },
  { type: 'Info', title: 'Pemantauan Karangampel', desc: 'Walaupun hanya satu kali dalam dataset, Karangampel mencatat 180 pengaduan, 55 ton sampah, dan 11 kejadian banjir.', action: 'Tetap Perhatikan' }
];

export const SYSTEM_ARCHITECTURE = [
  { step: '1. Data Sources', tech: 'IoT, Laporan Warga', desc: 'Pengumpulan data mentah dari sensor dan aplikasi pelaporan.' },
  { step: '2. ETL Process', tech: 'Talend / Python', desc: 'Pembersihan dan transformasi data ke dalam format standar.' },
  { step: '3. Data Warehouse', tech: 'PostgreSQL', desc: 'Penyimpanan terpusat menggunakan desain Star Schema.' },
  { step: '4. OLAP Engine', tech: 'Mondrian', desc: 'Agregasi dan pre-kalkulasi data untuk query cepat.' },
  { step: '5. BI Dashboard', tech: 'React / Recharts', desc: 'Visualisasi interaktif dan pelaporan untuk pimpinan daerah.' },
];
