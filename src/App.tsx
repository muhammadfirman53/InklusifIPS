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
import { LoginScreen } from './components/auth/LoginScreen';

import { PathwayModal } from './components/modals/PathwayModal';
import { OfflineDownloadModal } from './components/modals/OfflineDownloadModal';
import { NotificationsDrawer } from './components/modals/NotificationsDrawer';
import { ReflectionModal } from './components/modals/ReflectionModal';
import { ProjectBlueprintModal } from './components/modals/ProjectBlueprintModal';
import { TeacherUploadModal } from './components/modals/TeacherUploadModal';
import { StudentManagementModal } from './components/modals/StudentManagementModal';
import { ShareRoleLinksModal } from './components/modals/ShareRoleLinksModal';
import { ResetConfirmationModal } from './components/modals/ResetConfirmationModal';

import {
  LearningPathway,
  AccessibilitySettings,
  SubmissionRecord,
  UserRole,
  MaterialItem,
  StudentProfile,
  ActivityItem,
  UserSession,
} from './types/learning';

import {
  loadStoredSubmissions,
  saveStoredSubmissions,
  loadStoredMaterials,
  saveStoredMaterials,
  loadStoredStudents,
  saveStoredStudents,
  loadStoredActivities,
  saveStoredActivities,
  loadStoredAuth,
  saveStoredAuth,
  subscribeToSync,
} from './utils/storageSync';

import { speakText, stopSpeech } from './utils/speech';
import {
  Smartphone,
  Monitor,
  WifiOff,
  FileText,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  RotateCcw,
  BellRing
} from 'lucide-react';

export default function App() {
  // Authentication & Session
  const [currentUserSession, setCurrentUserSession] = useState<UserSession | null>(() => loadStoredAuth());
  const [currentTab, setCurrentTab] = useState<NavigationTab>('beranda');

  // Shared synchronized states
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>(() => loadStoredSubmissions());
  const [materials, setMaterials] = useState<MaterialItem[]>(() => loadStoredMaterials());
  const [students, setStudents] = useState<StudentProfile[]>(() => loadStoredStudents());
  const [activities, setActivities] = useState<ActivityItem[]>(() => loadStoredActivities());

  // Active student & role derived from session
  const userRole: UserRole = currentUserSession?.role || 'siswa';
  const currentStudentName = currentUserSession?.name || (students[0]?.name ?? 'Dita Anggraini');
  const [pathway, setPathway] = useState<LearningPathway>(
    () => currentUserSession?.preferredPathway || 'online'
  );

  const [isOfflineSimulated, setIsOfflineSimulated] = useState<boolean>(false);
  const [isMockupView, setIsMockupView] = useState<boolean>(false);
  const [activeStudentId, setActiveStudentId] = useState<string>(() => students[0]?.id || 'std-1');

  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    fontSize: 'normal',
    highContrast: false,
    textToSpeech: true,
    simplifiedText: false,
    soundEffects: true,
  });

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
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

  // Live Toast Notifications
  const [resetToastMessage, setResetToastMessage] = useState<string | null>(null);
  const [liveTeacherToast, setLiveTeacherToast] = useState<string | null>(null);

  // Read URL params: e.g. ?role=guru or ?role=siswa
  const [urlRoleParam, setUrlRoleParam] = useState<UserRole | undefined>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const r = params.get('role');
      if (r === 'guru' || r === 'siswa') return r as UserRole;
    } catch (e) {
      // ignore
    }
    return undefined;
  });

  // Cross-Tab Real-time Synchronisation (BroadcastChannel)
  useEffect(() => {
    const unsubscribe = subscribeToSync((msg) => {
      if (msg.type === 'SUBMISSIONS_UPDATED') {
        setSubmissions(msg.data);
      } else if (msg.type === 'MATERIALS_UPDATED') {
        setMaterials(msg.data);
      } else if (msg.type === 'STUDENTS_UPDATED') {
        setStudents(msg.data);
      } else if (msg.type === 'ACTIVITIES_UPDATED') {
        setActivities(msg.data);
      } else if (msg.type === 'STUDENT_SUBMITTED') {
        if (currentUserSession?.role === 'guru') {
          setLiveTeacherToast(
            `📢 Tugas Baru Masuk: "${msg.title}" oleh ${msg.studentName}! Siap dikoreksi di LMS Guru.`
          );
          setTimeout(() => setLiveTeacherToast(null), 6000);
        }
      }
    });
    return unsubscribe;
  }, [currentUserSession?.role]);

  // Handle Login
  const handleLoginSuccess = (session: UserSession) => {
    setCurrentUserSession(session);
    saveStoredAuth(session);
    if (session.role === 'siswa' && session.preferredPathway) {
      setPathway(session.preferredPathway);
    }
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('role', session.role);
      window.history.replaceState({}, '', url.toString());
    } catch (e) {
      // ignore
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setCurrentUserSession(null);
    saveStoredAuth(null);
    stopSpeech();
    setIsSpeaking(false);
  };

  // Switch role exclusively for Teacher Simulation (never accessible to student)
  const handleTeacherSimulateStudent = () => {
    if (userRole === 'guru') {
      const simulatedSession: UserSession = {
        role: 'siswa',
        name: students[0]?.name || 'Dita Anggraini',
        nisn: students[0]?.nisn || '0081234561',
        classroom: 'XI-IPS 1 (Mode Simulasi Guru)',
        preferredPathway: 'online',
      };
      setCurrentUserSession(simulatedSession);
      saveStoredAuth(simulatedSession);
    }
  };

  // Reset Student Submissions & Completed Work
  const handleResetAllStudentWork = (mode: 'clear_all' | 'restore_defaults') => {
    if (mode === 'clear_all') {
      setSubmissions([]);
      saveStoredSubmissions([]);

      const resetActs = activities.map((act) => ({ ...act, completed: false }));
      setActivities(resetActs);
      saveStoredActivities(resetActs);

      const resetStds = students.map((std) => ({ ...std, completedActivities: 0, totalSubmissions: 0 }));
      setStudents(resetStds);
      saveStoredStudents(resetStds);

      setResetToastMessage(
        'Semua kiriman tugas, aktivitas kuis, dan jawaban siswa berhasil direset ke 0! Siswa dapat mengulang dari awal.'
      );
    } else {
      setSubmissions(loadStoredSubmissions());
      saveStoredSubmissions(loadStoredSubmissions());

      setActivities(loadStoredActivities());
      saveStoredActivities(loadStoredActivities());

      setStudents(loadStoredStudents());
      saveStoredStudents(loadStoredStudents());

      setResetToastMessage(
        'Data pembelajaran siswa berhasil dikembalikan ke contoh bawaan awal.'
      );
    }
    setTimeout(() => setResetToastMessage(null), 4500);
  };

  // Student management actions
  const handleAddStudent = (newStudent: StudentProfile) => {
    const updated = [newStudent, ...students];
    setStudents(updated);
    saveStoredStudents(updated);
  };

  const handleDeleteStudent = (studentId: string) => {
    const updated = students.filter((s) => s.id !== studentId);
    setStudents(updated);
    saveStoredStudents(updated);
  };

  const handleSelectActiveStudent = (student: StudentProfile) => {
    setActiveStudentId(student.id);
    setPathway(student.preferredPathway);
    if (currentUserSession?.role === 'guru') {
      // Teacher choosing to inspect as this student
      const simulatedSession: UserSession = {
        role: 'siswa',
        name: student.name,
        nisn: student.nisn,
        classroom: student.classroom,
        studentId: student.id,
        preferredPathway: student.preferredPathway,
      };
      setCurrentUserSession(simulatedSession);
      saveStoredAuth(simulatedSession);
    }
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

  // Add new submission by student (instantly connects to teacher LMS!)
  const handleSubmitTask = (newSubmission: SubmissionRecord) => {
    const updated = [newSubmission, ...submissions];
    setSubmissions(updated);
    saveStoredSubmissions(updated, newSubmission.studentName, newSubmission.title);

    // Update student's total submissions count
    setStudents((prev) =>
      prev.map((std) =>
        std.name.toLowerCase() === newSubmission.studentName.toLowerCase()
          ? { ...std, totalSubmissions: std.totalSubmissions + 1 }
          : std
      )
    );
  };

  // Teacher updates/grades submission
  const handleUpdateSubmission = (updatedSub: SubmissionRecord) => {
    const updatedList = submissions.map((s) => (s.id === updatedSub.id ? updatedSub : s));
    setSubmissions(updatedList);
    saveStoredSubmissions(updatedList);
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

  // Handle add material from teacher (saves to storage & syncs to students)
  const handleAddMaterial = (newMat: MaterialItem) => {
    const updated = [newMat, ...materials];
    setMaterials(updated);
    saveStoredMaterials(updated);
    if (newMat.downloaded) {
      setDownloadedMaterialIds((prev) => [...prev, newMat.id]);
    }
  };

  // IF NOT LOGGED IN: Render LoginScreen
  if (!currentUserSession) {
    return (
      <LoginScreen
        initialRole={urlRoleParam || 'siswa'}
        students={students}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  // Render current screen
  const renderScreen = () => {
    switch (currentTab) {
      case 'beranda':
        return (
          <HomeScreen
            userRole={userRole}
            currentStudentName={currentStudentName}
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
            onUpdateActivities={(newActs) => {
              setActivities(newActs);
              saveStoredActivities(newActs);
            }}
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
            currentStudentName={currentStudentName}
            isOfflineSimulated={isOfflineSimulated}
            onSpeak={handleSpeak}
            submissions={submissions}
            onSubmitTask={handleSubmitTask}
            onOpenStudentManagement={() => setShowStudentManagementModal(true)}
            onOpenResetModal={() => setShowResetModal(true)}
            onUpdateSubmission={handleUpdateSubmission}
          />
        );
      case 'profil':
        return (
          <ProfileScreen
            userRole={userRole}
            activeUserName={currentUserSession?.name}
            activeNisn={currentUserSession?.nisn}
            activeClassroom={currentUserSession?.classroom}
            accessibility={accessibility}
            onUpdateAccessibility={setAccessibility}
            onLogout={handleLogout}
            onToggleRole={userRole === 'guru' ? handleTeacherSimulateStudent : undefined}
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

      {/* Live Teacher Notification when student submits */}
      {liveTeacherToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border-2 border-emerald-400 text-white text-xs px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 max-w-md w-11/12 animate-fadeIn">
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
            <BellRing className="w-4 h-4 text-white animate-spin" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-emerald-300">Pemberitahuan Real-Time LMS</p>
            <p className="text-[11px] text-slate-200">{liveTeacherToast}</p>
          </div>
          <button
            onClick={() => setLiveTeacherToast(null)}
            className="text-slate-400 hover:text-white text-xs px-1"
          >
            ✕
          </button>
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
        activeUserName={currentUserSession?.name}
        onLogout={handleLogout}
        onToggleRole={userRole === 'guru' ? handleTeacherSimulateStudent : undefined}
        onOpenTeacherUpload={() => setShowTeacherUploadModal(true)}
        onOpenShareLinks={() => setShowShareLinksModal(true)}
        onOpenStudentManagement={() => setShowStudentManagementModal(true)}
        onOpenResetModal={() => setShowResetModal(true)}
        onToggleOfflineSim={() => setIsOfflineSimulated(!isOfflineSimulated)}
        onToggleMockupView={() => setIsMockupView(!isMockupView)}
        onOpenPathwayModal={() => setShowPathwayModal(true)}
        onOpenNotifications={() => setShowNotificationsModal(true)}
        onOpenBlueprint={() => setShowProjectBlueprintModal(true)}
        onStopSpeaking={handleStopSpeaking}
      />

      {/* Main Content Area */}
      <main className="p-3 sm:p-5 max-w-4xl mx-auto">
        {renderScreen()}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={currentTab}
        onSelectTab={handleSelectTab}
        completedActivitiesCount={activities.filter((a) => a.completed).length}
      />

      {/* Modals & Drawers */}
      {showPathwayModal && (
        <PathwayModal
          currentPathway={pathway}
          onSelectPathway={(p) => {
            setPathway(p);
            setShowPathwayModal(false);
          }}
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
          onClose={() => {
            setShowNotificationsModal(false);
            setUnreadNotifications(0);
          }}
          onNavigate={handleSelectTab}
          onOpenReflection={() => {
            setShowNotificationsModal(false);
            setShowReflectionModal(true);
          }}
        />
      )}

      {showReflectionModal && (
        <ReflectionModal onClose={() => setShowReflectionModal(false)} />
      )}

      {showProjectBlueprintModal && (
        <ProjectBlueprintModal onClose={() => setShowProjectBlueprintModal(false)} />
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
          onSelectRole={(r) => {
            if (r === 'siswa') {
              handleTeacherSimulateStudent();
            }
          }}
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
