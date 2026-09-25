import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  Video,
  Headphones,
  Image as ImageIcon,
  Check,
  X,
  Sparkles,
  Subtitles,
  Layers,
  HardDrive,
  Info,
  Youtube,
  FileDown,
  Link as LinkIcon,
  Eye,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { MaterialItem } from '../../types/learning';
import { ASSET_IMAGES } from '../../assets/images';
import { extractYouTubeId, getYouTubeThumbnail } from '../../utils/youtube';

interface TeacherUploadModalProps {
  onClose: () => void;
  onAddMaterial: (material: MaterialItem) => void;
}

type UploadTab = 'youtube' | 'gambar' | 'pdf' | 'teks' | 'audio';

export const TeacherUploadModal: React.FC<TeacherUploadModalProps> = ({
  onClose,
  onAddMaterial,
}) => {
  const [activeTab, setActiveTab] = useState<UploadTab>('youtube');
  
  // General Fields
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [fileSize, setFileSize] = useState('Online Stream');
  const [isOfflineReady, setIsOfflineReady] = useState(true);
  const [summary, setSummary] = useState('');

  // 1. YouTube Specific Fields
  const [youtubeUrl, setYoutubeUrl] = useState('https://www.youtube.com/watch?v=kYI-Ld8_8a4');
  const [youtubeDuration, setYoutubeDuration] = useState('05:30');
  const [youtubeCaptions, setYoutubeCaptions] = useState('Warga RT 02 bergotong royong membersihkan pintu air saluran irigasi.');
  const [youtubeTranscript, setYoutubeTranscript] = useState('Video edukasi mengenai inovasi pemilahan sampah organik dan daur ulang plastik di pedesaan.');

  // 2. Gambar / Infografis Specific Fields
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(ASSET_IMAGES.infographic);
  const [imageFileName, setImageFileName] = useState<string>('infografis_sebab_akibat.jpg');
  const [imageAltText, setImageAltText] = useState('Diagram hubungan sebab akibat timbulan sampah di pemukiman desa dan solusinya.');
  const imageFileInputRef = useRef<HTMLInputElement>(null);

  // 3. PDF Specific Fields
  const [pdfFileName, setPdfFileName] = useState<string>('Modul_Sosiologi_Pedesaan_XI.pdf');
  const [pdfPageCount, setPdfPageCount] = useState<number>(6);
  const [pdfPoints, setPdfPoints] = useState<string>(
    '1. Definisi masalah sosial agraris\n2. Teori disorganisasi sosial\n3. Tabel checklist observasi lapangan\n4. Format wawancara tokoh desa'
  );
  const pdfFileInputRef = useRef<HTMLInputElement>(null);

  // 4. Text Specific Fields
  const [textSectionTitle, setTextSectionTitle] = useState('Bagian 1: Pengantar Analisis Kasus');
  const [textContent, setTextContent] = useState('');

  // 5. Audio Specific Fields
  const [audioDuration, setAudioDuration] = useState('04:15');

  // UI state
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle YouTube URL change and detection
  const detectedYouTubeId = extractYouTubeId(youtubeUrl);

  // Handle Image File Upload via local FileReader
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      if (!title) {
        setTitle(`Foto Lapangan: ${file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ')}`);
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreviewUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle PDF File Upload via local file picker
  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      if (!title) {
        setTitle(`Dokumen PDF: ${file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ')}`);
      }
      setPdfPageCount(Math.max(3, Math.floor(file.size / 250000)));
    }
  };

  // Quick Preset Handlers
  const selectYouTubePreset = (presetUrl: string, presetTitle: string, presetDuration: string) => {
    setYoutubeUrl(presetUrl);
    setTitle(presetTitle);
    setSubtitle('Video YouTube pengayaan studi kasus sosiologi pedesaan');
    setYoutubeDuration(presetDuration);
    setFileSize('Streaming (Hemat Kuota)');
  };

  const selectPdfPreset = (presetName: string, presetTitle: string, pages: number, size: string) => {
    setPdfFileName(presetName);
    setTitle(presetTitle);
    setSubtitle('Buku pegangan / lembar PDF resmi pengampu sosiologi');
    setPdfPageCount(pages);
    setFileSize(size);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim()) {
      setErrorMessage('Mohon isi judul bahan belajar.');
      return;
    }

    if (activeTab === 'youtube' && !detectedYouTubeId) {
      setErrorMessage('Link YouTube tidak valid. Mohon masukkan URL video YouTube yang benar (contoh: https://www.youtube.com/watch?v=kYI-Ld8_8a4).');
      return;
    }

    let materialType: 'teks' | 'video' | 'audio' | 'infografis' | 'pdf' = 'teks';
    if (activeTab === 'youtube') materialType = 'video';
    else if (activeTab === 'gambar') materialType = 'infografis';
    else if (activeTab === 'pdf') materialType = 'pdf';
    else if (activeTab === 'audio') materialType = 'audio';

    const newMaterial: MaterialItem = {
      id: `mat-guru-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || `Bahan ajar ${activeTab.toUpperCase()} dari Bu Siti Rahmawati, S.Pd.`,
      type: materialType,
      fileSize: fileSize || (activeTab === 'youtube' ? 'Streaming' : '2.4 MB'),
      downloaded: isOfflineReady,
      authorRole: 'guru',
      uploadedAt: 'Baru saja',
      content: {
        summary: summary.trim() || (
          activeTab === 'youtube'
            ? 'Video pembelajaran studi kasus sosiologi yang dapat ditonton secara langsung di portal.'
            : activeTab === 'gambar'
            ? imageAltText || 'Gambar materi visual pendukung pembelajaran sosiologi pedesaan.'
            : activeTab === 'pdf'
            ? `Dokumen PDF ${pdfFileName} (${pdfPageCount} Halaman) sebagai lembar kerja dan materi pegangan siswa.`
            : 'Materi tambahan guru untuk penguatan konsep sosiologi.'
        ),
        youtubeUrl: activeTab === 'youtube' ? youtubeUrl : undefined,
        youtubeId: activeTab === 'youtube' ? (detectedYouTubeId || undefined) : undefined,
        duration: activeTab === 'youtube' ? youtubeDuration : activeTab === 'audio' ? audioDuration : undefined,
        captions: activeTab === 'youtube' ? [
          { time: 0, text: youtubeCaptions || 'Pengamatan lapangan bersama perwakilan warga desa.' }
        ] : undefined,
        transcript: activeTab === 'youtube' ? youtubeTranscript : undefined,
        imageUrl: activeTab === 'gambar' ? imagePreviewUrl : undefined,
        imageAlt: activeTab === 'gambar' ? imageAltText : undefined,
        pdfFileName: activeTab === 'pdf' ? pdfFileName : undefined,
        pdfPageCount: activeTab === 'pdf' ? pdfPageCount : undefined,
        pdfTextSummary: activeTab === 'pdf' ? pdfPoints.split('\n').filter(p => p.trim()) : undefined,
        sections: activeTab === 'teks' ? [
          {
            title: textSectionTitle || 'Segmen Pembelajaran',
            text: textContent || 'Materi teks pengayaan yang membedah contoh kasus nyata pengelolaan lingkungan desa.'
          }
        ] : undefined,
      }
    };

    onAddMaterial(newMaterial);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] shadow-2xl overflow-hidden flex flex-col border border-emerald-950/20">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-emerald-800/20 bg-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Upload className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Unggah Bahan Belajar Guru
                </h3>
                <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-700 text-emerald-100">
                  Mode Guru
                </span>
              </div>
              <p className="text-[11px] text-emerald-200">
                Pilih link YouTube, unggah gambar/foto, dokumen PDF, atau teks UDL
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-800 flex items-center justify-center font-bold text-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
          {/* Format Tabs: YouTube, Gambar, PDF, Teks, Audio */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-800 block">
                Pilih Jenis Bahan Belajar yang Ingin Diunggah:
              </label>
              <span className="text-[10px] text-emerald-700 font-semibold">
                Multi-Representasi UDL
              </span>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {[
                { id: 'youtube', label: 'Link YouTube', icon: Youtube, color: 'text-red-600', badge: 'Video' },
                { id: 'gambar', label: 'Gambar/Foto', icon: ImageIcon, color: 'text-amber-600', badge: 'Visual' },
                { id: 'pdf', label: 'Dokumen PDF', icon: FileDown, color: 'text-rose-700', badge: 'Buku' },
                { id: 'teks', label: 'Teks Modul', icon: FileText, color: 'text-blue-600', badge: 'Segmen' },
                { id: 'audio', label: 'Audio Podcast', icon: Headphones, color: 'text-emerald-600', badge: 'Suara' },
              ].map((fmt) => {
                const Icon = fmt.icon;
                const isSelected = activeTab === fmt.id;
                return (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(fmt.id as UploadTab);
                      if (fmt.id === 'youtube') setFileSize('Streaming / Online');
                      else if (fmt.id === 'gambar') setFileSize('1.2 MB');
                      else if (fmt.id === 'pdf') setFileSize('2.4 MB');
                      else if (fmt.id === 'teks') setFileSize('45 KB');
                      else if (fmt.id === 'audio') setFileSize('3.2 MB');
                    }}
                    className={`p-2 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs scale-[1.02]'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-1 ${fmt.color}`} />
                    <span className="text-[10px] leading-tight font-medium">{fmt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* TAB 1: YOUTUBE LINK */}
          {activeTab === 'youtube' && (
            <div className="p-3.5 bg-red-50/70 border border-red-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-red-950 flex items-center gap-1.5 text-xs">
                  <Youtube className="w-4 h-4 text-red-600" />
                  <span>Input Link Video YouTube</span>
                </span>
                <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-semibold">
                  Embed Player Langsung
                </span>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-800 block mb-1">
                  URL Video YouTube:
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="url"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full pl-8 pr-3 py-2 rounded-lg border border-red-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                    <LinkIcon className="w-3.5 h-3.5 text-red-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Bisa berupa link biasa, link share (youtu.be), atau ID video (11 karakter).
                </span>
              </div>

              {/* YouTube Thumbnail / Embed Preview */}
              {detectedYouTubeId ? (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                    Pratinjau Video Terdeteksi:
                  </span>
                  <div className="relative rounded-xl overflow-hidden border border-red-200 bg-slate-900 aspect-video flex items-center justify-center">
                    <img
                      src={getYouTubeThumbnail(detectedYouTubeId)}
                      alt="Thumbnail YouTube"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                        <Youtube className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white bg-black/60 px-2 py-1 rounded">
                      <span>ID: {detectedYouTubeId}</span>
                      <span>Durasi: {youtubeDuration}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-2.5 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-800 text-[11px] flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-yellow-600" />
                  <span>Masukkan link YouTube untuk melihat pratinjau video.</span>
                </div>
              )}

              {/* Preset YouTube buttons */}
              <div>
                <span className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Pilihan Video Rekomendasi Sosiologi Pedesaan:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      selectYouTubePreset(
                        'https://www.youtube.com/watch?v=kYI-Ld8_8a4',
                        'Inovasi Pengolahan Sampah Desa Sukamaju',
                        '05:40'
                      )
                    }
                    className="p-1.5 rounded-lg border border-red-200 bg-white hover:bg-red-50 text-left text-[10px] text-slate-800"
                  >
                    ♻️ Pengolahan Sampah Desa
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      selectYouTubePreset(
                        'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
                        'Kearifan Lokal Gotong Royong Irigasi Persawahan',
                        '04:15'
                      )
                    }
                    className="p-1.5 rounded-lg border border-red-200 bg-white hover:bg-red-50 text-left text-[10px] text-slate-800"
                  >
                    🌾 Gotong Royong Irigasi Sawah
                  </button>
                </div>
              </div>

              {/* Closed Caption & Transkrip UDL */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-800 block mb-1">
                    Durasi Video:
                  </label>
                  <input
                    type="text"
                    value={youtubeDuration}
                    onChange={(e) => setYoutubeDuration(e.target.value)}
                    placeholder="05:30"
                    className="w-full p-2 rounded-lg border border-red-200 bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-800 block mb-1">
                    Takarir / Subtitle [CC] Contoh:
                  </label>
                  <input
                    type="text"
                    value={youtubeCaptions}
                    onChange={(e) => setYoutubeCaptions(e.target.value)}
                    placeholder="Teks ringkas yang mewakili adegan video"
                    className="w-full p-2 rounded-lg border border-red-200 bg-white text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GAMBAR / INFOGRAFIS */}
          {activeTab === 'gambar' && (
            <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-950 flex items-center gap-1.5 text-xs">
                  <ImageIcon className="w-4 h-4 text-amber-700" />
                  <span>Unggah Berkas Gambar / Foto Lapangan</span>
                </span>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold">
                  Visual Aksesibel
                </span>
              </div>

              {/* Local File Picker */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-800 block">
                  Pilih Gambar dari Perangkat (JPG, PNG, WebP):
                </label>
                <input
                  type="file"
                  accept="image/*"
                  ref={imageFileInputRef}
                  onChange={handleImageFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => imageFileInputRef.current?.click()}
                  className="w-full py-2.5 px-3 border-2 border-dashed border-amber-300 hover:border-amber-500 rounded-xl bg-white text-slate-700 flex items-center justify-center gap-2 hover:bg-amber-50/50 transition-colors"
                >
                  <Upload className="w-4 h-4 text-amber-600" />
                  <span className="font-semibold text-xs">
                    {imageFileName ? `Ganti Gambar (${imageFileName})` : 'Klik untuk Pilih File Gambar dari Laptop/HP'}
                  </span>
                </button>
              </div>

              {/* Image Preview */}
              {imagePreviewUrl && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                    Pratinjau Gambar:
                  </span>
                  <div className="relative rounded-xl overflow-hidden border border-amber-200 bg-slate-100 max-h-48 flex items-center justify-center">
                    <img
                      src={imagePreviewUrl}
                      alt={imageAltText || 'Pratinjau Gambar'}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-xs">
                      {imageFileName}
                    </div>
                  </div>
                </div>
              )}

              {/* Presets */}
              <div>
                <span className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Atau Gunakan Contoh Gambar Cepat:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreviewUrl(ASSET_IMAGES.infographic);
                      setImageFileName('diagram_peta_konsep_desa.jpg');
                      setImageAltText('Diagram visual alur pohon masalah sosial sampah pedesaan.');
                      setTitle('Infografis Peta Konsep Sebab-Dampak Sampah');
                    }}
                    className="p-1.5 rounded-lg border border-amber-200 bg-white hover:bg-amber-50 text-left text-[10px] text-slate-800"
                  >
                    📊 Diagram Sebab-Dampak
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreviewUrl(ASSET_IMAGES.heroStudents);
                      setImageFileName('foto_pengamatan_siswa_desa.jpg');
                      setImageAltText('Foto siswa SMA melakukan observasi lingkungan bersama di pedesaan.');
                      setTitle('Foto Pengamatan Lapangan Siswa');
                    }}
                    className="p-1.5 rounded-lg border border-amber-200 bg-white hover:bg-amber-50 text-left text-[10px] text-slate-800"
                  >
                    👥 Foto Lapangan Siswa
                  </button>
                </div>
              </div>

              {/* Accessibility Alt Text for Screen Reader */}
              <div>
                <label className="text-[11px] font-semibold text-slate-800 block mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>Deskripsi Aksesibel Gambar (Alt Text UDL):</span>
                </label>
                <textarea
                  rows={2}
                  value={imageAltText}
                  onChange={(e) => setImageAltText(e.target.value)}
                  placeholder="Deskripsikan isi gambar secara naratif untuk siswa tunanetra / pembaca layar..."
                  className="w-full p-2 rounded-lg border border-amber-200 bg-white text-xs leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 3: DOKUMEN PDF */}
          {activeTab === 'pdf' && (
            <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-rose-950 flex items-center gap-1.5 text-xs">
                  <FileDown className="w-4 h-4 text-rose-700" />
                  <span>Unggah Berkas Dokumen PDF</span>
                </span>
                <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-semibold">
                  Dokumen Resmi
                </span>
              </div>

              {/* Local PDF File Picker */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-800 block">
                  Pilih File PDF dari Komputer / Smartphone:
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  ref={pdfFileInputRef}
                  onChange={handlePdfFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => pdfFileInputRef.current?.click()}
                  className="w-full py-2.5 px-3 border-2 border-dashed border-rose-300 hover:border-rose-500 rounded-xl bg-white text-slate-700 flex items-center justify-center gap-2 hover:bg-rose-50/50 transition-colors"
                >
                  <FileDown className="w-4 h-4 text-rose-600" />
                  <span className="font-semibold text-xs">
                    {pdfFileName ? `File Terpilih: ${pdfFileName}` : 'Klik untuk Pilih File PDF (.pdf)'}
                  </span>
                </button>
              </div>

              {/* PDF Info Card Preview */}
              <div className="p-3 bg-white border border-rose-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
                    PDF
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs truncate max-w-[200px]">
                      {pdfFileName}
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      {pdfPageCount} Halaman · Ukuran: {fileSize}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
                  Siap Dibaca & Diunduh
                </span>
              </div>

              {/* Preset PDF options */}
              <div>
                <span className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Atau Pilih Dokumen Contoh Pembelajaran Sosiologi:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      selectPdfPreset(
                        'Modul_Sosiologi_Pedesaan_XI.pdf',
                        'Modul Lengkap Sosiologi: Masalah Sosial Pedesaan',
                        6,
                        '2.4 MB'
                      )
                    }
                    className="p-1.5 rounded-lg border border-rose-200 bg-white hover:bg-rose-50 text-left text-[10px] text-slate-800"
                  >
                    📄 Modul Sosiologi 6 Halaman
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      selectPdfPreset(
                        'Lembar_Instrumen_Observasi_Desa.pdf',
                        'Lembar Instrumen & Rubrik Lapangan Siswa',
                        4,
                        '1.1 MB'
                      )
                    }
                    className="p-1.5 rounded-lg border border-rose-200 bg-white hover:bg-rose-50 text-left text-[10px] text-slate-800"
                  >
                    📋 Lembar Observasi 4 Halaman
                  </button>
                </div>
              </div>

              {/* PDF Points Summary */}
              <div>
                <label className="text-[11px] font-semibold text-slate-800 block mb-1">
                  Poin Ringkasan Halaman PDF (Dapat Didengar via TTS):
                </label>
                <textarea
                  rows={3}
                  value={pdfPoints}
                  onChange={(e) => setPdfPoints(e.target.value)}
                  placeholder="Tuliskan daftar halaman atau ringkasan isi dokumen (satu per baris)..."
                  className="w-full p-2 rounded-lg border border-rose-200 bg-white text-xs leading-relaxed font-mono"
                />
              </div>
            </div>
          )}

          {/* TAB 4: TEKS MODUL RINGKAS */}
          {activeTab === 'teks' && (
            <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-2.5">
              <span className="font-bold text-blue-950 flex items-center gap-1.5 text-xs">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Konten Modul Teks Tersegmentasi (Prinsip UDL)</span>
              </span>
              <div>
                <label className="text-[11px] font-semibold text-blue-900 block mb-1">
                  Judul Segmen / Bagian:
                </label>
                <input
                  type="text"
                  value={textSectionTitle}
                  onChange={(e) => setTextSectionTitle(e.target.value)}
                  placeholder="Contoh: Segmen 1: Peluang Ekonomi Sirkular Desa"
                  className="w-full p-2 rounded-lg border border-blue-200 bg-white text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-blue-900 block mb-1">
                  Isi Teks Modul (Bahasa Terstruktur & Ringkas):
                </label>
                <textarea
                  rows={4}
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="Tuliskan uraian materi di sini secara ringkas dan bebas jargon rumit..."
                  className="w-full p-2.5 rounded-lg border border-blue-200 bg-white text-xs leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 5: AUDIO PODCAST */}
          {activeTab === 'audio' && (
            <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2.5">
              <span className="font-bold text-emerald-950 flex items-center gap-1.5 text-xs">
                <Headphones className="w-3.5 h-3.5 text-emerald-600" />
                <span>Pengaturan Audio Podcast Penjelasan Guru</span>
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-emerald-900 block mb-1">
                    Estimasi Durasi Suara:
                  </label>
                  <input
                    type="text"
                    value={audioDuration}
                    onChange={(e) => setAudioDuration(e.target.value)}
                    placeholder="04:15"
                    className="w-full p-2 rounded-lg border border-emerald-200 bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-emerald-900 block mb-1">
                    Ukuran File Rekaman:
                  </label>
                  <input
                    type="text"
                    value={fileSize}
                    onChange={(e) => setFileSize(e.target.value)}
                    placeholder="Contoh: 3.2 MB"
                    className="w-full p-2 rounded-lg border border-emerald-200 bg-white text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* General Metadata Inputs */}
          <div className="space-y-2.5 pt-1">
            <div>
              <label className="font-bold text-slate-800 block mb-1">
                Judul Materi / Bahan Ajar:
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Studi Kasus Video: Pengelolaan Sampah Desa Melati"
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Sub-judul / Penjelasan Singkat:
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Contoh: Materi pengayaan UDL oleh Dra. Siti Rahayu, M.Pd"
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Ringkasan Materi (Untuk Pembacaan TTS):
              </label>
              <textarea
                rows={2}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Tuliskan intisari pesan utama agar dapat dibacakan otomatis ke siswa yang membutuhkan narasi audio..."
                className="w-full p-2 rounded-xl border border-slate-300 text-xs leading-relaxed"
              />
            </div>
          </div>

          {/* Offline Sync Checkbox */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="font-bold text-slate-800 text-xs block">
                  Sertakan dalam Paket Unduhan Offline
                </span>
                <span className="text-[10px] text-slate-500">
                  {activeTab === 'youtube'
                    ? 'Transkrip & ringkasan teks otomatis tersedia saat siswa tidak memiliki kuota internet'
                    : 'Berkas materi dapat diunduh sekali untuk diakses kapan saja tanpa sinyal'}
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isOfflineReady}
              onChange={(e) => setIsOfflineReady(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
          >
            {isSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-200" />
                <span>Bahan Belajar Berhasil Diterbitkan ke Siswa!</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>
                  Terbitkan {activeTab === 'youtube' ? 'Link YouTube' : activeTab === 'gambar' ? 'Gambar' : activeTab === 'pdf' ? 'Dokumen PDF' : 'Bahan Belajar'} Ini
                </span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
