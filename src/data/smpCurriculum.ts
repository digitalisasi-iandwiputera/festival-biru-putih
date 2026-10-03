import { Topic } from '../types';

export const SMP_TOPICS: Topic[] = [
  // 1. INFORMATIKA
  {
    id: 'informatika',
    title: 'Berpikir Komputasional & Algoritma Pencarian',
    shortDesc: 'Pelajari bagaimana dekomposisi dan algoritma pencarian (Binary vs Linear) memecahkan masalah dalam hitungan detik.',
    subject: 'Informatika',
    grade: 'Kelas 7',
    domain: 'Informatika',
    conceptTag: 'Dekomposisi & Algoritma',
    analogyPreview: 'Analogi mencari kata di kamus tebal & resep masakan',
    thumbnailKey: 'informatika',
    durationMinutes: 20,
    coreQuestion: 'Bagaimana komputer bisa menemukan 1 video di antara miliaran video hanya dalam sepersekian detik?',
    curriculumCompetency: 'Menerapkan berpikir komputasional untuk menyelesaikan persoalan komputasi yang mengandung algoritma pencarian terstruktur.',
    coverImage: '/media/images/sampul-informatika.png',
    audioFile: '/media/audio/informatika.mp3',
    videoFile: '/media/video/informatika.mp4',
    sections: [
      {
        id: 'sec-inf-1',
        sectionNumber: 1,
        title: 'Empat Pilar Berpikir Komputasional',
        leadParagraph: 'Berpikir komputasional adalah metode pemecahan masalah dengan meniru cara ilmuwan komputer memformulasikan solusi secara logis dan terstruktur.',
        content: [
          'Dekomposisi: Memecah masalah besar dan rumit menjadi bagian-bagian kecil yang lebih mudah dikelola.',
          'Pengenalan Pola (Pattern Recognition): Melihat kesamaan karakteristik antar masalah untuk menemukan jalan pintas penyelesaian.',
          'Abstraksi: Memilah informasi penting dan mengabaikan detail-detail yang tidak relevan dengan tujuan inti.',
          'Perancangan Algoritma: Menyusun langkah-langkah sistematis berurutan dari awal hingga selesai untuk mengeksekusi solusi.'
        ],
        funFact: 'Konsep berpikir komputasional pertama kali diperkenalkan oleh Jeannette Wing pada tahun 2006 dan kini menjadi keterampilan abad ke-21 yang wajib dipelajari di seluruh dunia!',
        realWorldAnalogy: {
          title: 'Analogi Merapikan Kamar Tidur yang Berantakan',
          description: 'Jika kamu melihat seluruh kamar berantakan, kamu akan bingung. Namun jika didekomposisi: mulai rapikan meja belajar, lalu rapikan kasur, lalu tata buku di rak. Masalah besar jadi selesai dengan mudah!'
        },
        miniQuiz: {
          question: 'Manakah pilar berpikir komputasional yang berfokus membuang informasi tidak penting?',
          options: [
            'Dekomposisi',
            'Abstraksi',
            'Pengenalan Pola',
            'Perancangan Algoritma'
          ],
          correctAnswer: 1,
          explanation: 'Abstraksi adalah proses menyaring dan membuang detail yang tidak perlu sehingga kita fokus hanya pada informasi esensial pemecahan masalah.'
        },
        paragraphQuizzes: [
          {
            paragraphIndex: 0,
            question: 'Apa tujuan utama dari pilar Dekomposisi dalam berpikir komputasional?',
            options: [
              'Memecah masalah besar dan rumit menjadi bagian-bagian kecil yang lebih mudah dikelola',
              'Menghapus seluruh file data lama dari komputer',
              'Menghafal rumus matematika tingkat universitas',
              'Membuat animasi grafis bergerak tanpa kode'
            ],
            correctAnswer: 0,
            explanation: 'Dekomposisi bertugas mengurai persoalan besar menjadi kepingan-kepingan kecil yang teratur agar dapat dipecahkan satu demi satu.'
          },
          {
            paragraphIndex: 1,
            question: 'Mengapa Pengenalan Pola (Pattern Recognition) sangat bermanfaat bagi seorang pemecah masalah?',
            options: [
              'Membuat layar laptop menjadi lebih cerah',
              'Melihat kesamaan karakteristik antar masalah untuk menemukan cara penyelesaian yang efisien',
              'Mengubah file video menjadi lagu audio',
              'Menghitung jumlah ketikan keyboard per menit'
            ],
            correctAnswer: 1,
            explanation: 'Dengan mengenali pola kesamaan dari pengalaman sebelumnya, kita bisa langsung menerapkan pola solusi serupa tanpa memulai dari nol.'
          },
          {
            paragraphIndex: 2,
            question: 'Berdasarkan uraian tentang Abstraksi, apa yang harus dilakukan terhadap detail yang tidak relevan?',
            options: [
              'Disimpan dalam memori utama berulang kali',
              'Diabaikan atau disaring agar tetap fokus pada informasi inti',
              'Dijadikan kata sandi akun penting',
              'Ditulis dengan huruf kapital tebal'
            ],
            correctAnswer: 1,
            explanation: 'Abstraksi membuang detail yang tidak esensial sehingga kita tidak terdistraksi dan fokus pada esensi pemecahan masalah.'
          },
          {
            paragraphIndex: 3,
            question: 'Apa definisi dari Perancangan Algoritma?',
            options: [
              'Menyusun langkah-langkah sistematis dan berurutan dari awal hingga selesai untuk mengeksekusi solusi',
              'Membeli periferal komputer baru',
              'Memformat harddisk secara acak',
              'Menghubungkan modem ke internet'
            ],
            correctAnswer: 0,
            explanation: 'Algoritma adalah deretan instruksi bertahap yang runut dan logis untuk mencapai target hasil yang diharapkan.'
          }
        ]
      },
      {
        id: 'sec-inf-2',
        sectionNumber: 2,
        title: 'Algoritma Pencarian: Linear vs Binary Search',
        leadParagraph: 'Pencarian (searching) adalah proses menemukan lokasi suatu data tertentu di dalam sekumpulan data yang tersimpan.',
        content: [
          'Pencarian Linier (Linear Search): Memeriksa data satu per satu dari elemen pertama hingga terakhir secara berurutan. Cocok untuk data acak tak terurut.',
          'Pencarian Biner (Binary Search): Hanya bisa digunakan jika data SUDAH TERURUT (sorted). Algoritma ini langsung melihat nilai tengah, lalu membuang setengah bagian yang tidak mungkin memuat data tersebut.',
          'Efisiensi: Untuk 1.000 data terurut, Linear Search membutuhkan hingga 1.000 langkah, sedangkan Binary Search hanya membutuhkan maksimal 10 langkah (karena 2¹⁰ ≈ 1024)!'
        ],
        funFact: 'Algoritma Binary Search digunakan oleh mesin pencari Google saat mengindeks miliaran kata kunci sehingga hasil pencarian muncul kurang dari 0,2 detik!',
        realWorldAnalogy: {
          title: 'Analogi Menebak Halaman Kamus',
          description: 'Bayangkan kamu mencari kata "Merdeka" di kamus 1.000 halaman. Kamu tidak akan membuka dari halaman 1, 2, 3 (Linear). Kamu langsung buka tengahnya (halaman 500), lihat hurufnya, lalu buang bagian kiri yang tidak cocok!'
        },
        miniQuiz: {
          question: 'Apa syarat mutlak agar algoritma Binary Search dapat dijalankan?',
          options: [
            'Data harus berupa angka pecahan desimal',
            'Data harus dalam kondisi sudah terurut (sorted)',
            'Jumlah data harus kelipatan genap',
            'Data harus disimpan dalam format file teks'
          ],
          correctAnswer: 1,
          explanation: 'Binary Search hanya bisa bekerja jika sekumpulan data sudah terurut (ascending/descending), karena perbandingan nilai tengah menentukan pemotongan separuh data.'
        },
        paragraphQuizzes: [
          {
            paragraphIndex: 0,
            question: 'Kapan algoritma Linear Search tepat digunakan?',
            options: [
              'Ketika data masih acak dan belum terurut',
              'Hanya untuk data numerik jutaan entri',
              'Hanya ketika data sudah diurutkan dari Z ke A',
              'Saat komputer tidak terhubung ke jaringan'
            ],
            correctAnswer: 0,
            explanation: 'Linear Search memeriksa elemen satu per satu dari awal, sehingga dapat langsung bekerja pada data yang acak tanpa perlu diurutkan terlebih dahulu.'
          },
          {
            paragraphIndex: 1,
            question: 'Mengapa algoritma Binary Search jauh lebih efisien dalam mencari data?',
            options: [
              'Karena langsung membandingkan dengan nilai tengah dan membuang separuh data yang tidak mungkin',
              'Karena membaca semua data sekaligus dalam satu detik',
              'Karena menghapus seluruh data yang nilainya ganjil',
              'Karena menggunakan algoritma pencarian visual warna'
            ],
            correctAnswer: 0,
            explanation: 'Binary Search langsung membagi area pencarian menjadi dua bagian pada tiap langkah pengujian nilai tengah.'
          },
          {
            paragraphIndex: 2,
            question: 'Berapa langkah maksimal yang diperlukan Binary Search untuk mencari data di antara 1.000 data terurut?',
            options: [
              '1.000 langkah',
              '500 langkah',
              'Maksimal sekitar 10 langkah (karena 2¹⁰ ≈ 1.024)',
              '100 langkah'
            ],
            correctAnswer: 2,
            explanation: 'Dengan kompleksitas logaritmik O(log₂ 1000) ≈ 10 langkah, Binary Search dapat menemukan target jauh lebih cepat daripada Linear Search.'
          }
        ]
      }
    ],
    audioTurns: [
      {
        id: 1,
        speaker: 'guru',
        speakerName: 'Pak Budi (Guru Informatika)',
        timestamp: '00:00',
        timeInSeconds: 22,
        text: 'Halo anak-anak! Pernahkah kamu memikirkan bagaimana kontak di ponselmu bisa ditemukan dalam hitungan milidetik saat kamu mengetik huruf pertama?',
        keyTakeaway: 'Pencarian kilat di perangkat digital mengandalkan algoritma yang efisien.'
      },
      {
        id: 2,
        speaker: 'siswa',
        speakerName: 'Rian (Siswa SMP)',
        timestamp: '00:23',
        timeInSeconds: 20,
        text: 'Apakah ponsel memeriksa nama teman saya satu per satu dari atas ke bawah, Pak?',
        keyTakeaway: 'Pemeriksaan satu per satu disebut Linear Search.'
      },
      {
        id: 3,
        speaker: 'guru',
        speakerName: 'Pak Budi (Guru Informatika)',
        timestamp: '00:44',
        timeInSeconds: 26,
        text: 'Kalau nama di kontakmu ada 500 dan dicari satu per satu, ponsel akan lambat. Karena kontak tersusun rapi dari A sampai Z, ponsel memakai Binary Search: langsung membelah daftar di tengah!',
        keyTakeaway: 'Binary Search memangkas 50% data yang tidak relevan di setiap langkah.'
      },
      {
        id: 4,
        speaker: 'siswa',
        speakerName: 'Rian (Siswa SMP)',
        timestamp: '01:11',
        timeInSeconds: 22,
        text: 'Wah, cerdik sekali! Berarti kalau datanya acak-acakan, kita harus urutkan dulu ya Pak sebelum bisa dibelah dua?',
        keyTakeaway: 'Pengurutan (sorting) adalah prasyarat efisiensi pencarian biner.'
      }
    ],
    slides: [
      {
        id: 1,
        title: 'Pengenalan Berpikir Komputasional',
        subtitle: 'Konsep dasar pemecahan masalah komputasi',
        bulletPoints: [],
        takeaway: '',
        imageFile: '/media/slides/informatika-slide-1.png'
      },
      {
        id: 2,
        title: 'Empat Pilar Berpikir Komputasional',
        subtitle: 'Dekomposisi, Pola, Abstraksi, dan Algoritma',
        bulletPoints: [],
        takeaway: '',
        imageFile: '/media/slides/informatika-slide-2.png'
      },
      {
        id: 3,
        title: 'Algoritma Pencarian Linear vs Biner',
        subtitle: 'Membandingkan efisiensi waktu eksekusi',
        bulletPoints: [],
        takeaway: '',
        imageFile: '/media/slides/informatika-slide-3.png'
      },
      {
        id: 4,
        title: 'Studi Kasus & Analogi Sehari-hari',
        subtitle: 'Mencari data terstruktur di sekitar kita',
        bulletPoints: [],
        takeaway: '',
        imageFile: '/media/slides/informatika-slide-4.png'
      },
      {
        id: 5,
        title: 'Rangkuman & Refleksi Informatika',
        subtitle: 'Poin penting materi Berpikir Komputasional',
        bulletPoints: [],
        takeaway: '',
        imageFile: '/media/slides/informatika-slide-5.png'
      }
    ],
    mindMap: {
      rootLabel: 'Informatika: Algoritma Pencarian',
      nodes: [
        {
          id: 'n-inf-1',
          label: 'Berpikir Komputasional',
          category: 'core',
          x: 200,
          y: 120,
          description: 'Fondasi berpikir logis dengan 4 pilar: dekomposisi, pola, abstraksi, dan algoritma.',
          example: 'Membagi tugas kelompok menjadi 4 bagian kerja yang jelas.',
          relatedIds: ['n-inf-2', 'n-inf-3']
        },
        {
          id: 'n-inf-2',
          label: 'Linear Search',
          category: 'subconcept',
          x: 400,
          y: 70,
          description: 'Pencarian berurutan satu demi satu dari awal hingga akhir.',
          example: 'Mencari kunci motor di dalam kantong celana tanpa melihat urutan.',
          relatedIds: []
        },
        {
          id: 'n-inf-3',
          label: 'Binary Search',
          category: 'application',
          x: 400,
          y: 180,
          description: 'Pencarian dengan membagi dua data terurut secara berulang.',
          example: 'Menebak angka rahasia antara 1-100 dengan bertanya: lebih besar dari 50?',
          relatedIds: []
        }
      ]
    },
    diagnosticQuestions: [
      {
        id: 'dq-inf-1',
        question: 'Jika kamu memiliki 64 kartu angka yang sudah terurut dari 1 sampai 64, berapa maksimal tebakan yang dibutuhkan dengan Binary Search?',
        options: ['64 kali', '32 kali', '6 kali', '16 kali'],
        correctAnswer: 2,
        conceptTarget: 'Efisiensi Binary Search (Logaritma Biner)',
        gapFeedback: {
          misconception: 'Mengira butuh separuh dari 64 (32 langkah).',
          explanation: '2⁶ = 64. Setiap tebakan membuang setengah kemungkinan (64 -> 32 -> 16 -> 8 -> 4 -> 2 -> 1), sehingga maksimal hanya butuh 6 langkah!',
          recommendedFormat: 'slides',
          recommendedTargetId: 'slide-2',
          recommendedLabel: 'Buka Slide 2: Kecepatan Linear vs Binary Search'
        }
      }
    ],
    flashcards: [
      {
        id: 'fc-inf-1',
        frontQuestion: 'Apa perbedaan mendasar antara Linear Search dan Binary Search?',
        backAnswer: 'Linear Search memeriksa data satu per satu dari awal (bisa untuk data acak), sedangkan Binary Search langsung membelah data terurut menjadi dua bagian.',
        category: 'Konsep Dasar',
        hint: 'Ingat syarat keterurutan data!',
        keyTerm: 'Efisiensi Algoritma'
      },
      {
        id: 'fc-inf-2',
        frontQuestion: 'Sebutkan 4 pilar berpikir komputasional!',
        backAnswer: '1. Dekomposisi, 2. Pengenalan Pola, 3. Abstraksi, dan 4. Perancangan Algoritma.',
        category: 'Pilar Pemikiran',
        hint: 'Dimulai dari memecah masalah besar.',
        keyTerm: 'Computational Thinking'
      }
    ]
  },

  // 1.2 INFORMATIKA: JEJAK BERMEDIA DIGITAL
  {
    id: 'jejak-bermedia-digital',
    title: 'Jejak Bermedia Digital & Etika Siber',
    shortDesc: 'Pahami apa itu jejak digital aktif dan pasif, bahaya rekam jejak permanen di internet, serta cara menjaga privasi dan reputasi diri.',
    subject: 'Informatika',
    grade: 'Kelas 7',
    domain: 'Informatika',
    conceptTag: 'Dampak Sosial Informatika & Privasi',
    analogyPreview: 'Analogi tapak kaki di semen basah yang mengering permanen',
    thumbnailKey: 'jejak-digital',
    durationMinutes: 20,
    coreQuestion: 'Apakah unggahan atau chat yang sudah kita hapus di media sosial benar-benar hilang selamanya tanpa jejak?',
    curriculumCompetency: 'Memahami ketersediaan data pribadi dan jejak digital di internet serta menerapkan etika dan keamanan bermedia digital secara bertanggung jawab.',
    coverImage: '/media/images/sampul-jejak-digital.png',
    audioFile: '/media/audio/jejak-digital.mp3',
    videoFile: '/media/video/jejak-digital.mp4',
    sections: [
      {
        id: 'sec-jd-1',
        sectionNumber: 1,
        title: 'Mengenal Jejak Digital: Aktif vs Pasif',
        leadParagraph: 'Setiap kali kita membuka internet, berinteraksi di media sosial, atau menggunakan aplikasi ponsel, kita meninggalkan jejak data digital yang direkam oleh sistem.',
        content: [
          'Jejak Digital Aktif: Data yang sengaja kita buat dan unggah ke internet, seperti foto, video, status medsos, komentar, email, dan pesan chat.',
          'Jejak Digital Pasif: Data yang terekam secara otomatis tanpa disadari, seperti alamat IP perangkat, riwayat pencarian browser, cookies web, serta lokasi GPS saat aplikasi aktif.',
          'Sifat Permanen: Sekali data diunggah ke internet, pihak lain bisa menangkap layar (screenshot), menyalin, atau mengunduhnya sehingga sangat sulit untuk dihapus sepenuhnya.'
        ],
        funFact: 'Lebih dari 70% perekrut universitas dan perusahaan multinasional kini memeriksa jejak media sosial calon mahasiswa atau pelamar kerja sebelum menerima mereka!',
        realWorldAnalogy: {
          title: 'Analogi Tapak Kaki di Semen Basah',
          description: 'Beraktivitas di internet bagaikan melangkah di atas semen basah. Sekali terinjak, tapak kaki itu akan mengering dan membatu selamanya, tidak bisa dihapus hanya dengan mencucinya!'
        },
        miniQuiz: {
          question: 'Manakah di bawah ini yang merupakan contoh dari jejak digital PASIF?',
          options: [
            'Mengunggah foto liburan di Instagram',
            'Alamat IP dan riwayat pencarian yang dicatat browser otomatis',
            'Menulis komentar di video YouTube',
            'Mengirim tugas sekolah lewat email'
          ],
          correctAnswer: 1,
          explanation: 'Jejak pasif adalah jejak data yang dihasilkan otomatis oleh sistem/perangkat tanpa tindakan sadar dari pengguna untuk membagikannya.'
        },
        paragraphQuizzes: [
          {
            paragraphIndex: 0,
            question: 'Apa perbedaan mendasar antara jejak digital aktif dan jejak digital pasif?',
            options: [
              'Jejak aktif dibagikan secara sengaja oleh pengguna, sedangkan jejak pasif terekam otomatis oleh sistem di latar belakang',
              'Jejak aktif hanya ada di komputer, sedangkan jejak pasif hanya ada di TV',
              'Jejak aktif selalu berbayar, sedangkan jejak pasif gratis',
              'Jejak pasif langsung terhapus setelah 1 jam'
            ],
            correctAnswer: 0,
            explanation: 'Jejak aktif tercipta dari aksi sadar pengguna membagikan konten, sedangkan jejak pasif dikumpulkan mesin/server secara otomatis.'
          },
          {
            paragraphIndex: 1,
            question: 'Mengapa jejak di internet dikatakan memiliki sifat permanen?',
            options: [
              'Karena orang lain bisa mengunduh, menyalin, atau melakukan tangkapan layar (screenshot) meskipun postingan asli sudah dihapus',
              'Karena kabel internet terbuat dari baja tahan karat',
              'Karena satelit tidak bisa mematikan kamera',
              'Karena keyboard komputer tidak memiliki tombol delete'
            ],
            correctAnswer: 0,
            explanation: 'Begitu data tersebar ke ranah publik internet, orang lain atau server perantara sudah mereplikasi data tersebut.'
          }
        ]
      },
      {
        id: 'sec-jd-2',
        sectionNumber: 2,
        title: 'Etika Siber & Melindungi Privasi Pribadi',
        leadParagraph: 'Sebagai warga digital (digital citizen) yang cerdas dan bertanggung jawab, kita harus membiasakan diri melindungi data sensitif dan menghormati pengguna lain.',
        content: [
          'Prinsip T.H.I.N.K: Sebelum mengunggah sesuatu, tanyakan: Apakah ini True (benar), Helpful (membantu), Inspiring (menginspirasi), Necessary (perlu), dan Kind (baik)?',
          'Jangan Bagikan Data Pribadi (PII): Hindari membagikan NIK, nomor telepon, alamat rumah lengkap, nama ibu kandung, atau lokasi sekolah secara publik.',
          'Amankan Akun: Gunakan kata sandi yang kuat dan berbeda di setiap akun, serta aktifkan autentikasi dua faktor (Two-Factor Authentication / 2FA).'
        ],
        funFact: 'Autentikasi dua faktor (2FA) dapat mencegah hingga 99.9% serangan peretasan akun otomatis!',
        realWorldAnalogy: {
          title: 'Analogi Kunci Gembok Pintu Rumah',
          description: 'Membagikan data pribadi sembarangan di medsos sama seperti menempelkan kunci rumah dan peta denah brankas di tiang listrik pinggir jalan!'
        },
        miniQuiz: {
          question: 'Informasi apa yang paling berbahaya jika disebarkan ke media sosial publik?',
          options: [
            'Judul buku pelajaran favorit',
            'Foto pemandangan langit sore hari',
            'NIK KTP dan alamat rumah lengkap',
            'Nama club sepak bola yang didukung'
          ],
          correctAnswer: 2,
          explanation: 'NIK dan alamat rumah adalah data pribadi sensitif (PII) yang bisa disalahgunakan penipu untuk pinjaman ilegal atau kejahatan siber.'
        },
        paragraphQuizzes: [
          {
            paragraphIndex: 0,
            question: 'Apa kepanjangan dari konsep T.H.I.N.K dalam etika bermedia digital?',
            options: [
              'True, Helpful, Inspiring, Necessary, Kind',
              'Talk, Hear, Interact, Notice, Know',
              'Total, Honest, Important, Normal, Keen',
              'Time, Hour, Internet, Network, Key'
            ],
            correctAnswer: 0,
            explanation: 'T.H.I.N.K adalah panduan refleksi diri sebelum membagikan konten: True (benar), Helpful (membantu), Inspiring (menginspirasi), Necessary (perlu), Kind (santun/baik).'
          }
        ]
      }
    ],
    audioTurns: [
      {
        id: 1,
        speaker: 'guru',
        speakerName: 'Bu Salma (Guru Informatika)',
        timestamp: '00:00',
        timeInSeconds: 22,
        text: 'Halo anak-anak! Pernahkah kamu mendengar istilah "jejak digital"? Tahukah kamu bahwa apapun yang kamu ketik di internet hampir mustahil hilang 100%?',
        keyTakeaway: 'Internet memiliki daya ingat permanen terhadap aktivitas digital kita.'
      },
      {
        id: 2,
        speaker: 'siswa',
        speakerName: 'Bima (Siswa SMP)',
        timestamp: '00:23',
        timeInSeconds: 19,
        text: 'Tapi Bu, kalau saya unggah cerita Instagram lalu saya hapus dalam 5 menit, apakah itu masih meninggalkan jejak?',
        keyTakeaway: 'Penghapusan postingan tidak menjamin ketiadaan duplikat.'
      },
      {
        id: 3,
        speaker: 'guru',
        speakerName: 'Bu Salma (Guru Informatika)',
        timestamp: '00:43',
        timeInSeconds: 26,
        text: 'Bisa jadi seseorang sudah mengambil tangkapan layar (screenshot), atau server arsip web sudah menyimpannya. Karena itu, berpikirlah sebelum membagikan sesuatu!',
        keyTakeaway: 'Prinsip saring sebelum sharing adalah kunci menjaga reputasi digital.'
      }
    ],
    slides: [
      {
        id: 1,
        title: 'Mengenal Jejak Digital',
        subtitle: 'Aktif vs Pasif di ruang siber',
        bulletPoints: [],
        takeaway: '',
        imageFile: '/media/slides/jejak-digital-slide-1.png'
      },
      {
        id: 2,
        title: 'Karakteristik & Bahaya Rekam Jejak',
        subtitle: 'Sifat permanen dan risiko kebocoran data',
        bulletPoints: [],
        takeaway: '',
        imageFile: '/media/slides/jejak-digital-slide-2.png'
      },
      {
        id: 3,
        title: 'Etika Bermedia & Prinsip T.H.I.N.K',
        subtitle: 'True, Helpful, Inspiring, Necessary, Kind',
        bulletPoints: [],
        takeaway: '',
        imageFile: '/media/slides/jejak-digital-slide-3.png'
      },
      {
        id: 4,
        title: 'Perlindungan Data Pribadi & Keamanan',
        subtitle: 'Menjaga kerahasiaan identitas siswa',
        bulletPoints: [],
        takeaway: '',
        imageFile: '/media/slides/jejak-digital-slide-4.png'
      },
      {
        id: 5,
        title: 'Rangkuman & Portofolio Digital',
        subtitle: 'Membangun reputasi positif di masa depan',
        bulletPoints: [],
        takeaway: '',
        imageFile: '/media/slides/jejak-digital-slide-5.png'
      }
    ],
    mindMap: {
      rootLabel: 'Informatika: Jejak Digital',
      nodes: [
        {
          id: 'n-jd-1',
          label: 'Jejak Digital',
          category: 'core',
          x: 200,
          y: 120,
          description: 'Rekam jejak seluruh riwayat aktivitas yang ditinggalkan saat berselancar di dunia maya.',
          example: 'Riwayat pencarian Google dan postingan video di TikTok.',
          relatedIds: ['n-jd-2', 'n-jd-3']
        },
        {
          id: 'n-jd-2',
          label: 'Jejak Aktif',
          category: 'subconcept',
          x: 400,
          y: 60,
          description: 'Data yang diunggah secara sadar dan disengaja oleh pengguna.',
          example: 'Mengunggah status Twitter atau foto profil akun Instagram.',
          relatedIds: []
        },
        {
          id: 'n-jd-3',
          label: 'Jejak Pasif',
          category: 'subconcept',
          x: 400,
          y: 180,
          description: 'Data yang terekam otomatis oleh server penyedia layanan tanpa disadari.',
          example: 'Alamat IP dan data cookies pelacak iklan.',
          relatedIds: []
        }
      ]
    },
    diagnosticQuestions: [
      {
        id: 'dq-jd-1',
        question: 'Seorang teman mengajakmu membagikan foto kartu identitas pelajar yang memuat nama lengkap, tanggal lahir, dan alamat rumah di medsos. Tindakan paling tepat adalah...',
        options: [
          'Langsung menolaknya karena data tersebut termasuk data pribadi sensitif (PII) yang rawan disalahgunakan',
          'Ikut mengunggahnya agar terlihat keren dan kompak',
          'Mengunggahnya tapi menghapus setelah 1 jam',
          'Membagikannya hanya di grup chat publik'
        ],
        correctAnswer: 0,
        conceptTarget: 'Perlindungan Data Pribadi Sensitif (PII)',
        gapFeedback: {
          misconception: 'Mengira data pelajar aman disebarkan di medsos.',
          explanation: 'Data identitas lengkap berpotensi dimanfaatkan pihak jahat untuk penipuan rekayasa sosial (social engineering). Selalu jaga kerahasiaan data pribadi!',
          recommendedFormat: 'slides',
          recommendedTargetId: 'slide-1',
          recommendedLabel: 'Buka Slide: Jejak Digital & Etika Bermedia'
        }
      }
    ],
    flashcards: [
      {
        id: 'fc-jd-1',
        frontQuestion: 'Apa perbedaan antara jejak digital aktif dan jejak digital pasif?',
        backAnswer: 'Jejak aktif dibuat dan dibagikan secara sengaja (seperti postingan foto & komentar), sedangkan jejak pasif terekam otomatis di latar belakang (seperti IP address, cookies, dan lokasi GPS).',
        category: 'Konsep Dasar',
        hint: 'Sengaja vs otomatis di latar belakang.',
        keyTerm: 'Jejak Digital (Digital Footprint)'
      },
      {
        id: 'fc-jd-2',
        frontQuestion: 'Mengapa kita wajib menerapkan autentikasi dua faktor (2FA)?',
        backAnswer: 'Karena 2FA memberikan lapisan keamanan tambahan (seperti kode OTP ke ponsel), sehingga akun tetap aman meskipun ada orang lain yang mengetahui kata sandi kita.',
        category: 'Keamanan Siber',
        hint: 'Lapisan pelindung kedua selain sandi.',
        keyTerm: '2-Factor Authentication (2FA)'
      }
    ]
  },

  // 1.3 INFORMATIKA: ANALISIS DATA
  {
    id: 'analisis-data',
    title: 'Analisis Data & Visualisasi Informasi',
    shortDesc: 'Pelajari bagaimana mengumpulkan data mentah, membersihkan tabel di spreadsheet, hingga memvisualisasikannya menjadi grafik yang informatif.',
    subject: 'Informatika',
    grade: 'Kelas 7',
    domain: 'Informatika',
    conceptTag: 'Pengolahan Data & Spreadsheet',
    analogyPreview: 'Analogi koki memilah bahan masakan mentah sebelum disajikan',
    thumbnailKey: 'analisis-data',
    durationMinutes: 20,
    coreQuestion: 'Bagaimana kumpulan jutaan angka acak di tabel komputer bisa diubah menjadi grafik yang langsung dipahami siapa saja dalam 3 detik?',
    curriculumCompetency: 'Mengolah dan menganalisis sekumpulan data bervolume kecil menggunakan perkakas pengolah lembar kerja (spreadsheet) serta menyajikannya dalam grafik yang tepat.',
    coverImage: '/media/images/sampul-analisis-data.png',
    audioFile: '/media/audio/analisis-data.mp3',
    videoFile: '/media/video/analisis-data.mp4',
    sections: [
      {
        id: 'sec-ad-1',
        sectionNumber: 1,
        title: 'Dari Data Mentah ke Informasi yang Bernilai',
        leadParagraph: 'Data adalah kumpulan fakta mentah (angka, teks, simbol) yang belum diolah, sedangkan informasi adalah data yang telah diolah dan memiliki arti untuk pengambilan keputusan.',
        content: [
          'Siklus Pengolahan Data: Pengumpulan Data -> Pembersihan Data (Data Cleansing) -> Pemrosesan/Kalkulasi -> Visualisasi -> Pengambilan Keputusan.',
          'Pembersihan Data (Cleansing): Menghapus data duplikat, memperbaiki kesalahan ketik, dan mengisi atau mengabaikan kolom yang kosong agar hasil perhitungan tidak bias.',
          'Perkakas Lembar Kerja (Spreadsheet): Menggunakan baris (row), kolom (column), dan sel (cell) yang dilengkapi formula dasar seperti SUM (penjumlahan), AVERAGE (rata-rata), MAX, MIN, dan COUNT.'
        ],
        funFact: 'Setiap hari, manusia di seluruh dunia menghasilkan sekitar 328 juta terabyte data baru di internet!',
        realWorldAnalogy: {
          title: 'Analogi Koki Memasak',
          description: 'Data mentah ibarat sayuran kotor yang baru dicabut dari kebun. Sebelum dimasak, sayur harus dicuci dan dipotong (cleansing). Setelah dimasak dan disajikan di piring cantik (visualisasi), makanan siap disantap dengan nikmat!'
        },
        miniQuiz: {
          question: 'Rumus spreadsheet manakah yang digunakan untuk menghitung nilai rata-rata dari sekelompok angka?',
          options: [
            '=SUM()',
            '=AVERAGE()',
            '=MAX()',
            '=COUNT()'
          ],
          correctAnswer: 1,
          explanation: 'Fungsi =AVERAGE() bertugas menjumlahkan seluruh nilai pada rentang sel lalu membaginya dengan total jumlah data.'
        },
        paragraphQuizzes: [
          {
            paragraphIndex: 0,
            question: 'Apa perbedaan mendasar antara data dan informasi?',
            options: [
              'Data adalah fakta mentah yang belum diolah, sedangkan informasi adalah hasil olahan data yang memiliki makna dan kegunaan',
              'Data berbentuk gambar, sedangkan informasi selalu berupa suara',
              'Data selalu salah, sedangkan informasi selalu benar',
              'Tidak ada perbedaan antara data dan informasi'
            ],
            correctAnswer: 0,
            explanation: 'Data mentah baru berubah menjadi informasi setelah diproses dan diberi konteks yang jelas.'
          },
          {
            paragraphIndex: 1,
            question: 'Mengapa tahap pembersihan data (data cleansing) sangat krusial?',
            options: [
              'Untuk membuang data duplikat dan memperbaiki nilai keliru agar hasil analisis tidak menghasilkan kesimpulan yang salah (bias)',
              'Agar file spreadsheet memiliki ukuran 0 kilobyte',
              'Untuk mengubah semua angka menjadi huruf',
              'Agar komputer tidak perlu dinyalakan'
            ],
            correctAnswer: 0,
            explanation: 'Prinsip "Garbage In, Garbage Out" menyatakan bahwa data mentah yang kotor akan menghasilkan kesimpulan yang keliru jika tidak dibersihkan lebih dulu.'
          }
        ]
      },
      {
        id: 'sec-ad-2',
        sectionNumber: 2,
        title: 'Visualisasi Data: Memilih Diagram yang Tepat',
        leadParagraph: 'Visualisasi data adalah seni dan ilmu menyajikan data secara visual (grafik/diagram) agar pola, tren, dan hubungan antar-data mudah dipahami secara intuitif.',
        content: [
          'Diagram Batang (Bar/Column Chart): Paling ideal untuk membandingkan jumlah atau kuantitas antar-kategori yang berbeda (misal: jumlah peminjaman buku per kelas).',
          'Diagram Garis (Line Chart): Sangat tepat untuk melihat tren perubahan nilai sepanjang waktu (misal: perkembangan suhu udara tiap jam).',
          'Diagram Lingkaran (Pie Chart): Digunakan untuk menunjukkan proporsi bagian dari suatu total keseluruhan 100% (misal: persentase hobi siswa di satu kelas).'
        ],
        funFact: 'Otak manusia dapat memproses informasi visual berupa grafik 60.000 kali lebih cepat daripada membaca baris-baris teks angka di tabel!',
        realWorldAnalogy: {
          title: 'Analogi Membaca Peta Cuaca',
          description: 'Melihat diagram garis tren cuaca selama sepekan langsung memberi tahu kita hari mana yang paling terik dalam hitungan detik, jauh lebih mudah dibanding membaca 100 angka termometer!'
        },
        miniQuiz: {
          question: 'Jenis grafik manakah yang paling tepat untuk menampilkan tren kenaikan nilai ulangan siswa dari bulan Januari hingga Mei?',
          options: [
            'Diagram Lingkaran (Pie Chart)',
            'Diagram Garis (Line Chart)',
            'Diagram Donat',
            'Diagram Gelembung Acak'
          ],
          correctAnswer: 1,
          explanation: 'Diagram garis paling efektif memperlihatkan pergerakan tren data berkesinambungan sepanjang rentang waktu (time-series).'
        },
        paragraphQuizzes: [
          {
            paragraphIndex: 0,
            question: 'Kapan Diagram Batang (Bar Chart) paling efektif digunakan?',
            options: [
              'Saat membandingkan kuantitas atau jumlah antar beberapa kategori berbeda',
              'Hanya untuk data yang bernilai minus',
              'Untuk menampilkan foto satelit luar angkasa',
              'Saat mendengarkan podcast pelajaran'
            ],
            correctAnswer: 0,
            explanation: 'Diagram batang memudahkan perbandingan tinggi/panjang nilai antar kelompok kategori secara visual.'
          }
        ]
      }
    ],
    audioTurns: [
      {
        id: 1,
        speaker: 'guru',
        speakerName: 'Pak Dimas (Guru Informatika)',
        timestamp: '00:00',
        timeInSeconds: 22,
        text: 'Halo para analis cilik! Bayangkan kamu diberi lembar Excel dengan 5.000 baris data penjualan kantin sekolah. Bagaimana cara cepat mengetahui makanan paling laris?',
        keyTakeaway: 'Data ribuan baris sulit dibaca manusia tanpa analisis dan visualisasi.'
      },
      {
        id: 2,
        speaker: 'siswa',
        speakerName: 'Nadia (Siswa SMP)',
        timestamp: '00:23',
        timeInSeconds: 20,
        text: 'Pasti pusing kalau dibaca satu per satu, Pak! Apakah kita gunakan rumus =MAX atau kita buatkan grafik diagram batang?',
        keyTakeaway: 'Formula dan grafik adalah perkakas utama pengolah data.'
      },
      {
        id: 3,
        speaker: 'guru',
        speakerName: 'Pak Dimas (Guru Informatika)',
        timestamp: '00:44',
        timeInSeconds: 25,
        text: 'Tepat sekali, Nadia! Kita bisa gunakan formula agregasi untuk menghitung total, lalu visualisasikan dalam diagram batang. Dalam sekejap mata, menu terlaris langsung terlihat dari balok tertinggi!',
        keyTakeaway: 'Visualisasi menyederhanakan data kompleks menjadi pemahaman instan.'
      }
    ],
    slides: [
      {
        id: 1,
        title: 'Pengantar Analisis Data',
        subtitle: 'Dari data mentah menjadi wawasan bermakna',
        bulletPoints: [],
        takeaway: '',
        imageFile: '/media/slides/analisis-data-slide-1.png'
      },
      {
        id: 2,
        title: 'Siklus Pengolahan Data Lengkap',
        subtitle: 'Pengumpulan, Pembersihan, dan Pemrosesan',
        bulletPoints: [],
        takeaway: '',
        imageFile: '/media/slides/analisis-data-slide-2.png'
      },
      {
        id: 3,
        title: 'Perkakas Lembar Kerja (Spreadsheet)',
        subtitle: 'Baris, kolom, sel, dan navigasi dasar',
        bulletPoints: [],
        takeaway: '',
        imageFile: '/media/slides/analisis-data-slide-3.png'
      },
      {
        id: 4,
        title: 'Formula Statistik & Agregasi',
        subtitle: '=SUM, =AVERAGE, =MAX, =MIN, =COUNT',
        bulletPoints: [],
        takeaway: '',
        imageFile: '/media/slides/analisis-data-slide-4.png'
      },
      {
        id: 5,
        title: 'Visualisasi Grafik & Kesimpulan',
        subtitle: 'Memilih diagram batang, garis, dan lingkaran',
        bulletPoints: [],
        takeaway: '',
        imageFile: '/media/slides/analisis-data-slide-5.png'
      }
    ],
    mindMap: {
      rootLabel: 'Informatika: Analisis Data',
      nodes: [
        {
          id: 'n-ad-1',
          label: 'Analisis Data',
          category: 'core',
          x: 200,
          y: 120,
          description: 'Proses pengolahan, pembersihan, dan interpretasi fakta mentah menjadi wawasan bermakna.',
          example: 'Menganalisis hasil survei kepuasan fasilitas perpustakaan sekolah.',
          relatedIds: ['n-ad-2', 'n-ad-3']
        },
        {
          id: 'n-ad-2',
          label: 'Formula Lembar Kerja',
          category: 'subconcept',
          x: 400,
          y: 60,
          description: 'Fungsi komputasi matematis di spreadsheet: SUM, AVERAGE, COUNT, MAX, MIN.',
          example: '=SUM(B2:B30) untuk menghitung total kas kelas.',
          relatedIds: []
        },
        {
          id: 'n-ad-3',
          label: 'Visualisasi Grafik',
          category: 'application',
          x: 400,
          y: 180,
          description: 'Penyajian visual melalui diagram batang, garis, atau lingkaran.',
          example: 'Diagram garis tren temperatur laboratorium selama 24 jam.',
          relatedIds: []
        }
      ]
    },
    diagnosticQuestions: [
      {
        id: 'dq-ad-1',
        question: 'Sebuah data survei memuat persentase pilihan ekstrakurikuler siswa dalam satu angkatan dengan total 100%. Jenis diagram yang paling tepat untuk menggambarkan persentase ini adalah...',
        options: [
          'Diagram Lingkaran (Pie Chart)',
          'Diagram Pencar (Scatter Plot)',
          'Diagram Pohon Keputusan',
          'Diagram Radar'
        ],
        correctAnswer: 0,
        conceptTarget: 'Pemilihan Visualisasi Data Proporsional',
        gapFeedback: {
          misconception: 'Mengira semua grafik cocok untuk persentase total 100%.',
          explanation: 'Diagram lingkaran (Pie Chart) didesain khusus membagi satu lingkaran utuh (100%) menjadi juring-juring proporsional sesuai porsi tiap kategori.',
          recommendedFormat: 'slides',
          recommendedTargetId: 'slide-1',
          recommendedLabel: 'Buka Slide: Siklus Pengolahan & Visualisasi Data'
        }
      }
    ],
    flashcards: [
      {
        id: 'fc-ad-1',
        frontQuestion: 'Apa tujuan utama dari proses pembersihan data (data cleansing)?',
        backAnswer: 'Tujuannya adalah mendeteksi dan menghapus duplikasi data, memperbaiki nilai yang keliru atau kosong, serta menstandarkan format agar hasil analisis akurat dan tidak bias.',
        category: 'Pengolahan Data',
        hint: 'Merapikan data sebelum dihitung.',
        keyTerm: 'Data Cleansing'
      },
      {
        id: 'fc-ad-2',
        frontQuestion: 'Kapan sebaiknya kita memilih diagram garis (line chart) dibanding diagram batang?',
        backAnswer: 'Diagram garis sebaiknya dipilih ketika data menunjukkan tren atau perubahan nilai sepanjang urutan waktu (time-series), seperti perubahan suhu setiap jam atau pertumbuhan tinggi tanaman setiap hari.',
        category: 'Visualisasi Data',
        hint: 'Ingat perubahan yang dipengaruhi waktu.',
        keyTerm: 'Line Chart (Tren Waktu)'
      }
    ]
  },

  // 2. MATEMATIKA
  {
    id: 'teorema-pythagoras',
    title: 'Teorema Pythagoras & Geometri Ruang',
    shortDesc: 'Bongkar rahasia segitiga siku-siku, tripel pythagoras ajaib, dan rumus jarak terpendek dalam kehidupan nyata.',
    subject: 'Matematika',
    grade: 'Kelas 8',
    domain: 'Matematika',
    conceptTag: 'Segitiga Siku-Siku & Hipotenusa',
    analogyPreview: 'Analogi jalan pintas potong rumput di sudut lapangan',
    thumbnailKey: 'matematika',
    durationMinutes: 18,
    coreQuestion: 'Bagaimana tukang bangunan zaman kuno memastikan sudut pondasi rumah tepat 90 derajat sempurna tanpa busur derajat modern?',
    curriculumCompetency: 'Menjelaskan dan membuktikan teorema Pythagoras dan tripel Pythagoras serta menyelesaikan masalah kontekstual segitiga.',
    sections: [
      {
        id: 'sec-py-1',
        sectionNumber: 1,
        title: 'Hakikat Segitiga Siku-Siku dan Rumus Abadi Pythagoras',
        leadParagraph: 'Teorema Pythagoras menyatakan hubungan matematis yang pasti antara ketiga sisi pada setiap segitiga siku-siku.',
        content: [
          'Pada setiap segitiga siku-siku, kuadrat panjang sisi miring (hipotenusa) sama dengan jumlah kuadrat panjang kedua sisi penyikunya: c² = a² + b².',
          'Hipotenusa (c) selalu merupakan sisi terpanjang dan posisinya selalu tepat berhadapan langsung dengan sudut siku-siku (90 derajat).',
          'Luas persegi pada sisi miring sama persis dengan gabungan luas dua persegi pada sisi penyiku.'
        ],
        funFact: 'Pythagoras menemukan pola ini sekitar 2.500 tahun lalu, namun bangsa Babilonia dan Mesir kuno sudah menggunakannya dengan tali bersimpul 3-4-5 untuk mematok batas ladang!',
        realWorldAnalogy: {
          title: 'Analogi Jalan Potong Rumput',
          description: 'Jika kamu berjalan di trotoar berbentuk L sejauh 3 meter ke timur lalu 4 meter ke utara (total 7 meter), kamu bisa memotong jalan miring diagonal hanya sejauh 5 meter (karena 3² + 4² = 5²)!'
        },
        miniQuiz: {
          question: 'Jika sisi penyiku segitiga siku-siku adalah 6 cm dan 8 cm, berapakah panjang sisi miringnya?',
          options: ['10 cm', '14 cm', '12 cm', '48 cm'],
          correctAnswer: 0,
          explanation: 'c² = 6² + 8² = 36 + 64 = 100. Maka c = √100 = 10 cm.'
        },
        paragraphQuizzes: [
          {
            paragraphIndex: 0,
            question: 'Berdasarkan pernyataan Teorema Pythagoras, rumus hubungan ketiga sisi segitiga siku-siku adalah...',
            options: [
              'c² = a² + b² (kuadrat sisi miring sama dengan jumlah kuadrat sisi penyiku)',
              'c = a + b',
              'c² = a² - b²',
              'c = a × b / 2'
            ],
            correctAnswer: 0,
            explanation: 'Teorema Pythagoras menyatakan bahwa kuadrat panjang hipotenusa selalu setara dengan jumlah kuadrat kedua sisi penyikunya.'
          },
          {
            paragraphIndex: 1,
            question: 'Di manakah letak posisi sisi miring (hipotenusa) pada segitiga siku-siku?',
            options: [
              'Tepat berhadapan langsung dengan sudut siku-siku (90 derajat)',
              'Di samping sudut lancip 30 derajat',
              'Di antara dua sisi terpendek',
              'Selalu mendatar di bagian paling bawah'
            ],
            correctAnswer: 0,
            explanation: 'Hipotenusa selalu merupakan sisi terpanjang dan posisinya selalu tepat berhadapan langsung di seberang sudut 90 derajat.'
          },
          {
            paragraphIndex: 2,
            question: 'Bagaimanakah pembuktian geometris Teorema Pythagoras melalui luas bidang persegi?',
            options: [
              'Luas persegi pada sisi miring sama persis dengan gabungan luas dua persegi pada sisi penyiku',
              'Luas ketiga persegi selalu sama persis tanpa selisih',
              'Luas persegi hipotenusa selalu separuh dari luas kedua persegi lainnya',
              'Luas persegi tidak memiliki hubungan matematis pasti'
            ],
            correctAnswer: 0,
            explanation: 'Secara geometri, jika kita membuat persegi pada setiap sisi segitiga siku-siku, luas persegi c sama persis dengan luas persegi a ditambah luas persegi b.'
          }
        ]
      }
    ],
    audioTurns: [
      {
        id: 1,
        speaker: 'guru',
        speakerName: 'Ibu Ratna (Guru Matematika)',
        timestamp: '00:00',
        timeInSeconds: 20,
        text: 'Pernahkah kamu melihat tukang bangunan menarik tali berukuran 3 meter, 4 meter, dan 5 meter saat memasang pondasi sudut rumah?',
        keyTakeaway: 'Tukang bangunan memanfaatkan tripel Pythagoras untuk memastikan sudut 90 derajat.'
      },
      {
        id: 2,
        speaker: 'siswa',
        speakerName: 'Dina (Siswa SMP)',
        timestamp: '00:21',
        timeInSeconds: 18,
        text: 'Iya Bu! Kenapa harus angka 3, 4, dan 5? Kenapa tidak angka sembarangan saja?',
        keyTakeaway: 'Hanya angka tertentu yang memenuhi persamaan kuadrat Pythagoras.'
      },
      {
        id: 3,
        speaker: 'guru',
        speakerName: 'Ibu Ratna (Guru Matematika)',
        timestamp: '00:40',
        timeInSeconds: 25,
        text: 'Karena 3 kuadrat itu 9, 4 kuadrat itu 16, jika dijumlahkan hasilnya 25, yang persis sama dengan 5 kuadrat! Sudut yang terbentuk dijamin 90 derajat siku-siku sempurna.',
        keyTakeaway: 'Rumus c² = a² + b² membuktikan sudut siku-siku.'
      }
    ],
    slides: [
      {
        id: 1,
        title: 'Teorema Pythagoras Abadi',
        subtitle: 'Hubungan kuadrat sisi segitiga siku-siku',
        bulletPoints: [
          'Rumus: c² = a² + b² (c adalah sisi miring / hipotenusa)',
          'Hipotenusa selalu berada di depan sudut 90 derajat',
          'Tripel Pythagoras dasar: (3, 4, 5), (5, 12, 13), (7, 24, 25), (8, 15, 17)',
          'Kelipatannya juga selalu siku-siku: (6, 8, 10), (9, 12, 15)'
        ],
        takeaway: 'Hafalkan tripel dasar untuk mempercepat perhitungan soal ujian matematika.',
        speakerNotes: 'Tekankan letak hipotenusa selalu di seberang sudut siku-siku.',
        diagramType: 'pythagoras'
      }
    ],
    mindMap: {
      rootLabel: 'Matematika: Pythagoras',
      nodes: [
        {
          id: 'n-py-1',
          label: 'Rumus c² = a² + b²',
          category: 'core',
          x: 220,
          y: 120,
          description: 'Persamaan hubungan ketiga sisi pada segitiga siku-siku.',
          example: '3² + 4² = 9 + 16 = 25 = 5²',
          relatedIds: []
        }
      ]
    },
    diagnosticQuestions: [
      {
        id: 'dq-py-1',
        question: 'Manakah dari pasangan sisi berikut yang BUKAN merupakan segitiga siku-siku?',
        options: ['3, 4, 5', '5, 12, 13', '6, 8, 11', '8, 15, 17'],
        correctAnswer: 2,
        conceptTarget: 'Pengujian Kebalikan Teorema Pythagoras',
        gapFeedback: {
          misconception: 'Mengira 6, 8, 11 siku-siku.',
          explanation: '6² + 8² = 36 + 64 = 100, sedangkan 11² = 121. Karena 100 ≠ 121, segitiga tersebut adalah segitiga tumpul.',
          recommendedFormat: 'slides',
          recommendedTargetId: 'slide-1',
          recommendedLabel: 'Buka Slide: Teorema Pythagoras Abadi'
        }
      }
    ],
    flashcards: [
      {
        id: 'fc-py-1',
        frontQuestion: 'Apa itu hipotenusa dalam segitiga siku-siku?',
        backAnswer: 'Hipotenusa adalah sisi miring yang merupakan sisi terpanjang dan posisinya selalu berhadapan langsung dengan sudut 90 derajat.',
        category: 'Definisi',
        hint: 'Sisi terpanjang segitiga.',
        keyTerm: 'Hipotenusa (c)'
      }
    ]
  },

  // 3. IPA
  {
    id: 'tata-surya',
    title: 'Tata Surya, Gravitasi & Orbit Planet',
    shortDesc: 'Jelajahi bagaimana gravitasi Matahari mengikat planet-planet dan mengapa waktu rotasi serta revolusi setiap planet berbeda.',
    subject: 'IPA',
    grade: 'Kelas 7',
    domain: 'IPA',
    conceptTag: 'Gravitasi, Orbit & Waktu',
    analogyPreview: 'Analogi memutar tali berbeban & pelari lintasan',
    thumbnailKey: 'ipa',
    durationMinutes: 20,
    coreQuestion: 'Mengapa planet-planet tidak saling bertabrakan atau terlempar keluar dari Tata Surya?',
    curriculumCompetency: 'Menganalisis sistem tata surya, rotasi dan revolusi bumi, serta pengaruh gravitasi terhadap pergerakan benda langit.',
    sections: [
      {
        id: 'sec-ts-1',
        sectionNumber: 1,
        title: 'Matahari sebagai Pusat dan Hukum Gravitasi Universal',
        leadParagraph: 'Di pusat tata surya kita berdiri Matahari, bintang gas raksasa yang menyumbang 99,8% dari total massa seluruh tata surya kita.',
        content: [
          'Isaac Newton merumuskan bahwa setiap benda di alam semesta saling menarik dengan gaya yang berbanding lurus dengan massa dan berbanding terbalik dengan kuadrat jarak.',
          'Keseimbangan antara gaya gravitasi Matahari yang menarik ke dalam dan inersia gerak maju planet menciptakan orbit elips yang sangat stabil.',
          'Jika gravitasi Matahari tiba-tiba hilang, semua planet akan terlontar keluar dalam garis lurus ke ruang angkasa antarbintang.'
        ],
        funFact: 'Cahaya matahari membutuhkan waktu sekitar 8 menit 20 detik untuk menempuh jarak 150 juta kilometer menuju Bumi!',
        realWorldAnalogy: {
          title: 'Analogi Memutar Bola dengan Tali',
          description: 'Bayangkan kamu mengikat bola tenis dengan tali dan memutarnya di atas kepala. Tarikan tanganmu adalah gravitasi Matahari, dan bola yang ingin melesat lurus adalah inersia planet!'
        },
        miniQuiz: {
          question: 'Apa yang mengimbangi gaya gravitasi Matahari sehingga planet tidak tersedot jatuh ke dalam Matahari?',
          options: [
            'Kecepatan gerak inersia maju dari planet',
            'Medan magnet planet yang tolak-menolak',
            'Lapisan atmosfer luar angkasa',
            'Massa bulan yang menahan planet'
          ],
          correctAnswer: 0,
          explanation: 'Kecepatan inersia planet yang tegak lurus dengan tarikan gravitasi membuat planet selalu "jatuh melengkung" mengelilingi Matahari tanpa menabraknya.'
        },
        paragraphQuizzes: [
          {
            paragraphIndex: 0,
            question: 'Menurut Hukum Gravitasi Universal Newton, gaya gravitasi antar dua benda berbanding terbalik dengan...',
            options: [
              'Kuadrat jarak antara kedua benda',
              'Warna permukaan kedua benda',
              'Suhu udara di sekitarnya',
              'Kecepatan angin matahari'
            ],
            correctAnswer: 0,
            explanation: 'Gaya gravitasi semakin melemah seiring kuadrat jarak yang bertambah jauh antar kedua benda bermassa.'
          },
          {
            paragraphIndex: 1,
            question: 'Apa yang dihasilkan dari keseimbangan antara tarikan gravitasi Matahari ke dalam dan inersia gerak maju planet?',
            options: [
              'Orbit elips yang sangat stabil mengitari Matahari',
              'Ledakan energi nuklir di atmosfer planet',
              'Planet berhenti bergerak dan membeku',
              'Tabrakan beruntun antar planet'
            ],
            correctAnswer: 0,
            explanation: 'Keseimbangan gaya tarik memusat (gravitasi) dan kecenderungan gerak lurus (inersia) menghasilkan lintasan orbit elips yang abadi dan stabil.'
          },
          {
            paragraphIndex: 2,
            question: 'Jika gaya gravitasi Matahari mendadak lenyap seketika, apa yang akan terjadi pada planet-planet?',
            options: [
              'Semua planet akan terlontar keluar dalam garis lurus ke ruang antarbintang',
              'Semua planet akan jatuh ke pusat tata surya',
              'Semua planet akan saling bertabrakan di satu titik',
              'Planet akan tetap berputar di tempat yang sama persis'
            ],
            correctAnswer: 0,
            explanation: 'Tanpa gaya gravitasi yang membelokkan lintasannya, inersia gerak akan membuat setiap planet meluncur lurus ke ruang hampa antarbintang.'
          }
        ]
      }
    ],
    audioTurns: [
      {
        id: 1,
        speaker: 'guru',
        speakerName: 'Bu Diana (Guru IPA)',
        timestamp: '00:00',
        timeInSeconds: 22,
        text: 'Halo anak-anak hebat! Bayangkan Tata Surya kita seperti arena balap raksasa dengan 8 planet yang meluncur pada jalurnya masing-masing tanpa pernah tabrakan.',
        keyTakeaway: 'Gravitasi Matahari menjaga orbit delapan planet tetap teratur.'
      },
      {
        id: 2,
        speaker: 'siswa',
        speakerName: 'Andi (Siswa SMP)',
        timestamp: '00:23',
        timeInSeconds: 20,
        text: 'Bu, kenapa planet yang dekat seperti Merkurius putarannya sangat cepat, sedangkan Neptunus butuh waktu ratusan tahun?',
        keyTakeaway: 'Jarak ke Matahari menentukan periode revolusi planet.'
      },
      {
        id: 3,
        speaker: 'guru',
        speakerName: 'Bu Diana (Guru IPA)',
        timestamp: '00:44',
        timeInSeconds: 25,
        text: 'Pertanyaan cerdas! Menurut Hukum Kepler, makin dekat planet ke Matahari, tarikan gravitasi makin kuat sehingga planet harus bergerak lebih kencang agar tidak tersedot.',
        keyTakeaway: 'Hukum III Kepler: Jarak orbit berbanding lurus dengan kuadrat waktu tempuh.'
      }
    ],
    slides: [
      {
        id: 1,
        title: 'Matahari & Arsitektur Tata Surya',
        subtitle: 'Bintang induk pemegang 99,8% massa tata surya',
        bulletPoints: [
          'Planet Dalam (Terestrial): Merkurius, Venus, Bumi, Mars (berbatu padat)',
          'Planet Luar (Jovian): Yupiter, Saturnus, Uranus, Neptunus (raksasa gas & es)',
          'Gaya gravitasi Matahari berbanding terbalik dengan kuadrat jarak',
          'Rotasi menyebabkan siang-malam, Revolusi menyebabkan pergantian musim'
        ],
        takeaway: 'Keseimbangan gaya gravitasi dan inersia adalah kunci kestabilan tata surya kita.',
        speakerNotes: 'Bumi berada di zona laik huni (Goldilocks Zone) yang memungkinkan adanya air cair.',
        diagramType: 'solar'
      }
    ],
    mindMap: {
      rootLabel: 'IPA: Tata Surya & Gravitasi',
      nodes: [
        {
          id: 'n-ts-1',
          label: 'Gravitasi Universal',
          category: 'core',
          x: 200,
          y: 120,
          description: 'Gaya tarik antarbenda bermassa yang mengikat planet pada orbitnya.',
          example: 'Pasang surut air laut di Bumi akibat gravitasi Bulan.',
          relatedIds: []
        }
      ]
    },
    diagnosticQuestions: [
      {
        id: 'dq-ts-1',
        question: 'Dampak nyata dari rotasi bumi pada porosnya adalah...',
        options: [
          'Pergantian siang dan malam serta gerak semu harian matahari',
          'Pergantian musim semi dan musim gugur',
          'Perubahan lamanya waktu siang dan malam sepanjang tahun',
          'Pergeseran rasi bintang di langit malam'
        ],
        correctAnswer: 0,
        conceptTarget: 'Perbedaan Dampak Rotasi vs Revolusi Bumi',
        gapFeedback: {
          misconception: 'Tertukar antara rotasi (berputar pada poros) dan revolusi (mengelilingi matahari).',
          explanation: 'Rotasi bumi berlangsung 24 jam dan menyebabkan siang-malam, sedangkan revolusi bumi membutuhkan 365,25 hari dan menyebabkan pergantian musim.',
          recommendedFormat: 'slides',
          recommendedTargetId: 'slide-1',
          recommendedLabel: 'Buka Slide: Matahari & Arsitektur Tata Surya'
        }
      }
    ],
    flashcards: [
      {
        id: 'fc-ts-1',
        frontQuestion: 'Apa perbedaan antara rotasi dan revolusi bumi?',
        backAnswer: 'Rotasi adalah perputaran bumi pada porosnya sendiri (menyebabkan siang-malam), sedangkan revolusi adalah peredaran bumi mengelilingi matahari (menyebabkan pergantian musim).',
        category: 'Pergerakan Bumi',
        hint: 'Perhatikan poros versus orbit.',
        keyTerm: 'Rotasi & Revolusi'
      }
    ]
  },

  // 4. IPS
  {
    id: 'interaksi-keruangan',
    title: 'Interaksi Keruangan & Perdagangan Nusantara',
    shortDesc: 'Pahami bagaimana perbedaan sumber daya alam antardaerah mendorong terjadinya arus perdagangan komoditas dan pasar.',
    subject: 'IPS',
    grade: 'Kelas 8',
    domain: 'IPS',
    conceptTag: 'Komoditas, Wilayah & Pasar',
    analogyPreview: 'Analogi barter hasil kebun pegunungan dengan ikan laut pesisir',
    thumbnailKey: 'ips',
    durationMinutes: 22,
    coreQuestion: 'Mengapa sayuran segar dari dataran tinggi bisa sampai dan murah di pasar pesisir setiap subuh?',
    curriculumCompetency: 'Menganalisis pengaruh interaksi keruangan terhadap kegiatan ekonomi, perdagangan antardaerah, dan kesejahteraan masyarakat Indonesia.',
    sections: [
      {
        id: 'sec-ips-1',
        sectionNumber: 1,
        title: 'Tiga Syarat Terjadinya Interaksi Antarruang',
        leadParagraph: 'Interaksi keruangan terjadi karena setiap daerah di muka bumi memiliki keunggulan dan keterbatasan sumber daya alam yang berbeda-beda.',
        content: [
          'Saling Melengkapi (Regional Complementarity): Daerah pegunungan surplus sayur mayur tetapi minus ikan. Daerah pesisir surplus ikan laut tetapi minus sayuran. Keduanya saling bertukar komoditas.',
          'Kesempatan Antara (Intervening Opportunity): Penjual akan memilih lokasi pasar alternatif yang lebih dekat jika biaya transportasi lebih murah dan kualitasnya setara.',
          'Kemudahan Transfer (Transferability): Ketersediaan jalan raya, pelabuhan kapal, dan biaya angkut yang terjangkau menentukan lancar tidaknya perdagangan antardaerah.'
        ],
        funFact: 'Indonesia memiliki lebih dari 17.000 pulau, menjadikan perdagangan antarpulau lewat jalur laut (tol laut) sebagai urat nadi ekonomi nasional sejak zaman kerajaan Sriwijaya dan Majapahit!',
        realWorldAnalogy: {
          title: 'Analogi Warung Tetangga vs Swalayan Jauh',
          description: 'Jika kamu butuh gula, kamu lebih memilih warung dekat rumah daripada supermarket di pusat kota karena hemat ongkos dan waktu (Intervening Opportunity).'
        },
        miniQuiz: {
          question: 'Daerah A surplus beras, daerah B surplus ikan. Kondisi yang menyebabkan terjadinya perdagangan antara A dan B adalah...',
          options: [
            'Saling melengkapi (Regional Complementarity)',
            'Persaingan harga komoditas impor',
            'Isolasi geografis antarpulau',
            'Keseragaman mata pencaharian penduduk'
          ],
          correctAnswer: 0,
          explanation: 'Perbedaan potensi sumber daya alam menciptakan kondisi saling melengkapi sehingga timbul dorongan perdagangan komoditas.'
        },
        paragraphQuizzes: [
          {
            paragraphIndex: 0,
            question: 'Apa contoh paling tepat dari kondisi Saling Melengkapi (Regional Complementarity)?',
            options: [
              'Daerah pegunungan surplus sayur bertukar hasil bumi dengan pesisir yang surplus ikan laut',
              'Dua desa yang sama-sama menghasilkan garam menolak berdagang',
              'Semua pedagang menjual jenis buah yang sama persis',
              'Pemerintah menutup seluruh pasar tradisional daerah'
            ],
            correctAnswer: 0,
            explanation: 'Saling melengkapi terjadi jika wilayah-wilayah berbeda memiliki keunggulan komoditas yang saling membutuhkan.'
          },
          {
            paragraphIndex: 1,
            question: 'Mengapa pembeli atau pedagang memanfaatkan Kesempatan Antara (Intervening Opportunity)?',
            options: [
              'Untuk memilih lokasi pasar alternatif yang lebih dekat dengan ongkos kirim lebih murah dan barang bermutu sama',
              'Agar bisa membayar harga yang jauh lebih mahal',
              'Untuk menempuh perjalanan yang paling melelahkan',
              'Karena pasar dekat dilarang untuk dikunjungi'
            ],
            correctAnswer: 0,
            explanation: 'Kesempatan Antara terjadi saat konsumen memilih alternatif yang menawarkan efisiensi biaya dan jarak yang lebih menguntungkan.'
          },
          {
            paragraphIndex: 2,
            question: 'Faktor apa yang sangat menentukan Kemudahan Transfer (Transferability) antarwilayah?',
            options: [
              'Ketersediaan infrastruktur jalan, pelabuhan, dan biaya angkut logistik yang terjangkau',
              'Model pakaian yang dikenakan oleh supir truk pengangkut',
              'Banyaknya spanduk promosi di tepi jalan raya',
              'Warna cat gerbang pasar kabupaten'
            ],
            correctAnswer: 0,
            explanation: 'Kemudahan transfer sangat dipengaruhi oleh kelayakan fisik infrastruktur transportasi dan keterjangkauan biaya angkutan barang.'
          }
        ]
      }
    ],
    audioTurns: [
      {
        id: 1,
        speaker: 'guru',
        speakerName: 'Pak Hasan (Guru IPS)',
        timestamp: '00:00',
        timeInSeconds: 20,
        text: 'Pagi ini di meja makan kita ada nasi dari Karawang, ikan dari Natuna, dan cabai dari Malang. Pernahkah kamu membayangkan bagaimana semuanya bisa berkumpul?',
        keyTakeaway: 'Kebutuhan konsumsi kita setiap hari dipenuhi melalui interaksi keruangan.'
      },
      {
        id: 2,
        speaker: 'siswa',
        speakerName: 'Bagas (Siswa SMP)',
        timestamp: '00:21',
        timeInSeconds: 18,
        text: 'Pasti lewat jalur perdagangan antardaerah ya Pak? Kalau jalannya rusak bagaimana?',
        keyTakeaway: 'Infrastruktur jalan dan pelabuhan mempengaruhi transferability.'
      },
      {
        id: 3,
        speaker: 'guru',
        speakerName: 'Pak Hasan (Guru IPS)',
        timestamp: '00:40',
        timeInSeconds: 24,
        text: 'Tepat sekali, Bagas! Jika jalan rusak atau biaya logistik mahal, sayuran bisa membusuk dan harganya melonjak. Itulah mengapa faktor kemudahan transfer sangat penting bagi ekonomi kita.',
        keyTakeaway: 'Kemudahan transfer menjaga stabilitas harga komoditas.'
      }
    ],
    slides: [
      {
        id: 1,
        title: 'Arsitektur Ekonomi Antarruang',
        subtitle: 'Bagaimana geografi menggerakkan roda pasar Indonesia',
        bulletPoints: [
          'Perbedaan SDA menciptakan keunggulan mutlak & komparatif',
          'Saling Melengkapi (Complementarity): Pertukaran surplus antarwilayah',
          'Kesempatan Antara: Konsumen memilih pasar terdekat yang efisien',
          'Kemudahan Transfer: Jalan, jembatan, tol laut, dan logistik pendingin'
        ],
        takeaway: 'Integrasi konektivitas antarpulau adalah kunci pemerataan kemakmuran nusantara.',
        speakerNotes: 'Kaitkan dengan pentingnya pembangunan pelabuhan dan tol laut di Indonesia.',
        diagramType: 'trade'
      }
    ],
    mindMap: {
      rootLabel: 'IPS: Interaksi Keruangan',
      nodes: [
        {
          id: 'n-ips-1',
          label: 'Syarat Interaksi Antarruang',
          category: 'core',
          x: 200,
          y: 120,
          description: 'Tiga pilar pendorong mobilitas barang dan jasa antarwilayah.',
          example: 'Pengiriman beras dari lumbung pangan ke kota besar.',
          relatedIds: []
        }
      ]
    },
    diagnosticQuestions: [
      {
        id: 'dq-ips-1',
        question: 'Faktor yang paling menghambat terjadinya perdagangan antarwilayah di negara kepulauan adalah...',
        options: [
          'Biaya transportasi yang mahal dan fasilitas pelabuhan yang belum memadai',
          'Kesamaan komoditas yang dihasilkan antardaerah',
          'Jumlah penduduk yang terlalu banyak',
          'Mata uang yang digunakan berbeda di tiap provinsi'
        ],
        correctAnswer: 0,
        conceptTarget: 'Kemudahan Transfer (Transferability) dalam Geografi Ekonomi',
        gapFeedback: {
          misconception: 'Mengira mata uang berbeda antarpulau di Indonesia.',
          explanation: 'Di seluruh Indonesia mata uangnya rupiah. Hambatan utama adalah kendala fisik transportasi dan mahalnya ongkos angkut (transferability).',
          recommendedFormat: 'slides',
          recommendedTargetId: 'slide-1',
          recommendedLabel: 'Buka Slide: Arsitektur Ekonomi Antarruang'
        }
      }
    ],
    flashcards: [
      {
        id: 'fc-ips-1',
        frontQuestion: 'Apa yang dimaksud dengan Regional Complementarity (saling melengkapi)?',
        backAnswer: 'Kondisi di mana dua wilayah atau lebih memiliki perbedaan komoditas sehingga saling membutuhkan dan melakukan pertukaran barang.',
        category: 'Konsep Geografi',
        hint: 'Surplus wilayah A melengkapi minus wilayah B.',
        keyTerm: 'Saling Melengkapi'
      }
    ]
  },

  // 5. PKN
  {
    id: 'norma-dan-keadilan',
    title: 'Norma, Hak & Kewajiban Bermasyarakat',
    shortDesc: 'Pahami bagaimana norma agama, kesusilaan, kesopanan, dan hukum menjaga keadilan dan kerukunan hidup berbangsa.',
    subject: 'PKn',
    grade: 'Kelas 7',
    domain: 'PKn',
    conceptTag: 'Keadilan, Aturan & Toleransi',
    analogyPreview: 'Analogi peraturan lalu lintas di perempatan lampu merah',
    thumbnailKey: 'pkn',
    durationMinutes: 18,
    coreQuestion: 'Apa yang akan terjadi pada sebuah kota jika semua lampu lalu lintas dan rambu jalanan dimatikan serentak?',
    curriculumCompetency: 'Memahami norma-norma yang berlaku dalam kehidupan bermasyarakat untuk mewujudkan keadilan, ketertiban, dan persatuan.',
    sections: [
      {
        id: 'sec-pkn-1',
        sectionNumber: 1,
        title: 'Empat Norma dalam Kehidupan Bermasyarakat',
        leadParagraph: 'Norma adalah kaidah, aturan, atau petunjuk hidup yang mengikat warga kelompok masyarakat dan digunakan sebagai panduan tatanan tingkah laku.',
        content: [
          'Norma Agama: Aturan hidup yang bersumber dari wahyu Tuhan Yang Maha Esa. Sanksinya bersifat spiritual / akhirat.',
          'Norma Kesusilaan: Peraturan hidup yang berasal dari hati nurani manusia mengenai baik dan buruk. Sanksinya berupa penyesalan, malu, dan rasa bersalah.',
          'Norma Kesopanan: Kaidah pergaulan yang disepakati dari adat istiadat dan tata krama lingkungan. Sanksinya berupa celaan, ejekan, atau dikucilkan.',
          'Norma Hukum: Peraturan resmi tertulis yang dibuat oleh lembaga negara yang berwenang. Sanksinya bersifat tegas, mengikat, dan memaksa (denda, kurungan, atau pidana).'
        ],
        funFact: 'Indonesia adalah negara hukum sesuai Pasal 1 Ayat 3 UUD NRI Tahun 1945, yang artinya kekuasaan tertinggi dipegang oleh hukum, bukan oleh kehendak orang per orang!',
        realWorldAnalogy: {
          title: 'Analogi Lampu Lalu Lintas di Perempatan Sibuk',
          description: 'Lampu merah bukan untuk membatasi kebebasanmu berkendara, melainkan untuk melindungi keselamatan nyawamu agar tidak bertabrakan dengan kendaraan dari arah lain!'
        },
        miniQuiz: {
          question: 'Norma manakah yang sanksinya paling tegas, tertulis, dan dapat dipaksakan oleh aparat penegak hukum?',
          options: [
            'Norma Hukum',
            'Norma Kesopanan',
            'Norma Kesusilaan',
            'Norma Adat'
          ],
          correctAnswer: 0,
          explanation: 'Norma hukum dibuat oleh badan resmi negara dan memiliki alat penegak hukum (seperti polisi dan hakim) yang dapat memaksakan sanksi denda atau penjara.'
        },
        paragraphQuizzes: [
          {
            paragraphIndex: 0,
            question: 'Dari manakah sumber norma agama dan apa bentuk konsekuensi atas pelanggarannya?',
            options: [
              'Wahyu Tuhan Yang Maha Esa dengan sanksi spiritual batiniah dan akhirat',
              'Peraturan OSIS sekolah dengan sanksi membersihkan halaman',
              'Musyawarah warga RT dengan sanksi teguran lisan',
              'Buku catatan harian pribadi tanpa konsekuensi'
            ],
            correctAnswer: 0,
            explanation: 'Norma agama bersumber langsung dari ketetapan wahyu Tuhan dan sanksinya bersifat spiritual / akhirat.'
          },
          {
            paragraphIndex: 1,
            question: 'Apa sanksi langsung yang dirasakan oleh seseorang yang melanggar norma kesusilaan?',
            options: [
              'Penyesalan, rasa malu, dan kegelisahan dari hati nurani sendiri',
              'Ditilang oleh polisi lalu lintas',
              'Dikenakan denda kurungan penjara',
              'Dilarang menggunakan gawai telepon genggam'
            ],
            correctAnswer: 0,
            explanation: 'Norma kesusilaan bersumber dari bisikan hati nurani manusia, sehingga pelanggaran berakibat pada rasa bersalah dan penyesalan batin.'
          },
          {
            paragraphIndex: 2,
            question: 'Norma kesopanan lahir dari tata krama pergaulan masyarakat. Apa sanksi bagi yang mengabaikannya?',
            options: [
              'Teguran, celaan, ejekan, atau dikucilkan oleh lingkungan pergaulan',
              'Hukuman penjara seumur hidup',
              'Penyitaan barang-barang berharga oleh pengadilan',
              'Sanksi pembayaran pajak dua kali lipat'
            ],
            correctAnswer: 0,
            explanation: 'Sanksi norma kesopanan berupa reaksi sosial masyarakat seperti celaan, rasa tidak disukai, atau pengucilan.'
          },
          {
            paragraphIndex: 3,
            question: 'Apa karakteristik pembeda utama norma hukum dibanding ketiga norma lainnya?',
            options: [
              'Peraturan tertulis resmi dari negara dan sanksinya bersifat tegas, mengikat, serta memaksa',
              'Hanya boleh ditaati pada hari libur nasional',
              'Aturannya dirahasiakan dari masyarakat umum',
              'Hanya berlaku di lingkungan internal kepolisian'
            ],
            correctAnswer: 0,
            explanation: 'Norma hukum berkekuatan mengikat dan memaksa seluruh warga negara dengan aparat penegak hukum resmi.'
          }
        ]
      }
    ],
    audioTurns: [
      {
        id: 1,
        speaker: 'guru',
        speakerName: 'Ibu Siti (Guru PKn)',
        timestamp: '00:00',
        timeInSeconds: 22,
        text: 'Selamat pagi anak-anak! Mengapa kita harus antre saat membeli makanan di kantin sekolah atau menyeberang di zebra cross?',
        keyTakeaway: 'Aturan diciptakan agar tercipta keadilan dan ketertiban bersama.'
      },
      {
        id: 2,
        speaker: 'siswa',
        speakerName: 'Fajar (Siswa SMP)',
        timestamp: '00:23',
        timeInSeconds: 18,
        text: 'Supaya tidak saling serobot dan adil untuk yang datang lebih awal, Bu!',
        keyTakeaway: 'Budaya antre adalah cerminan norma kesopanan dan keadilan.'
      },
      {
        id: 3,
        speaker: 'guru',
        speakerName: 'Ibu Siti (Guru PKn)',
        timestamp: '00:42',
        timeInSeconds: 25,
        text: 'Pintar sekali, Fajar. Norma hadir bukan untuk mengekang, melainkan memastikan hak setiap orang terlindungi secara adil dan bermartabat.',
        keyTakeaway: 'Tujuan utama norma hukum adalah melindungi hak dan menegakkan keadilan.'
      }
    ],
    slides: [
      {
        id: 1,
        title: 'Hierarki Norma Masyarakat',
        subtitle: 'Empat tiang penjaga harmoni bangsa Indonesia',
        bulletPoints: [
          'Norma Agama: Sumber wahyu Ilahi (hati & ibadah)',
          'Norma Kesusilaan: Suara hati nurani nurani murni',
          'Norma Kesopanan: Tata krama adat istiadat dan etika pergaulan',
          'Norma Hukum: Bersifat memaksa dan bersanksi nyata dari negara'
        ],
        takeaway: 'Masyarakat yang beradab adalah masyarakat yang taat hukum dan menjunjung tinggi kesopanan.',
        speakerNotes: 'Tegaskan pentingnya keseimbangan antara hak asasi dan kewajiban asasi.',
        diagramType: 'civics'
      }
    ],
    mindMap: {
      rootLabel: 'PKn: Norma & Keadilan',
      nodes: [
        {
          id: 'n-pkn-1',
          label: 'Empat Jenis Norma',
          category: 'core',
          x: 200,
          y: 120,
          description: 'Pedoman tingkah laku: Agama, Kesusilaan, Kesopanan, dan Hukum.',
          example: 'Menghormati orang tua dan membayar pajak tepat waktu.',
          relatedIds: []
        }
      ]
    },
    diagnosticQuestions: [
      {
        id: 'dq-pkn-1',
        question: 'Seorang siswa merasa bersalah dan tidak tenang setelah menyontek saat ujian. Norma yang ia langgar dan menimbulkan penyesalan batin tersebut adalah...',
        options: ['Norma Kesusilaan', 'Norma Hukum', 'Norma Adat', 'Norma Kesopanan'],
        correctAnswer: 0,
        conceptTarget: 'Karakteristik Norma Kesusilaan dan Sanksi Hati Nurani',
        gapFeedback: {
          misconception: 'Mengira rasa bersalah batin adalah sanksi hukum.',
          explanation: 'Sanksi rasa bersalah, gelisah, dan malu yang bersumber dari dalam kalbu manusia adalah ciri khas pelanggaran norma kesusilaan.',
          recommendedFormat: 'slides',
          recommendedTargetId: 'slide-1',
          recommendedLabel: 'Buka Slide: Hierarki Norma Masyarakat'
        }
      }
    ],
    flashcards: [
      {
        id: 'fc-pkn-1',
        frontQuestion: 'Apa ciri khas utama norma hukum yang membedakannya dari ketiga norma lainnya?',
        backAnswer: 'Ciri khas norma hukum adalah dibuat oleh lembaga resmi negara, aturannya tertulis, dan sanksinya bersifat tegas, mengikat, serta memaksa.',
        category: 'Norma Hukum',
        hint: 'Bisa dipaksakan oleh aparat negara.',
        keyTerm: 'Sanksi Tegas & Memaksa'
      }
    ]
  },

  // 6. BAHASA INDONESIA
  {
    id: 'teks-lho',
    title: 'Teks Laporan Hasil Observasi (LHO)',
    shortDesc: 'Kuasai teknik menulis fakta objektif berdasarkan hasil pengamatan langsung di lapangan tanpa mencampuradukkan opini pribadi.',
    subject: 'Bahasa Indonesia',
    grade: 'Kelas 7',
    domain: 'Bahasa Indonesia',
    conceptTag: 'Fakta Objektif vs Opini Pribadi',
    analogyPreview: 'Analogi rekaman kamera CCTV vs cerita gosip',
    thumbnailKey: 'bahasa-indonesia',
    durationMinutes: 20,
    coreQuestion: 'Bagaimana cara ilmuwan menulis laporan temuan baru sehingga semua orang di dunia mempercayainya sebagai fakta ilmiah?',
    curriculumCompetency: 'Mengidentifikasi informasi berupa fakta dan struktur teks laporan hasil observasi yang dibaca atau diperdengarkan secara kritis.',
    sections: [
      {
        id: 'sec-ind-1',
        sectionNumber: 1,
        title: 'Ciri Utama dan Struktur Teks LHO',
        leadParagraph: 'Teks Laporan Hasil Observasi (LHO) adalah teks yang menyajikan informasi secara objektif dan faktual mengenai suatu objek berdasarkan pengamatan lapangan langsung.',
        content: [
          'Bersifat Objektif: Ditulis berdasarkan kenyataan yang dapat diverifikasi siapa saja, tidak memuat pandangan subjektif atau dugaan sepihak.',
          'Pernyataan Umum (Klasifikasi): Bagian awal yang mengenalkan objek, nama latin ilmiah, dan kategori kelasnya.',
          'Deskripsi Bagian: Rincian mendalam tentang ciri-ciri fisik, organ, perilaku, habitat, atau karakteristik khas objek.',
          'Deskripsi Manfaat: Penjelasan mengenai kegunaan objek tersebut bagi kehidupan manusia atau ekosistem alam sekitar.'
        ],
        funFact: 'Catatan pengamatan Alfred Russel Wallace tentang fauna di kepulauan Nusantara (garis Wallace) menjadi salah satu laporan observasi ilmiah paling bersejarah di dunia!',
        realWorldAnalogy: {
          title: 'Analogi Kamera CCTV vs Gosip',
          description: 'Teks LHO ibarat rekaman kamera CCTV: hanya mencatat apa yang benar-benar terlihat dan terdengar secara nyata, bukan perasaan atau dugaan pribadi seseorang!'
        },
        miniQuiz: {
          question: 'Manakah kalimat berikut yang merupakan FAKTA OBJEKTIF dalam teks laporan hasil observasi?',
          options: [
            'Komodo memiliki panjang tubuh rata-rata mencapai 2 hingga 3 meter dengan berat sekitar 70 kg.',
            'Komodo adalah reptil paling menyeramkan dan menakutkan di seluruh dunia.',
            'Menurut saya, pulau Komodo tampak sangat indah di sore hari.',
            'Semua orang pasti setuju bahwa komodo adalah kadal purba terbaik.'
          ],
          correctAnswer: 0,
          explanation: 'Kalimat A memuat data ukuran terukur dan dapat dibuktikan secara empiris, sehingga merupakan fakta objektif.'
        },
        paragraphQuizzes: [
          {
            paragraphIndex: 0,
            question: 'Mengapa teks LHO wajib bersifat objektif?',
            options: [
              'Karena harus menyajikan fakta nyata yang dapat dibuktikan, bukan dugaan atau perasaan pribadi penulis',
              'Agar terlihat puitis dan mengharukan bagi pembaca',
              'Supaya pembaca merasa terhibur dengan humor fiktif',
              'Agar penulis bisa menyisipkan opini subjektif kerabatnya'
            ],
            correctAnswer: 0,
            explanation: 'Objektivitas merupakan karakteristik mutlak teks LHO, di mana seluruh pemaparan bersandar pada data faktual hasil pengamatan langsung.'
          },
          {
            paragraphIndex: 1,
            question: 'Informasi apa yang wajib disampaikan dalam bagian Pernyataan Umum (Klasifikasi)?',
            options: [
              'Definisi ilmiah, nama latin objek, dan penggolongan kelas objek yang diamati',
              'Kisah perjalanan pribadi penulis menuju lokasi pengamatan',
              'Daftar menu makanan yang disantap selama penelitian',
              'Keluhan tentang cuaca hujan selama observasi'
            ],
            correctAnswer: 0,
            explanation: 'Pernyataan umum memberikan pengantar klasifikasi ilmiah sebelum membedah rincian objek lebih mendalam.'
          },
          {
            paragraphIndex: 2,
            question: 'Apa isi dari bagian Deskripsi Bagian pada teks LHO?',
            options: [
              'Rincian mendalam ciri fisik, bagian tubuh, habitat, perilaku, atau karakteristik objek',
              'Curahan perasaan kagum penulis terhadap keindahan objek',
              'Ucapan terima kasih kepada panitia acara',
              'Perkiraan ramalan masa depan objek'
            ],
            correctAnswer: 0,
            explanation: 'Deskripsi bagian memaparkan anatomi, sifat, dan ciri-ciri khusus objek secara terperinci dan sistematis.'
          },
          {
            paragraphIndex: 3,
            question: 'Apa fungsi bagian Deskripsi Manfaat dalam struktur teks LHO?',
            options: [
              'Menjelaskan nilai kegunaan atau manfaat nyata objek bagi kehidupan manusia atau lingkungan sekitar',
              'Menyebutkan total biaya yang dikeluarkan selama penelitian',
              'Menyuruh pembaca membeli produk terkait objek',
              'Mengumumkan pemenang lomba pengamatan'
            ],
            correctAnswer: 0,
            explanation: 'Deskripsi manfaat menyimpulkan laporan dengan memaparkan peran faedah dan fungsi objek dalam kehidupan nyata.'
          }
        ]
      }
    ],
    audioTurns: [
      {
        id: 1,
        speaker: 'guru',
        speakerName: 'Bu Nurul (Guru Bahasa Indonesia)',
        timestamp: '00:00',
        timeInSeconds: 22,
        text: 'Halo para peneliti cilik! Saat kamu mengamati tanaman lidah buaya di depan kelas, apa perbedaan antara menulis laporan observasi dengan menulis puisi?',
        keyTakeaway: 'Teks LHO fokus pada fakta objektif, bukan imajinasi atau rasa.'
      },
      {
        id: 2,
        speaker: 'siswa',
        speakerName: 'Maya (Siswa SMP)',
        timestamp: '00:23',
        timeInSeconds: 19,
        text: 'Kalau puisi pakai kata-kata indah yang puitis Bu. Kalau LHO harus pakai data ilmiah ya Bu?',
        keyTakeaway: 'LHO menggunakan bahasa baku dan fakta yang dapat diuji.'
      },
      {
        id: 3,
        speaker: 'guru',
        speakerName: 'Bu Nurul (Guru Bahasa Indonesia)',
        timestamp: '00:43',
        timeInSeconds: 25,
        text: 'Tepat sekali, Maya! LHO harus bebas dari opini pribadi "menurut saya" atau "sangat cantik". Kita mendeskripsikan fakta apa adanya: tinggi batang, ketebalan gel, dan khasiatnya.',
        keyTakeaway: 'Hindari kata-kata bernada subjektif dalam laporan hasil observasi.'
      }
    ],
    slides: [
      {
        id: 1,
        title: 'Anatomi Teks LHO',
        subtitle: 'Format standar penulisan laporan observasi ilmiah',
        bulletPoints: [
          'Pernyataan Umum: Definisi ilmiah & klasifikasi kelas objek',
          'Deskripsi Bagian: Rincian ciri fisik, habitat, dan perilaku',
          'Deskripsi Manfaat: Peran dan kegunaan nyata bagi lingkungan',
          'Kaidah Bahasa: Menggunakan istilah teknis ilmiah dan verba relasional'
        ],
        takeaway: 'Teks LHO melatih kita menjadi pengamat yang jeli dan penulis yang berpegang pada fakta kebenaran.',
        speakerNotes: 'Tekankan perbedaan antara fakta yang bisa diuji dengan opini yang berdasarkan perasaan.',
        diagramType: 'observation'
      }
    ],
    mindMap: {
      rootLabel: 'Bahasa Indonesia: Teks LHO',
      nodes: [
        {
          id: 'n-ind-1',
          label: 'Struktur Teks LHO',
          category: 'core',
          x: 200,
          y: 120,
          description: 'Tiga pilar laporan: Pernyataan Umum, Deskripsi Bagian, dan Deskripsi Manfaat.',
          example: 'Laporan observasi tanaman obat keluarga di halaman sekolah.',
          relatedIds: []
        }
      ]
    },
    diagnosticQuestions: [
      {
        id: 'dq-ind-1',
        question: 'Bagian teks LHO yang memuat informasi klasifikasi kelompok dan definisi objek yang diamati adalah...',
        options: ['Pernyataan Umum', 'Deskripsi Bagian', 'Deskripsi Manfaat', 'Penutup Simpulan'],
        correctAnswer: 0,
        conceptTarget: 'Struktur Pernyataan Umum Teks LHO',
        gapFeedback: {
          misconception: 'Mengira definisi objek ada di deskripsi bagian.',
          explanation: 'Pernyataan umum berada di awal teks dan berfungsi sebagai pengantar serta klasifikasi awal objek pengamatan.',
          recommendedFormat: 'slides',
          recommendedTargetId: 'slide-1',
          recommendedLabel: 'Buka Slide: Anatomi Teks LHO'
        }
      }
    ],
    flashcards: [
      {
        id: 'fc-ind-1',
        frontQuestion: 'Sebutkan 3 struktur utama dalam Teks Laporan Hasil Observasi (LHO)!',
        backAnswer: '1. Pernyataan Umum (Klasifikasi), 2. Deskripsi Bagian, dan 3. Deskripsi Manfaat (Simpulan).',
        category: 'Struktur Teks',
        hint: 'Dimulai dari pengenalan umum sampai manfaatnya.',
        keyTerm: 'Struktur LHO'
      }
    ]
  }
];
