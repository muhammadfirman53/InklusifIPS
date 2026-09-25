import React, { useState } from 'react';
import {
  MessageSquare,
  Users,
  Send,
  CornerDownRight,
  PhoneCall,
  Volume2,
  Share2,
  CheckCircle,
  HelpCircle,
  Clock,
} from 'lucide-react';
import { ForumPost } from '../../types/learning';
import { FORUM_POSTS, PROJECT_METADATA } from '../../data/curriculumData';

interface DiscussionScreenProps {
  isOfflineSimulated: boolean;
  onSpeak: (text: string) => void;
}

export const DiscussionScreen: React.FC<DiscussionScreenProps> = ({
  isOfflineSimulated,
  onSpeak,
}) => {
  const [activeTab, setActiveTab] = useState<'forum' | 'kelompok' | 'guru'>('forum');
  const [posts, setPosts] = useState<ForumPost[]>(FORUM_POSTS);
  const [newCommentText, setNewCommentText] = useState<string>('');
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [showInputBox, setShowInputBox] = useState<boolean>(false);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newReply = {
      id: `rep-${Date.now()}`,
      author: 'Dita Anggraini (Kamu)',
      avatar: '👩‍🎓',
      timeAgo: 'Baru saja',
      content: newCommentText.trim(),
    };

    setPosts((prev) =>
      prev.map((post) => ({
        ...post,
        replies: [...post.replies, newReply],
      }))
    );

    setNewCommentText('');
    setShowInputBox(false);
  };

  return (
    <div className="space-y-4 pb-20 max-w-2xl mx-auto">
      {/* Header Info */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Diskusi & Interaksi</h2>
              <p className="text-xs text-slate-500">
                Ruang pertukaran ide yang ramah dan inklusif
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              onSpeak(
                'Diskusi dan Interaksi. Kamu bisa berdiskusi di forum LMS atau melalui WhatsApp jika koneksi internet terbatas.'
              )
            }
            className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
            title="Dengarkan pembacaan teks suara"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher matching mockup Screen 6 */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          {[
            { id: 'forum', label: 'Forum Kelas' },
            { id: 'kelompok', label: 'Kelompok Kecil' },
            { id: 'guru', label: 'Tanya Guru' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all text-center ${
                activeTab === tab.id
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* WhatsApp Fallback Card matching mockup caption */}
      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-3 text-xs text-emerald-950">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
            💬
          </div>
          <div>
            <span className="font-bold text-emerald-900">Grup WhatsApp Sosiologi</span>
            <p className="text-[11px] text-emerald-800">
              Koneksi internet lambat di desa? Diskusi tetap lancar via WA!
            </p>
          </div>
        </div>
        <a
          href={`https://wa.me/${PROJECT_METADATA.kontakGuruWA}?text=Halo%20Bu%20Siti%2C%20saya%20ingin%20bergabung%20diskusi%20kelompok%20Sosiologi`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-[11px] rounded-lg shrink-0 flex items-center gap-1 transition-colors"
        >
          <PhoneCall className="w-3 h-3" />
          <span>Buka WA</span>
        </a>
      </div>

      {/* Tab: FORUM KELAS */}
      {activeTab === 'forum' && (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3"
            >
              {/* Main Post Header */}
              <div className="flex items-start gap-3">
                <div className="text-2xl">{post.avatar}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      {post.author}
                    </span>
                    <span className="text-[10px] text-slate-400">{post.timeAgo}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {post.content}
                  </p>
                </div>
              </div>

              {/* Thread of Replies */}
              <div className="pl-4 sm:pl-8 border-l-2 border-slate-100 space-y-2.5 pt-1">
                <span className="text-[11px] font-semibold text-slate-500 block">
                  Tanggapan Teman ({post.replies.length} balasan):
                </span>

                {post.replies.map((reply) => (
                  <div key={reply.id} className="flex items-start gap-2.5">
                    <div className="text-xl shrink-0 mt-0.5">{reply.avatar}</div>
                    <div className="flex-1 bg-slate-50/70 p-2.5 rounded-xl border border-slate-200/70 text-xs">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-slate-900 text-[11px]">
                          {reply.author}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {reply.timeAgo}
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed text-[11px]">
                        {reply.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Input Form matching mockup "Tulis Pendapat" */}
          {showInputBox ? (
            <form
              onSubmit={handleAddComment}
              className="bg-white rounded-2xl border border-emerald-300 p-4 shadow-md space-y-3 animate-fadeIn"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">
                  Tulis Pendapat / Analisismu:
                </span>
                <button
                  type="button"
                  onClick={() => setShowInputBox(false)}
                  className="text-xs text-slate-400 hover:text-slate-700"
                >
                  Batal
                </button>
              </div>

              <textarea
                rows={3}
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Menurut pengalaman dan pengamatan saya di desa..."
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                autoFocus
              />

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {isOfflineSimulated
                    ? 'Mode offline: Komentar akan disinkronkan saat terhubung.'
                    : 'Komentar terbuka untuk semua siswa'}
                </span>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Pendapat</span>
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowInputBox(true)}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>✏️ Tulis Pendapat Kamu</span>
            </button>
          )}
        </div>
      )}

      {/* Tab: KELOMPOK KECIL */}
      {activeTab === 'kelompok' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-sm text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <Users className="w-4 h-4 text-purple-600" />
            <span>Ruang Diskusi Kelompok 4 (Konteks Rural)</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Anggota kelompok: Muhamad Firman, Erlangga Setyawan, Abang Julianto, Albertus Hary Usna.
          </p>
          <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-purple-950 space-y-2">
            <span className="font-semibold block">Fokus Diskusi Pekan Ini:</span>
            <p className="text-[11px] text-purple-900">
              Menyepakati format asesmen akhir: Siapa yang membuat esai, poster digital, atau presentasi langsung tatap muka di depan kelas.
            </p>
          </div>
        </div>
      )}

      {/* Tab: TANYA GURU */}
      {activeTab === 'guru' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-sm text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span>Konsultasi Langsung dengan Guru</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Mengalami kesulitan memahami materi atau butuh waktu tambahan karena kendala listrik/gadget di desa?
          </p>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <p className="font-semibold text-slate-800">Jadwal Piket & Bantuan Tatap Muka:</p>
            <p className="text-slate-600 text-[11px]">
              Setiap hari Selasa dan Kamis, pukul 13.00 - 14.30 WIB di Ruang Guru SMA.
            </p>
            <a
              href={`https://wa.me/${PROJECT_METADATA.kontakGuruWA}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-[11px] font-semibold hover:bg-emerald-700"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Kirim Pesan Pribadi ke Guru</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
