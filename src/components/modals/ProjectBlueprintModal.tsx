import React from 'react';
import { FileText, CheckCircle2, ShieldAlert, Cpu, Sparkles, X, Layers, Users } from 'lucide-react';
import { PROJECT_METADATA } from '../../data/curriculumData';

interface ProjectBlueprintModalProps {
  onClose: () => void;
}

export const ProjectBlueprintModal: React.FC<ProjectBlueprintModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-emerald-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center">
              <FileText className="w-4 h-4 text-emerald-200" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                WORKSHEET PROYEK UTS — MINGGU 5
              </h3>
              <p className="text-xs text-emerald-200">
                Inclusive Learning System: Blueprint & Prototype (Kelompok 4)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-800 flex items-center justify-center font-bold text-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs text-slate-700 leading-relaxed">
          {/* Section A: Identitas Isian */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2 text-emerald-800">
              <Users className="w-4 h-4" />
              <span>A. Identitas Kelompok & Konteks Pembelajaran</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 pt-1">
              <div>
                <span className="font-semibold text-slate-800">Kelompok:</span> {PROJECT_METADATA.kelompok}
              </div>
              <div>
                <span className="font-semibold text-slate-800">Konteks:</span> {PROJECT_METADATA.konteks}
              </div>
              <div className="sm:col-span-2">
                <span className="font-semibold text-slate-800">Anggota:</span> 1. Muhamad Firman, 2. Erlangga Setyawan, 3. Abang Julianto, 4. Albertus Hary Usna
              </div>
              <div className="sm:col-span-2">
                <span className="font-semibold text-slate-800">Topik Sosiologi:</span> {PROJECT_METADATA.topik}
              </div>
            </div>
          </div>

          {/* Section B: Peta Strategi Low, Mid, High Tech (Tahap 11) */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm text-emerald-800">
              Tahap 11. Peta Strategi Low-Tech, Mid-Tech, dan High-Tech
            </h4>
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-800 font-bold">
                  <tr>
                    <th className="p-2.5">Komponen</th>
                    <th className="p-2.5">Low-Tech</th>
                    <th className="p-2.5">Mid-Tech</th>
                    <th className="p-2.5">High-Tech</th>
                    <th className="p-2.5">Pilihan Utama</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-800">Akses Materi</td>
                    <td className="p-2.5">Modul cetak + LKPD</td>
                    <td className="p-2.5">PDF ringan / file unduhan</td>
                    <td className="p-2.5">LMS + video streaming</td>
                    <td className="p-2.5 font-bold text-emerald-700">Low + Mid (High opsi)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-800">Representasi</td>
                    <td className="p-2.5">Ringkasan, infografis</td>
                    <td className="p-2.5">PDF ringan + video pendek + audio</td>
                    <td className="p-2.5">LMS multimedia</td>
                    <td className="p-2.5 font-bold text-emerald-700">Mid-Tech</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-800">Action & Expression</td>
                    <td className="p-2.5">Poster cetak / presentasi lisan</td>
                    <td className="p-2.5">Infografis digital / audio podcast</td>
                    <td className="p-2.5">Video / presentasi digital</td>
                    <td className="p-2.5 font-bold text-emerald-700">Low + Mid (High pilihan)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-800">Interaksi</td>
                    <td className="p-2.5">Diskusi tatap muka</td>
                    <td className="p-2.5">Forum LMS / WhatsApp</td>
                    <td className="p-2.5">Aktivitas kolaboratif digital</td>
                    <td className="p-2.5 font-bold text-emerald-700">Low + Mid</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section C: Stress Test (Tahap 13) */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm text-amber-800 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Tahap 13. Stress Test – Jika Teknologi Gagal di Lingkungan Rural</span>
            </h4>
            <div className="space-y-2 text-[11px]">
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
                <span className="font-bold text-amber-950">1. Internet Sangat Lambat / Putus:</span>
                <p className="text-amber-900">
                  Plan A: File yang sudah diunduh/offline (Modul PDF, transkrip teks, audio).<br />
                  Plan B: Modul cetak + LKPD + diskusi tatap muka. Bukti kompetensi tetap tercapai.
                </p>
              </div>
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
                <span className="font-bold text-amber-950">2. Listrik Padam di Pedesaan:</span>
                <p className="text-amber-900">
                  Plan A & B: LKPD cetak + presentasi lisan di sekolah tanpa ketergantungan layar digital.
                </p>
              </div>
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
                <span className="font-bold text-amber-950">3. Hanya Tersedia Smartphone & Kuota Terbatas:</span>
                <p className="text-amber-900">
                  Platform responsif vertikal, video terkompresi di bawah 10 MB dilengkapi CC, audio di bawah 4 MB, serta paket unduhan all-in-one.
                </p>
              </div>
            </div>
          </div>

          {/* Section D: Jawaban Reflektif Tahap 14 */}
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-[11px] text-emerald-950 space-y-1.5">
            <span className="font-bold text-emerald-900 text-xs block">
              Refleksi Filosofis UDL (Tahap 14):
            </span>
            <p className="italic leading-relaxed">
              « Teknologi yang dipilih dirancang untuk mengurangi hambatan, bukan memindahkannya. Contohnya, video 45 menit yang wajib streaming diubah menjadi materi 3–5 menit yang dapat diunduh, dilengkapi caption/transkrip, serta memiliki alternatif teks/audio. Dengan demikian, konektivitas dan hambatan pendengaran tidak menjadi syarat tersembunyi untuk mencapai kompetensi sosiologi. »
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Prototipe V1 Terverifikasi Sesuai Rubrik UTS UDL
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-colors"
          >
            Tutup Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
