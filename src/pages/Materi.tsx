import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Lightbulb, ChevronRight, ArrowRight, 
  FileText, Layout, Users, Target, Zap, Layers, RefreshCcw, ShieldCheck, Scale, Gavel,
  HelpCircle, Check, BookOpen, HeartHandshake, Sparkles, Filter, Clock, GraduationCap
} from 'lucide-react';

// --- DATA MATERI ---
const MATERI_LIST = [
  {
    id: 'pengertian-harmoni',
    title: 'Hakikat Harmoni Sosial',
    category: 'Dasar',
    duration: '15m',
    icon: <Users size={28} />,
    color: 'bg-blue-600',
    content: 'Harmoni adalah keindahan, keserasian, dan keteraturan yang tercipta melalui penerimaan perbedaan dan kerja sama yang saling membangun.',
    theory: 'Emile Durkheim mendefinisikan harmoni sebagai hasil integrasi sosial yang kuat melalui nilai dan norma yang sama.',
    experts: [
      { name: 'Max Weber', opinion: 'Kondisi yang tercipta ketika relasi antar individu diberatkan pada kemampuan memahami dan menghargai perbedaan status, kekuasaan, dan budaya.' },
      { name: 'Talcott Parsons', opinion: 'Keadaan di mana seluruh sistem sosial berfungsi dengan baik dan setiap bagian masyarakat berkontribusi pada stabilitas menyeluruh.' },
      { name: 'Robert Putnam', opinion: 'Hasil dari modal sosial yang dipengaruhi oleh komponen kepercayaan, norma, dan jaringan yang mempererat hubungan.' }
    ],
    solidaritas: [
      { t: "Mekanik", d: "Masyarakat pra-industri, homogen, pembagian kerja minimal, didominasi kesadaran kolektif dan adat istiadat." },
      { t: "Organik", d: "Masyarakat modern, heterogen, pembagian kerja kompleks, saling ketergantungan antar peran yang berbeda." }
    ],
    indicators: ['Kerja sama antar elemen', 'Penerimaan keragaman', 'Stabilitas sistem sosial']
  },
  {
    id: 'integrasi-sosial',
    title: 'Integrasi Sosial',
    category: 'Proses',
    duration: '30m',
    icon: <Target size={28} />,
    color: 'bg-indigo-600',
    content: 'Pembauran berbagai kelompok sosial hingga menjadi satu kesatuan yang utuh, mengakui perbedaan tanpa menghilangkan fungsi pentingnya.',
    experts: [
      { name: 'Abu Ahmadi', opinion: 'Melibatkan kerja sama seluruh anggota masyarakat dari berbagai tingkat (individu, keluarga, lembaga).' },
      { name: 'Ogburn & Nimkoff', opinion: 'Berhasil jika anggota merasa kebutuhan terpenuhi, ada konsensus norma, dan norma tersebut bertahan lama.' }
    ],
    factors: ['Homogenitas kelompok', 'Besar kecilnya kelompok', 'Mobilitas geografis', 'Efektivitas komunikasi'],
    types: [
      { t: "Normatif", d: "Dipersatukan oleh norma atau semboyan (contoh: Bhinneka Tunggal Ika)." },
      { t: "Fungsional", d: "Terbentuk karena fungsi tertentu yang saling melengkapi (contoh: Kerja sama antar daerah penghasil bahan baku dan pengolah)." },
      { t: "Koersif", d: "Melibatkan tekanan atau kekerasan oleh penguasa (contoh: Penggusuran PKL)." }
    ],
    ways: ["Akulturasi (Penyatuan tanpa hapus ciri khas)", "Asimilasi (Peleburan menjadi budaya baru)"]
  },
  {
    id: 'akomodasi-sosial',
    title: 'Bentuk Akomodasi',
    category: 'Relasi',
    duration: '20m',
    icon: <HeartHandshake size={28} />,
    color: 'bg-rose-600',
    content: 'Proses meredakan pertentangan untuk mencapai keadaan stabil tanpa menghancurkan pihak lawan.',
    forms: [
      { t: "Koersi", d: "Paksaan fisik atau psikologis." },
      { t: "Kompromi", d: "Saling mengurangi tuntutan." },
      { t: "Arbitrase", d: "Melibatkan pihak ketiga dengan kedudukan lebih tinggi." },
      { t: "Mediasi", d: "Pihak ketiga hanya sebagai penasihat." },
      { t: "Konsiliasi", d: "Mempertemukan keinginan kedua belah pihak." },
      { t: "Stalemate", d: "Jalan buntu ketika kekuatan seimbang." },
      { t: "Adjudikasi", d: "Penyelesaian melalui pengadilan." }
    ]
  },
  {
    id: 'kesetaraan-sosial',
    title: 'Kesetaraan Sosial',
    category: 'Prinsip',
    duration: '20m',
    icon: <Scale size={28} />,
    color: 'bg-emerald-600',
    content: 'Kondisi di mana individu atau kelompok tidak mendapatkan keuntungan atau kerugian langsung akibat karakteristik tertentu.',
    categories: [
      { t: "Hukum", d: "Semua warga adalah subjek hukum yang universal." },
      { t: "Politik", d: "Hak yang sama untuk berpartisipasi dalam pembuatan undang-undang." },
      { t: "Sosial", d: "Kesetaraan kedudukan tanpa ancaman dominasi." },
      { t: "Ekonomi", d: "Pembagian sumber daya yang adil untuk mencegah kesenjangan." },
      { t: "Moral", d: "Memperlakukan kepentingan moral setiap anggota secara setara." }
    ],
    law: [
      { no: "Ayat (1)", isi: "Segala warga negara bersamaan kedudukannya di dalam hukum dan pemerintahan." },
      { no: "Ayat (2)", isi: "Tiap-tiap warga negara berhak atas pekerjaan dan penghidupan yang layak bagi kemanusiaan." },
      { no: "Ayat (3)", isi: "Setiap warga negara berhak dan wajib ikut serta dalam upaya pembelaan negara." }
    ],
    concepts: [
      { t: "Kesempatan", d: "Akses terbuka berdasar kriteria universal, bukan kelahiran." },
      { t: "Sejak Awal", d: "Kompetisi adil yang dimulai dari garis start yang sama." },
      { t: "Hasil", d: "Standar hidup dan peluang yang sama bagi setiap orang." }
    ]
  },
  {
    id: 'inklusi-sosial',
    title: 'Inklusi Sosial',
    category: 'Prinsip',
    duration: '25m',
    icon: <Zap size={28} />,
    color: 'bg-amber-600',
    content: 'Proses meningkatkan partisipasi masyarakat, terutama bagi mereka yang kurang beruntung atau marginal.',
    mindset: ["Kesadaran kemajemukan", "Sikap jujur & akal sehat", "Kerja sama warga", "Kedewasaan bermasyarakat"],
    examples: [
      { t: "Keluarga", d: "Menghargai pendapat semua anggota tanpa memandang usia." },
      { t: "Sekolah", d: "Siswa difabel mendapatkan perlakuan dan akses yang sama." },
      { t: "Masyarakat", d: "Tidak menutup akses jalan saat perayaan hari raya agama tertentu." },
      { t: "Ekonomi", d: "Membuka akses sumber daya bagi wanita dan kaum difabel." }
    ]
  },
  {
    id: 'kohesi-sosial',
    title: 'Kohesi Sosial',
    category: 'Relasi',
    duration: '20m',
    icon: <Layers size={28} />,
    color: 'bg-teal-600',
    content: 'Kekuatan yang mengikat masyarakat untuk menghidupi persatuan, solidaritas, dan kerukunan.',
    components: [
      { label: "Potensi Kelompok", desc: "Kemampuan kelompok mempengaruhi individu." },
      { label: "Motif Keanggotaan", desc: "Dasar alasan seseorang bergabung." },
      { label: "Harapan", desc: "Apa yang ingin dicapai dalam kelompok." },
      { label: "Penilaian Hasil", desc: "Evaluasi terhadap manfaat yang didapat." }
    ],
    experts: [
      { name: 'Emile Durkheim', opinion: 'Tercipta karena adanya nilai, tantangan, dan kesempatan yang setara.' },
      { name: 'Harpham et al.', opinion: 'Terdiri dari kebersamaan, kepercayaan sosial, dan kerja sama timbal balik.' }
    ]
  },
  {
    id: 'sikap-mental',
    title: '9 Sikap Mental Utama',
    category: 'Mindset',
    duration: '25m',
    icon: <ShieldCheck size={28} />,
    color: 'bg-cyan-600',
    content: 'Fondasi sikap dalam membangun harmoni di tengah masyarakat heterogen.',
    points: [
      "1. Menyikapi perbedaan secara positif sebagai kekayaan.",
      "2. Memiliki sikap akomodatif untuk mengurangi ketegangan.",
      "3. Berjiwa heterogen dan menghargai HAM.",
      "4. Berkomitmen terhadap kesepakatan bersama.",
      "5. Berempati pada penderitaan orang lain.",
      "6. Peduli pada orang lain (aksi menolong).",
      "7. Menjaga kelestarian lingkungan hidup.",
      "8. Menjaga penegakan hukum yang tegas.",
      "9. Mengutamakan transparansi informasi."
    ]
  },
  {
    id: 'aksi-individu',
    title: 'Aksi Nyata Individu',
    category: 'Upaya',
    duration: '30m',
    icon: <Lightbulb size={28} />,
    color: 'bg-violet-600',
    content: 'Upaya personal untuk mendorong harmoni sosial (Manisha Sharma, 2015).',
    actions: [
      { t: "Mengembangkan empati", d: "Membayangkan diri di posisi orang lain untuk mencegah kejahatan." },
      { t: "Membangun persahabatan", d: "Sosialisasi kuat antar individu dengan tujuan sama." },
      { t: "Saling menguatkan", d: "Menggunakan bakat masing-masing untuk menutupi kekurangan teman." },
      { t: "Membangun persekutuan", d: "Mendukung lingkungan sosial yang sehat agar kebutuhan terpenuhi." },
      { t: "Menjembatani perbedaan", d: "Sadar bahwa masyarakat adalah heterogen dan butuh toleransi." }
    ]
  },
  {
    id: 'agen-perubahan',
    title: 'Peran Agen Perubahan',
    category: 'Peran',
    duration: '35m',
    icon: <GraduationCap size={28} />,
    color: 'bg-orange-600',
    content: 'Bagaimana masyarakat dapat berpartisipasi aktif mendorong harmoni.',
    roles: [
      { t: "Menyebarkan Informasi", d: "Melalui kampanye positif dan media sosial untuk edukasi harmoni." },
      { t: "Diskusi & Dialog", d: "Membuka komunikasi dua arah (public hearing) untuk menghindari salah paham." },
      { t: "Kerja sama & Kolaborasi", d: "Melalui kegiatan amal (filantropi) dan pendampingan sosial bagi yang membutuhkan." }
    ]
  },
  {
    id: 'membangun-aksi',
    title: 'Mendesain Aksi Sosial',
    category: 'Siklus',
    duration: '45m',
    icon: <Sparkles size={28} />,
    color: 'bg-slate-900',
    content: 'Langkah sistematis untuk merancang aksi pembangunan harmoni sosial.',
    steps: [
      { phase: "Perencanaan", d: "Mengamati gejala sosial, identifikasi masalah (bullying, ketidakadilan), cari info, dan analisis SWOT." },
      { phase: "Pelaksanaan", d: "Pembagian tugas, koordinasi yang jelas, perizinan, dan dokumentasi proses." },
      { phase: "Evaluasi & Pelaporan", d: "Meninjau kesesuaian rencana, analisis tanggapan pesan, amati dampak, dan susun laporan." }
    ]
  }
];

export default function Materi() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');
  const selectedMateri = MATERI_LIST.find(m => m.id === selectedId);

  const categories = useMemo(() => ['All', ...new Set(MATERI_LIST.map(m => m.category))], []);

  const filteredMateri = useMemo(() => {
    return filter === 'All' 
      ? MATERI_LIST 
      : MATERI_LIST.filter(m => m.category === filter);
  }, [filter]);

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-sans pb-32">
      {/* SOPHISTICATED HERO */}
      <header className="relative pt-24 md:pt-32 pb-16 md:pb-24 px-6 overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
           <div className="absolute top-20 right-20 w-96 h-96 bg-blue-100 rounded-full blur-[100px]" />
           <div className="absolute -bottom-40 -left-20 w-[600px] h-[600px] bg-soft-pink/30 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="px-6 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-6 md:mb-10 shadow-xl"
          >
            Socio Learning Hub
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-9xl font-display font-black text-slate-950 tracking-[-0.05em] mb-6 md:mb-8 text-center leading-[0.95]"
          >
            Pustaka <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Harmoni</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2 }}
            className="text-slate-400 font-bold text-lg md:text-xl max-w-2xl text-center leading-relaxed"
          >
            Jelajahi materi sosiologi dengan pendekatan yang lebih dalam, interaktif, dan visual.
          </motion.p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        {/* INTERACTIVE FILTER BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
           <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-2 w-full md:w-auto">
             {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`whitespace-nowrap px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                    filter === cat 
                      ? 'bg-blue-600 text-white shadow-xl scale-105' 
                      : 'bg-white text-slate-400 border border-slate-100 hover:border-blue-200'
                  }`}
                >
                  {cat}
                </button>
             ))}
           </div>
           
           <div className="hidden lg:flex items-center gap-3 text-slate-400">
             <Filter size={18} />
             <span className="text-xs font-bold uppercase tracking-widest">Urutkan Berdasarkan Kategori</span>
           </div>
        </div>

        {/* BENTO GRID GALLERY */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 md:auto-rows-[280px]">
          {filteredMateri.map((materi, idx) => {
            const isWide = materi.id === 'membangun-aksi' || materi.id === 'sikap-mental';
            const isTall = idx === 1 || idx === 3;
            const isHero = materi.id === 'pengertian-harmoni';

            return (
              <motion.div
                layoutId={materi.id}
                key={materi.id}
                onClick={() => setSelectedId(materi.id)}
                className={`
                  group cursor-pointer bg-white rounded-[3rem] p-3 border-2 border-slate-50 card-shadow transition-all hover:border-blue-200 overflow-hidden relative flex flex-col
                  ${isWide ? 'md:col-span-2' : 'md:col-span-2 lg:col-span-2'}
                  ${isTall ? 'md:row-span-2' : ''}
                  ${isHero ? 'md:col-span-4 lg:col-span-4 md:row-span-1' : ''}
                `}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className={`w-full h-full rounded-[2.5rem] p-8 flex flex-col bg-white relative z-10 transition-colors group-hover:bg-blue-50/20`}>
                  <div className="flex justify-between items-start mb-8">
                     <div className={`p-4 rounded-2xl text-white shadow-lg ${materi.color || 'bg-blue-600'}`}>
                       {materi.icon}
                     </div>
                     <div className="px-4 py-1.5 bg-slate-100 rounded-full flex items-center gap-2">
                        <Clock size={12} className="text-slate-400" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{materi.duration}</span>
                     </div>
                  </div>

                  <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">{materi.category}</span>
                    <h3 className={`font-black text-slate-900 leading-[0.95] tracking-tighter ${isHero ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
                      {materi.title}
                    </h3>
                  </div>

                  <p className={`text-slate-400 font-medium text-sm mt-6 leading-relaxed ${isTall ? 'line-clamp-10' : 'line-clamp-2'}`}>
                    {materi.content}
                  </p>

                  <div className="mt-auto pt-8 flex items-center gap-3">
                     <span className="text-xs font-black uppercase text-slate-900">Explore Module</span>
                     <div className="h-0.5 flex-1 bg-slate-50 group-hover:bg-blue-200 transition-colors" />
                     <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-2 transition-transform text-blue-600" />
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-40 h-40 opacity-0 group-hover:opacity-10 transition-opacity">
                   <Sparkles className="w-full h-full text-blue-600" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* BOTTOM CALL TO ACTION */}
        <section className="mt-24 text-center">
           <div className="bg-slate-950 p-16 rounded-[4rem] text-white relative overflow-hidden group">
              <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                <BookOpen size={48} className="mx-auto text-blue-400" />
                <h2 className="text-5xl font-display font-black leading-tight italic">
                  "Sosiologi Adalah Seni Memahami Kita."
                </h2>
                <p className="text-slate-400 font-bold opacity-80">Siap untuk mempraktikkan apa yang kamu pelajari di dunia nyata?</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                   <button 
                    onClick={() => navigate('/quiz')}
                    className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-black text-[12px] uppercase tracking-widest shadow-xl hover:scale-105 transition-transform"
                   >
                      Mulai Aksi Sekarang
                   </button>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/30 via-transparent to-transparent" />
           </div>
        </section>
      </main>

      {/* DETAIL MODAL OVERLAY */}
      <AnimatePresence>
        {selectedMateri && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-3xl z-[80]"
            />
            <motion.div
              layoutId={selectedId!}
              className="fixed inset-4 md:inset-12 bg-white z-[90] rounded-[2.5rem] md:rounded-[4rem] shadow-2xl flex flex-col overflow-hidden border-[1px] border-white/10"
            >
              <div className="flex-1 overflow-y-auto hide-scrollbar bg-white">
                <div className="relative h-64 md:h-96 overflow-hidden bg-slate-950">
                   <div className={`absolute inset-0 opacity-40 ${selectedMateri.color || 'bg-blue-600'}`} />
                   <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                   
                   <div className="absolute bottom-8 md:bottom-16 left-8 md:left-16 right-8 md:right-16">
                      <div className="flex items-center gap-4 mb-4 md:mb-8">
                         <div className="p-3 md:p-4 bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl text-white border border-white/20">
                           {selectedMateri.icon}
                         </div>
                         <div className="px-4 md:px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-[8px] md:text-[10px] font-black text-white uppercase tracking-[0.3em] border border-white/30">
                           {selectedMateri.category}
                         </div>
                      </div>
                      <h2 className="text-3xl md:text-6xl lg:text-8xl font-display font-black text-slate-950 tracking-tighter leading-none mb-4">
                        {selectedMateri.title}
                      </h2>
                   </div>

                   <button 
                    onClick={() => setSelectedId(null)} 
                    className="absolute top-6 md:top-10 right-6 md:right-10 p-3 md:p-5 bg-white/10 backdrop-blur-md text-white rounded-2xl md:rounded-3xl hover:bg-white/20 transition-all border border-white/10"
                  >
                    <X size={24} md:size={32} />
                  </button>
                </div>

                <div className="p-8 md:p-16 max-w-5xl mx-auto space-y-12 md:space-y-24">
                   <div className="prose prose-lg md:prose-2xl">
                     <p className="text-xl md:text-3xl text-slate-500 font-display italic leading-relaxed border-l-4 md:border-l-8 border-blue-600 pl-6 md:pl-12 py-2">
                        {selectedMateri.content}
                     </p>
                   </div>

                   {selectedMateri.theory && (
                     <section className="p-8 md:p-16 bg-slate-50 rounded-[2.5rem] md:rounded-[4rem] border-2 border-slate-100">
                        <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-blue-600 mb-6 md:mb-8 border-b-2 border-blue-100 pb-4 inline-block">Landasan Teori</h4>
                        <div className="space-y-8 md:space-y-12">
                           <p className="text-lg md:text-2xl font-black text-slate-900 leading-snug">{selectedMateri.theory}</p>
                           
                           {selectedMateri.experts && (
                             <div className="grid grid-cols-1 gap-6 mt-8">
                               {(selectedMateri.experts as any[]).map((exp, i) => (
                                 <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                                   <div className="flex items-center gap-3 mb-4">
                                      <Users size={16} className="text-blue-600" />
                                      <span className="font-black text-sm uppercase tracking-widest text-slate-900">{exp.name}</span>
                                   </div>
                                   <p className="text-slate-500 font-medium italic">"{exp.opinion}"</p>
                                 </div>
                               ))}
                             </div>
                           )}

                           {selectedMateri.solidaritas && (
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                               {(selectedMateri.solidaritas as any[]).map((sol, i) => (
                                 <div key={i} className="bg-slate-900 p-8 rounded-3xl text-white">
                                   <h5 className="text-blue-400 font-black mb-2">{sol.t}</h5>
                                   <p className="text-slate-400 text-sm">{sol.d}</p>
                                 </div>
                               ))}
                             </div>
                           )}

                           {selectedMateri.indicators && (
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8">
                                {(selectedMateri.indicators as any[]).map((ind, i) => (
                                   <div key={i} className="bg-white p-4 md:p-6 rounded-2xl md:rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4 group hover:border-blue-600 transition-all">
                                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                         <Check size={16} md:size={20} />
                                      </div>
                                      <span className="font-bold text-sm md:text-base text-slate-700">{ind}</span>
                                   </div>
                                ))}
                             </div>
                           )}
                        </div>
                     </section>
                   )}

                   {selectedMateri.factors && (
                     <section className="space-y-8">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">Faktor Pendorong Integrasi</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {(selectedMateri.factors as any[]).map((f, i) => (
                              <div key={i} className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 font-bold text-indigo-900 flex items-center gap-4">
                                 <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 text-xs">{i+1}</div>
                                 {f}
                              </div>
                           ))}
                        </div>
                     </section>
                   )}

                   {selectedMateri.types && (
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {(selectedMateri.types as any[]).map((type: any, i: number) => (
                          <div key={i} className="p-10 bg-white border-2 border-slate-50 rounded-[3.5rem] card-shadow flex flex-col group hover:bg-blue-600 transition-all">
                             <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center font-black text-2xl mb-8 group-hover:bg-white transition-colors">{i+1}</div>
                             <h5 className="text-2xl font-black text-slate-900 mb-6 group-hover:text-white">{type.t}</h5>
                             <p className="text-sm font-medium text-slate-400 leading-relaxed group-hover:text-blue-100">{type.d}</p>
                          </div>
                        ))}
                     </div>
                   )}

                   {selectedMateri.ways && (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {(selectedMateri.ways as any[]).map((w: any, i: number) => (
                          <div key={i} className="p-8 bg-slate-900 rounded-[3rem] text-white border-b-4 border-indigo-600">
                             <h5 className="text-xl font-black mb-4 flex items-center gap-3">
                                <RefreshCcw size={20} className="text-indigo-400" />
                                {w.split('(')[0]}
                             </h5>
                             <p className="text-slate-400 text-sm">({w.split('(')[1]}</p>
                          </div>
                        ))}
                     </div>
                   )}

                   {selectedMateri.forms && (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(selectedMateri.forms as any[]).map((f: any, i: number) => (
                          <div key={i} className="p-8 bg-rose-50 rounded-[2.5rem] border border-rose-100">
                             <h5 className="font-black text-rose-900 mb-2">{f.t}</h5>
                             <p className="text-sm text-rose-700/70 leading-relaxed">{f.d}</p>
                          </div>
                        ))}
                     </div>
                   )}

                   {selectedMateri.categories && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         {(selectedMateri.categories as any[]).map((c: any, i: number) => (
                           <div key={i} className="flex gap-6 items-start">
                              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black shrink-0">{i+1}</div>
                              <div>
                                 <h5 className="text-2xl font-black text-slate-900 mb-2">{c.t}</h5>
                                 <p className="text-slate-500 font-medium leading-relaxed">{c.d}</p>
                              </div>
                           </div>
                         ))}
                      </div>
                   )}

                   {selectedMateri.law && (
                      <div className="p-12 bg-slate-50 rounded-[3rem] border-2 border-slate-100">
                        <div className="flex items-center gap-3 mb-8">
                           <Gavel size={24} className="text-emerald-600" />
                           <h4 className="font-black text-slate-900 uppercase tracking-widest">UUD 1945 Pasal 27</h4>
                        </div>
                        <div className="space-y-6">
                           {(selectedMateri.law as any[]).map((l, i) => (
                              <div key={i} className="flex gap-4">
                                 <span className="font-black text-emerald-600 min-w-[80px]">{l.no}</span>
                                 <p className="text-slate-600 font-bold italic">"{l.isi}"</p>
                              </div>
                           ))}
                        </div>
                      </div>
                   )}

                   {selectedMateri.concepts && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         {(selectedMateri.concepts as any[]).map((c: any, i: number) => (
                           <div key={i} className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
                              <h5 className="font-black text-slate-900 mb-3">{c.t}</h5>
                              <p className="text-xs text-slate-400 font-medium leading-relaxed">{c.d}</p>
                           </div>
                         ))}
                      </div>
                   )}

                   {selectedMateri.mindset && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         {(selectedMateri.mindset as any[]).map((m, i) => (
                           <div key={i} className="p-6 bg-slate-900 rounded-3xl text-center flex flex-col items-center justify-center gap-3 group hover:bg-amber-500 transition-all">
                              <ShieldCheck size={24} className="text-amber-400 group-hover:text-white" />
                              <span className="text-[10px] font-black text-white uppercase tracking-widest leading-tight">{m}</span>
                           </div>
                         ))}
                      </div>
                   )}

                   {selectedMateri.examples && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         {(selectedMateri.examples as any[]).map((ex: any, i: number) => (
                            <div key={i} className="flex gap-6 p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
                               <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                                  <Layout size={24} />
                               </div>
                               <div>
                                  <h5 className="text-xl font-black text-slate-900 mb-1">{ex.t}</h5>
                                  <p className="text-sm text-slate-400 font-medium leading-relaxed">{ex.d}</p>
                               </div>
                            </div>
                         ))}
                      </div>
                   )}

                   {selectedMateri.components && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         {(selectedMateri.components as any[]).map((c: any, i: number) => (
                           <div key={i} className="p-10 bg-teal-50 rounded-[3rem] border border-teal-100">
                              <h5 className="text-xl font-black text-teal-900 mb-4">{c.label}</h5>
                              <p className="text-sm text-teal-700 font-medium leading-relaxed">{c.desc}</p>
                           </div>
                         ))}
                      </div>
                   )}

                   {selectedMateri.points && (
                      <div className="space-y-4">
                        {(selectedMateri.points as string[]).map((p, i) => (
                           <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 font-bold flex gap-4 items-center">
                              <div className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                              {p}
                           </div>
                        ))}
                      </div>
                   )}

                   {selectedMateri.actions && (
                      <div className="grid grid-cols-1 gap-6">
                         {(selectedMateri.actions as any[]).map((a: any, i: number) => (
                           <div key={i} className="p-10 bg-violet-50 rounded-[3rem] flex flex-col md:flex-row gap-8 items-start md:items-center">
                              <div className="w-16 h-16 bg-violet-600 text-white rounded-3xl flex items-center justify-center text-2xl font-black shrink-0">{i+1}</div>
                              <div>
                                 <h5 className="text-2xl font-black text-violet-900 mb-2">{a.t}</h5>
                                 <p className="text-violet-700 font-medium leading-relaxed">{a.d}</p>
                              </div>
                           </div>
                         ))}
                      </div>
                   )}

                   {selectedMateri.roles && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         {(selectedMateri.roles as any[]).map((r: any, i: number) => (
                           <div key={i} className="p-10 bg-slate-950 rounded-[3.5rem] flex flex-col">
                              <div className="w-12 h-12 bg-orange-600 rounded-2xl mb-8 flex items-center justify-center text-white">
                                 <Target size={24} />
                              </div>
                              <h5 className="text-xl font-black text-white mb-4">{r.t}</h5>
                              <p className="text-xs text-slate-400 font-medium leading-relaxed border-l-2 border-orange-600 pl-4">{r.d}</p>
                           </div>
                         ))}
                      </div>
                   )}

                   {selectedMateri.steps && (
                      <div className="space-y-12">
                         {(selectedMateri.steps as any[]).map((s: any, i: number) => (
                           <div key={i} className="bg-slate-50 p-12 rounded-[4rem] border-2 border-slate-100 relative group overflow-hidden">
                              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                              <div className="relative z-10">
                                 <h5 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">Phase 0{i+1}</h5>
                                 <h4 className="text-4xl font-black text-slate-900 mb-6">{s.phase}</h4>
                                 <p className="text-xl font-bold text-slate-500">{s.d}</p>
                              </div>
                           </div>
                         ))}
                      </div>
                   )}

                   <div className="pt-20 border-t-2 border-slate-100 text-center space-y-8 pb-10">
                       <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Socio Learning Module Completed</p>
                       <button 
                        onClick={() => setSelectedId(null)}
                        className="px-16 py-6 bg-slate-900 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl"
                       >
                         Kembali Ke Pustaka
                       </button>
                   </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
