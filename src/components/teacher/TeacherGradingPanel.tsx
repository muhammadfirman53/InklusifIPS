import React, { useState } from 'react';
import {
  Award,
  CheckCircle,
  Clock,
  MessageSquare,
  FileText,
  User,
  Sliders,
  Sparkles,
  Save,
  Check,
  ChevronRight,
  Send,
  Eye,
  RotateCcw,
  Users,
  AlertCircle
} from 'lucide-react';
import { SubmissionRecord, RubricCriterion } from '../../types/learning';
import { RUBRIC_CRITERIA } from '../../data/curriculumData';

interface TeacherGradingPanelProps {
  submissions: SubmissionRecord[];
  onUpdateSubmission: (updated: SubmissionRecord) => void;
  onOpenResetModal?: () => void;
  onOpenStudentManagement?: () => void;
  onSpeak: (text: string) => void;
}

export const TeacherGradingPanel: React.FC<TeacherGradingPanelProps> = ({
  submissions,
  onUpdateSubmission,
  onOpenResetModal,
  onOpenStudentManagement,
  onSpeak,
}) => {
  const [selectedSub, setSelectedSub] = useState<SubmissionRecord | null>(
    submissions.find((s) => !s.grade) || submissions[0] || null
  );

  // Scores state
  const [scores, setScores] = useState<Record<string, number>>({
    identifikasi: 22,
    penyebab: 23,
    dampak: 18,
    solusi: 19,
    komunikasi: 9,
  });

  const [feedbackText, setFeedbackText] = useState<string>(
    'Analisis kontekstual sangat baik! Usulan alternatif solusi pemilahan sampah sudah sangat selaras dengan kearifan gotong royong warga desa.'
  );

  const [saveSuccess, setSaveSuccess] = useState(false);

  // Calculate total score
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  const handleSelectSubmission = (sub: SubmissionRecord) => {
    setSelectedSub(sub);
    if (sub.grade) {
      setFeedbackText(sub.feedback || '');
    } else {
      setFeedbackText('');
    }
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;

    const updated: SubmissionRecord = {
      ...selectedSub,
      grade: totalScore,
      feedback:
        feedbackText.trim() ||
        `Nilai kompetensi terpadu: ${totalScore}/100. Pilihan produk ${selectedSub.productType} dieksekusi dengan baik.`,
    };

    onUpdateSubmission(updated);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="bg-emerald-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white">
                  Penilaian & Umpan Balik Guru (Dra. Siti Rahayu, M.Pd)
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-800 text-emerald-200 rounded-full border border-emerald-700">
                  {submissions.filter((s) => s.grade).length} / {submissions.length} Dinilai
                </span>
              </div>
              <p className="text-[11px] text-emerald-200">
                Gunakan rubrik kompetensi terpadu yang sama untuk semua pilihan karya siswa
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            {onOpenStudentManagement && (
              <button
                type="button"
                onClick={onOpenStudentManagement}
                className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl border border-emerald-600 flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Users className="w-3.5 h-3.5" />
                <span>+ Data Siswa</span>
              </button>
            )}

            {onOpenResetModal && (
              <button
                type="button"
                onClick={onOpenResetModal}
                className="px-3 py-1.5 bg-red-600/90 hover:bg-red-600 text-white font-bold text-xs rounded-xl border border-red-400 flex items-center gap-1.5 transition-colors shadow-xs"
                title="Reset seluruh tugas siswa agar bisa dimulai dari awal"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Jawaban Siswa</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">
              Semua Tugas & Jawaban Siswa Telah Direset!
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Saat ini belum ada tugas yang terkumpul. Siswa dapat mulai mengumpulkan tugas esai, infografis, video, presentasi, atau podcast dari awal.
            </p>
          </div>
          <div className="pt-2 flex items-center justify-center gap-2">
            {onOpenStudentManagement && (
              <button
                onClick={onOpenStudentManagement}
                className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl"
              >
                + Tambah & Pantau Siswa
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Main Layout: List of Submissions & Active Grading Form */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Left Column: Submissions Queue */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-800 block">
            Daftar Tugas Siswa:
          </span>
          <div className="space-y-1.5 max-h-[500px] overflow-y-auto">
            {submissions.map((sub) => {
              const isSelected = selectedSub?.id === sub.id;
              return (
                <div
                  key={sub.id}
                  onClick={() => handleSelectSubmission(sub)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all text-xs ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-500'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">
                      {sub.studentName}
                    </span>
                    {sub.grade !== undefined ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                        Nilai: {sub.grade}
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5" />
                        <span>Belum Dinilai</span>
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium truncate">
                    {sub.title}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                    <span className="uppercase text-emerald-800 font-semibold">
                      {sub.productType}
                    </span>
                    <span>{sub.submittedAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Grading Details & Rubric Scoring */}
        {selectedSub && (
          <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-4">
            {/* Student & Product Preview */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Format: {selectedSub.productType}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                    {selectedSub.title}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-800 block">
                    {selectedSub.studentName}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {selectedSub.submittedAt}
                  </span>
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed">
                <span className="font-semibold text-slate-500 text-[10px] block mb-0.5">
                  Isi Tugas / Ringkasan Analisis Siswa:
                </span>
                {selectedSub.contentOrNote}
              </div>
            </div>

            {/* Rubric Evaluation Form */}
            <form onSubmit={handleSaveGrade} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">
                  Form Penilaian Berdasarkan 5 Kriteria UDL:
                </span>
                <div className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg">
                  Total Nilai: {totalScore} / 100
                </div>
              </div>

              <div className="space-y-2 text-xs">
                {RUBRIC_CRITERIA.map((crit) => {
                  const currentScore = scores[crit.id] || 0;
                  return (
                    <div
                      key={crit.id}
                      className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-800 text-[11px]">
                          {crit.name} (Maks. {crit.weight} Poin)
                        </span>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="range"
                            min={0}
                            max={crit.weight}
                            value={currentScore}
                            onChange={(e) =>
                              setScores({
                                ...scores,
                                [crit.id]: Number(e.target.value),
                              })
                            }
                            className="w-24 accent-emerald-600"
                          />
                          <span className="font-bold text-emerald-800 w-8 text-right text-xs">
                            {currentScore}
                          </span>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        {crit.exemplarCriteria.sangatBaik}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Constructive Qualitative Feedback */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-800 block">
                  Umpan Balik Kualitatif Guru untuk Siswa:
                </label>
                <textarea
                  rows={3}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Berikan umpan balik yang membangun, apresiasi pilihan formatnya, dan saran perbaikan..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Nilai & Umpan Balik Berhasil Disimpan!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Simpan Nilai ({totalScore}/100) & Kirim ke Siswa</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
      )}
    </div>
  );
};
