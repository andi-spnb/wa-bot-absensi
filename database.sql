-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 16 Jan 2025 pada 16.59
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wa_bot_absensi`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `ai_chats`
--

CREATE TABLE `ai_chats` (
  `id` int(11) NOT NULL,
  `message` text NOT NULL,
  `response` text NOT NULL,
  `ai_type` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `sender_id` varchar(100) DEFAULT NULL,
  `sender_name` varchar(100) DEFAULT NULL,
  `response_time` int(11) DEFAULT NULL,
  `tokens_used` int(11) DEFAULT NULL,
  `status` enum('success','failed') DEFAULT 'success'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `ai_chats`
--

INSERT INTO `ai_chats` (`id`, `message`, `response`, `ai_type`, `created_at`, `sender_id`, `sender_name`, `response_time`, `tokens_used`, `status`) VALUES
(1, 'rekomendasi universitas di Indonesia', '**UI (Universitas Indonesia)**\n* Berlokasi di Depok, Jawa Barat\n* Kampus terluas dan terlengkap di Indonesia\n* Peringkat tinggi di tingkat nasional dan internasional\n* Jurusan unggulan: Kedokteran, Ekonomi, Teknik\n\n**UGM (Universitas Gadjah Mada)**\n* Berlokasi di Yogyakarta\n* Universitas tertua dan paling bergengsi di Indonesia\n* Kampus asri dan fasilitas modern\n* Jurusan unggulan: Kedokteran, Ekonomi, Pertanian\n\n**ITB (Institut Teknologi Bandung)**\n* Berlokasi di Bandung, Jawa Barat\n* Universitas teknik terkemuka di Indonesia\n* Memiliki banyak pusat penelitian dan inovasi\n* Jurusan unggulan: Teknik Mesin, Teknik Sipil, Teknik Elektro\n\n**IPB (Institut Pertanian Bogor)**\n* Berlokasi di Bogor, Jawa Barat\n* Universitas terkemuka di bidang pertanian dan bioteknologi\n* Memiliki lahan pertanian yang luas untuk praktikum\n* Jurusan unggulan: Ilmu Pertanian, Ilmu Pangan, Biologi\n\n**ITS (Institut Teknologi Sepuluh Nopember)**\n* Berlokasi di Surabaya, Jawa Timur\n* Universitas teknik besar dan terkenal di Indonesia Timur\n* Memiliki banyak program studi double degree\n* Jurusan unggulan: Teknik Elektro, Teknik Mesin, Teknik Kimia\n\n**UNAIR (Universitas Airlangga)**\n* Berlokasi di Surabaya, Jawa Timur\n* Universitas negeri terkemuka di Jawa Timur\n* Memiliki rumah sakit pendidikan sendiri, RSUD Dr. Soetomo\n* Jurusan unggulan: Kedokteran, Farmasi, Akuntansi\n\n**UNPAD (Universitas Padjadjaran)**\n* Berlokasi di Bandung, Jawa Barat\n* Universitas negeri terkemuka di Jawa Barat\n* Memiliki banyak program studi dan fakultas\n* Jurusan unggulan: Kedokteran, Hukum, Ekonomi\n\n**UNS (Universitas Sebelas Maret)**\n* Berlokasi di Surakarta, Jawa Tengah\n* Universitas negeri terkemuka di Jawa Tengah\n* Memiliki program studi kedokteran tertua di Indonesia\n* Jurusan unggulan: Kedokteran, Teknik, Pertanian\n\n**UNHAS (Universitas Hasanuddin)**\n* Berlokasi di Makassar, Sulawesi Selatan\n* Universitas negeri terbesar di Indonesia Timur\n* Memiliki banyak program studi dan fakultas\n* Jurusan unggulan: Kedokteran, Perikanan, Ekonomi\n\n**UNSYIAH (Universitas Syiah Kuala)**\n* Berlokasi di Banda Aceh, Aceh\n* Universitas negeri terkemuka di Aceh\n* Memiliki program studi kedokteran tertua di Aceh\n* Jurusan unggulan: Kedokteran, Pertanian, Ekonomi', 'gemini', '2025-01-14 13:10:13', NULL, NULL, NULL, NULL, 'success'),
(2, 'arti dari astaghfirullah', 'Mohon ampunan Allah', 'gemini', '2025-01-14 13:18:41', NULL, NULL, NULL, NULL, 'success'),
(3, 'halo', 'Halo juga! Ada yang bisa saya bantu?', 'gemini', '2025-01-14 14:50:37', NULL, NULL, NULL, NULL, 'success'),
(4, 'Tujuan dan manfaat pameran \"Senandung Ibu Pertiwi\"', '**Tujuan**\n\n* Mengapresiasi keanekaragaman budaya Indonesia melalui pertunjukan seni tari dan musik.\n* Mempromosikan dan melestarikan warisan budaya Indonesia.\n* Menumbuhkan rasa bangga dan nasionalisme terhadap kekayaan budaya Indonesia.\n\n**Manfaat**\n\n**Individu:**\n\n* Menikmati pertunjukan seni yang memukau.\n* Memperluas pengetahuan dan pemahaman tentang budaya Indonesia.\n* Mengembangkan apresiasi terhadap keberagaman budaya.\n\n**Masyarakat:**\n\n* Memperkuat ikatan sosial dan persatuan melalui acara budaya.\n* Mendorong kesadaran akan pentingnya melestarikan warisan budaya.\n* Mendukung seniman dan pelaku budaya Indonesia.\n\n**Budaya:**\n\n* Menyediakan platform untuk menampilkan dan mempromosikan keragaman seni Indonesia.\n* Melestarikan dan menularkan warisan budaya kepada generasi mendatang.\n* Meningkatkan kesadaran dan apresiasi internasional terhadap budaya Indonesia.\n\n**Ekonomi:**\n\n* Menarik wisatawan dan meningkatkan industri pariwisata.\n* Mendukung pertumbuhan industri kreatif dan ekonomi budaya.\n* Menciptakan peluang ekonomi bagi seniman dan pelaku budaya.\n\n**Pendidikan:**\n\n* Menyediakan sumber daya edukatif tentang budaya Indonesia.\n* Menumbuhkan rasa ingin tahu dan minat terhadap sejarah dan tradisi budaya.\n* Meningkatkan pengetahuan siswa tentang seni dan budaya.', 'gemini', '2025-01-15 12:45:11', NULL, NULL, NULL, NULL, 'success'),
(5, 'halo', 'Halo juga! Apakah ada yang bisa saya bantu?', 'gemini', '2025-01-15 12:49:38', NULL, NULL, NULL, NULL, 'success'),
(6, 'halo', 'Hello! How can I assist you today? 😊', 'mistral', '2025-01-15 12:49:44', NULL, NULL, NULL, NULL, 'success'),
(7, 'halo', 'Halo juga! Apa yang bisa saya bantu?', 'gemini', '2025-01-15 12:59:25', NULL, NULL, NULL, NULL, 'success'),
(8, 'halo', 'Halo juga! Bagaimana kabarmu hari ini?', 'gemini', '2025-01-15 13:01:16', NULL, NULL, NULL, NULL, 'success'),
(9, 'halo', 'Halo juga! Ada yang bisa saya bantu?', 'gemini', '2025-01-15 13:01:35', NULL, NULL, NULL, NULL, 'success'),
(10, 'Tujuan dan manfaat pameran \"Senandung Ibu Pertiwi\"', '**Tujuan Pameran \"Senandung Ibu Pertiwi\"**\n\n* Menumbuhkan rasa cinta dan kebanggaan terhadap Tanah Air Indonesia.\n* Mempromosikan keragaman budaya dan seni Indonesia.\n* Melestarikan warisan budaya Indonesia yang berharga.\n* Meningkatkan apresiasi terhadap kekayaan alam dan keindahan Indonesia.\n* Membangun semangat persatuan dan kesatuan bangsa.\n\n**Manfaat Pameran \"Senandung Ibu Pertiwi\"**\n\n**Manfaat Pendidikan dan Budaya:**\n\n* Menambah pengetahuan tentang sejarah, budaya, dan alam Indonesia.\n* Meningkatkan minat belajar tentang Indonesia.\n* Melestarikan dan mendokumentasikan warisan budaya Indonesia.\n* Menjadi sarana edukasi dan hiburan yang bermanfaat.\n\n**Manfaat Sosial:**\n\n* Menumbuhkan rasa kebersamaan dan gotong royong.\n* Meningkatkan kesadaran tentang pentingnya menjaga lingkungan dan kekayaan alam.\n* Mempromosikan toleransi dan keberagaman.\n\n**Manfaat Ekonomi:**\n\n* Menarik wisatawan domestik dan internasional.\n* Mendukung industri pariwisata dan seni.\n* Menciptakan peluang ekonomi bagi seniman dan pengusaha lokal.\n\n**Manfaat Psikologis:**\n\n* Menginspirasi perasaan bangga dan cinta tanah air.\n* Mengurangi stres dan meningkatkan kesejahteraan.\n* Memberikan pengalaman estetika dan pengayaan pribadi.\n\n**Manfaat Lain:**\n\n* Meningkatkan kesadaran tentang isu-isu sosial dan lingkungan hidup.\n* Mendorong dialog dan diskusi tentang identitas dan budaya Indonesia.\n* Membangun rasa optimisme dan kepercayaan diri sebagai bangsa.', 'gemini', '2025-01-15 13:02:04', NULL, NULL, NULL, NULL, 'success'),
(11, 'bisakah anda membuatkan saya ppt', '**Judul Presentasi: [Tentukan Judul Anda]**\n\n**Slide 1: Judul dan Pendahuluan**\n\n* Judul presentasi\n* Nama Anda\n* Tanggal\n* Pengantar singkat tentang topik presentasi\n\n**Slide 2: Latar Belakang**\n\n* Berikan konteks tentang topik presentasi\n* Jelaskan pentingnya atau relevansinya\n* Sajikan fakta atau statistik yang relevan\n\n**Slide 3: Tujuan Presentasi**\n\n* Nyatakan tujuan atau sasaran presentasi Anda\n* Garis besar topik utama yang akan dibahas\n\n**Slide 4-X: Topik Utama**\n\n* Bagi presentasi Anda menjadi beberapa topik utama\n* Untuk setiap topik, berikan:\n    * Judul slide\n    * Poin-poin utama\n    * Bukti pendukung (misalnya, grafik, kutipan, contoh)\n    * Transisi yang menghubungkan topik\n\n**Slide X+1: Ringkasan**\n\n* Rangkum poin-poin utama presentasi\n* Tekankan kembali tujuan presentasi\n* Buat kesan yang kuat pada audiens\n\n**Slide X+2: Tanya Jawab**\n\n* Arahkan audiens untuk mengajukan pertanyaan\n* Siapkan jawaban untuk pertanyaan yang mungkin diajukan\n* Tunjukkan bahwa Anda telah menguasai topiknya\n\n**Tips Tambahan:**\n\n* Gunakan grafik, gambar, dan tabel untuk memvisualisasikan data.\n* Gunakan font yang dapat dibaca dan warna kontras yang tinggi.\n* Berlatihlah menyampaikan presentasi Anda untuk memastikan kelancaran.\n* Siapkan catatan jika perlu.\n* Bersikaplah percaya diri dan antusias.\n* Tanggapi pertanyaan dengan sopan dan profesional.', 'gemini', '2025-01-15 13:03:02', NULL, NULL, NULL, NULL, 'success'),
(12, 'saya ingin membuatkan ppt tentang Tujuan dan manfaat pameran \"Senandung Ibu Pertiwi\"', '**Slide 1: Judul**\n\n* Tujuan dan Manfaat Pameran \"Senandung Ibu Pertiwi\"\n\n**Slide 2: Tujuan Pameran**\n\n* Menampilkan keanekaragaman budaya Indonesia melalui karya seni\n* Menghargai warisan budaya Indonesia\n* Mempromosikan pariwisata Indonesia\n* Menumbuhkan rasa cinta tanah air\n\n**Slide 3: Manfaat Pameran**\n\n**Untuk Pengunjung**\n\n* Memahami budaya Indonesia yang kaya\n* Menikmati keindahan karya seni tradisional dan kontemporer\n* Mendapat hiburan dan edukasi\n* Meningkatkan apresiasi terhadap budaya Indonesia\n\n**Slide 4: Manfaat Pameran**\n\n**Untuk Seniman**\n\n* Menampilkan karya mereka di hadapan publik yang lebih luas\n* Mendapatkan pengakuan atas karya mereka\n* Menjalin hubungan dengan sesama seniman\n* Mempromosikan identitas budaya mereka\n\n**Slide 5: Manfaat Pameran**\n\n**Untuk Industri Pariwisata**\n\n* Menarik wisatawan domestik dan internasional\n* Mempromosikan Indonesia sebagai tujuan wisata budaya\n* Menciptakan lapangan kerja di sektor pariwisata\n\n**Slide 6: Manfaat Pameran**\n\n**Untuk Bangsa Indonesia**\n\n* Memperkuat rasa persatuan dan kebangsaan\n* Meningkatkan kesadaran tentang pentingnya melestarikan warisan budaya\n* Mendorong pertumbuhan ekonomi\n\n**Slide 7: Call to Action**\n\n* Hadiri Pameran \"Senandung Ibu Pertiwi\" untuk:\n    * Menikmati seni dan budaya Indonesia\n    * Mendukung seniman Indonesia\n    * Merayakan keindahan dan keberagaman Indonesia', 'gemini', '2025-01-15 13:04:49', NULL, NULL, NULL, NULL, 'success'),
(13, '[Question from Andi Mappanyukki]: halo', '[Answer to Andi Mappanyukki]: Halo Andi, ada yang bisa saya bantu?', 'gemini', '2025-01-15 14:06:31', NULL, NULL, NULL, NULL, 'success'),
(14, '[Question from Andi Mappanyukki]: bisakah anda jelaskan pengertian geografi', '**Pengertian Geografi**\n\nGeografi adalah ilmu yang mempelajari tentang bumi dan segala fenomena yang terjadi di dalamnya, termasuk manusia dan interaksinya dengan lingkungan. Geografi menggabungkan pendekatan spasial dan temporal untuk memahami dan menganalisis distribusi, interaksi, dan perubahan pada permukaan bumi.\n\n**Cabang-cabang Utama Geografi:**\n\n* **Geografi Fisik:** Mempelajari fitur fisik bumi, seperti iklim, bentang alam, tanah, dan sumber daya alam.\n* **Geografi Manusia:** Mempelajari aktivitas dan interaksi manusia di permukaan bumi, termasuk penyebaran penduduk, budaya, ekonomi, dan politik.\n* **Geografi Regional:** Mempelajari wilayah geografis tertentu, seperti benua, negara, atau kota, dengan fokus pada karakteristik fisik, manusia, dan interaksinya.\n* **Geografi Terapan:** Menerapkan prinsip-prinsip dan metode geografi untuk memecahkan masalah dunia nyata, seperti perencanaan tata guna lahan, manajemen sumber daya, dan mitigasi bencana.\n\n**Prinsip-prinsip Utama Geografi:**\n\n* **Distribusi:** Menunjukkan di mana fenomena geografis berada di permukaan bumi.\n* **Interaksi:** Menganalisis hubungan antar fenomena geografis dan bagaimana hal tersebut memengaruhi satu sama lain.\n* **Perubahan:** Menyelidiki bagaimana fenomena geografis berubah dari waktu ke waktu dan faktor-faktor yang mendorong perubahan tersebut.\n* **Lokasi:** Mendeskripsikan posisi suatu tempat di permukaan bumi menggunakan garis lintang dan garis bujur, atau fitur geografis lainnya.\n* **Perspektif Spasial:** Menganalisis fenomena geografis dalam konteks ruang dan mengidentifikasi pola spasial.\n\n**Metode Penelitian Geografi:**\n\n* **Pengamatan:** Pengumpulan data melalui observasi langsung atau penginderaan jauh.\n* **Pemetaan:** Menggambarkan fenomena geografis secara grafis pada peta.\n* **Analisis Statistik:** Menggunakan data numerik untuk mengidentifikasi pola dan tren.\n* **Studi Kasus:** Menyelidiki fenomena geografis tertentu secara mendalam.\n* **Pemodelan:** Mengembangkan representasi simulasi dari fenomena geografis untuk memprediksi atau memahami perubahan.', 'gemini', '2025-01-15 14:13:35', NULL, NULL, NULL, NULL, 'success'),
(15, '[Question from Andi Mappanyukki]: bisakah anda memberikan informasi tentang geografi', 'Saya bisa memberikan informasi tentang geografi secara umum. Geografi adalah ilmu yang mengkaji karakteristik dan hubungan antara lingkungan fisik dan manusia, termasuk geologi, klimatologi, hidrologi, biologi, demografi, ekonomi, politik, sosial, dan kultur. Geografi membantu kita mengerti bagaimana kehidupan manusia berhubungan dengan lingkungan fisik dan berbagai macam hubungan antar keluarga, komunitas, dan negara.', 'mistral', '2025-01-15 14:13:50', NULL, NULL, NULL, NULL, 'success');

-- --------------------------------------------------------

--
-- Struktur dari tabel `api_keys`
--

CREATE TABLE `api_keys` (
  `id` int(11) NOT NULL,
  `key_name` varchar(255) NOT NULL,
  `api_key` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_used` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `api_keys`
--

INSERT INTO `api_keys` (`id`, `key_name`, `api_key`, `is_active`, `created_at`, `last_used`) VALUES
(1, 'spnb', 'a4d7d29c257b36b118a9c3cded0d7b041bd41f0826226bb9d38bcab656fbc100', 0, '2025-01-12 09:00:38', NULL),
(2, 'spnb2', '82920592e7569b68a99629593d912f53373fa3d09e3053d6883308e82c6db892', 1, '2025-01-12 09:14:52', NULL),
(3, '12321', '5147685a4e90a45350a5ba1004b61329ac9e10761ef347c9dc607690f434bfc8', 1, '2025-01-12 12:38:40', NULL),
(4, '123', 'b7c8459d810a8c3655da75c45c3b8bc5314f49a4aad91734c81f96d541c9f01a', 1, '2025-01-13 09:20:40', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `bot_commands`
--

CREATE TABLE `bot_commands` (
  `id` int(11) NOT NULL,
  `command` varchar(255) NOT NULL,
  `response` text NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `bot_commands`
--

INSERT INTO `bot_commands` (`id`, `command`, `response`, `is_active`, `created_at`, `updated_at`) VALUES
(1, '!q', 'boleng is the best or not the best', 1, '2025-01-12 09:13:41', '2025-01-12 09:29:47'),
(3, '!ukki', 'ulkki', 1, '2025-01-13 14:45:38', '2025-01-13 14:45:38'),
(4, '!ukkii', 'bjirrr1', 1, '2025-01-14 09:32:58', '2025-01-14 09:33:58'),
(5, '!gemini', '*GEMINI AI*\n\nGunakan perintah ini untuk bertanya ke Gemini AI\n\nCara penggunaan:\n!gemini [pertanyaan]\n\nContoh:\n!gemini apa itu javascript?', 1, '2025-01-14 12:59:52', '2025-01-14 12:59:52'),
(6, '!claude', '*CLAUDE AI*\n\nGunakan perintah ini untuk bertanya ke Claude AI\n\nCara penggunaan:\n!claude [pertanyaan]\n\nContoh:\n!claude explain quantum computing', 1, '2025-01-14 12:59:52', '2025-01-14 12:59:52'),
(7, '!ask', '*AI HELP*\n\nGunakan perintah ini untuk bertanya ke AI (default: Gemini)\n\nPerintah yang tersedia:\n!gemini - Gunakan Gemini AI\n!claude - Gunakan Claude AI\n!ask - Sama dengan !gemini', 1, '2025-01-14 12:59:52', '2025-01-14 12:59:52'),
(8, '!mistral', '*🤖 MISTRAL AI*\r\n\r\nGunakan command ini untuk bertanya ke Mistral AI.\r\n\r\nCara penggunaan:\r\n!mistral [pertanyaan]\r\n\r\nContoh:\r\n!mistral apa itu javascript?\r\n\r\n*Fitur:*\r\n- Jawaban cepat dan akurat\r\n- Support bahasa Indonesia\r\n- Riwayat chat tersimpan', 1, '2025-01-15 11:44:24', '2025-01-15 11:44:24');

-- --------------------------------------------------------

--
-- Struktur dari tabel `message_templates`
--

CREATE TABLE `message_templates` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `type` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `message_templates`
--

INSERT INTO `message_templates` (`id`, `name`, `content`, `type`, `created_at`, `updated_at`) VALUES
(2, 'Reminder Message 1', 'Don’t forget your appointment tomorrow.', 'keterlambatan', '2025-01-12 09:04:54', '2025-01-12 09:08:35');

-- --------------------------------------------------------

--
-- Struktur dari tabel `notification_logs`
--

CREATE TABLE `notification_logs` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `status` varchar(50) NOT NULL,
  `error` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `notification_logs`
--

INSERT INTO `notification_logs` (`id`, `type`, `phone`, `message`, `status`, `error`, `created_at`) VALUES
(1, 'test', '628557573123', '🔔 Ini adalah pesan test notifikasi dari WA Bot Absensi', 'success', NULL, '2025-01-12 09:15:01'),
(2, 'absensi', '081234567890', 'Absensi berhasil', 'success', NULL, '2025-01-12 11:11:34'),
(3, 'reminder', '081234567891', 'Reminder gagal', 'failed', NULL, '2025-01-12 11:11:34');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'superadmin', '$2a$10$rVGs2qiXKez.g0AOSFODXOLzapcsdmzSQCIqFkEL0D39HeKJDeZ4O');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `ai_chats`
--
ALTER TABLE `ai_chats`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `api_keys`
--
ALTER TABLE `api_keys`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `api_key` (`api_key`);

--
-- Indeks untuk tabel `bot_commands`
--
ALTER TABLE `bot_commands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `command` (`command`);

--
-- Indeks untuk tabel `message_templates`
--
ALTER TABLE `message_templates`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `notification_logs`
--
ALTER TABLE `notification_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `ai_chats`
--
ALTER TABLE `ai_chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT untuk tabel `api_keys`
--
ALTER TABLE `api_keys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `bot_commands`
--
ALTER TABLE `bot_commands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `message_templates`
--
ALTER TABLE `message_templates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `notification_logs`
--
ALTER TABLE `notification_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
