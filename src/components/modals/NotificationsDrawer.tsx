import React from 'react';
import { Bell, Calendar, MessageSquare, Clock, CheckCircle, X } from 'lucide-react';

interface NotificationsDrawerProps {
  onClose: () => void;
  onNavigate: (tab: any) => void;
  onOpenReflection: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  onClose,
  onNavigate,
  onOpenReflection,
}) => {
  const notifications = [
    {
      id: 1,
      title: 'Materi baru tersedia',
      desc: 'Modul ringkas segmen 4 & podcast audio telah diunggah oleh Bu Siti.',
      time: '2 jam lalu',
      icon: Bell,
      color: 'bg-amber-100 text-amber-700',
      action: () => {
        onNavigate('materi');
        onClose();
      },
    },
    {
      id: 2,
      title: 'Pengumpulan tugas minggu ini',
      desc: 'Batas akhir unggah karya asesmen UDL (Esai/Poster/Audio/Video).',
      time: '1 hari lagi',
      icon: Calendar,
      color: 'bg-rose-100 text-rose-700',
      action: () => {
        onNavigate('asesmen');
        onClose();
      },
    },
    {
      id: 3,
      title: 'Diskusi kelompok dimulai',
      desc: 'Teman-teman kelompok 4 sedang mendiskusikan pohon masalah di WhatsApp & LMS.',
      time: 'Hari ini',
      icon: MessageSquare,
      color: 'bg-emerald-100 text-emerald-700',
      action: () => {
        onNavigate('diskusi');
        onClose();
      },
    },
    {
      id: 4,
      title: 'Jangan lupa isi refleksi!',
      desc: 'Tuliskan satu hal menarik yang kamu pelajari hari ini sebelum istirahat.',
      time: '2 hari lagi',
      icon: Clock,
      color: 'bg-purple-100 text-purple-700',
      action: () => {
        onClose();
        onOpenReflection();
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Notifikasi & Pengingat
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold text-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List matching mockup screen "Notifikasi & Pengingat" */}
        <div className="p-4 space-y-2.5">
          {notifications.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={item.action}
                className="p-3 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-200 rounded-2xl cursor-pointer transition-all flex items-start gap-3"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${item.color}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
