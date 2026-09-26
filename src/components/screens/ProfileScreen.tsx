import React, { useState } from 'react';
import {
  User,
  Download,
  FileCheck,
  Award,
  Settings,
  Sliders,
  ChevronRight,
  Volume2,
  CheckCircle2,
  Sun,
  Moon,
  Type,
  FileText,
  Sparkles,
  Upload,
  UserCheck,
  BookOpen,
  Users,
  Share2,
  RotateCcw
} from 'lucide-react';
import { AccessibilitySettings, UserRole } from '../../types/learning';
import { PROJECT_METADATA } from '../../data/curriculumData';

interface ProfileScreenProps {
  userRole: UserRole;
  accessibility: AccessibilitySettings;
  activeUserName?: string;
  activeNisn?: string;
  activeClassroom?: string;
  onLogout?: () => void;
  onUpdateAccessibility: (settings: AccessibilitySettings) => void;
  onToggleRole?: () => void;
  onOpenTeacherUpload: () => void;
  onOpenOfflineDownload: () => void;
  onOpenStudentManagement?: () => void;
  onOpenShareLinks?: () => void;
  onOpenResetModal?: () => void;
  onNavigate: (tab: any) => void;
  onOpenBlueprint: () => void;
  onSpeak: (text: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userRole,
  accessibility,
  activeUserName,
  activeNisn,
  activeClassroom,
  onLogout,
  onUpdateAccessibility,
  onToggleRole,
  onOpenTeacherUpload,
  onOpenOfflineDownload,
  onOpenStudentManagement,
  onOpenShareLinks,
  onOpenResetModal,
  onNavigate,
  onOpenBlueprint,
  onSpeak,
}) => {
  const [activeSubView, setActiveSubView] = useState<'menu' | 'aksesibilitas'>('menu');

  return (
    <div className="space-y-4 pb-20 max-w-2xl mx-auto">
      {/* Profile Header matching mockup bottom right + role adaptation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-3xl shadow-xs">
            {userRole === 'guru' ? '👩‍🏫' : '👨‍🎓'}
          </div>
          <div className="space-y-0.5 flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {userRole === 'guru' ? PROJECT_METADATA.guruPengampu : (activeUserName || 'Dita Anggraini')}
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                {userRole === 'guru' ? 'Guru Pengampu' : (activeClassroom || 'Siswa XI-IPS 1')}
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-snug">
              {userRole === 'guru'
                ? 'Pengampu Sosiologi SMA Inklusif · Pendamping Pembelajaran Ramah UDL'
                : `NISN: ${activeNisn || '0081234561'} · Jalur Belajar Inklusif Mandiri`}
            </p>
          </div>
        </div>

        {/* Progress or Class Overview Bar */}
        {userRole === 'siswa' ? (
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800">Progres Pembelajaran Saya</span>
              <span className="font-bold text-emerald-700">Aktif & Siap Dikoreksi</span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: '70%' }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>Aktivitas LKPD terhubung ke LMS Guru</span>
              <span>Tugas terkirim langsung ke Bu Siti</span>
            </div>
          </div>
        ) : (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-950">
                Ringkasan Kelas Sosiologi XI (Konteks Rural):
              </span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                Heterogen & Inklusif
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-1">
              <div className="p-2 bg-white rounded-lg border border-emerald-150">
                <span className="font-bold text-emerald-800 block text-sm">4</span>
                <span className="text-slate-500 text-[10px]">Siswa Dinilai</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-emerald-150">
                <span className="font-bold text-emerald-800 block text-sm">5</span>
                <span className="text-slate-500 text-[10px]">Bahan Multi-Rep</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-emerald-150">
                <span className="font-bold text-emerald-800 block text-sm">100%</span>
                <span className="text-slate-500 text-[10px]">Akses Offline</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons: Logout & Teacher Simulation */}
        <div className="pt-1 flex flex-col gap-2">
          {userRole === 'guru' && onToggleRole && (
            <button
              onClick={onToggleRole}
              className="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-emerald-200"
            >
              <UserCheck className="w-4 h-4 text-emerald-700" />
              <span>Simulasi: Lihat Tampilan Sudut Pandang Siswa</span>
            </button>
          )}

          {onLogout && (
            <button
              onClick={onLogout}
              className="w-full py-2.5 px-3 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-slate-200 hover:border-red-200"
            >
              <span>Keluar dari Akun ({userRole === 'guru' ? 'Guru' : 'Siswa'})</span>
            </button>
          )}
        </div>
      </div>

      {/* Main List Rows matching mockup screen Profil */}
      {activeSubView === 'menu' ? (
        <div className="space-y-2.5">
          {userRole === 'guru' ? (
            <>
              {/* Teacher Row: Upload Bahan Baru */}
              <div
                onClick={onOpenTeacherUpload}
                className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-sm hover:border-emerald-300 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      Unggah Bahan Belajar Baru
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Tambah link YouTube, berkas gambar/foto, dokumen PDF, atau teks modul
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Teacher Row: Nilai Tugas Siswa */}
              <div
                onClick={() => onNavigate('asesmen')}
                className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-sm hover:border-emerald-300 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      Penilaian & Umpan Balik Siswa
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Evaluasi tugas esai, infografis, slide, audio, dan video siswa
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              {/* Teacher Row: Kelola Siswa */}
              {onOpenStudentManagement && (
                <div
                  onClick={onOpenStudentManagement}
                  className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-sm hover:border-emerald-300 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        Kelola & Tambah Siswa Kelas
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Daftarkan siswa baru, atur preferensi jalur UDL, dan pantau progres
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              )}

              {/* Teacher Row: Bagikan Tautan Terpisah */}
              {onOpenShareLinks && (
                <div
                  onClick={onOpenShareLinks}
                  className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-sm hover:border-emerald-300 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <Share2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        Tautan Portal Siswa & Guru Terpisah
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Salin link khusus siswa untuk dibagikan via WhatsApp kelas
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              )}

              {/* Teacher Row: Reset Jawaban Siswa */}
              {onOpenResetModal && (
                <div
                  onClick={onOpenResetModal}
                  className="bg-red-50/50 rounded-2xl border border-red-200 p-3.5 sm:p-4 shadow-sm hover:border-red-300 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-100 text-red-700 flex items-center justify-center">
                      <RotateCcw className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-red-950 group-hover:text-red-700 transition-colors">
                        Reset Semua Jawaban & Tugas Siswa
                      </h3>
                      <p className="text-[11px] text-red-800">
                        Mulai pembelajaran dari awal untuk kelas baru atau siklus berikutnya
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-red-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              )}
            </>
          ) : (
            <>
              {/* Row 1: Unduhan Saya */}
              <div
                onClick={onOpenOfflineDownload}
                className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-sm hover:border-emerald-300 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      Unduhan Saya
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Modul, LKPD, transkrip, & video offline (±18 MB tersimpan)
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Row 2: Tugas Saya */}
              <div
                onClick={() => onNavigate('asesmen')}
                className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-sm hover:border-emerald-300 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      Tugas Saya
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Infografis Daur Alur Sampah Desa Sukamaju
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Row 3: Hasil dan Umpan Balik */}
              <div
                onClick={() => onNavigate('asesmen')}
                className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-sm hover:border-emerald-300 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      Hasil dan Umpan Balik Guru
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Nilai: 88/100 · Dari Dra. Siti Rahayu, M.Pd
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </>
          )}

          {/* Row 4: Pengaturan Aksesibilitas */}
          <div
            onClick={() => setActiveSubView('aksesibilitas')}
            className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-sm hover:border-emerald-300 cursor-pointer transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Pengaturan Aksesibilitas
                </h3>
                <p className="text-[11px] text-slate-500">
                  Ukuran teks, kontras tinggi, pembaca suara (TTS)
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>

          {/* Blueprint UDL Info Card */}
          <div
            onClick={onOpenBlueprint}
            className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 shadow-xs cursor-pointer hover:border-emerald-300 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  Worksheet Blueprint UTS Kelompok 4
                </h3>
                <p className="text-[11px] text-slate-600">
                  Lihat Dokumen Blueprint UDL Minggu ke-5 & Stress Test
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-800">Buka →</span>
          </div>
        </div>
      ) : (
        /* Subview: Pengaturan Aksesibilitas */
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-600" />
              <span>Pengaturan Aksesibilitas</span>
            </h3>
            <button
              onClick={() => setActiveSubView('menu')}
              className="text-xs text-emerald-700 font-semibold hover:underline"
            >
              ← Kembali
            </button>
          </div>

          {/* Ukuran Font */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-slate-500" />
              <span>Ukuran Teks / Font</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'normal', label: 'Standar (100%)' },
                { id: 'large', label: 'Besar (115%)' },
                { id: 'xlarge', label: 'Sangat Besar' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() =>
                    onUpdateAccessibility({
                      ...accessibility,
                      fontSize: opt.id as any,
                    })
                  }
                  className={`py-2 px-2 text-xs rounded-xl border text-center font-medium transition-all ${
                    accessibility.fontSize === opt.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mode Kontras Tinggi */}
          <div className="flex items-center justify-between py-2 border-t border-slate-100">
            <div>
              <div className="text-xs font-semibold text-slate-800">
                Mode Kontras Tinggi
              </div>
              <p className="text-[11px] text-slate-500">
                Memudahkan membaca pada layar redup atau outdoor
              </p>
            </div>
            <button
              onClick={() =>
                onUpdateAccessibility({
                  ...accessibility,
                  highContrast: !accessibility.highContrast,
                })
              }
              className={`w-11 h-6 rounded-full transition-colors relative ${
                accessibility.highContrast ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                  accessibility.highContrast
                    ? 'translate-x-5.5'
                    : 'translate-x-0.5'
                }`}
              ></div>
            </button>
          </div>

          {/* Pembaca Layar TTS */}
          <div className="flex items-center justify-between py-2 border-t border-slate-100">
            <div>
              <div className="text-xs font-semibold text-slate-800">
                Fitur Narasi Suara (TTS)
              </div>
              <p className="text-[11px] text-slate-500">
                Tombol speaker aktif untuk membacakan teks dengan suara
              </p>
            </div>
            <button
              onClick={() =>
                onUpdateAccessibility({
                  ...accessibility,
                  textToSpeech: !accessibility.textToSpeech,
                })
              }
              className={`w-11 h-6 rounded-full transition-colors relative ${
                accessibility.textToSpeech ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                  accessibility.textToSpeech
                    ? 'translate-x-5.5'
                    : 'translate-x-0.5'
                }`}
              ></div>
            </button>
          </div>

          {/* Teks Sederhana / Bahasa Ramah */}
          <div className="flex items-center justify-between py-2 border-t border-slate-100">
            <div>
              <div className="text-xs font-semibold text-slate-800">
                Bahasa Ramah & Bebas Jargon
              </div>
              <p className="text-[11px] text-slate-500">
                Gunakan istilah sederhana untuk kemudahan pemahaman
              </p>
            </div>
            <button
              onClick={() =>
                onUpdateAccessibility({
                  ...accessibility,
                  simplifiedText: !accessibility.simplifiedText,
                })
              }
              className={`w-11 h-6 rounded-full transition-colors relative ${
                accessibility.simplifiedText ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                  accessibility.simplifiedText
                    ? 'translate-x-5.5'
                    : 'translate-x-0.5'
                }`}
              ></div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
