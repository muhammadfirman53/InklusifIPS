export type UserRole = 'siswa' | 'guru';

export type LearningPathway = 'online' | 'offline';

export type MediaFilter = 'semua' | 'teks' | 'video' | 'gambar' | 'pdf' | 'audio' | 'infografis';

export type AssessmentProductType = 'esai' | 'infografis' | 'presentasi' | 'audio' | 'video';

export interface RubricCriterion {
  id: string;
  name: string;
  weight: number; // in percentage, e.g. 25
  description: string;
  exemplarCriteria: {
    sangatBaik: string;
    baik: string;
    cukup: string;
    perluBimbingan: string;
  };
}

export interface MaterialItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'teks' | 'video' | 'audio' | 'infografis' | 'pdf';
  fileSize: string;
  downloaded: boolean;
  authorRole?: 'guru' | 'kurikulum';
  uploadedAt?: string;
  content: {
    summary: string;
    sections?: { title: string; text: string }[];
    videoUrl?: string;
    youtubeUrl?: string;
    youtubeId?: string;
    duration?: string;
    captions?: { time: number; text: string }[];
    transcript?: string;
    audioUrl?: string;
    imageUrl?: string;
    imageAlt?: string;
    pdfUrl?: string;
    pdfFileName?: string;
    pdfPageCount?: number;
    pdfTextSummary?: string[];
  };
}

export interface ActivityItem {
  id: string;
  title: string;
  category: 'individu' | 'kelompok' | 'kontekstual';
  timeEstimate: string;
  description: string;
  instructions: string[];
  templateFields?: { label: string; placeholder: string }[];
  completed: boolean;
}

export interface ForumPost {
  id: string;
  author: string;
  avatar: string;
  role: 'siswa' | 'guru';
  timeAgo: string;
  content: string;
  replies: {
    id: string;
    author: string;
    avatar: string;
    timeAgo: string;
    content: string;
  }[];
}

export interface SubmissionRecord {
  id: string;
  studentName: string;
  productType: AssessmentProductType;
  title: string;
  contentOrNote: string;
  submittedAt: string;
  status: 'tersimpan_offline' | 'terkirim_online' | 'diserahkan_fisik';
  grade?: number;
  feedback?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  nisn: string;
  classroom: string;
  preferredPathway: LearningPathway;
  specialNeedsOrNotes?: string;
  completedActivities: number;
  totalSubmissions: number;
  joinedAt: string;
}

export interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'xlarge';
  highContrast: boolean;
  textToSpeech: boolean;
  simplifiedText: boolean;
  soundEffects: boolean;
}
