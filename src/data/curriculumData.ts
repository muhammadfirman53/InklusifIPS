import { ActivityItem, ForumPost, MaterialItem, RubricCriterion, SubmissionRecord, StudentProfile } from '../types/learning';
import { ASSET_IMAGES } from '../assets/images';

export const PROJECT_METADATA = {
  kelompok: 'Kelompok 4',
  anggota: [
    'Muhamad Firman',
    'Erlangga Setyawan',
    'Abang Julianto',
    'Albertus Hary Usna',
  ],
  konteks: 'Rural (Pedesaan) - Koneksi internet tidak merata, smartphone-friendly, heterogen',
  mataPelajaran: 'SMA – IPS / Sosiologi',
  topik: 'Permasalahan sosial di lingkungan sekitar: faktor penyebab, dampak, dan alternatif solusi',
  platform: 'AI Studio / LMS Inklusif Ramah Smartphone (Online & Offline)',
  slogan: 'Belajar Fleksibel, Semua Bisa Berpartisipasi',
  guruPengampu: 'Dra. Siti Rahayu, M.Pd (Guru Sosiologi)',
  kontakGuruWA: '6281234567890',
};

export const LEARNING_OBJECTIVES = [
  {
    id: 1,
    title: 'Mengidentifikasi Permasalahan Sosial',
    description: 'Mampu mengenali fenomena sosial yang tergolong masalah sosial di lingkungan sekitar (misal: sampah liar dan pencemaran air desa) secara objektif.',
    indicator: 'Menemukan minimal 2 karakteristik masalah sosial dari contoh nyata di desa.',
  },
  {
    id: 2,
    title: 'Menganalisis Faktor Penyebab dan Dampaknya',
    description: 'Mampu menguraikan keterkaitan antara perilaku sosial, fasilitas publik, faktor ekonomi dengan dampak kesehatan dan keharmonisan warga.',
    indicator: 'Menjelaskan akar penyebab langsung maupun tidak langsung serta 2 dampak sosial utama.',
  },
  {
    id: 3,
    title: 'Merumuskan Alternatif Solusi Realistis',
    description: 'Mampu menyusun gagasan pemecahan masalah yang kontekstual, terjangkau, dan dapat diterapkan di lingkungan pedesaan secara gotong royong.',
    indicator: 'Mengajukan minimal 1 solusi konkret berbasis kearifan lokal (misal: Bank Sampah Desa/Peraturan Desa).',
  },
];

export const LEARNING_STEPS = [
  {
    step: 1,
    title: 'Pilih Jalur Belajar',
    desc: 'Tentukan Jalur Online (streaming/kuis) atau Jalur Offline (unduh materi sekali untuk dipelajari tanpa kuota).',
  },
  {
    step: 2,
    title: 'Pahami Tujuan Pembelajaran',
    desc: 'Ketahui kompetensi yang ingin kamu capai. Standar penilaian sama apapun pilihan format belajarmu.',
  },
  {
    step: 3,
    title: 'Akses Materi Sesuai Preferensi',
    desc: 'Pilih format yang paling nyaman bagimu: Modul Teks Ringkas, Infografis Visual, Video Pendek ber-Caption, atau Audio/Podcast.',
  },
  {
    step: 4,
    title: 'Kerjakan Aktivitas & Diskusi',
    desc: 'Lakukan observasi lingkungan sekitar, buat pohon masalah, dan diskusikan di forum LMS atau WhatsApp.',
  },
  {
    step: 5,
    title: 'Kumpulkan Produk Asesmen Pilihanmu',
    desc: 'Pilih salah satu dari 5 format karya: Esai, Infografis/Poster, Presentasi, Rekaman Audio, atau Video Singkat.',
  },
];

export const RUBRIC_CRITERIA: RubricCriterion[] = [
  {
    id: 'identifikasi',
    name: 'Identifikasi Masalah Sosial',
    weight: 25,
    description: 'Ketepatan mengidentifikasi masalah sosial nyata di lingkungan sekitar dan karakteristiknya.',
    exemplarCriteria: {
      sangatBaik: 'Deskripsi masalah sangat jelas, didukung data/fakta pengamatan lingkungan desa nyata.',
      baik: 'Deskripsi masalah jelas dan relevan dengan lingkungan sekitar.',
      cukup: 'Masalah disebutkan namun deskripsi masih umum dan kurang kontekstual.',
      perluBimbingan: 'Belum mampu membedakan masalah pribadi dengan masalah sosial.',
    },
  },
  {
    id: 'penyebab',
    name: 'Analisis Faktor Penyebab',
    weight: 25,
    description: 'Kedalaman analisis mengenai faktor struktural, kultural, maupun fasilitas yang memicu masalah.',
    exemplarCriteria: {
      sangatBaik: 'Mampu membedakan akar penyebab (fasilitas, regulasi desa, kebiasaan) secara komprehensif.',
      baik: 'Menjelaskan minimal 2 faktor penyebab dengan penalaran logis.',
      cukup: 'Hanya menyebutkan 1 faktor penyebab tanpa elaborasi mendalam.',
      perluBimbingan: 'Faktor penyebab tidak sesuai dengan masalah yang diangkat.',
    },
  },
  {
    id: 'dampak',
    name: 'Analisis Dampak Sosial',
    weight: 20,
    description: 'Pemahaman tentang dampak masalah terhadap kehidupan masyarakat, lingkungan, dan ekonomi.',
    exemplarCriteria: {
      sangatBaik: 'Menguraikan dampak jangka pendek dan panjang terhadap kesehatan, sosial, dan ekonomi desa.',
      baik: 'Menjelaskan dampak nyata yang dirasakan oleh warga sekitar.',
      cukup: 'Dampak dijelaskan secara parsial/terlalu singkat.',
      perluBimbingan: 'Dampak tidak relevan dengan masalah sosial yang dianalisis.',
    },
  },
  {
    id: 'solusi',
    name: 'Alternatif Solusi Kontekstual',
    weight: 20,
    description: 'Kebermaknaan dan kelayakan alternatif solusi yang diajukan untuk masyarakat rural/pedesaan.',
    exemplarCriteria: {
      sangatBaik: 'Solusi sangat realistis, memanfaatkan kearifan lokal (gotong royong/Perdes), dan terjangkau.',
      baik: 'Solusi cukup realistis dan dapat diimplementasikan di desa.',
      cukup: 'Solusi terlalu teoritis atau sulit diterapkan di lingkungan sekitar.',
      perluBimbingan: 'Tidak menyertakan alternatif solusi yang jelas.',
    },
  },
  {
    id: 'komunikasi',
    name: 'Komunikasi & Kejelasan Penyampaian',
    weight: 10,
    description: 'Kerapian struktur, kejelasan alur logika, dan kesesuaian dengan format produk yang dipilih.',
    exemplarCriteria: {
      sangatBaik: 'Penyampaian sangat runtut, jelas, kreatif, dan mudah dipahami siapa saja.',
      baik: 'Penyampaian runut dan bahasa komunikatif.',
      cukup: 'Penyampaian cukup jelas meski ada beberapa bagian yang rancu.',
      perluBimbingan: 'Struktur tidak beraturan dan sulit dipahami.',
    },
  },
];

export const MATERIALS_DATA: MaterialItem[] = [
  {
    id: 'mat-modul',
    title: 'Modul Ringkas (PDF 3-4 Halaman)',
    subtitle: 'Teks terstruktur, ramah rentang perhatian, bebas jargon rumit',
    type: 'teks',
    fileSize: '1.8 MB',
    downloaded: true,
    content: {
      summary: 'Modul pembelajaran sosiologi ringkas yang membedah masalah sosial di pedesaan dalam 4 segmen fokus.',
      sections: [
        {
          title: 'Segmen 1: Apa Itu Masalah Sosial?',
          text: 'Masalah sosial adalah suatu kondisi yang tidak diinginkan oleh sebagian besar masyarakat karena bertentangan dengan nilai-nilai bersama dan memerlukan tindakan bersama untuk mengatasinya. Di lingkungan kita, tumpukan sampah di saluran irigasi bukan sekadar masalah pribadi pembuang sampah, melainkan masalah sosial karena berdampak langsung pada gagal panen petani lain dan kesehatan seluruh warga desa.',
        },
        {
          title: 'Segmen 2: Mengapa Masalah Ini Muncul? (Faktor Penyebab)',
          text: 'Di wilayah pedesaan, faktor penyebab masalah sampah meliputi: (1) Keterbatasan infrastruktur tempat pembuangan akhir (TPA) dan armada angkut desa; (2) Kurangnya sosialisasi pemilahan sampah organik dan anorganik; (3) Perubahan pola konsumsi dari kemasan alami (daun pisang) ke plastik sekali pakai yang tidak mudah terurai.',
        },
        {
          title: 'Segmen 3: Dampak yang Ditimbulkan Bagi Warga',
          text: 'Dampak sosial meliputi terjadinya konflik antarwarga akibat bau busuk, pencemaran aliran sungai yang menjadi sumber air ternak dan persawahan, serta timbulnya wabah penyakit kulit dan demam berdarah. Secara sosiologis, ini menurunkan modal sosial dan kenyamanan tinggal bersama.',
        },
        {
          title: 'Segmen 4: Alternatif Solusi Nyata Berbasis Desa',
          text: 'Solusi kontekstual tidak harus mahal: (1) Pembentukan Bank Sampah Berbasis RT/Dusun yang menampung plastik bernilai ekonomis; (2) Pembuatan lubang biopori/kompos untuk sampah dapur organik; (3) Musyawarah desa untuk menyepakati sanksi sosial atau aturan desa (Perdes) tentang kebersihan lingkungan.',
        },
      ],
    },
  },
  {
    id: 'mat-infografis',
    title: 'Infografis Peta Konsep Sebab-Dampak',
    subtitle: 'Diagram visual hubungan akar masalah, akibat, dan solusi gotong royong',
    type: 'infografis',
    fileSize: '1.2 MB',
    downloaded: true,
    authorRole: 'kurikulum',
    content: {
      summary: 'Representasi visual grafis sederhana yang merangkum hubungan sebab akibat sampah di lingkungan pedesaan.',
      imageUrl: ASSET_IMAGES.infographic,
    },
  },
  {
    id: 'mat-video',
    title: 'Video Pembelajaran (Durasi 4 Menit)',
    subtitle: 'Video singkat hemat kuota, dilengkapi teks terjemahan (CC) & transkrip',
    type: 'video',
    fileSize: '9.4 MB (Terkompresi)',
    downloaded: true,
    content: {
      summary: 'Studi kasus langsung di lapangan mengenai dampak pembuangan sampah liar pada saluran air persawahan pedesaan.',
      duration: '04:12',
      captions: [
        { time: 0, text: 'Halo teman-teman! Hari ini kita mengamati aliran saluran irigasi di desa kita.' },
        { time: 15, text: 'Terlihat endapan plastik kemasan menyumbat pintu air ke arah persawahan padi.' },
        { time: 40, text: 'Ketika saluran tersumbat, debit air menurun drastis dan air menjadi keruh berbau.' },
        { time: 80, text: 'Petani mengeluhkan tanaman padi mereka tergenang dan bibit penyakit berkembang biak.' },
        { time: 130, text: 'Akar masalahnya adalah ketiadaan TPS di dekat pemukiman dan kebiasaan buang ke air.' },
        { time: 180, text: 'Namun kabar baiknya, warga RT 03 mulai menginisiasi bank sampah mandiri!' },
        { time: 220, text: 'Sampah plastik dipilah dan dijual kembali ke pengepul, dananya untuk kas warga.' },
      ],
      transcript: 'Halo teman-teman! Hari ini kita mengamati aliran saluran irigasi di desa kita. Terlihat endapan plastik kemasan menyumbat pintu air ke arah persawahan padi. Ketika saluran tersumbat, debit air menurun drastis dan air menjadi keruh berbau. Petani mengeluhkan tanaman padi mereka tergenang dan bibit penyakit berkembang biak. Akar masalahnya adalah ketiadaan TPS di dekat pemukiman dan kebiasaan lama membuang ke sungai. Namun kabar baiknya, warga RT 03 mulai menginisiasi bank sampah mandiri! Sampah plastik dipilah dan dijual kembali ke pengepul, dananya untuk kas warga.',
    },
  },
  {
    id: 'mat-youtube-1',
    title: 'Video YouTube: Pengelolaan Sampah Berbasis Komunitas Desa',
    subtitle: 'Studi kasus inovasi warga mengolah limbah plastik & pupuk kompos',
    type: 'video',
    fileSize: 'Streaming / Hemat Kuota',
    downloaded: false,
    authorRole: 'guru',
    uploadedAt: 'Kemarin',
    content: {
      summary: 'Video pembelajaran interaktif dari YouTube yang memperlihatkan keberhasilan pengelolaan sampah terpadu di desa binaan.',
      youtubeUrl: 'https://www.youtube.com/watch?v=kYI-Ld8_8a4',
      youtubeId: 'kYI-Ld8_8a4',
      duration: '05:42',
      captions: [
        { time: 0, text: 'Warga desa mulai memilah sampah anorganik dan organik dari sumbernya.' },
        { time: 30, text: 'Sampah plastik didaur ulang menjadi kerajinan dan paving block.' },
      ],
      transcript: 'Video dokumenter edukatif tentang cara masyarakat pedesaan membangun sistem pengelolaan sampah mandiri tanpa harus menunggu truk pengangkut dari kota.',
    },
  },
  {
    id: 'mat-pdf-1',
    title: 'Buku Pegangan Siswa (PDF Resmi): Sosiologi Masalah Sosial',
    subtitle: 'Dokumen panduan ringkas 6 halaman lengkap dengan tabel observasi lapangan',
    type: 'pdf',
    fileSize: '2.4 MB',
    downloaded: true,
    authorRole: 'guru',
    uploadedAt: 'Kemarin',
    content: {
      summary: 'Modul berformat PDF resmi rancangan Guru Sosiologi, memuat teori disorganisasi sosial, lembar observasi lapangan, dan rubrik asesmen.',
      pdfFileName: 'Buku_Pegangan_Sosiologi_Pedesaan_XI.pdf',
      pdfPageCount: 6,
      pdfTextSummary: [
        'Halaman 1: Capaian Pembelajaran & Kerangka UDL Mata Pelajaran Sosiologi SMA Fase F.',
        'Halaman 2: Peta Konsep Gejala Sosial vs Masalah Sosial di Kawasan Pedesaan.',
        'Halaman 3: Fakta Kasus Saluran Irigasi Tersumbat Plastik & Teori Kelambanan Budaya (Cultural Lag).',
        'Halaman 4: Panduan Observasi Lapangan: Checklist 5 Titik Kritis Timbulan Sampah.',
        'Halaman 5: Format Instrumen Wawancara Sederhana dengan Tokoh Adat / Kepala Dusun.',
        'Halaman 6: Rubrik Penilaian Portofolio Aksi & Kriteria Keberhasilan Solusi Gotong Royong.'
      ],
    },
  },
  {
    id: 'mat-audio',
    title: 'Audio Podcast Penjelasan Materi',
    subtitle: 'Format suara jernih, bisa didengarkan sambil santai tanpa melihat layar',
    type: 'audio',
    fileSize: '3.1 MB',
    downloaded: true,
    content: {
      summary: 'Narasi suara santai oleh Guru Sosiologi yang membahas poin-poin utama materi agar ramah gangguan penglihatan atau saat sedang di jalan.',
      duration: '05:30',
      transcript: 'Selamat pagi anak-anakku semua! Pada rekaman audio ini, Ibu guru ingin merangkum inti materi sosiologi kita tentang masalah sosial di desa. Ingatlah tiga kata kunci utama: Pertama, apa masalahnya? Yaitu sampah yang tidak terkelola. Kedua, mengapa terjadi? Karena belum ada tempat sampah umum dan kebiasaan buang sembarangan. Ketiga, apa dampaknya? Mengganggu kesehatan, mencemari air sawah, dan memicu perselisihan warga. Terakhir, apa solusinya? Gotong royong bersih desa dan membentuk bank sampah desa. Kalian bisa mendengarkan audio ini berulang kali secara offline ya!',
    },
  },
  {
    id: 'mat-transkrip',
    title: 'Transkrip Video & Lembar Teks Lengkap',
    subtitle: 'Alternatif tekstual penuh untuk siswa tuna rungu atau saat kuota habis',
    type: 'teks',
    fileSize: '45 KB',
    downloaded: true,
    content: {
      summary: 'Dokumen teks lengkap kata demi kata dari seluruh materi video dan audio untuk aksesibilitas maksimal.',
      transcript: 'DOKUMEN TRANSKRIP RESMI PEMBELAJARAN SOSIOLOGI SMA KELAS XI:\n\n1. Pendahuluan: Konsep dasar masalah sosial dalam masyarakat agraris pedesaan.\n2. Fakta Lapangan: Penumpukan 1,5 ton sampah anorganik per minggu tanpa armada pengangkut resmi di Desa Sukamaju.\n3. Analisis Sosiologis: Teori disorganisasi sosial dan kelambanan budaya (cultural lag), di mana teknologi kemasan plastik modern diadopsi cepat oleh warga, namun tata kelola daur ulang belum terbentuk.\n4. Rencana Aksi Pemuda: Peran karang taruna sebagai agen perubahan (agent of change) dalam mengedukasi warga memilah sampah dari dapur rumah tangga.',
    },
  },
];

export const ACTIVITIES_DATA: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Aktivitas 1: Mengamati Lingkungan Sejauh Mata',
    category: 'individu',
    timeEstimate: '30 Menit',
    description: 'Lakukan pengamatan singkat di radius 100 meter sekitar rumah atau sekolahmu. Catat apa yang kamu temukan.',
    instructions: [
      'Amati apakah ada tumpukan sampah liar di selokan, pinggir jalan, atau lahan kosong.',
      'Perhatikan jenis sampah terbanyak (plastik bungkus makanan, sisa sayur, botol plastik).',
      'Tuliskan 2 kalimat kesimpulan apakah hal tersebut mengganggu warga sekitar.',
    ],
    templateFields: [
      { label: 'Lokasi Pengamatan', placeholder: 'Contoh: Pinggir selokan jalan desa RT 02' },
      { label: 'Temuan Masalah Utama', placeholder: 'Contoh: Tumpukan kantong kresek dan popok menyumbat saluran' },
      { label: 'Reaksi / Pendapat Warga', placeholder: 'Contoh: Warga mengeluhkan bau dan banyak nyamuk' },
    ],
    completed: true,
  },
  {
    id: 'act-2',
    title: 'Aktivitas 2: Analisis Sebab-Dampak (Pohon Masalah)',
    category: 'kelompok',
    timeEstimate: '45 Menit',
    description: 'Petakan masalah sosial yang kamu temukan ke dalam skema pohon masalah: Akar (Penyebab), Batang (Masalah Inti), dan Ranting (Dampak).',
    instructions: [
      'Bekerjasamalah dengan 2-3 orang teman (bisa tatap muka atau via grup chat).',
      'Identifikasi minimal 2 akar penyebab paling mendasar.',
      'Uraikan 3 cabang ranting dampak yang dirasakan masyarakat.',
    ],
    templateFields: [
      { label: 'Akar Masalah (Penyebab)', placeholder: 'Contoh: Tidak ada tong sampah komunal & warga malas memilah' },
      { label: 'Batang (Masalah Inti)', placeholder: 'Contoh: Penumpukan sampah liar di aliran irigasi desa' },
      { label: 'Ranting (Dampak)', placeholder: 'Contoh: Gagal panen, bau menyengat, air sumur tercemar' },
    ],
    completed: false,
  },
  {
    id: 'act-3',
    title: 'Aktivitas 3: Merancang Alternatif Solusi Realistis',
    category: 'kontekstual',
    timeEstimate: '30 Menit',
    description: 'Rumuskan 1 solusi nyata yang murah, realistis, dan bisa dipraktikkan langsung di lingkungan pedesaan.',
    instructions: [
      'Pastikan solusi tidak membutuhkan biaya mahal yang sulit diwujudkan.',
      'Manfaatkan semangat gotong royong warga desa atau peran pemuda karang taruna.',
      'Jelaskan langkah pertama yang harus dilakukan minggu ini.',
    ],
    templateFields: [
      { label: 'Nama Ide Solusi', placeholder: 'Contoh: Gerakan Bank Sampah Karang Taruna Berkah' },
      { label: 'Cara Kerja Singkat', placeholder: 'Contoh: Tiap hari Minggu warga menukar sampah botol dengan bibit sayur' },
      { label: 'Tantangan & Antisipasi', placeholder: 'Contoh: Warga sibuk bertani -> Solusi: penjemputan berkala ke rumah' },
    ],
    completed: false,
  },
];

export const FORUM_POSTS: ForumPost[] = [
  {
    id: 'post-1',
    author: 'Dra. Siti Rahayu, M.Pd (Guru)',
    avatar: '👩‍🏫',
    role: 'guru',
    timeAgo: '3 jam lalu',
    content: 'Selamat pagi anak-anak! Menurut pengamatan kalian di lingkungan sekitar rumah masing-masing, apa faktor utama yang membuat warga masih enggan memilah sampah?',
    replies: [
      {
        id: 'rep-1',
        author: 'Siti Nurhaliza',
        avatar: '🧕',
        timeAgo: '2 jam lalu',
        content: 'Menurut saya karena tidak ada tempat penampungan yang terpisah bu. Meskipun di rumah sudah dipilah, saat diangkut ujung-ujungnya dicampur lagi.',
      },
      {
        id: 'rep-2',
        author: 'Raka Pratama',
        avatar: '👦',
        timeAgo: '1 jam lalu',
        content: 'Di dusun saya faktor utamanya jarak ke TPA sangat jauh, jadi sebagian warga memilih membakar sampah di pekarangan belakang.',
      },
      {
        id: 'rep-3',
        author: 'Nadia Putri',
        avatar: '👧',
        timeAgo: '30 menit lalu',
        content: 'Setuju dengan Raka! Selain itu sosialisasi dari pengurus RT juga masih minim. Perlu dibuat plang peringatan dan jadwal gotong royong.',
      },
    ],
  },
];

export const INITIAL_SUBMISSIONS: SubmissionRecord[] = [
  {
    id: 'sub-1',
    studentName: 'Dita Anggraini',
    productType: 'infografis',
    title: 'Infografis Daur Alur Sampah Plastik Dusun Sukamaju',
    contentOrNote: 'Poster visual digital dengan pemetaan pohon masalah dan alur Bank Sampah Desa berbasis gotong royong karang taruna.',
    submittedAt: 'Kemarin, 14:20 WIB',
    status: 'terkirim_online',
    grade: 88,
    feedback: 'Analisis sebab-dampak sangat tajam! Solusi bank sampah sangat aplikatif untuk lingkungan dusun. Pertahankan!',
  },
  {
    id: 'sub-2',
    studentName: 'Raka Pratama',
    productType: 'audio',
    title: 'Podcast 7 Menit: Dampak Pembakaran Sampah di Pekarangan Belakang',
    contentOrNote: 'Rekaman suara monolog hasil wawancara dengan ketua RT 03 dan analisis bahaya polusi asap bagi lansia serta anak balita di desa.',
    submittedAt: 'Hari ini, 09:15 WIB',
    status: 'terkirim_online',
    grade: undefined,
    feedback: undefined,
  },
  {
    id: 'sub-3',
    studentName: 'Siti Nurhaliza',
    productType: 'esai',
    title: 'Esai Analisis: Mengapa Pemilahan Sampah Rumah Tangga Mandek?',
    contentOrNote: 'Tulisan analisis 700 kata yang menyoroti faktor minimnya armada angkut desa dan perlunya Peraturan Desa (Perdes) Kebersihan.',
    submittedAt: 'Hari ini, 11:30 WIB',
    status: 'terkirim_online',
    grade: 92,
    feedback: 'Argumentasi sangat runtut dan usulan Perdes sangat kontekstual dengan kondisi pemerintahan desa saat ini.',
  },
  {
    id: 'sub-4',
    studentName: 'Budi Santoso',
    productType: 'presentasi',
    title: 'Slide Presentasi: Rencana Aksi Pemuda Bersih Saluran Irigasi',
    contentOrNote: '4 slide ringkas rencana gotong royong karang taruna untuk membersihkan pintu air irigasi sawah.',
    submittedAt: 'Kemarin, 16:45 WIB',
    status: 'tersimpan_offline',
    grade: undefined,
    feedback: undefined,
  },
];

export const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 'std-1',
    name: 'Dita Anggraini',
    nisn: '0081234561',
    classroom: 'XI-IPS 1',
    preferredPathway: 'offline',
    specialNeedsOrNotes: 'Keterbatasan kuota mandiri & sinyal lemah di Dusun Melati; memprioritaskan unduhan modul offline & representasi visual.',
    completedActivities: 2,
    totalSubmissions: 1,
    joinedAt: '12 Jul 2026',
  },
  {
    id: 'std-2',
    name: 'Budi Santoso',
    nisn: '0081234562',
    classroom: 'XI-IPS 1',
    preferredPathway: 'online',
    specialNeedsOrNotes: 'Pembelajar visual aktif; lebih nyaman menghasilkan produk karya presentasi grafis atau video pendek.',
    completedActivities: 1,
    totalSubmissions: 1,
    joinedAt: '12 Jul 2026',
  },
  {
    id: 'std-3',
    name: 'Siti Nurhaliza',
    nisn: '0081234563',
    classroom: 'XI-IPS 1',
    preferredPathway: 'online',
    specialNeedsOrNotes: 'Kekuatan pada analisis kritis tulisan terstruktur dan esai argumen; menyukai modul teks tersegmentasi.',
    completedActivities: 3,
    totalSubmissions: 1,
    joinedAt: '13 Jul 2026',
  },
  {
    id: 'std-4',
    name: 'Raka Pratama',
    nisn: '0081234564',
    classroom: 'XI-IPS 1',
    preferredPathway: 'offline',
    specialNeedsOrNotes: 'Lebih nyaman mendengar rekaman suara / podcast dan menghasilkan produk karya berupa rekaman audio lisan.',
    completedActivities: 1,
    totalSubmissions: 1,
    joinedAt: '14 Jul 2026',
  },
  {
    id: 'std-5',
    name: 'Nadia Putri',
    nisn: '0081234565',
    classroom: 'XI-IPS 1',
    preferredPathway: 'online',
    specialNeedsOrNotes: 'Aktif dalam diskusi forum dan kelompok; responsif terhadap studi kasus kontekstual pedesaan.',
    completedActivities: 2,
    totalSubmissions: 0,
    joinedAt: '15 Jul 2026',
  },
];
