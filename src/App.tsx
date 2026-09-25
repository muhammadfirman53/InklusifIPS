import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav, NavigationTab } from './components/BottomNav';
import { HomeScreen } from './components/screens/HomeScreen';
import { InstructionsScreen } from './components/screens/InstructionsScreen';
import { ObjectivesScreen } from './components/screens/ObjectivesScreen';
import { MaterialsScreen } from './components/screens/MaterialsScreen';
import { ActivitiesScreen } from './components/screens/ActivitiesScreen';
import { DiscussionScreen } from './components/screens/DiscussionScreen';
import { AssessmentScreen } from './components/screens/AssessmentScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';

import { PathwayModal } from './components/modals/PathwayModal';
import { OfflineDownloadModal } from './components/modals/OfflineDownloadModal';
import { NotificationsDrawer } from './components/modals/NotificationsDrawer';
import { ReflectionModal } from './components/modals/ReflectionModal';
import { ProjectBlueprintModal } from './components/modals/ProjectBlueprintModal';
import { TeacherUploadModal } from './components/modals/TeacherUploadModal';
import { StudentManagementModal } from './components/modals/StudentManagementModal';
import { ShareRoleLinksModal } from './components/modals/ShareRoleLinksModal';
import { ResetConfirmationModal } from './components/modals/ResetConfirmationModal';

import { LearningPathway, AccessibilitySettings, SubmissionRecord, UserRole, MaterialItem, StudentProfile, ActivityItem } from './types/learning';
import { INITIAL_SUBMISSIONS, MATERIALS_DATA, INITIAL_STUDENTS, ACTIVITIES_DATA } from './data/curriculumData';
import { speakText, stopSpeech } from './utils/speech';
import { Smartphone, Monitor, WifiOff, FileText, Sparkles, RefreshCw, CheckCircle2, RotateCcw } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('beranda');
  const [userRole, setUserRole] = useState<UserRole>('siswa');
  const [pathway, setPathway] = useState<LearningPathway>('online');
  const [isOfflineSimulated, setIsOfflineSimulated] = useState<boolean>(false);
  const [isMockupView, setIsMockupView] = useState<boolean>(false);
  const [materials, setMaterials] = useState<MaterialItem[]>(MATERIALS_DATA);
  const [students, setStudents] = useState<StudentProfile[]>(INITIAL_STUDENTS);
  const [activities, setActivities] = useState<ActivityItem[]>(ACTIVITIES_DATA);
  const [activeStudentId, setActiveStudentId] = useState<string>(INITIAL_STUDENTS[0].id);

  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    fontSize: 'normal',
    highContrast: false,
    textToSpeech: true,
    simplifiedText: false,
    soundEffects: true,
  });

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>(INITIAL_SUBMISSIONS);
  const [downloadedMaterialIds, setDownloadedMaterialIds] = useState<string[]>([
    'mat-modul',
    'mat-infografis',
  ]);

  // Modals state
  const [showPathwayModal, setShowPathwayModal] = useState<boolean>(false);
  const [showOfflineDownloadModal, setShowOfflineDownloadModal] = useState<boolean>(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState<boolean>(false);
  const [showReflectionModal, setShowReflectionModal] = useState<boolean>(false);
  const [showProjectBlueprintModal, setShowProjectBlueprintModal] = useState<boolean>(false);
  const [showTeacherUploadModal, setShowTeacherUploadModal] = useState<boolean>(false);
  const [showStudentManagementModal, setShowStudentManagementModal] = useState<boolean>(false);
  const [showShareLinksModal, setShowShareLinksModal] = useState<boolean>(false);
  const [showResetModal, setShowResetModal] = useState<boolean>(false);
  const [resetToastMessage, setResetToastMessage] = useState<string | null>(null);

  // Sync role with URL search params on mount: ?role=guru or ?role=siswa
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const roleParam = params.get('role');
      if (roleParam === 'guru' || roleParam === 'siswa') {
        setUserRole(roleParam);
      }
    } catch (err) {
      // ignore in environments without window.location
    }
  }, []);

  const handleSetRole = (role: UserRole) => {
    setUserRole(role);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('role', role);
      window.history.replaceState({}, '', url.toString());
    } catch (err) {
      // ignore
    }
  };

  const handleToggleRole = () => {
    handleSetRole(userRole === 'siswa' ? 'guru' : 'siswa');
  };

  // Reset Student Submissions & Completed Work
  const handleResetAllStudentWork = (mode: 'clear_all' | 'restore_defaults') => {
    if (mode === 'clear_all') {
      setSubmissions([]);
      setActivities((prev) => prev.map((act) => ({ ...act, completed: false })));
      setStudents((prev) =>
        prev.map((std) => ({ ...std, completedActivities: 0, totalSubmissions: 0 }))
      );
      setResetToastMessage(
        'Semua kiriman tugas, aktivitas kuis, dan jawaban siswa berhasil direset ke 0! Siswa dapat mengulang dari awal.'
      );
    } else {
      setSubmissions(INITIAL_SUBMISSIONS);
      setActivities(ACTIVITIES_DATA);
      setStudents(INITIAL_STUDENTS);
      setResetToastMessage(
        'Data pembelajaran siswa berhasil dikembalikan ke contoh bawaan awal.'
      );
    }
    setTimeout(() => setResetToastMessage(null), 4500);
  };

  // Student management actions
  const handleAddStudent = (newStudent: StudentProfile) => {
    setStudents([newStudent, ...students]);
  };

  const handleDeleteStudent = (studentId: string) => {
    setStudents(students.filter((s) => s.id !== studentId));
  };

  const handleSelectActiveStudent = (student: StudentProfile) => {
    setActiveStudentId(student.id);
    setPathway(student.preferredPathway);
    handleSetRole('siswa');
  };

  // Unread notifications count
  const [unreadNotifications, setUnreadNotifications] = useState<number>(2);

  // Handle Speech
  const handleSpeak = (text: string) => {
    if (!accessibility.textToSpeech) return;
    setIsSpeaking(true);
    speakText(text, () => setIsSpeaking(false));
  };

  const handleStopSpeaking = () => {
    stopSpeech();
    setIsSpeaking(false);
  };

  // Switch tab with scroll-to-top
  const handleSelectTab = (tab: NavigationTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add new submission
  const handleSubmitTask = (newSubmission: SubmissionRecord) => {
    setSubmissions([newSubmission, ...submissions]);
  };

  const handleDownloadedAll = () => {
    setDownloadedMaterialIds([
      'mat-modul',
      'mat-infografis',
      'mat-video',
      'mat-audio',
      'mat-transkrip',
    ]);
    setPathway('offline');
  };

  // Font size class mapping
  const getFontSizeClass = () => {
    switch (accessibility.fontSize) {
      case 'large':
        return 'font-size-large';
      case 'xlarge':
        return 'font-size-xlarge';
      default:
        return 'font-size-normal';
    }
  };

  // Handle add material from teacher
  const handleAddMaterial = (newMat: MaterialItem) => {
    setMaterials([newMat, ...materials]);
    if (newMat.downloaded) {
      setDownloadedMaterialIds((prev) => [...prev, newMat.id]);
    }
  };

  // Render current screen
  const renderScreen = () => {
    switch (currentTab) {
      case 'beranda':
        return (
          <HomeScreen
            userRole={userRole}
            pathway={pathway}
            isOfflineSimulated={isOfflineSimulated}
            studentCount={students.length}
            onNavigate={handleSelectTab}
            onOpenPathwayModal={() => setShowPathwayModal(true)}
            onOpenOfflineDownload={() => setShowOfflineDownloadModal(true)}
            onOpenReflection={() => setShowReflectionModal(true)}
            onOpenTeacherUpload={() => setShowTeacherUploadModal(true)}
            onOpenStudentManagement={() => setShowStudentManagementModal(true)}
            onOpenShareLinks={() => setShowShareLinksModal(true)}
            onOpenResetModal={() => setShowResetModal(true)}
            onSpeak={handleSpeak}
          />
        );
      case 'petunjuk':
        return (
          <InstructionsScreen
            onSpeak={handleSpeak}
            onNavigate={handleSelectTab}
            onOpenOfflineDownload={() => setShowOfflineDownloadModal(true)}
          />
        );
      case 'tujuan':
        return (
          <ObjectivesScreen
            onSpeak={handleSpeak}
            onNavigate={handleSelectTab}
          />
        );
      case 'materi':
        return (
          <MaterialsScreen
            materials={materials}
            userRole={userRole}
            isOfflineSimulated={isOfflineSimulated}
            onSpeak={handleSpeak}
            onOpenTeacherUpload={() => setShowTeacherUploadModal(true)}
            onDownloaded={(id) => {
              if (!downloadedMaterialIds.includes(id)) {
                setDownloadedMaterialIds([...downloadedMaterialIds, id]);
              }
            }}
          />
        );
      case 'aktivitas':
        return (
          <ActivitiesScreen
            activities={activities}
            onUpdateActivities={setActivities}
            onSpeak={handleSpeak}
          />
        );
      case 'diskusi':
        return (
          <DiscussionScreen
            isOfflineSimulated={isOfflineSimulated}
            onSpeak={handleSpeak}
          />
        );
      case 'asesmen':
        return (
          <AssessmentScreen
            userRole={userRole}
            isOfflineSimulated={isOfflineSimulated}
            onSpeak={handleSpeak}
            submissions={submissions}
            onSubmitTask={handleSubmitTask}
            onOpenStudentManagement={() => setShowStudentManagementModal(true)}
            onOpenResetModal={() => setShowResetModal(true)}
            onUpdateSubmission={(updated) =>
              setSubmissions((prev) =>
                prev.map((s) => (s.id === updated.id ? updated : s))
              )
            }
          />
        );
      case 'profil':
        return (
          <ProfileScreen
            userRole={userRole}
            accessibility={accessibility}
            onUpdateAccessibility={setAccessibility}
            onToggleRole={handleToggleRole}
            onOpenTeacherUpload={() => setShowTeacherUploadModal(true)}
            onOpenStudentManagement={() => setShowStudentManagementModal(true)}
            onOpenShareLinks={() => setShowShareLinksModal(true)}
            onOpenResetModal={() => setShowResetModal(true)}
            onOpenOfflineDownload={() => setShowOfflineDownloadModal(true)}
            onNavigate={handleSelectTab}
            onOpenBlueprint={() => setShowProjectBlueprintModal(true)}
            onSpeak={handleSpeak}
          />
        );
    }
  };

  return (
    <div
      className={`min-h-screen app-canvas ${getFontSizeClass()} ${
        accessibility.highContrast ? 'high-contrast' : 'bg-slate-100 text-slate-800'
      }`}
    >
      {/* Toast Reset Message */}
      {resetToastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-emerald-950 border-2 border-emerald-500 text-white text-xs px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 max-w-md animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{resetToastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        currentTab={currentTab}
        userRole={userRole}
        pathway={pathway}
        isOfflineSimulated={isOfflineSimulated}
        isMockupView={isMockupView}
        unreadNotificationsCount={unreadNotifications}
        isSpeaking={isSpeaking}
        onToggleRole={handleToggleRole}
        onOpenTeacherUpload={() => setShowTeacherUploadModal(true)}
        onOpenShareLinks={() => setShowShareLinksModal(true)}
        onOpenStudentManagement={() => setShowStudentManagementModal(true)}
        onOpenResetModal={() => setShowResetModal(true)}
        onToggleOfflineSim={() => setIsOfflineSimulated(!isOfflineSimulated)}
        onToggleMockupView={() => setIsMockupView(!isMockupView)}
        onOpenPathwayModal={() => setShowPathwayModal(true)}
        onOpenNotifications={() => {
          setShowNotificationsModal(true);
          setUnreadNotifications(0);
        }}
        onOpenBlueprint={() => setShowProjectBlueprintModal(true)}
        onStopSpeaking={handleStopSpeaking}
      />

      {/* Main View Area */}
      {isMockupView ? (
        /* Smartphone Mockup Container (replicating the uploaded ChatGPT mockup phone frame) */
        <div className="py-6 px-3 flex flex-col items-center justify-center min-h-[calc(100vh-60px)] bg-slate-900/90 backdrop-blur-md">
          <div className="mb-3 text-center text-white">
            <span className="text-xs font-semibold px-3 py-1 bg-emerald-600/80 rounded-full inline-flex items-center gap-1.5 shadow-sm">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mode Tampilan Smartphone Mockup (V1)</span>
            </span>
            <p className="text-[11px] text-slate-400 mt-1">
              Simulasi interaktif tampilan HP siswa di wilayah pedesaan
            </p>
          </div>

          {/* Smartphone Frame Outer Bezel */}
          <div className="relative w-full max-w-[400px] h-[780px] bg-black rounded-[48px] p-3.5 shadow-2xl border-4 border-slate-700 ring-8 ring-slate-800/50 flex flex-col overflow-hidden">
            {/* Speaker / Dynamic Island Top Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
              <div className="w-10 h-1.5 rounded-full bg-slate-900"></div>
            </div>

            {/* Mobile Screen Inside Frame */}
            <div className="w-full h-full bg-slate-100 rounded-[36px] overflow-y-auto overflow-x-hidden relative flex flex-col pt-7 pb-16 no-scrollbar">
              <main className="flex-1 px-3 pt-2">
                {renderScreen()}
              </main>

              {/* Bottom Nav inside Phone Frame */}
              <div className="absolute bottom-0 left-0 right-0 z-40">
                <BottomNav
                  activeTab={currentTab}
                  onSelectTab={handleSelectTab}
                  completedActivitiesCount={1}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Full-Width / Responsive Tablet & Mobile Container */
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <main>{renderScreen()}</main>

          {/* Fixed Bottom Navigation */}
          <BottomNav
            activeTab={currentTab}
            onSelectTab={handleSelectTab}
            completedActivitiesCount={1}
          />
        </div>
      )}

      {/* Modals & Dialogs */}
      {showPathwayModal && (
        <PathwayModal
          currentPathway={pathway}
          onSelectPathway={(newPathway) => setPathway(newPathway)}
          onClose={() => setShowPathwayModal(false)}
        />
      )}

      {showOfflineDownloadModal && (
        <OfflineDownloadModal
          onClose={() => setShowOfflineDownloadModal(false)}
          onDownloadedAll={handleDownloadedAll}
        />
      )}

      {showNotificationsModal && (
        <NotificationsDrawer
          onClose={() => setShowNotificationsModal(false)}
          onNavigate={handleSelectTab}
          onOpenReflection={() => setShowReflectionModal(true)}
        />
      )}

      {showReflectionModal && (
        <ReflectionModal onClose={() => setShowReflectionModal(false)} />
      )}

      {showProjectBlueprintModal && (
        <ProjectBlueprintModal
          onClose={() => setShowProjectBlueprintModal(false)}
        />
      )}

      {showTeacherUploadModal && (
        <TeacherUploadModal
          onClose={() => setShowTeacherUploadModal(false)}
          onAddMaterial={handleAddMaterial}
        />
      )}

      {showStudentManagementModal && (
        <StudentManagementModal
          students={students}
          onAddStudent={handleAddStudent}
          onDeleteStudent={handleDeleteStudent}
          onSelectActiveStudent={handleSelectActiveStudent}
          activeStudentId={activeStudentId}
          onClose={() => setShowStudentManagementModal(false)}
        />
      )}

      {showShareLinksModal && (
        <ShareRoleLinksModal
          currentRole={userRole}
          onSelectRole={handleSetRole}
          onClose={() => setShowShareLinksModal(false)}
        />
      )}

      {showResetModal && (
        <ResetConfirmationModal
          onConfirmReset={handleResetAllStudentWork}
          onClose={() => setShowResetModal(false)}
        />
      )}
    </div>
  );
}
