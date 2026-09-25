import React, { useState } from 'react';
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  Download,
  Users,
  User,
  Sparkles,
  Printer,
  ChevronRight,
  Save,
  Check,
  Volume2,
} from 'lucide-react';
import { ActivityItem } from '../../types/learning';
import { ACTIVITIES_DATA } from '../../data/curriculumData';

interface ActivitiesScreenProps {
  onSpeak: (text: string) => void;
  activities?: ActivityItem[];
  onUpdateActivities?: (activities: ActivityItem[]) => void;
}

export const ActivitiesScreen: React.FC<ActivitiesScreenProps> = ({
  onSpeak,
  activities: controlledActivities,
  onUpdateActivities,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'semua' | 'individu' | 'kelompok' | 'kontekstual'>('semua');
  const [localActivities, setLocalActivities] = useState<ActivityItem[]>(ACTIVITIES_DATA);
  const activities = controlledActivities || localActivities;

  const updateActivitiesState = (updater: (prev: ActivityItem[]) => ActivityItem[]) => {
    if (onUpdateActivities && controlledActivities) {
      onUpdateActivities(updater(controlledActivities));
    } else {
      setLocalActivities(updater);
    }
  };

  const [activeActivityModal, setActiveActivityModal] = useState<ActivityItem | null>(null);
  const [formInputs, setFormInputs] = useState<Record<string, string>>({
    'Lokasi Pengamatan': 'Selokan utama Dusun Sukamaju RT 02',
    'Temuan Masalah Utama': 'Plastik bungkus makanan & botol menyumbat aliran ke sawah',
    'Reaksi / Pendapat Warga': 'Petani resah air irigasi meluap dan berbau',
  });
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const filteredActivities = activities.filter((act) => {
    if (selectedCategory === 'semua') return true;
    return act.category === selectedCategory;
  });

  const handleToggleComplete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    updateActivitiesState((prev) =>
      prev.map((act) => (act.id === id ? { ...act, completed: !act.completed } : act))
    );
  };

  const handleSaveActivityWork = () => {
    if (!activeActivityModal) return;
    updateActivitiesState((prev) =>
      prev.map((act) =>
        act.id === activeActivityModal.id ? { ...act, completed: true } : act
      )
    );
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setActiveActivityModal(null);
    }, 1200);
  };

  const handlePrintLKPD = () => {
    window.print();
  };

  return (
    <div className="space-y-4 pb-20 max-w-2xl mx-auto">
      {/* Header Info */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ClipboardList className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Aktivitas Pembelajaran</h2>
              <p className="text-xs text-slate-500">
                Pilihan kegiatan fleksibel dan kontekstual di lingkungan sekitar
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              onSpeak(
                'Aktivitas Pembelajaran. Kerjakan pengamatan lingkungan, analisis sebab dampak pohon masalah, dan rancang solusi kontekstual.'
              )
            }
            className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
            title="Dengarkan pembacaan teks suara"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Segmented Control matching mockup Screen 5 */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          {[
            { id: 'semua', label: 'Semua' },
            { id: 'individu', label: 'Individu' },
            { id: 'kelompok', label: 'Kelompok' },
            { id: 'kontekstual', label: 'Kontekstual' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id as any)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all text-center ${
                selectedCategory === tab.id
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Cards matching mockup Screen 5 */}
      <div className="space-y-2.5">
        {filteredActivities.map((act) => (
          <div
            key={act.id}
            onClick={() => setActiveActivityModal(act)}
            className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-sm hover:border-emerald-300 transition-all cursor-pointer flex items-start justify-between gap-3 group"
          >
            <div className="flex items-start gap-3 flex-1">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  act.category === 'individu'
                    ? 'bg-blue-100 text-blue-700'
                    : act.category === 'kelompok'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {act.category === 'individu' ? (
                  <User className="w-4 h-4" />
                ) : act.category === 'kelompok' ? (
                  <Users className="w-4 h-4" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {act.title}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {act.description}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{act.timeEstimate}</span>
                  </span>
                  <span>·</span>
                  <span className="capitalize">{act.category}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-center">
              <button
                onClick={(e) => handleToggleComplete(act.id, e)}
                className={`p-1.5 rounded-lg border transition-colors ${
                  act.completed
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                    : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
                }`}
                title={act.completed ? 'Sudah selesai' : 'Tandai selesai'}
              >
                <CheckCircle2
                  className={`w-4 h-4 ${
                    act.completed ? 'text-emerald-600 fill-emerald-100' : ''
                  }`}
                />
              </button>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Unduh LKPD Card matching mockup Screen 5 */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Download className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">
              Unduh LKPD Lembar Kerja Peserta Didik
            </h4>
            <p className="text-[11px] text-slate-500">
              Tersedia versi digital dan cetak ramah kertas
            </p>
          </div>
        </div>

        <button
          onClick={handlePrintLKPD}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Cetak / PDF</span>
        </button>
      </div>

      <p className="text-xs text-slate-500 text-center italic">
        « Kamu bisa memilih urutan aktivitas sesuai jalur belajarmu. »
      </p>

      {/* Interactive Activity Fill-in Modal */}
      {activeActivityModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {activeActivityModal.category}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-1">
                  {activeActivityModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveActivityModal(null)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 text-xs">
                  Petunjuk Pengerjaan:
                </span>
                <ul className="space-y-1 text-slate-600 text-[11px] list-disc pl-4">
                  {activeActivityModal.instructions.map((ins, idx) => (
                    <li key={idx}>{ins}</li>
                  ))}
                </ul>
              </div>

              {/* Form Input Template */}
              <div className="space-y-3">
                <span className="font-bold text-slate-800 text-xs block">
                  Lembar Isian Interaktif (Tersimpan di Memori HP):
                </span>
                {activeActivityModal.templateFields?.map((fld, idx) => (
                  <div key={idx} className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 block">
                      {fld.label}
                    </label>
                    <textarea
                      rows={2}
                      value={formInputs[fld.label] || ''}
                      onChange={(e) =>
                        setFormInputs({ ...formInputs, [fld.label]: e.target.value })
                      }
                      placeholder={fld.placeholder}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={handlePrintLKPD}
                className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-medium"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Lembar Ini</span>
              </button>

              <button
                onClick={handleSaveActivityWork}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Tersimpan!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Simpan Jawaban</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
