import { SubmissionRecord, MaterialItem, StudentProfile, ActivityItem, UserSession } from '../types/learning';
import { INITIAL_SUBMISSIONS, MATERIALS_DATA, INITIAL_STUDENTS, ACTIVITIES_DATA } from '../data/curriculumData';

const SUBMISSIONS_KEY = 'lms_submissions_v2';
const MATERIALS_KEY = 'lms_materials_v2';
const STUDENTS_KEY = 'lms_students_v2';
const ACTIVITIES_KEY = 'lms_activities_v2';
const AUTH_KEY = 'lms_active_user_v2';

// Create a BroadcastChannel for instantaneous sync across tabs/windows
const CHANNEL_NAME = 'lms_udl_sync_channel';
let broadcastChannel: BroadcastChannel | null = null;
try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    broadcastChannel = new BroadcastChannel(CHANNEL_NAME);
  }
} catch (e) {
  // BroadcastChannel not supported in some restricted iframes
}

export type SyncMessage =
  | { type: 'SUBMISSIONS_UPDATED'; data: SubmissionRecord[] }
  | { type: 'MATERIALS_UPDATED'; data: MaterialItem[] }
  | { type: 'STUDENTS_UPDATED'; data: StudentProfile[] }
  | { type: 'ACTIVITIES_UPDATED'; data: ActivityItem[] }
  | { type: 'STUDENT_SUBMITTED'; studentName: string; title: string };

export function broadcastChange(message: SyncMessage) {
  try {
    if (broadcastChannel) {
      broadcastChannel.postMessage(message);
    }
  } catch (e) {
    // ignore
  }
}

export function subscribeToSync(onMessage: (message: SyncMessage) => void) {
  if (broadcastChannel) {
    const handler = (event: MessageEvent<SyncMessage>) => {
      onMessage(event.data);
    };
    broadcastChannel.addEventListener('message', handler);
    return () => {
      broadcastChannel?.removeEventListener('message', handler);
    };
  }
  return () => {};
}

// Submissions Storage
export function loadStoredSubmissions(): SubmissionRecord[] {
  try {
    const raw = localStorage.getItem(SUBMISSIONS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    // ignore
  }
  return INITIAL_SUBMISSIONS;
}

export function saveStoredSubmissions(submissions: SubmissionRecord[], notifyStudentName?: string, taskTitle?: string) {
  try {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
    broadcastChange({ type: 'SUBMISSIONS_UPDATED', data: submissions });
    if (notifyStudentName && taskTitle) {
      broadcastChange({ type: 'STUDENT_SUBMITTED', studentName: notifyStudentName, title: taskTitle });
    }
  } catch (e) {
    // ignore
  }
}

// Materials Storage
export function loadStoredMaterials(): MaterialItem[] {
  try {
    const raw = localStorage.getItem(MATERIALS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    // ignore
  }
  return MATERIALS_DATA;
}

export function saveStoredMaterials(materials: MaterialItem[]) {
  try {
    localStorage.setItem(MATERIALS_KEY, JSON.stringify(materials));
    broadcastChange({ type: 'MATERIALS_UPDATED', data: materials });
  } catch (e) {
    // ignore
  }
}

// Students Storage
export function loadStoredStudents(): StudentProfile[] {
  try {
    const raw = localStorage.getItem(STUDENTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    // ignore
  }
  return INITIAL_STUDENTS;
}

export function saveStoredStudents(students: StudentProfile[]) {
  try {
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
    broadcastChange({ type: 'STUDENTS_UPDATED', data: students });
  } catch (e) {
    // ignore
  }
}

// Activities Storage
export function loadStoredActivities(): ActivityItem[] {
  try {
    const raw = localStorage.getItem(ACTIVITIES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    // ignore
  }
  return ACTIVITIES_DATA;
}

export function saveStoredActivities(activities: ActivityItem[]) {
  try {
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(activities));
    broadcastChange({ type: 'ACTIVITIES_UPDATED', data: activities });
  } catch (e) {
    // ignore
  }
}

// Auth Session Storage
export function loadStoredAuth(): UserSession | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    // ignore
  }
  return null;
}

export function saveStoredAuth(session: UserSession | null) {
  try {
    if (session) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  } catch (e) {
    // ignore
  }
}
