import React from 'react';
import {
  Home,
  HelpCircle,
  Target,
  BookOpen,
  ClipboardList,
  MessageSquare,
  Award,
  User,
} from 'lucide-react';

export type NavigationTab =
  | 'beranda'
  | 'petunjuk'
  | 'tujuan'
  | 'materi'
  | 'aktivitas'
  | 'diskusi'
  | 'asesmen'
  | 'profil';

interface BottomNavProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  completedActivitiesCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  completedActivitiesCount,
}) => {
  const tabs = [
    { id: 'beranda' as const, label: 'Beranda', icon: Home },
    { id: 'petunjuk' as const, label: 'Petunjuk', icon: HelpCircle },
    { id: 'tujuan' as const, label: 'Tujuan', icon: Target },
    { id: 'materi' as const, label: 'Materi', icon: BookOpen },
    { id: 'aktivitas' as const, label: 'Aktivitas', icon: ClipboardList, badge: completedActivitiesCount > 0 ? `${completedActivitiesCount}/3` : undefined },
    { id: 'diskusi' as const, label: 'Diskusi', icon: MessageSquare },
    { id: 'asesmen' as const, label: 'Asesmen', icon: Award },
    { id: 'profil' as const, label: 'Profil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200">
      <div className="max-w-3xl mx-auto px-1 sm:px-3">
        {/* Horizontal scrollable on very narrow screens, nicely distributed on standard screens */}
        <div className="flex items-center justify-between sm:justify-around h-14 overflow-x-auto no-scrollbar py-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`relative flex flex-col items-center justify-center min-w-[50px] sm:min-w-[60px] h-full px-1.5 rounded-lg transition-all ${
                  isActive
                    ? 'text-emerald-700 font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className="relative">
                  <Icon
                    className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform ${
                      isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                    }`}
                  />
                  {tab.badge && (
                    <span className="absolute -top-1.5 -right-3 text-[9px] font-bold bg-emerald-600 text-white px-1 rounded-full">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] sm:text-[11px] mt-0.5 tracking-tight whitespace-nowrap">
                  {tab.label}
                </span>
                {isActive && (
                  <span className="w-4 h-0.5 bg-emerald-600 rounded-full mt-0.5"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
