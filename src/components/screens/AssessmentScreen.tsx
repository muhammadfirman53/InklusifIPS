import React, { useState } from 'react';
import {
  Award,
  FileText,
  Image as ImageIcon,
  Presentation,
  Headphones,
  Video,
  CheckCircle,
  Upload,
  Info,
  Send,
  Volume2,
  ChevronDown,
  ChevronUp,
  Clock,
  Printer,
  Sparkles,
  UserCheck,
  CheckSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AssessmentProductType, SubmissionRecord, UserRole } from '../../types/learning';
import { RUBRIC_CRITERIA } from '../../data/curriculumData';
import { TeacherGradingPanel } from '../teacher/TeacherGradingPanel';

interface AssessmentScreenProps {
  userRole: UserRole;
  isOfflineSimulated: boolean;
  onSpeak: (text: string) => void;
  submissions: SubmissionRecord[];
  onSubmitTask: (submission: SubmissionRecord) => void;
  onUpdateSubmission: (updated: SubmissionRecord) => void;
  onOpenResetModal?: () => void;
  onOpenStudentManagement?: () => void;
}

export const AssessmentScreen: React.FC<AssessmentScreenProps> = ({
  userRole,
  isOfflineSimulated,
  onSpeak,
  submissions,
  onSubmitTask,
  onUpdateSubmission,
  onOpenResetModal,
  onOpenStudentManagement,
}) => {
  const [teacherViewMode, setTeacherViewMode] = useState<'penilaian' | 'pratinjau'>('penilaian');
  const [selectedProduct, setSelectedProduct] = useState<AssessmentProductType>('infografis');
  const [showRubricDetails, setShowRubricDetails] = useState<boolean>(false);
  const [submissionTitle, setSubmissionTitle] = useState<string>('');
  const [submissionText, setSubmissionText] = useState<string>('');
  const [submissionFile, setSubmissionFile] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const productOptions: {
    type: AssessmentProductType;
    title: string;
    description: string;
    icon: any;
    color: string;
  }[] = [
    {
      type: 'esai',
      title: 'Esai Analisis Ringkas',
      description: 'Tulisan analisis terstruktur, boleh lebih pendek dari 1.500 kata, fokus pada ketajaman solusi.',
      icon: FileText,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      type: 'infografis',
      title: 'Infografis / Poster',
      description: 'Format visual grafis yang menarik, memuat pohon masalah dan diagram alur solusi desa.',
      icon: ImageIcon,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      type: 'presentasi',
      title: 'Slide Presentasi',
      description: '3-5 slide PowerPoint/Canva atau lembar peraga presentasi lisan di depan kelas.',
      icon: Presentation,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      type: 'audio',
      title: 'Audio / Podcast',
      description: 'Rekaman suara penjelasan (maksimal 10 menit), cocok jika kamu lebih nyaman bercerita lisan.',
      icon: Headphones,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      type: 'video',
      title: 'Video Singkat',
      description: 'Video pengamatan lapangan atau rekaman presentasi (maksimal 10 menit).',
      icon: Video,
      color: 'bg-rose-50 text-rose-700 border-rose-200',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionTitle.trim()) {
      setSuccessToast('Mohon isi judul karya tugasmu terlebih dahulu.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newSubmission: SubmissionRecord = {
        id: `sub-${Date.now()}`,
        studentName: 'Dita Anggraini',
        productType: selectedProduct,
        title: submissionTitle.trim(),
        contentOrNote:
          submissionText.trim() ||
          `Karya ${selectedProduct} berhasil dikumpulkan melalui portal LMS Inklusif.`,
        submittedAt: 'Baru saja',
        status: isOfflineSimulated ? 'tersimpan_offline' : 'terkirim_online',
      };

      onSubmitTask(newSubmission);
      setIsSubmitting(false);

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // ignore
      }

      setSuccessToast(
        isOfflineSimulated
          ? 'Tugas disimpan di HP (Offline Queue). Akan otomatis sinkron saat ada internet!'
          : 'Selamat! Tugasmu berhasil dikirim secara online ke Bu Guru Siti.'
      );

      setSubmissionTitle('');
      setSubmissionText('');
      setTimeout(() => setSuccessToast(null), 4000);
    }, 600);
  };

  return (
    <div className="space-y-4 pb-20 max-w-2xl mx-auto">
      {/* Toast */}
      {successToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-emerald-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 max-w-md w-11/12 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-emerald-300 shrink-0" />
          <span className="flex-1">{successToast}</span>
        </div>
      )}

      {/* Teacher Role Top Navigation Banner */}
      {userRole === 'guru' && (
        <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <span>👩‍🏫</span>
              <span>Menu Asesmen & Evaluasi Guru</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              Mode Guru Aktif
            </span>
          </div>
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setTeacherViewMode('penilaian')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all text-center ${
                teacherViewMode === 'penilaian'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📋 Nilai Tugas Siswa Masuk ({submissions.length})
            </button>
            <button
              onClick={() => setTeacherViewMode('pratinjau')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all text-center ${
                teacherViewMode === 'pratinjau'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              👁️ Pratinjau Form Siswa
            </button>
          </div>
        </div>
      )}

      {/* If Guru in Penilaian View */}
      {userRole === 'guru' && teacherViewMode === 'penilaian' ? (
        <TeacherGradingPanel
          submissions={submissions}
          onUpdateSubmission={onUpdateSubmission}
          onOpenResetModal={onOpenResetModal}
          onOpenStudentManagement={onOpenStudentManagement}
          onSpeak={onSpeak}
        />
      ) : (
        <>
          {/* Header Info */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Pilihan Produk Asesmen (UDL)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Pilih format karya yang paling sesuai dengan bakat dan potensimu
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  onSpeak(
                    'Pilihan Produk Asesmen. Kamu bebas memilih format esai, infografis poster, slide presentasi, rekaman audio podcast, atau video pendek. Semua dinilai dengan rubrik kompetensi yang sama persis.'
                  )
                }
                className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                title="Dengarkan pembacaan teks suara"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Prinsip UDL Action & Expression: Tujuan penilaian sama (analisis masalah sosial, penyebab, dampak, solusi), namun media ekspresi dapat disesuaikan.
            </p>
          </div>

      {/* 5 Product Choices matching mockup Screen 7 */}
      <div className="space-y-2.5">
        {productOptions.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selectedProduct === opt.type;
          return (
            <div
              key={opt.type}
              onClick={() => setSelectedProduct(opt.type)}
              className={`p-3.5 sm:p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50/40 shadow-sm ring-1 ring-emerald-500/20'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${opt.color}`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    {opt.title}
                  </h3>
                  {isSelected && (
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      <span>Dipilih</span>
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {opt.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rubrik Terpadu Accordion matching mockup "Gunakan rubrik yang sama untuk semua format" */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <button
          onClick={() => setShowRubricDetails(!showRubricDetails)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Rubrik Penilaian Kompetensi Terpadu
              </h3>
              <p className="text-[11px] text-slate-500">
                Transparan: Bobot 100% berlaku sama untuk seluruh format
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
            <span>{showRubricDetails ? 'Tutup' : 'Lihat Detail'}</span>
            {showRubricDetails ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </button>

        {showRubricDetails && (
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {RUBRIC_CRITERIA.map((crit) => (
                <div
                  key={crit.id}
                  className="p-3 bg-white border border-slate-200 rounded-xl space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">
                      {crit.name}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      Bobot {crit.weight}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">{crit.description}</p>
                  <p className="text-[10px] text-emerald-900 font-medium pt-1 border-t border-slate-100">
                    Kriteria Sangat Baik: {crit.exemplarCriteria.sangatBaik}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-2.5 bg-emerald-100/70 border border-emerald-200 rounded-xl text-[11px] text-emerald-950 flex items-center justify-between">
              <span>Total Bobot: 25% + 25% + 20% + 20% + 10% = 100%</span>
              <span className="font-bold">Standar Kompetensi Adil</span>
            </div>
          </div>
        )}
      </div>

      {/* Submission Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3.5 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Upload className="w-4 h-4 text-emerald-600" />
            <span>Kumpulkan Tugas ({selectedProduct.toUpperCase()})</span>
          </h3>
          <span className="text-[11px] text-slate-500">
            Siswa: Dita Anggraini (XI IPS)
          </span>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-700 block">
            Judul Karya Tugas:
          </label>
          <input
            type="text"
            required
            value={submissionTitle}
            onChange={(e) => setSubmissionTitle(e.target.value)}
            placeholder="Contoh: Analisis Masalah Sampah Sungai Desa Sukamaju & Solusi Bank Sampah"
            className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-700 block">
            Isi / Ringkasan Analisis / Catatan Tugas:
          </label>
          <textarea
            rows={3}
            value={submissionText}
            onChange={(e) => setSubmissionText(e.target.value)}
            placeholder="Tuliskan poin-poin hasil karyamu di sini atau deskripsi berkas yang kamu bawa..."
            className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          />
        </div>

        {/* Upload attachment simulation */}
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-3 text-center bg-slate-50/70 hover:bg-slate-50 transition-colors cursor-pointer">
          <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
          <div className="text-xs font-semibold text-slate-700">
            Pilih Berkas ({selectedProduct === 'esai' ? 'PDF/DOCX' : selectedProduct === 'infografis' ? 'JPG/PNG' : selectedProduct === 'audio' ? 'MP3/M4A' : selectedProduct === 'video' ? 'MP4/MKV' : 'PPTX/PDF'})
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Batas ukuran hemat memori: maks 25 MB (Bisa juga diserahkan via flashdisk di sekolah)
          </p>
        </div>

        {isOfflineSimulated && (
          <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Sedang mode offline: Tugas akan diamankan di penyimpanan lokal HP dan otomatis dikirim saat ada sinyal.
            </span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span>Memproses Tugas...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>
                {isOfflineSimulated
                  ? 'Simpan Tugas di HP (Offline)'
                  : 'Kirim Tugas Sekarang'}
              </span>
            </>
          )}
        </button>
      </form>

          {/* Riwayat Tugas Dikumpulkan */}
          {submissions.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-sm">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Riwayat Tugas Terkumpul
              </h3>
              <div className="space-y-2">
                {submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{sub.title}</span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          sub.status === 'tersimpan_offline'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {sub.status === 'tersimpan_offline'
                          ? 'Antrean Offline'
                          : 'Terkirim Online'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-2">
                      {sub.contentOrNote}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200">
                      <span className="capitalize">Format: {sub.productType}</span>
                      <span>{sub.submittedAt}</span>
                    </div>
                    {sub.feedback && (
                      <div className="mt-1.5 p-2 bg-emerald-50/70 border border-emerald-200 rounded-lg text-[11px] text-emerald-900">
                        <span className="font-bold">Umpan Balik Guru ({sub.grade}/100):</span> {sub.feedback}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
