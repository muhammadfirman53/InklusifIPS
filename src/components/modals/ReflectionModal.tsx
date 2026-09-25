import React, { useState } from 'react';
import { Sparkles, Save, Check, X } from 'lucide-react';

interface ReflectionModalProps {
  onClose: () => void;
}

export const ReflectionModal: React.FC<ReflectionModalProps> = ({ onClose }) => {
  const [reflectionText, setReflectionText] = useState<string>(
    'Hari ini saya belajar bahwa sampah plastik di saluran sawah bukan hanya masalah kebersihan, tapi memicu gagal panen petani. Bagian paling menarik adalah ide membuat Bank Sampah Dusun dengan menukarkan botol bekas menjadi bibit tanaman. Yang masih sedikit sulit adalah menghitung perkiraan biaya awal pembentukan tempat pilah sampah desa.'
  );
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-emerald-600 text-lg">🌱</span>
            <h3 className="text-sm font-bold text-slate-900">
              Refleksi Pembelajaran Harian
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold text-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content matching mockup Screen "Refleksi" */}
        <div className="p-5 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-xl">
              🍃
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                Apa yang kamu pelajari hari ini?
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Bagian mana yang paling menarik? Dan apa yang masih kamu rasakan sulit dipahami?
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <textarea
              rows={6}
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              placeholder="Tulis refleksimu di sini secara jujur dan santai..."
              className="w-full text-xs p-3.5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 leading-relaxed"
            />
            <span className="text-[10px] text-slate-400 block text-right">
              Refleksi ini dibaca oleh Bu Siti untuk membantu menyesuaikan materi berikutnya.
            </span>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Refleksi Berhasil Disimpan!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan Refleksi</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
