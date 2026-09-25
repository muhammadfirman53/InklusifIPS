import React from 'react';
import { Wifi, WifiOff, CheckCircle2, ArrowRight } from 'lucide-react';
import { LearningPathway } from '../../types/learning';

interface PathwayModalProps {
  currentPathway: LearningPathway;
  onSelectPathway: (pathway: LearningPathway) => void;
  onClose: () => void;
}

export const PathwayModal: React.FC<PathwayModalProps> = ({
  currentPathway,
  onSelectPathway,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Pilih Jalur Belajarmu
            </h3>
            <p className="text-xs text-slate-500">
              Sesuaikan dengan kondisi internet dan gawaimu saat ini
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-3.5">
          {/* Option 1: Jalur Online */}
          <div
            onClick={() => {
              onSelectPathway('online');
              onClose();
            }}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              currentPathway === 'online'
                ? 'border-emerald-600 bg-emerald-50/60 shadow-xs'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Wifi className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm text-slate-900">
                  Jalur Online
                </span>
              </div>
              {currentPathway === 'online' && (
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Aktif
                </span>
              )}
            </div>

            <ul className="space-y-1.5 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Streaming video interaktif & transkrip berjalan</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Diskusi langsung di forum kelas digital</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Kirim tugas langsung ke sistem</span>
              </li>
            </ul>
          </div>

          {/* Option 2: Jalur Offline */}
          <div
            onClick={() => {
              onSelectPathway('offline');
              onClose();
            }}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              currentPathway === 'offline'
                ? 'border-amber-600 bg-amber-50/60 shadow-xs'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <WifiOff className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm text-slate-900">
                  Jalur Offline (Rekomendasi Rural)
                </span>
              </div>
              {currentPathway === 'offline' && (
                <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                  Aktif
                </span>
              )}
            </div>

            <ul className="space-y-1.5 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Unduh seluruh paket materi sekali (±50 MB)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Belajar tanpa khawatir sinyal putus di desa</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Kumpulkan tugas di sekolah / saat tersambung WiFi</span>
              </li>
            </ul>
          </div>

          <p className="text-[11px] text-slate-500 text-center italic pt-1">
            *Kedua jalur memiliki materi dan rubrik penilaian yang sama persis.
          </p>
        </div>
      </div>
    </div>
  );
};
