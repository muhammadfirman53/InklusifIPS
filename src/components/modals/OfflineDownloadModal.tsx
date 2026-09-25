import React, { useState } from 'react';
import { Download, CheckCircle, WifiOff, HardDrive, Check, AlertCircle } from 'lucide-react';
import { ASSET_IMAGES } from '../../assets/images';

interface OfflineDownloadModalProps {
  onClose: () => void;
  onDownloadedAll: () => void;
}

export const OfflineDownloadModal: React.FC<OfflineDownloadModalProps> = ({
  onClose,
  onDownloadedAll,
}) => {
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const startDownloadAll = () => {
    setDownloadProgress(10);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null) return 10;
        if (prev >= 100) {
          clearInterval(interval);
          setIsCompleted(true);
          onDownloadedAll();
          return 100;
        }
        return prev + 25;
      });
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4 text-emerald-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Unduh untuk Belajar Offline
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold text-xs"
          >
            ✕
          </button>
        </div>

        {/* Body matching mockup Screen "Unduh untuk Belajar Offline" */}
        <div className="p-5 text-center space-y-4">
          {/* Illustration */}
          <div className="w-36 h-36 mx-auto rounded-2xl overflow-hidden bg-emerald-50 border border-emerald-100 shadow-xs flex items-center justify-center">
            <img
              src={ASSET_IMAGES.offlineStudent}
              alt="Ilustrasi belajar offline dengan smartphone"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = ASSET_IMAGES.heroStudents;
              }}
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-1">
            <h4 className="text-base font-bold text-slate-900">
              Unduh Materi Sekarang
            </h4>
            <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
              Pelajari kapan saja di rumah tanpa perlu koneksi internet ataupun khawatir kehabisan kuota data.
            </p>
          </div>

          {/* Breakdown Items */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-left text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-700">
              <span>Modul Ringkas Sosiologi (PDF 4 Hal)</span>
              <span className="font-semibold text-slate-500">1.8 MB</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span>Infografis Peta Konsep Desa</span>
              <span className="font-semibold text-slate-500">1.2 MB</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span>Video Pendek Terkompresi + Subtitle</span>
              <span className="font-semibold text-slate-500">9.4 MB</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span>Podcast Audio & Lembar Transkrip</span>
              <span className="font-semibold text-slate-500">3.2 MB</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span>Lembar Kerja Peserta Didik (LKPD)</span>
              <span className="font-semibold text-slate-500">0.5 MB</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between font-bold text-slate-900 text-xs">
              <span>Total Paket Offline</span>
              <span className="text-emerald-700">± 16.1 MB (Hemat Kuota)</span>
            </div>
          </div>

          {/* Download Progress */}
          {downloadProgress !== null && (
            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">
                  {isCompleted
                    ? 'Semua materi telah tersimpan di memori HP!'
                    : `Mengunduh berkas offline: ${downloadProgress}%`}
                </span>
                <span className="text-emerald-700 font-bold">
                  {downloadProgress}%
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${downloadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Big Green Action Button matching mockup */}
          {isCompleted ? (
            <div className="p-3 bg-emerald-100 text-emerald-900 rounded-2xl font-bold text-xs flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-emerald-700" />
              <span>Paket Offline Berhasil Tersimpan!</span>
            </div>
          ) : (
            <button
              onClick={startDownloadAll}
              disabled={downloadProgress !== null && downloadProgress < 100}
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Semua Materi (± 50 MB)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
