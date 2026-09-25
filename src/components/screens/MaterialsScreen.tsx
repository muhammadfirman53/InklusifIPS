import React, { useState } from 'react';
import {
  BookOpen,
  FileText,
  Video,
  Headphones,
  Image as ImageIcon,
  Download,
  Play,
  Pause,
  CheckCircle,
  Eye,
  Volume2,
  Subtitles,
  ExternalLink,
  ChevronRight,
  RotateCcw,
  Upload,
  Sparkles,
  Youtube,
  FileDown,
  ChevronLeft,
  Share2,
  HardDrive
} from 'lucide-react';
import { MediaFilter, MaterialItem, UserRole } from '../../types/learning';
import { ASSET_IMAGES } from '../../assets/images';
import { getYouTubeEmbedUrl } from '../../utils/youtube';

interface MaterialsScreenProps {
  materials: MaterialItem[];
  userRole: UserRole;
  isOfflineSimulated: boolean;
  onOpenTeacherUpload: () => void;
  onDeleteMaterial?: (id: string) => void;
  onSpeak: (text: string) => void;
  onDownloaded: (id: string) => void;
}

export const MaterialsScreen: React.FC<MaterialsScreenProps> = ({
  materials,
  userRole,
  isOfflineSimulated,
  onOpenTeacherUpload,
  onDeleteMaterial,
  onSpeak,
  onDownloaded,
}) => {
  const [activeFilter, setActiveFilter] = useState<MediaFilter>('semua');
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialItem | null>(null);

  // Video Simulator State
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(15);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);

  // Audio Player State
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(1);

  // PDF Viewer State
  const [pdfCurrentPage, setPdfCurrentPage] = useState<number>(1);

  // Downloaded feedback
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  const filteredMaterials = materials.filter((item) => {
    if (activeFilter === 'semua') return true;
    if (activeFilter === 'video') return item.type === 'video' || !!item.content.youtubeId;
    if (activeFilter === 'gambar') return item.type === 'infografis';
    if (activeFilter === 'pdf') return item.type === 'pdf';
    return item.type === activeFilter;
  });

  const handleDownload = (material: MaterialItem) => {
    onDownloaded(material.id);
    setDownloadSuccessToast(`Berkas "${material.title}" berhasil diunduh ke memori HP!`);
    setTimeout(() => setDownloadSuccessToast(null), 3000);
  };

  const getMediaIcon = (item: MaterialItem) => {
    if (item.content.youtubeId || item.content.youtubeUrl) {
      return <Youtube className="w-4 h-4 text-red-600" />;
    }
    switch (item.type) {
      case 'teks':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'video':
        return <Video className="w-4 h-4 text-rose-600" />;
      case 'audio':
        return <Headphones className="w-4 h-4 text-emerald-600" />;
      case 'infografis':
        return <ImageIcon className="w-4 h-4 text-amber-600" />;
      case 'pdf':
        return <FileDown className="w-4 h-4 text-rose-700" />;
    }
  };

  const filterTabs: { id: MediaFilter; label: string; icon?: any }[] = [
    { id: 'semua', label: 'Semua' },
    { id: 'video', label: 'YouTube / Video' },
    { id: 'gambar', label: 'Gambar / Foto' },
    { id: 'pdf', label: 'Dokumen PDF' },
    { id: 'teks', label: 'Teks Ringkas' },
    { id: 'audio', label: 'Audio' },
  ];

  return (
    <div className="space-y-4 pb-20 max-w-2xl mx-auto">
      {/* Toast Notification */}
      {downloadSuccessToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-emerald-800 text-white text-xs px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-300" />
          <span>{downloadSuccessToast}</span>
        </div>
      )}

      {/* Header Info */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Materi Pembelajaran</h2>
              <p className="text-xs text-slate-500">
                Pilih format yang paling nyaman bagimu (Multi-Representasi UDL)
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              onSpeak(
                'Materi Pembelajaran. Tersedia link YouTube, dokumen PDF, gambar ilustrasi, teks modul ringkas, video dengan caption, dan rekaman audio.'
              )
            }
            className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
            title="Dengarkan pembacaan teks suara"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Teacher Upload Action Banner */}
        <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {userRole === 'guru' ? '👩‍🏫' : '📚'}
            </div>
            <div>
              <span className="font-bold text-emerald-950 text-xs block">
                {userRole === 'guru' ? 'Panel Pendidik: Kelola & Tambah Materi' : 'Bahan Belajar Multi-Representasi'}
              </span>
              <span className="text-[11px] text-emerald-800">
                {userRole === 'guru'
                  ? 'Unggah Link YouTube, Berkas Gambar, Dokumen PDF, atau Modul Teks untuk siswa'
                  : 'Tersedia pilihan video YouTube, modul PDF, gambar grafik, teks, dan audio'}
              </span>
            </div>
          </div>
          {userRole === 'guru' ? (
            <button
              onClick={onOpenTeacherUpload}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors shrink-0"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>+ Upload Bahan</span>
            </button>
          ) : (
            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
              Offline-Ready
            </span>
          )}
        </div>

        {/* Filter Segmented Control supporting YouTube, Gambar, PDF */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeFilter === tab.id
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Materials List */}
      <div className="space-y-2.5">
        {filteredMaterials.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 space-y-3">
            <BookOpen className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-xs">Belum ada bahan belajar untuk kategori ini.</p>
            {userRole === 'guru' && (
              <button
                onClick={onOpenTeacherUpload}
                className="px-3 py-1.5 bg-emerald-700 text-white text-xs font-bold rounded-xl"
              >
                + Upload Bahan Sekarang
              </button>
            )}
          </div>
        ) : (
          filteredMaterials.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedMaterial(item);
                setPdfCurrentPage(1);
              }}
              className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-emerald-50 flex items-center justify-center shrink-0 transition-colors">
                  {getMediaIcon(item)}
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-emerald-700 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    {item.authorRole === 'guru' && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                        Guru
                      </span>
                    )}
                    {item.content.youtubeId && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-red-100 text-red-700 rounded flex items-center gap-0.5">
                        <Youtube className="w-2.5 h-2.5" />
                        YouTube
                      </span>
                    )}
                    {item.type === 'pdf' && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-rose-100 text-rose-800 rounded">
                        PDF
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {item.subtitle}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <span>{item.fileSize}</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-medium">
                      {item.downloaded ? '✓ Tersimpan di HP' : 'Streaming Online'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(item);
                  }}
                  className="p-2 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors"
                  title="Unduh untuk belajar offline"
                >
                  <Download className="w-4 h-4" />
                </button>
                <div className="w-7 h-7 rounded-lg text-slate-300 group-hover:text-emerald-600 flex items-center justify-center">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DETAIL MODAL / VIEWER */}
      {selectedMaterial && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                {getMediaIcon(selectedMaterial)}
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-[280px]">
                  {selectedMaterial.title}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsVideoPlaying(false);
                  setIsAudioPlaying(false);
                  setSelectedMaterial(null);
                }}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Modal Body Based on Type */}
            <div className="p-4 overflow-y-auto space-y-4 text-slate-700 text-xs sm:text-sm">
              {/* 1. YOUTUBE VIDEO PLAYER */}
              {selectedMaterial.content.youtubeId && (
                <div className="space-y-3">
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-300 bg-black shadow-md">
                    <iframe
                      src={getYouTubeEmbedUrl(selectedMaterial.content.youtubeId)}
                      title={selectedMaterial.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs">
                    <div className="flex items-center gap-2 text-red-950">
                      <Youtube className="w-4 h-4 text-red-600 shrink-0" />
                      <span className="font-bold">Video YouTube Pengayaan Guru</span>
                    </div>
                    {selectedMaterial.content.youtubeUrl && (
                      <a
                        href={selectedMaterial.content.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-red-700 hover:underline flex items-center gap-1"
                      >
                        <span>Buka Tab YouTube</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  {selectedMaterial.content.transcript && (
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                          <Subtitles className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Transkrip Teks Alternatif (Aksesibel / Offline)</span>
                        </span>
                        <button
                          onClick={() => onSpeak(selectedMaterial.content.transcript || '')}
                          className="p-1 text-slate-500 hover:text-emerald-700 rounded"
                          title="Dengarkan pembacaan suara"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-slate-600 text-xs leading-relaxed font-sans">
                        {selectedMaterial.content.transcript}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* 2. REGULAR VIDEO (IF NOT YOUTUBE) */}
              {!selectedMaterial.content.youtubeId && selectedMaterial.type === 'video' && (
                <div className="space-y-3">
                  <div className="relative aspect-[16/9] w-full bg-slate-900 rounded-xl overflow-hidden flex flex-col justify-between p-3 text-white">
                    <div className="absolute inset-0 opacity-40">
                      <img
                        src={ASSET_IMAGES.infographic}
                        alt="Video Thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="relative z-10 flex items-center justify-between text-xs text-white/90">
                      <span className="font-semibold bg-black/60 px-2 py-0.5 rounded">
                        Studi Kasus Lingkungan Desa
                      </span>
                      <button
                        onClick={() => setShowCaptions(!showCaptions)}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                          showCaptions
                            ? 'bg-emerald-600 text-white border-emerald-400'
                            : 'bg-black/60 text-slate-300 border-white/20'
                        }`}
                      >
                        CC {showCaptions ? 'ON' : 'OFF'}
                      </button>
                    </div>

                    {showCaptions && (
                      <div className="relative z-10 mx-auto max-w-sm text-center">
                        <div className="inline-block bg-black/85 px-3 py-1.5 rounded-lg text-[11px] sm:text-xs text-yellow-300 font-medium leading-snug shadow-md">
                          {selectedMaterial.content.captions?.[1]?.text ||
                            'Terlihat endapan plastik kemasan menyumbat pintu air ke arah persawahan padi.'}
                        </div>
                      </div>
                    )}

                    <div className="relative z-10 space-y-1">
                      <div className="w-full bg-white/30 h-1.5 rounded-full overflow-hidden cursor-pointer">
                        <div
                          className="bg-emerald-500 h-full transition-all"
                          style={{ width: `${videoProgress}%` }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setIsVideoPlaying(!isVideoPlaying);
                              if (!isVideoPlaying) {
                                onSpeak('Terlihat endapan plastik kemasan menyumbat pintu air ke arah persawahan padi.');
                              }
                            }}
                            className="w-6 h-6 rounded-full bg-white text-slate-900 flex items-center justify-center font-bold"
                          >
                            {isVideoPlaying ? (
                              <Pause className="w-3 h-3" />
                            ) : (
                              <Play className="w-3 h-3 ml-0.5" />
                            )}
                          </button>
                          <span>01:15 / {selectedMaterial.content.duration || '04:12'}</span>
                        </div>
                        <span className="text-[10px] text-emerald-300">
                          {isOfflineSimulated ? 'Diputar dari Memori HP (Offline)' : 'Kualitas Hemat Kuota'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                        <Subtitles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Transkrip Teks Interaktif</span>
                      </span>
                      <button
                        onClick={() => onSpeak(selectedMaterial.content.transcript || '')}
                        className="p-1 text-slate-500 hover:text-emerald-700 rounded"
                        title="Dengarkan pembacaan suara"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed font-sans">
                      {selectedMaterial.content.transcript}
                    </p>
                  </div>
                </div>
              )}

              {/* 3. DOKUMEN PDF VIEWER */}
              {selectedMaterial.type === 'pdf' && (
                <div className="space-y-3">
                  {/* PDF Toolbar */}
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-rose-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                        PDF
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                          {selectedMaterial.content.pdfFileName || selectedMaterial.title}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          {selectedMaterial.content.pdfPageCount || 6} Halaman · Ukuran: {selectedMaterial.fileSize}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(selectedMaterial)}
                      className="px-3 py-1.5 bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh PDF</span>
                    </button>
                  </div>

                  {/* Interactive Document Reader Container */}
                  <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
                    {/* Navigation bar between pages */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-slate-700">
                        <FileDown className="w-4 h-4 text-rose-600" />
                        <span>
                          Halaman {pdfCurrentPage} dari {selectedMaterial.content.pdfPageCount || 6}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setPdfCurrentPage((p) => Math.max(1, p - 1))}
                          disabled={pdfCurrentPage <= 1}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-lg text-slate-700 font-bold text-xs flex items-center gap-1"
                        >
                          <ChevronLeft className="w-3 h-3" />
                          <span>Prev</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setPdfCurrentPage((p) =>
                              Math.min(selectedMaterial.content.pdfPageCount || 6, p + 1)
                            )
                          }
                          disabled={pdfCurrentPage >= (selectedMaterial.content.pdfPageCount || 6)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-lg text-slate-700 font-bold text-xs flex items-center gap-1"
                        >
                          <span>Next</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Page Content Card */}
                    <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-3.5 space-y-2.5 min-h-[160px]">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono border-b border-slate-200 pb-1">
                        <span>LEMBAR KERJA & BUKU PEGANGAN RESMI</span>
                        <span className="font-bold text-rose-700">HALAMAN {pdfCurrentPage}</span>
                      </div>

                      <div className="space-y-2 text-slate-800 text-xs leading-relaxed">
                        <p className="font-bold text-slate-900">
                          {selectedMaterial.content.pdfTextSummary?.[pdfCurrentPage - 1] ||
                            `Poin pembelajaran halaman ${pdfCurrentPage}: Analisis mendalam fenomena sosial di pedesaan, instrumen observasi warga, dan rekomendasi aksi gotong royong terpadu.`}
                        </p>
                        <p className="text-slate-600 text-[11px]">
                          Dokumen ini dirancang khusus dengan pendekatan inklusif UDL untuk mengakomodasi siswa yang belajar mandiri maupun secara kelompok. Format teks terstruktur dengan poin-poin jelas dan bebas jargon rumit.
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => {
                            const text = selectedMaterial.content.pdfTextSummary?.[pdfCurrentPage - 1] || selectedMaterial.title;
                            onSpeak(`Halaman ${pdfCurrentPage}. ${text}`);
                          }}
                          className="px-2.5 py-1 bg-rose-50 text-rose-800 border border-rose-200 rounded-lg text-[11px] font-semibold flex items-center gap-1 hover:bg-rose-100"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Bacakan Halaman Ini (TTS)</span>
                        </button>
                        <span className="text-[10px] text-slate-400">
                          Format: PDF A4 Standar
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. GAMBAR / INFOGRAFIS */}
              {selectedMaterial.type === 'infografis' && (
                <div className="space-y-3">
                  <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 min-h-[200px] flex items-center justify-center">
                    <img
                      src={selectedMaterial.content.imageUrl || ASSET_IMAGES.infographic}
                      alt={selectedMaterial.content.imageAlt || selectedMaterial.title}
                      className="w-full object-contain max-h-80"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = ASSET_IMAGES.infographic;
                      }}
                    />
                  </div>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-1 text-amber-900">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>Deskripsi Aksesibel Gambar (Alt Text UDL):</span>
                      </span>
                      <button
                        onClick={() =>
                          onSpeak(
                            selectedMaterial.content.imageAlt ||
                              selectedMaterial.content.summary ||
                              selectedMaterial.title
                          )
                        }
                        className="p-1 text-amber-700 hover:bg-amber-100 rounded"
                        title="Dengarkan deskripsi gambar"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-amber-900 leading-relaxed">
                      {selectedMaterial.content.imageAlt ||
                        selectedMaterial.content.summary ||
                        'Infografis merangkum peta hubungan sebab akibat permasalahan sosial sampah di lingkungan pedesaan serta alternatif solusi gotong royong warga desa.'}
                    </p>
                  </div>
                </div>
              )}

              {/* 5. TEKS MODUL (4 SEGMEN) */}
              {selectedMaterial.type === 'teks' && selectedMaterial.content.sections && (
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-950 text-xs flex items-start gap-2">
                    <BookOpen className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Modul Pembelajaran Ringkas & Tersegmentasi</p>
                      <p className="text-[11px] text-blue-900 mt-0.5">
                        Teks dipilah menjadi beberapa bagian ringkas agar ramah rentang perhatian dan mudah dipahami.
                      </p>
                    </div>
                  </div>

                  {selectedMaterial.content.sections.map((sec, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                          {sec.title}
                        </h4>
                        <button
                          onClick={() => onSpeak(`${sec.title}. ${sec.text}`)}
                          className="p-1 text-slate-400 hover:text-emerald-700 rounded"
                          title="Dengarkan bagian ini"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-slate-600 text-xs leading-relaxed font-sans">
                        {sec.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* 6. AUDIO PODCAST */}
              {selectedMaterial.type === 'audio' && (
                <div className="space-y-3">
                  <div className="p-4 bg-emerald-900 text-white rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Headphones className="w-5 h-5 text-emerald-300" />
                        <span className="font-bold text-xs sm:text-sm">Audio Podcast Sosiologi</span>
                      </div>
                      <span className="text-[11px] text-emerald-200 font-mono">
                        {selectedMaterial.content.duration || '05:30'}
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-3 py-2">
                      <button
                        onClick={() => {
                          setIsAudioPlaying(!isAudioPlaying);
                          if (!isAudioPlaying) {
                            onSpeak(selectedMaterial.content.transcript || selectedMaterial.title);
                          }
                        }}
                        className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg transition-transform active:scale-95"
                      >
                        {isAudioPlaying ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5 ml-1" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-emerald-200">
                      <span>Suara Guru Pengampu</span>
                      <span>Format MP3 Hemat Kuota</span>
                    </div>
                  </div>

                  {selectedMaterial.content.transcript && (
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                      <span className="text-xs font-bold text-slate-800 block">
                        Transkrip Narasi Suara:
                      </span>
                      <p className="text-slate-600 text-xs leading-relaxed font-sans">
                        {selectedMaterial.content.transcript}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => handleDownload(selectedMaterial)}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh ke Memori HP</span>
              </button>
              <button
                onClick={() => {
                  setIsVideoPlaying(false);
                  setIsAudioPlaying(false);
                  setSelectedMaterial(null);
                }}
                className="px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium rounded-xl"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
