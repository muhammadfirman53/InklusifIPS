import React from 'react';
import { 
  Wifi, 
  WifiOff, 
  Bell, 
  Smartphone, 
  Monitor, 
  FileText, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Sparkles,
  Upload,
  UserCheck,
  GraduationCap,
  Share2,
  Users,
  RotateCcw
} from 'lucide-react';
import { LearningPathway, UserRole } from '../types/learning';
import { stopSpeech } from '../utils/speech';

interface HeaderProps {
  currentTab: string;
  pathway: LearningPathway;
  userRole: UserRole;
  isOfflineSimulated: boolean;
  isMockupView: boolean;
  unreadNotificationsCount: number;
  isSpeaking: boolean;
  onToggleRole: () => void;
  onToggleOfflineSim: () => void;
  onToggleMockupView: () => void;
  onOpenPathwayModal: () => void;
  onOpenNotifications: () => void;
  onOpenBlueprint: () => void;
  onOpenTeacherUpload: () => void;
  onOpenShareLinks: () => void;
  onOpenStudentManagement?: () => void;
  onOpenResetModal?: () => void;
  onStopSpeaking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  pathway,
  userRole,
  isOfflineSimulated,
  isMockupView,
  unreadNotificationsCount,
  isSpeaking,
  onToggleRole,
  onToggleOfflineSim,
  onToggleMockupView,
  onOpenPathwayModal,
  onOpenNotifications,
  onOpenBlueprint,
  onOpenTeacherUpload,
  onOpenShareLinks,
  onOpenStudentManagement,
  onOpenResetModal,
  onStopSpeaking,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors">
      {/* Top Banner on Desktop/Mockup: 4 UDL Pillars + Active Role Announcement */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 bg-emerald-950 text-emerald-100 text-xs font-medium">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="hidden sm:inline">LMS Inklusif IPS SMA Kelompok 4 — Rural UDL</span>
          <span className="text-[11px] px-2 py-0.5 rounded-full font-bold bg-emerald-800/80 text-emerald-200 border border-emerald-700">
            {userRole === 'guru' ? '👩‍🏫 Mode: Guru Sosiologi' : '👨‍🎓 Mode: Siswa SMA'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenShareLinks}
            className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-800 text-emerald-100 hover:bg-emerald-700 transition-colors border border-emerald-600 flex items-center gap-1"
            title="Buka dan salin tautan terpisah untuk Siswa dan Guru"
          >
            <Share2 className="w-3 h-3 text-emerald-300" />
            <span className="hidden sm:inline">Tautan Portal Terpisah</span>
            <span className="sm:hidden">Link</span>
          </button>
          <button
            onClick={onToggleRole}
            className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white text-emerald-950 hover:bg-emerald-100 transition-colors shadow-xs flex items-center gap-1"
            title="Klik untuk berpindah peran antara Guru dan Siswa"
          >
            <UserCheck className="w-3 h-3 text-emerald-700" />
            <span>Ganti ke {userRole === 'guru' ? 'Siswa' : 'Guru'}</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 max-w-7xl mx-auto">
        {/* Left: Brand & Status */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
            🌍
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                IPS Sosiologi Inklusif
              </h1>
              <span className="text-[10px] text-slate-500 hidden md:inline">
                · SMA Kelas XI
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <button
                onClick={onOpenPathwayModal}
                className="hover:underline text-emerald-700 font-medium flex items-center gap-1"
                title="Klik untuk mengganti jalur belajar"
              >
                {pathway === 'online' ? (
                  <>
                    <Wifi className="w-3 h-3 text-emerald-600" />
                    <span>Jalur Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3 h-3 text-amber-600" />
                    <span>Jalur Offline</span>
                  </>
                )}
              </button>
              {isOfflineSimulated && (
                <span className="text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded text-[10px] font-semibold flex items-center gap-0.5">
                  <WifiOff className="w-2.5 h-2.5" />
                  Sinyal Mati
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Center / Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Controls for Teacher */}
          {userRole === 'guru' && (
            <>
              <button
                onClick={onOpenTeacherUpload}
                className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold shadow-xs transition-colors"
                title="Unggah bahan belajar baru (YouTube, Gambar, PDF, Modul Teks)"
              >
                <Upload className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Upload Bahan</span>
              </button>
              {onOpenStudentManagement && (
                <button
                  onClick={onOpenStudentManagement}
                  className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-emerald-100 rounded-lg font-semibold shadow-xs transition-colors"
                  title="Tambah & kelola data siswa kelas"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">+ Data Siswa</span>
                </button>
              )}
              {onOpenResetModal && (
                <button
                  onClick={onOpenResetModal}
                  className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg font-semibold transition-colors"
                  title="Reset seluruh tugas dan jawaban siswa agar dapat dimulai dari awal"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">Reset Tugas</span>
                </button>
              )}
            </>
          )}

          {/* TTS Active Indicator */}
          {isSpeaking && (
            <button
              onClick={() => {
                stopSpeech();
                onStopSpeaking();
              }}
              className="flex items-center gap-1 text-xs px-2 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-md hover:bg-amber-100 animate-pulse"
              title="Klik untuk hentikan suara narasi"
            >
              <VolumeX className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Hentikan Suara</span>
            </button>
          )}

          {/* Stress Test Offline Switch (Week 5 UTS Requirement) */}
          <button
            onClick={onToggleOfflineSim}
            className={`flex items-center gap-1.5 text-xs px-2 sm:px-2.5 py-1.5 rounded-lg border font-medium transition-all ${
              isOfflineSimulated
                ? 'bg-amber-600 text-white border-amber-700 shadow-sm'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
            title="Uji simulasi stress test Tahap 13: Ketika internet putus di desa, apakah sistem tetap jalan?"
          >
            {isOfflineSimulated ? (
              <>
                <WifiOff className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Sinyal Putus</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden xs:inline">Uji Offline</span>
              </>
            )}
          </button>

          {/* Blueprint UTS Button */}
          <button
            onClick={onOpenBlueprint}
            className="flex items-center gap-1 text-xs px-2 sm:px-2.5 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors"
            title="Lihat Blueprint UDL Minggu ke-5 Kelompok 4"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden md:inline font-medium">Blueprint UTS</span>
          </button>

          {/* Device Mockup Toggle */}
          <button
            onClick={onToggleMockupView}
            className="p-1.5 sm:px-2 sm:py-1.5 text-xs rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-1"
            title={isMockupView ? 'Ganti ke Tampilan Penuh / Desktop' : 'Ganti ke Mockup Smartphone (seperti di foto ChatGPT)'}
          >
            {isMockupView ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden md:inline">Layar Penuh</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden md:inline">Mockup HP</span>
              </>
            )}
          </button>

          {/* Notifications */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
            title="Notifikasi & Pengingat"
            aria-label="Buka notifikasi"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
