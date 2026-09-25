import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  Download, 
  Smartphone, 
  HelpCircle, 
  PhoneCall, 
  FileDown, 
  ExternalLink, 
  Volume2, 
  Printer, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { LEARNING_STEPS, PROJECT_METADATA } from '../../data/curriculumData';

interface InstructionsScreenProps {
  onSpeak: (text: string) => void;
  onNavigate: (tab: any) => void;
  onOpenOfflineDownload: () => void;
}

export const InstructionsScreen: React.FC<InstructionsScreenProps> = ({
  onSpeak,
  onNavigate,
  onOpenOfflineDownload,
}) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const toggleStep = (stepNumber: number) => {
    if (completedSteps.includes(stepNumber)) {
      setCompletedSteps(completedSteps.filter((s) => s !== stepNumber));
    } else {
      setCompletedSteps([...completedSteps, stepNumber]);
    }
  };

  const guides = [
    {
      id: 0,
      title: '1. Cara Menggunakan LMS (Online & Offline)',
      icon: Smartphone,
      summary: 'Aplikasi ini dirancang ringan dan ramah smartphone.',
      detail:
        'Jika kuota lancar, kamu bisa menikmati video streaming dan forum interaktif. Namun bila koneksi lemot atau padam di desa, kamu cukup mengunduh seluruh materi sekali saja untuk dibaca dan dikerjakan secara offline.',
    },
    {
      id: 1,
      title: '2. Ikon dan Fitur Aksesibilitas',
      icon: HelpCircle,
      summary: 'Dukungan teks ramah, suara TTS, dan kontras tinggi.',
      detail:
        'Klik ikon volume untuk mendengarkan pembacaan teks otomatis. Setiap video memiliki tombol [CC] untuk memunculkan subtitle, serta ada transkrip teks lengkap untuk kamu yang lebih nyaman membaca.',
    },
    {
      id: 2,
      title: '3. Panduan Unduh Materi Offline',
      icon: Download,
      summary: 'Hemat kuota, unduh saat di sekolah atau ada WiFi.',
      detail:
        'Klik tombol "Unduh Paket Offline" di Beranda atau tombol unduh di samping setiap materi. Ukuran file modul sangat ringan (hanya 1-2 MB), video terkompresi hemat kuota.',
    },
    {
      id: 3,
      title: '4. Cara Mengumpulkan Tugas Asesmen',
      icon: CheckSquare,
      summary: 'Fleksibel: ketik langsung, upload, atau serahkan fisik.',
      detail:
        'Kamu bisa memilih 1 dari 5 format karya (Esai, Poster, Slide, Rekaman Suara, atau Video). Jika offline, tugas akan tersimpan di HP dan otomatis terkirim saat ada sinyal, atau bisa dikumpulkan langsung lembar cetaknya ke guru.',
    },
    {
      id: 4,
      title: '5. Kontak Guru & Bantuan Belajar',
      icon: PhoneCall,
      summary: 'Jangan ragu menghubungi guru jika ada kesulitan.',
      detail: `Guru Pengampu: ${PROJECT_METADATA.guruPengampu}. Jika koneksi internet terputus, kamu bisa berkonsultasi via SMS/WhatsApp atau datang ke meja piket guru di sekolah.`,
    },
  ];

  return (
    <div className="space-y-4 pb-20 max-w-2xl mx-auto">
      {/* Header Info */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Petunjuk Belajar</h2>
              <p className="text-xs text-slate-500">
                Panduan praktis dan alur belajar berkeadilan (UDL)
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              onSpeak(
                'Halaman Petunjuk Belajar. Ikuti 5 langkah terstruktur dan checklist belajar untuk menyelesaikan unit permasalahan sosial.'
              )
            }
            className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
            title="Dengarkan pembacaan teks suara"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Accordion Guide Items matching mockup Screen 2 */}
      <div className="space-y-2.5">
        {guides.map((item) => {
          const Icon = item.icon;
          const isOpen = activeAccordion === item.id;
          return (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => setActiveAccordion(isOpen ? null : item.id)}
                className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {item.summary}
                    </p>
                  </div>
                </div>
                <span className="text-slate-400 text-xs font-bold ml-2">
                  {isOpen ? '▲' : '▼'}
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-3.5 pt-1 text-xs text-slate-600 bg-slate-50/50 border-t border-slate-100 leading-relaxed">
                  <p>{item.detail}</p>
                  {item.id === 2 && (
                    <button
                      onClick={onOpenOfflineDownload}
                      className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-[11px] transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      <span>Buka Menu Unduh Paket Offline (±50 MB)</span>
                    </button>
                  )}
                  {item.id === 4 && (
                    <a
                      href={`https://wa.me/${PROJECT_METADATA.kontakGuruWA}?text=Halo%20Bu%20Siti%2C%20saya%20siswa%20kelas%20XI%20ingin%20bertanya%20tentang%20tugas%20Sosiologi`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-[11px] transition-colors"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>Hubungi Guru via WhatsApp (+62 812-3456-7890)</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Checklist Bernomor Tahap 12 Blueprint UTS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              Checklist Alur Belajar Siswa
            </h3>
            <p className="text-[11px] text-slate-500">
              Centang langkah yang sudah kamu selesaikan
            </p>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
            {completedSteps.length} / {LEARNING_STEPS.length} Selesai
          </span>
        </div>

        <div className="space-y-2">
          {LEARNING_STEPS.map((s) => {
            const isDone = completedSteps.includes(s.step);
            return (
              <div
                key={s.step}
                onClick={() => toggleStep(s.step)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  isDone
                    ? 'border-emerald-300 bg-emerald-50/40 text-emerald-950'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="mt-0.5 shrink-0 text-emerald-600">
                  {isDone ? (
                    <CheckSquare className="w-4 h-4 fill-emerald-600 text-white" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-900">
                      Langkah {s.step}: {s.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fallback Notice matching mockup Screen 2 */}
      <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
        <Printer className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Tersedia versi cetak di sekolah untuk yang membutuhkan</p>
          <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
            Jika kamu tidak memiliki smartphone atau kuota sama sekali, silakan minta Lembar Modul Cetak & LKPD ke Pak Satpam atau Bu Siti di Ruang Guru. Standar penilaian tetap sama persis!
          </p>
        </div>
      </div>
    </div>
  );
};
