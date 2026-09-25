import React, { useState } from 'react';
import {
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  X,
  Trash2,
  FileCheck,
  RefreshCw,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

interface ResetConfirmationModalProps {
  onConfirmReset: (mode: 'clear_all' | 'restore_defaults') => void;
  onClose: () => void;
}

export const ResetConfirmationModal: React.FC<ResetConfirmationModalProps> = ({
  onConfirmReset,
  onClose,
}) => {
  const [selectedMode, setSelectedMode] = useState<'clear_all' | 'restore_defaults'>('clear_all');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleExecuteReset = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onConfirmReset(selectedMode);
      setIsProcessing(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col border border-red-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-red-200 bg-red-50 text-red-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-xs">
              <RotateCcw className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-red-950">
                Reset Jawaban & Tugas Siswa
              </h3>
              <p className="text-[11px] text-red-800">
                Fitur Guru untuk memulai pembelajaran dari awal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full text-red-700 hover:text-red-950 hover:bg-red-200 flex items-center justify-center font-bold text-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-4 text-xs">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-amber-950">
                Perhatian untuk Pendidik:
              </p>
              <p className="text-[11px] leading-relaxed text-amber-900">
                Mereset data akan mengosongkan seluruh kiriman produk asesmen siswa, menghapus centang aktivitas yang sudah selesai, dan mereset nilai agar siswa atau kelas baru dapat mengerjakan tugas dari awal.
              </p>
            </div>
          </div>

          {/* Mode Choice */}
          <div className="space-y-2">
            <label className="font-bold text-slate-800 block">
              Pilih Tindakan Reset:
            </label>

            {/* Option 1: Bersihkan Total */}
            <div
              onClick={() => setSelectedMode('clear_all')}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                selectedMode === 'clear_all'
                  ? 'border-red-500 bg-red-50/60'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 mt-0.5 flex items-center justify-center ${
                  selectedMode === 'clear_all'
                    ? 'border-red-600 bg-red-600 text-white'
                    : 'border-slate-300'
                }`}
              >
                {selectedMode === 'clear_all' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 block text-xs">
                  Kosongkan Total Semua Tugas & Jawaban (Mulai dari Nol)
                </span>
                <span className="text-[11px] text-slate-500 block leading-snug">
                  Menghapus semua tugas terkirim (0 tugas) dan mereset status 3 aktivitas LKPD menjadi belum selesai (0% progres). Cocok untuk kelas baru.
                </span>
              </div>
            </div>

            {/* Option 2: Kembalikan Default Contoh */}
            <div
              onClick={() => setSelectedMode('restore_defaults')}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                selectedMode === 'restore_defaults'
                  ? 'border-emerald-600 bg-emerald-50/60'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 mt-0.5 flex items-center justify-center ${
                  selectedMode === 'restore_defaults'
                    ? 'border-emerald-600 bg-emerald-600 text-white'
                    : 'border-slate-300'
                }`}
              >
                {selectedMode === 'restore_defaults' && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 block text-xs">
                  Reset & Kembalikan ke Contoh Data Sampel Bawaan
                </span>
                <span className="text-[11px] text-slate-500 block leading-snug">
                  Mengembalikan 4 contoh tugas siswa (Dita, Siti, Raka, Budi) untuk keperluan simulasi penilaian guru.
                </span>
              </div>
            </div>
          </div>

          {/* Checklist Confirmation */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
            <input
              type="checkbox"
              id="confirm-reset"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
            />
            <label htmlFor="confirm-reset" className="text-[11px] text-slate-700 cursor-pointer font-medium">
              Saya mengonfirmasi untuk mereset seluruh pengerjaan tugas siswa.
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-slate-600 hover:bg-slate-200 rounded-xl text-xs font-medium"
          >
            Batal
          </button>
          <button
            type="button"
            disabled={!confirmed || isProcessing}
            onClick={handleExecuteReset}
            className={`px-4 py-2 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all ${
              confirmed && !isProcessing
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
            <span>{isProcessing ? 'Memproses Reset...' : 'Eksekusi Reset Sekarang'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
