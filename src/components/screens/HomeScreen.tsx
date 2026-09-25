import React, { useState } from 'react';
import { 
  ArrowRight, 
  Wifi, 
  WifiOff, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Share2, 
  ShieldCheck, 
  Volume2, 
  FileText,
  Upload,
  Award,
  GraduationCap,
  Users,
  RotateCcw
} from 'lucide-react';
import { LearningPathway, UserRole } from '../../types/learning';
import { PROJECT_METADATA } from '../../data/curriculumData';
import { ASSET_IMAGES } from '../../assets/images';
import { speakText } from '../../utils/speech';

interface HomeScreenProps {
  pathway: LearningPathway;
  userRole: UserRole;
  isOfflineSimulated: boolean;
  onNavigate: (tab: any) => void;
  onOpenPathwayModal: () => void;
  onOpenOfflineDownload: () => void;
  onOpenReflection: () => void;
  onOpenTeacherUpload: () => void;
  onOpenStudentManagement?: () => void;
  onOpenShareLinks?: () => void;
  onOpenResetModal?: () => void;
  studentCount?: number;
  onSpeak: (text: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  pathway,
  userRole,
  isOfflineSimulated,
  onNavigate,
  onOpenPathwayModal,
  onOpenOfflineDownload,
  onOpenReflection,
  onOpenTeacherUpload,
  onOpenStudentManagement,
  onOpenShareLinks,
  onOpenResetModal,
  studentCount = 5,
  onSpeak,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="space-y-4 pb-20 max-w-2xl mx-auto">
      {/* Offline Alert if simulated */}
      {isOfflineSimulated && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900 shadow-sm animate-fadeIn">
          <WifiOff className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">Simulasi Stress Test: Mode Tanpa Internet (Offline)</p>
            <p className="text-amber-800 mt-0.5 leading-relaxed">
              Anda sedang menguji kondisi internet terputus di pedesaan. Seluruh modul teks ringkas, transkrip, LKPD offline, dan rubrik tugas tetap dapat diakses 100%!
            </p>
          </div>
        </div>
      )}

      {/* Role Notice Banner */}
      {userRole === 'guru' && (
        <div className="p-4 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 rounded-2xl text-white shadow-sm flex flex-col gap-3.5 border border-emerald-800/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-800 text-white flex items-center justify-center text-2xl shrink-0 shadow-xs border border-emerald-700">
                👩‍🏫
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                    Panel Kontrol Pendidik
                  </span>
                  <span className="text-[9px] px-2 py-0.5 bg-emerald-800 rounded-full text-emerald-200 font-semibold">
                    {studentCount} Siswa Terdaftar
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                  Selamat Datang, {PROJECT_METADATA.guruPengampu}
                </h3>
                <p className="text-[11px] text-emerald-200/90 mt-0.5">
                  Kelola materi (YouTube, Gambar, PDF), data siswa kelas, tautan portal, dan penilaian UDL
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action Grid for Teacher */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-emerald-800/60">
            <button
              onClick={onOpenTeacherUpload}
              className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>+ Upload Bahan</span>
            </button>

            {onOpenStudentManagement && (
              <button
                onClick={onOpenStudentManagement}
                className="p-2.5 bg-emerald-800/90 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl border border-emerald-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Users className="w-3.5 h-3.5 text-emerald-300" />
                <span>Data Siswa ({studentCount})</span>
              </button>
            )}

            {onOpenShareLinks && (
              <button
                onClick={onOpenShareLinks}
                className="p-2.5 bg-emerald-800/90 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl border border-emerald-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Link Siswa & Guru</span>
              </button>
            )}

            {onOpenResetModal && (
              <button
                onClick={onOpenResetModal}
                className="p-2.5 bg-red-600/80 hover:bg-red-600 text-white font-bold text-xs rounded-xl border border-red-500/50 flex items-center justify-center gap-1.5 transition-colors"
                title="Reset seluruh jawaban tugas siswa dari awal"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Jawaban</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Welcome Card matching mockup screen 1 */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Hero Image with Fallback */}
        <div className="relative aspect-[16/9] w-full bg-emerald-950 overflow-hidden">
          {!imgError ? (
            <img
              src={ASSET_IMAGES.heroStudents}
              alt="Siswa-siswi SMA inklusif belajar bersama di lingkungan pedesaan"
              className="w-full h-full object-cover transition-opacity duration-300"
              onError={() => setImgError(true)}
              loading="eager"
            />
          ) : (
            /* Stylized SVG Fallback if image file cannot load */
            <div className="w-full h-full bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-900 flex flex-col items-center justify-center p-6 text-center text-white">
              <div className="w-16 h-16 rounded-full bg-emerald-700/60 flex items-center justify-center text-3xl mb-2 shadow-inner">
                👥
              </div>
              <h3 className="text-base font-bold text-emerald-200">
                LMS Inklusif IPS SMA Kelompok 4
              </h3>
              <p className="text-xs text-emerald-300/80 max-w-sm">
                Belajar Fleksibel Berbasis Universal Design for Learning (UDL) di Wilayah Pedesaan
              </p>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-4 text-white">
            <span className="text-[11px] font-semibold text-emerald-300 tracking-wide">
              UNIT PEMBELAJARAN SOSIOLOGI KELAS XI
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
              Permasalahan Sosial di Lingkungan Sekitar
            </h2>
            <p className="text-xs text-slate-200 mt-0.5 line-clamp-1">
              Faktor penyebab, dampak warga pedesaan, dan alternatif solusi kontekstual.
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-emerald-800">
                LMS Inklusif Ramah Smartphone
              </span>
              <p className="text-xs text-slate-500">
                Dirancang berbasis prinsip Universal Design for Learning (UDL)
              </p>
            </div>
            <button
              onClick={() =>
                onSpeak(
                  'Selamat Datang! Mari belajar tentang Permasalahan Sosial di Lingkungan Sekitar. Belajar Fleksibel, Semua Bisa Berpartisipasi.'
                )
              }
              className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
              title="Dengarkan pembacaan teks suara (TTS)"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3 text-xs text-emerald-950">
            <p className="font-semibold text-emerald-900">
              « Belajar Fleksibel, Semua Bisa Berpartisipasi »
            </p>
            <p className="text-[11px] text-emerald-800 mt-1 leading-relaxed">
              Materi disajikan dalam beragam format: Teks ringkas, Infografis, Video pendek ber-CC, dan Audio. Anda bebas memilih format belajar dan format tugas sesuai kenyamanan!
            </p>
          </div>

          {/* Action Buttons matching mockup + Teacher Mode adaptation */}
          <div className="space-y-2 pt-1">
            {userRole === 'guru' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={onOpenTeacherUpload}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Bahan Belajar Guru</span>
                </button>
                <button
                  onClick={() => onNavigate('asesmen')}
                  className="w-full py-3 px-4 bg-slate-900 hover:bg-black text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Nilai & Umpan Balik Tugas</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('materi')}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-semibold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Mulai Belajar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onOpenPathwayModal}
              className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-medium text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {pathway === 'online' ? (
                <>
                  <Wifi className="w-4 h-4 text-emerald-600" />
                  <span>Pilih Jalur Belajar (Saat ini: Jalur Online)</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4 text-amber-600" />
                  <span>Pilih Jalur Belajar (Saat ini: Jalur Offline)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Pathway Comparison Card matching mockup bottom left */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900">
            Jalur Belajar yang Dipilih Saat Ini
          </h3>
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
              pathway === 'online'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {pathway === 'online' ? 'Mode Online Aktif' : 'Mode Offline Aktif'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Online Column */}
          <div
            className={`p-3 rounded-xl border transition-all ${
              pathway === 'online'
                ? 'border-emerald-500 bg-emerald-50/40 shadow-xs'
                : 'border-slate-200 bg-slate-50 opacity-70'
            }`}
          >
            <div className="flex items-center gap-1.5 font-semibold text-emerald-900 mb-2">
              <Wifi className="w-4 h-4 text-emerald-600" />
              <span>Jalur Online</span>
            </div>
            <ul className="space-y-1.5 text-slate-600 text-[11px]">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Streaming video interaktif & transkrip</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Diskusi langsung di forum LMS</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Kuis & aktivitas berbasis web</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Unggah tugas digital langsung</span>
              </li>
            </ul>
          </div>

          {/* Offline Column */}
          <div
            className={`p-3 rounded-xl border transition-all ${
              pathway === 'offline'
                ? 'border-amber-500 bg-amber-50/40 shadow-xs'
                : 'border-slate-200 bg-slate-50 opacity-70'
            }`}
          >
            <div className="flex items-center gap-1.5 font-semibold text-amber-900 mb-2">
              <Download className="w-4 h-4 text-amber-600" />
              <span>Jalur Offline (Hemat Kuota)</span>
            </div>
            <ul className="space-y-1.5 text-slate-600 text-[11px]">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Unduh semua materi sekali (±50 MB)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Materi teks ringan + LKPD cetak</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Diskusi tatap muka / grup WhatsApp</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Tugas tersimpan di HP & kumpul di sekolah</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 italic text-center pt-1">
          *Konten yang sama, tujuan kompetensi yang sama, hanya cara mengaksesnya yang disesuaikan dengan kebutuhanmu.
        </p>
      </div>

      {/* Quick Access to Offline Package & Reflection */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={onOpenOfflineDownload}
          className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-left transition-colors flex items-center gap-2.5 shadow-sm"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Download className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-800">Paket Offline</div>
            <div className="text-[10px] text-slate-500">Unduh Materi (±50 MB)</div>
          </div>
        </button>

        <button
          onClick={onOpenReflection}
          className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-left transition-colors flex items-center gap-2.5 shadow-sm"
        >
          <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-800">Refleksi Belajar</div>
            <div className="text-[10px] text-slate-500">Isi catatan harian</div>
          </div>
        </button>
      </div>
    </div>
  );
};
