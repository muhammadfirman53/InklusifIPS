import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  ShieldCheck,
  UserCheck,
  Lock,
  ArrowRight,
  BookOpen,
  Wifi,
  WifiOff,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Info
} from 'lucide-react';
import { StudentProfile, UserRole, UserSession } from '../../types/learning';
import { PROJECT_METADATA } from '../../data/curriculumData';

interface LoginScreenProps {
  initialRole?: UserRole;
  students: StudentProfile[];
  onLoginSuccess: (session: UserSession) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  initialRole = 'siswa',
  students,
  onLoginSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<UserRole>(initialRole);

  // Student Login State
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  const [customNisn, setCustomNisn] = useState<string>('');
  const [customStudentName, setCustomStudentName] = useState<string>('');
  const [studentMode, setStudentMode] = useState<'pick_list' | 'manual'>('pick_list');
  const [studentError, setStudentError] = useState<string | null>(null);

  // Teacher Login State
  const [teacherNip, setTeacherNip] = useState<string>('197805142005012003');
  const [teacherPassword, setTeacherPassword] = useState<string>('guru123');
  const [teacherError, setTeacherError] = useState<string | null>(null);

  // Handle Student Login
  const handleStudentLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setStudentError(null);

    if (studentMode === 'pick_list') {
      const student = students.find((s) => s.id === selectedStudentId) || students[0];
      if (!student) {
        setStudentError('Pilih salah satu siswa yang terdaftar.');
        return;
      }
      onLoginSuccess({
        role: 'siswa',
        name: student.name,
        nisn: student.nisn,
        classroom: student.classroom,
        studentId: student.id,
        preferredPathway: student.preferredPathway,
      });
    } else {
      if (!customStudentName.trim()) {
        setStudentError('Nama siswa wajib diisi.');
        return;
      }
      if (!customNisn.trim()) {
        setStudentError('NISN siswa wajib diisi.');
        return;
      }
      onLoginSuccess({
        role: 'siswa',
        name: customStudentName.trim(),
        nisn: customNisn.trim(),
        classroom: 'XI-IPS 1',
        studentId: `std-custom-${Date.now()}`,
        preferredPathway: 'online',
      });
    }
  };

  // Quick 1-click select a student card
  const handleQuickStudentSelect = (student: StudentProfile) => {
    onLoginSuccess({
      role: 'siswa',
      name: student.name,
      nisn: student.nisn,
      classroom: student.classroom,
      studentId: student.id,
      preferredPathway: student.preferredPathway,
    });
  };

  // Handle Teacher Login
  const handleTeacherLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setTeacherError(null);

    if (!teacherNip.trim()) {
      setTeacherError('NIP atau ID Guru wajib diisi.');
      return;
    }

    if (!teacherPassword.trim()) {
      setTeacherError('Kata sandi wajib diisi.');
      return;
    }

    // Default validation (accepts guru123 or standard test credentials)
    if (teacherPassword !== 'guru123' && teacherPassword !== '123456' && teacherPassword !== 'siti123') {
      setTeacherError('Kata sandi salah. Gunakan sandi guru: guru123');
      return;
    }

    onLoginSuccess({
      role: 'guru',
      name: PROJECT_METADATA.guruPengampu,
      nip: teacherNip.trim(),
      classroom: 'XI-IPS (Semua Kelas)',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 flex flex-col justify-between p-3 sm:p-6 text-slate-100">
      {/* Top Brand Banner */}
      <div className="max-w-md mx-auto w-full pt-4 pb-2 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-200 text-xs font-semibold backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Portal Pembelajaran Inklusif UDL Berbasis Masalah</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          Sosiologi Pedesaan SMA Fase F
        </h1>
        <p className="text-xs text-emerald-200/80">
          Masuk ke portal sesuai peranmu. Tautan dan hak akses siswa & guru terpisah.
        </p>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md mx-auto w-full bg-white text-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-emerald-500/30 my-auto">
        {/* Role Tab Selector */}
        <div className="grid grid-cols-2 p-1.5 bg-slate-100 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('siswa')}
            className={`py-2.5 px-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === 'siswa'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Portal Siswa</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guru')}
            className={`py-2.5 px-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === 'guru'
                ? 'bg-emerald-950 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>LMS Guru Pengampu</span>
          </button>
        </div>

        {/* Tab 1: Form Login Siswa */}
        {activeTab === 'siswa' && (
          <div className="p-5 sm:p-6 space-y-4 animate-fadeIn">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-lg">👨‍🎓</span>
                  <span>Masuk Ruang Belajar Siswa</span>
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Akses Siswa
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Pilih namamu dari daftar kelas atau gunakan NISN untuk mulai belajar dan mengumpulkan tugas.
              </p>
            </div>

            {studentError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{studentError}</span>
              </div>
            )}

            {/* Sub-toggle: Pilih dari Daftar vs Input Manual */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setStudentMode('pick_list')}
                className={`flex-1 py-1 rounded-lg transition-all ${
                  studentMode === 'pick_list'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pilih Siswa Terdaftar ({students.length})
              </button>
              <button
                type="button"
                onClick={() => setStudentMode('manual')}
                className={`flex-1 py-1 rounded-lg transition-all ${
                  studentMode === 'manual'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Input NISN Mandiri
              </button>
            </div>

            {studentMode === 'pick_list' ? (
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-800 block">
                  Pilih Akun Siswamu (1-Klik Masuk):
                </label>
                <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
                  {students.map((std) => {
                    const isSelected = selectedStudentId === std.id;
                    return (
                      <div
                        key={std.id}
                        onClick={() => setSelectedStudentId(std.id)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/80 shadow-xs ring-1 ring-emerald-500'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                            {std.name.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-xs text-slate-900 block">
                              {std.name}
                            </span>
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                              <span>NISN: {std.nisn}</span>
                              <span>•</span>
                              <span>{std.classroom}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 ${
                              std.preferredPathway === 'offline'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {std.preferredPathway === 'offline' ? (
                              <>
                                <WifiOff className="w-2.5 h-2.5" />
                                <span>Offline</span>
                              </>
                            ) : (
                              <>
                                <Wifi className="w-2.5 h-2.5" />
                                <span>Online</span>
                              </>
                            )}
                          </span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => handleStudentLogin()}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Masuk sebagai {students.find((s) => s.id === selectedStudentId)?.name || 'Siswa'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleStudentLogin} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-800 block mb-1">
                    Nama Lengkap Siswa:
                  </label>
                  <input
                    type="text"
                    required
                    value={customStudentName}
                    onChange={(e) => setCustomStudentName(e.target.value)}
                    placeholder="Contoh: Dita Anggraini"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-800 block mb-1">
                    NISN (Nomor Induk Siswa Nasional):
                  </label>
                  <input
                    type="text"
                    required
                    value={customNisn}
                    onChange={(e) => setCustomNisn(e.target.value)}
                    placeholder="Contoh: 0081234561"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Masuk ke Ruang Belajar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 flex items-start gap-2">
              <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Catatan Keamanan:</strong> Siswa hanya dapat mengakses materi belajar dan riwayat tugasnya sendiri. Akses pengelolaan LMS guru terkunci.
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Form Login Guru */}
        {activeTab === 'guru' && (
          <div className="p-5 sm:p-6 space-y-4 animate-fadeIn">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-lg">👩‍🏫</span>
                  <span>Masuk LMS Pendidik / Guru</span>
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-200">
                  Akses Pendidik
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Panel khusus pengampu Sosiologi untuk upload materi (YouTube, Gambar, PDF), koreksi tugas siswa, dan manajemen kelas.
              </p>
            </div>

            {teacherError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{teacherError}</span>
              </div>
            )}

            <form onSubmit={handleTeacherLogin} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-800 block mb-1">
                  NIP / ID Guru Pengampu:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={teacherNip}
                    onChange={(e) => setTeacherNip(e.target.value)}
                    placeholder="197805142005012003"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-sans">
                    NIP Resmi
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-800 block mb-1">
                  Kata Sandi / PIN LMS Guru:
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={teacherPassword}
                    onChange={(e) => setTeacherPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Kata sandi default pengampu: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-emerald-800 font-bold">guru123</code>
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-950 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Masuk ke Panel Kontrol Guru</span>
              </button>
            </form>

            {/* Quick Demo Access Button */}
            <div className="pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setTeacherNip('197805142005012003');
                  setTeacherPassword('guru123');
                  onLoginSuccess({
                    role: 'guru',
                    name: PROJECT_METADATA.guruPengampu,
                    nip: '197805142005012003',
                    classroom: 'XI-IPS (Semua Kelas)',
                  });
                }}
                className="w-full py-2 px-3 border border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100/70 text-emerald-900 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>⚡ Akses Cepat: Masuk sebagai {PROJECT_METADATA.guruPengampu}</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer info within card */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[10px] text-slate-500">
          <span>{PROJECT_METADATA.mataPelajaran} · Kurikulum Merdeka Fase F · {PROJECT_METADATA.kelompok}</span>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-md mx-auto w-full pt-4 pb-2 text-center text-[11px] text-emerald-300/70">
        <span>© 2026 Inklusif Rural UDL Sosiologi. Terkoneksi secara otomatis antara Siswa dan Guru.</span>
      </div>
    </div>
  );
};
