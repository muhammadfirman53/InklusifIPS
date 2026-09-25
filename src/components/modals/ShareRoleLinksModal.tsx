import React, { useState } from 'react';
import {
  Link as LinkIcon,
  Copy,
  Check,
  X,
  Share2,
  GraduationCap,
  Users,
  ShieldCheck,
  ExternalLink,
  MessageCircle,
  QrCode
} from 'lucide-react';
import { UserRole } from '../../types/learning';

interface ShareRoleLinksModalProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onClose: () => void;
}

export const ShareRoleLinksModal: React.FC<ShareRoleLinksModalProps> = ({
  currentRole,
  onSelectRole,
  onClose,
}) => {
  const [copiedLink, setCopiedLink] = useState<'siswa' | 'guru' | null>(null);

  // Generate clean URLs based on current location
  const baseUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}`
    : 'https://lms-inklusif-ips.app';

  const studentUrl = `${baseUrl}?role=siswa`;
  const teacherUrl = `${baseUrl}?role=guru`;

  const copyToClipboard = (text: string, type: 'siswa' | 'guru') => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedLink(type);
      setTimeout(() => setCopiedLink(null), 2500);
    }
  };

  const shareViaWhatsApp = (url: string) => {
    const text = encodeURIComponent(
      `Halo anak-anak kelas XI, berikut adalah tautan Portal Belajar Inklusif UDL Sosiologi. Kamu bisa memilih belajar online maupun download materi offline tanpa kuota: ${url}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] shadow-2xl overflow-hidden flex flex-col border border-emerald-950/20">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-emerald-800/20 bg-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
              <Share2 className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Tautan Portal Siswa & Guru Terpisah
                </h3>
              </div>
              <p className="text-[11px] text-emerald-200">
                Gunakan tautan berbeda untuk portal belajar siswa dan panel kontrol guru
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-800 flex items-center justify-center font-bold text-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
          {/* Card 1: Link Siswa */}
          <div className="p-4 bg-emerald-50/70 border-2 border-emerald-200 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  👨‍🎓
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <span>Link Khusus Siswa (Portal Belajar)</span>
                    {currentRole === 'siswa' && (
                      <span className="text-[9px] bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                        Aktif Sekarang
                      </span>
                    )}
                  </h4>
                  <p className="text-[11px] text-emerald-800">
                    Untuk dibagikan ke siswa/grup WA kelas (hanya menampilkan tampilan belajar siswa)
                  </p>
                </div>
              </div>
            </div>

            {/* URL input box */}
            <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-emerald-300">
              <LinkIcon className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />
              <input
                type="text"
                readOnly
                value={studentUrl}
                className="w-full text-[11px] font-mono text-slate-700 bg-transparent focus:outline-none select-all"
              />
              <button
                type="button"
                onClick={() => copyToClipboard(studentUrl, 'siswa')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all shrink-0 ${
                  copiedLink === 'siswa'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                }`}
              >
                {copiedLink === 'siswa' ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Link</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => shareViaWhatsApp(studentUrl)}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Bagikan ke Grup WhatsApp Siswa</span>
              </button>
              {currentRole !== 'siswa' && (
                <button
                  type="button"
                  onClick={() => {
                    onSelectRole('siswa');
                    onClose();
                  }}
                  className="px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl whitespace-nowrap"
                >
                  Buka Tampilan Siswa
                </button>
              )}
            </div>
          </div>

          {/* Card 2: Link Guru */}
          <div className="p-4 bg-slate-50 border-2 border-slate-300 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-950 text-white flex items-center justify-center font-bold text-xs">
                  👩‍🏫
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <span>Link Khusus Guru (Portal Pendidik)</span>
                    {currentRole === 'guru' && (
                      <span className="text-[9px] bg-emerald-800 text-white px-2 py-0.5 rounded-full">
                        Aktif Sekarang
                      </span>
                    )}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Tautan privat untuk pengampu: upload bahan ajar, koreksi nilai, tambah siswa, dan reset data
                  </p>
                </div>
              </div>
            </div>

            {/* URL input box */}
            <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0 ml-1" />
              <input
                type="text"
                readOnly
                value={teacherUrl}
                className="w-full text-[11px] font-mono text-slate-700 bg-transparent focus:outline-none select-all"
              />
              <button
                type="button"
                onClick={() => copyToClipboard(teacherUrl, 'guru')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all shrink-0 ${
                  copiedLink === 'guru'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                }`}
              >
                {copiedLink === 'guru' ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Link</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>🔒 Simpan link ini di bookmark browser Anda</span>
              {currentRole !== 'guru' && (
                <button
                  type="button"
                  onClick={() => {
                    onSelectRole('guru');
                    onClose();
                  }}
                  className="px-3 py-1.5 bg-emerald-950 text-white font-bold text-xs rounded-xl hover:bg-emerald-900"
                >
                  Masuk ke Portal Guru
                </button>
              )}
            </div>
          </div>

          {/* Pedagogy & Context note */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-950 space-y-1">
            <span className="font-bold flex items-center gap-1.5 text-xs text-blue-900">
              <GraduationCap className="w-4 h-4 text-blue-700" />
              <span>Cara Kerja Pemisahan Link:</span>
            </span>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Ketika siswa membuka link dengan parameter <code className="bg-blue-100 px-1 py-0.5 rounded text-blue-900 font-mono">?role=siswa</code>, sistem secara otomatis mengunci tampilan hanya untuk pengerjaan materi, LKPD, dan pengumpulan tugas. Guru dapat mengakses instrumen penilaian dan unggah bahan ajar melalui <code className="bg-blue-100 px-1 py-0.5 rounded text-blue-900 font-mono">?role=guru</code>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs rounded-xl"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
