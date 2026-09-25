import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Check,
  X,
  Trash2,
  Wifi,
  WifiOff,
  BookOpen,
  Award,
  Sparkles,
  GraduationCap,
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import { StudentProfile, LearningPathway } from '../../types/learning';

interface StudentManagementModalProps {
  students: StudentProfile[];
  onAddStudent: (student: StudentProfile) => void;
  onDeleteStudent: (studentId: string) => void;
  onSelectActiveStudent?: (student: StudentProfile) => void;
  activeStudentId?: string;
  onClose: () => void;
}

export const StudentManagementModal: React.FC<StudentManagementModalProps> = ({
  students,
  onAddStudent,
  onDeleteStudent,
  onSelectActiveStudent,
  activeStudentId,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [nisn, setNisn] = useState('');
  const [classroom, setClassroom] = useState('XI-IPS 1');
  const [preferredPathway, setPreferredPathway] = useState<LearningPathway>('offline');
  const [specialNotes, setSpecialNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nisn.includes(searchQuery) ||
      s.classroom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      setFormError('Nama lengkap siswa wajib diisi.');
      return;
    }

    if (!nisn.trim()) {
      setFormError('Nomor Induk Siswa Nasional (NISN) wajib diisi.');
      return;
    }

    const newStudent: StudentProfile = {
      id: `std-${Date.now()}`,
      name: name.trim(),
      nisn: nisn.trim(),
      classroom: classroom.trim() || 'XI-IPS 1',
      preferredPathway,
      specialNeedsOrNotes:
        specialNotes.trim() ||
        (preferredPathway === 'offline'
          ? 'Memprioritaskan paket belajar hemat kuota dan materi unduhan offline.'
          : 'Pembelajar visual & audio melalui jalur internet online.'),
      completedActivities: 0,
      totalSubmissions: 0,
      joinedAt: 'Baru saja ditambahkan',
    };

    onAddStudent(newStudent);
    setSuccessToast(`Siswa "${newStudent.name}" berhasil ditambahkan ke kelas!`);
    setTimeout(() => setSuccessToast(null), 2500);

    // Reset Form
    setName('');
    setNisn('');
    setSpecialNotes('');
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] shadow-2xl overflow-hidden flex flex-col border border-emerald-950/20">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-emerald-800/20 bg-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
              <Users className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Kelola & Tambah Siswa Kelas
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-800 text-emerald-200">
                  {students.length} Siswa Terdaftar
                </span>
              </div>
              <p className="text-[11px] text-emerald-200">
                Pendidik dapat mendaftarkan siswa baru, memantau preferensi UDL, dan status pengerjaan tugas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-800 flex items-center justify-center font-bold text-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action bar & Search */}
        <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, NISN, atau kelas..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className={`w-full sm:w-auto px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs ${
                showAddForm
                  ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  : 'bg-emerald-700 text-white hover:bg-emerald-800'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{showAddForm ? 'Tutup Formulir' : '+ Tambah Siswa Baru'}</span>
            </button>
          </div>
        </div>

        {/* Toast */}
        {successToast && (
          <div className="bg-emerald-800 text-white text-xs px-4 py-2 flex items-center justify-center gap-2 shadow-xs">
            <Check className="w-4 h-4 text-emerald-300" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
          {/* Form Add Student */}
          {showAddForm && (
            <form
              onSubmit={handleSubmit}
              className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-3 animate-fadeIn"
            >
              <div className="flex items-center justify-between border-b border-emerald-200/70 pb-2">
                <span className="font-bold text-emerald-950 flex items-center gap-1.5 text-xs sm:text-sm">
                  <UserPlus className="w-4 h-4 text-emerald-700" />
                  <span>Formulir Pendaftaran Siswa Baru</span>
                </span>
                <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-semibold">
                  Prinsip Inklusif UDL
                </span>
              </div>

              {formError && (
                <div className="p-2.5 bg-red-100 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Nama Lengkap Siswa:
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Ahmad Fauzan"
                    className="w-full p-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    NISN (Nomor Induk Siswa Nasional):
                  </label>
                  <input
                    type="text"
                    required
                    value={nisn}
                    onChange={(e) => setNisn(e.target.value)}
                    placeholder="Contoh: 0089876543"
                    className="w-full p-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Kelas:
                  </label>
                  <select
                    value={classroom}
                    onChange={(e) => setClassroom(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="XI-IPS 1">XI-IPS 1 (Kelas Sosiologi A)</option>
                    <option value="XI-IPS 2">XI-IPS 2 (Kelas Sosiologi B)</option>
                    <option value="XI-IPS 3">XI-IPS 3 (Kelas Sosiologi C)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Preferensi Jalur Belajar Siswa:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPreferredPathway('offline')}
                      className={`p-2 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-semibold ${
                        preferredPathway === 'offline'
                          ? 'border-emerald-600 bg-emerald-600 text-white'
                          : 'border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <WifiOff className="w-3.5 h-3.5" />
                      <span>Jalur Offline</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreferredPathway('online')}
                      className={`p-2 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-semibold ${
                        preferredPathway === 'online'
                          ? 'border-emerald-600 bg-emerald-600 text-white'
                          : 'border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <Wifi className="w-3.5 h-3.5" />
                      <span>Jalur Online</span>
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  Catatan Kebutuhan Belajar / Karakteristik Siswa (UDL):
                </label>
                <textarea
                  rows={2}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="Contoh: Keterbatasan sinyal internet di tempat tinggal; lebih nyaman menggunakan rekaman suara / transkrip teks."
                  className="w-full p-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Simpan Siswa</span>
                </button>
              </div>
            </form>
          )}

          {/* Student List */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Daftar Siswa ({filteredStudents.length} ditemukan)</span>
              <span className="text-[11px] text-slate-400">
                Pilih siswa untuk melihat profil atau simulasi
              </span>
            </div>

            {filteredStudents.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 space-y-2">
                <Users className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs">Tidak ada data siswa yang cocok dengan pencarian.</p>
              </div>
            ) : (
              filteredStudents.map((std) => {
                const isActive = activeStudentId === std.id;
                return (
                  <div
                    key={std.id}
                    className={`bg-white rounded-2xl border p-3.5 sm:p-4 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                      isActive
                        ? 'border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-lg shrink-0 mt-0.5">
                        {std.name.charAt(0)}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                            {std.name}
                          </h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                            NISN: {std.nisn}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 bg-blue-50 text-blue-800 rounded">
                            {std.classroom}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                              std.preferredPathway === 'offline'
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-emerald-100 text-emerald-900'
                            }`}
                          >
                            {std.preferredPathway === 'offline' ? (
                              <>
                                <WifiOff className="w-3 h-3" />
                                <span>Jalur Offline</span>
                              </>
                            ) : (
                              <>
                                <Wifi className="w-3 h-3" />
                                <span>Jalur Online</span>
                              </>
                            )}
                          </span>
                        </div>

                        {std.specialNeedsOrNotes && (
                          <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                            {std.specialNeedsOrNotes}
                          </p>
                        )}

                        <div className="flex items-center gap-3 text-[10px] text-slate-400 pt-0.5">
                          <span>Aktivitas tuntas: {std.completedActivities}/3</span>
                          <span>•</span>
                          <span>Tugas terkirim: {std.totalSubmissions}</span>
                          <span>•</span>
                          <span>Terdaftar: {std.joinedAt}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {onSelectActiveStudent && (
                        <button
                          type="button"
                          onClick={() => onSelectActiveStudent(std)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                            isActive
                              ? 'bg-emerald-700 text-white'
                              : 'bg-slate-100 text-slate-700 hover:bg-emerald-100 hover:text-emerald-800'
                          }`}
                        >
                          {isActive ? '✓ Siswa Aktif' : 'Pilih Siswa'}
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Hapus data siswa "${std.name}"?`)) {
                            onDeleteStudent(std.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus siswa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <GraduationCap className="w-4 h-4 text-emerald-700" />
            <span>Data tersimpan di penyimpanan lokal browser portal guru</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs rounded-xl"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
