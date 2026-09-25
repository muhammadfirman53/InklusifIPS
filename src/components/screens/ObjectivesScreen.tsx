import React from 'react';
import { Target, CheckCircle, ArrowRight, Volume2, Sparkles, BookOpen, Layers } from 'lucide-react';
import { LEARNING_OBJECTIVES } from '../../data/curriculumData';

interface ObjectivesScreenProps {
  onSpeak: (text: string) => void;
  onNavigate: (tab: any) => void;
}

export const ObjectivesScreen: React.FC<ObjectivesScreenProps> = ({
  onSpeak,
  onNavigate,
}) => {
  return (
    <div className="space-y-4 pb-20 max-w-2xl mx-auto">
      {/* Title Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Target className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Tujuan Pembelajaran
              </h2>
              <p className="text-xs text-slate-500">
                Kompetensi IPS / Sosiologi SMA Berbasis UDL
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              onSpeak(
                'Tujuan Pembelajaran. Setelah mempelajari unit ini, kamu dapat: Pertama, Mengidentifikasi permasalahan sosial di lingkungan sekitar. Kedua, Menganalisis faktor penyebab dan dampaknya. Ketiga, Merumuskan alternatif solusi yang realistis dan kontekstual.'
              )
            }
            className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
            title="Dengarkan pembacaan teks suara"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
          Setelah mempelajari unit permasalahan sosial pedesaan ini, kamu diharapkan mampu:
        </p>
      </div>

      {/* 3 Numbered Goals matching mockup Screen 3 */}
      <div className="space-y-3">
        {LEARNING_OBJECTIVES.map((goal) => (
          <div
            key={goal.id}
            className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:border-emerald-300 transition-all flex items-start gap-3.5"
          >
            {/* Number Circle Badge */}
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
              {goal.id}
            </div>

            <div className="space-y-1 flex-1">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                {goal.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {goal.description}
              </p>
              <div className="pt-1.5">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  <span>Bukti Kompetensi: {goal.indicator}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Reassurance Card matching mockup Screen 3 */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 text-center space-y-3 shadow-xs">
        <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-xs">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="space-y-1 max-w-md mx-auto">
          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
            Standar Sama, Jalur Belajar Fleksibel
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Kamu bisa mencapai semua tujuan ini melalui jalur belajar yang paling sesuai dengan kebutuhanmu: membaca modul teks, melihat peta konsep, menyimak video ber-CC, atau mendengarkan rekaman suara.
          </p>
        </div>

        <button
          onClick={() => onNavigate('materi')}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-all"
        >
          <span>Eksplorasi Materi Sekarang</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
