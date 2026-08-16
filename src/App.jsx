import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Bell, BellOff } from 'lucide-react';
import CuteMascot from './components/CuteMascot';
import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';
import SessionTracker from './components/SessionTracker';
import SettingsModal from './components/SettingsModal';
import { sounds } from './utils/audio';

export default function App() {
  // 1. 타이머 세부 설정 (기본값)
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('pomodoro_settings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      focusMinutes: 25,
      shortBreakMinutes: 5,
      longBreakMinutes: 15,
      longBreakInterval: 4,
      autoStartBreaks: false,
      autoStartFocus: false,
    };
  });

  // 2. 현재 상태 관리
  const [mode, setMode] = useState('focus'); // 'focus' | 'shortBreak' | 'longBreak'
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(settings.focusMinutes * 60);
  const [sessionsCompleted, setSessionsCompleted] = useState(() => {
    const saved = localStorage.getItem('pomodoro_sessions');
    return saved ? Number(saved) : 0;
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // 로컬 스토리지 동기화
  useEffect(() => {
    localStorage.setItem('pomodoro_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('pomodoro_sessions', String(sessionsCompleted));
  }, [sessionsCompleted]);

  // 전체 시간 계산
  const getTotalDuration = () => {
    if (mode === 'focus') return settings.focusMinutes * 60;
    if (mode === 'shortBreak') return settings.shortBreakMinutes * 60;
    if (mode === 'longBreak') return settings.longBreakMinutes * 60;
    return 25 * 60;
  };

  // 모드 전환 함수
  const switchMode = (newMode, autoStart = false) => {
    setMode(newMode);
    let newDuration = settings.focusMinutes * 60;
    if (newMode === 'shortBreak') newDuration = settings.shortBreakMinutes * 60;
    if (newMode === 'longBreak') newDuration = settings.longBreakMinutes * 60;
    
    setTimeLeft(newDuration);
    setIsRunning(autoStart);
  };

  // 시작 / 일시정지 토글
  const handleToggleStart = () => {
    if (!isRunning) {
      sounds.playStart();
    } else {
      sounds.playPause();
    }
    setIsRunning((prev) => !prev);
  };

  // 리셋
  const handleReset = () => {
    sounds.playClick();
    setIsRunning(false);
    setTimeLeft(getTotalDuration());
  };

  // 스킵 (다음 세션으로 넘어가기)
  const handleSkip = () => {
    sounds.playClick();
    if (mode === 'focus') {
      const nextCount = sessionsCompleted + 1;
      setSessionsCompleted(nextCount);
      if (nextCount % settings.longBreakInterval === 0) {
        switchMode('longBreak', settings.autoStartBreaks);
      } else {
        switchMode('shortBreak', settings.autoStartBreaks);
      }
    } else {
      switchMode('focus', settings.autoStartFocus);
    }
  };

  // 미세 시간 조절 (+1분, -1분)
  const handleAdjustTime = (secondsDelta) => {
    setTimeLeft((prev) => Math.max(10, prev + secondsDelta));
  };

  // 사운드 토글
  const handleToggleSound = () => {
    sounds.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    sounds.playClick();
  };

  // 설정 저장 처리
  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    // 현재 모드에 맞게 시간 재계산
    if (!isRunning) {
      if (mode === 'focus') setTimeLeft(newSettings.focusMinutes * 60);
      else if (mode === 'shortBreak') setTimeLeft(newSettings.shortBreakMinutes * 60);
      else if (mode === 'longBreak') setTimeLeft(newSettings.longBreakMinutes * 60);
    }
  };

  // 타이머 인터벌 & 탭 타이틀 카운트다운
  useEffect(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    const emoji = mode === 'focus' ? '🍅' : mode === 'shortBreak' ? '🍃' : '🌙';
    document.title = `${formatted} ${emoji} | 뽀모도로 타이머`;

    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimerComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  // 타이머 완료 시 동작
  const handleTimerComplete = () => {
    // 1. 오디오 차임벨
    sounds.playComplete();

    // 2. 축하 콘페티 파티클
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fb7185', '#34d399', '#c084fc', '#f59e0b', '#38bdf8']
      });
    } catch (e) {}

    // 3. 모드 전환
    if (mode === 'focus') {
      const nextCount = sessionsCompleted + 1;
      setSessionsCompleted(nextCount);
      if (nextCount % settings.longBreakInterval === 0) {
        switchMode('longBreak', settings.autoStartBreaks);
      } else {
        switchMode('shortBreak', settings.autoStartBreaks);
      }
    } else {
      switchMode('focus', settings.autoStartFocus);
    }
  };

  return (
    <div className="min-h-screen bg-darkBg text-slate-100 flex flex-col items-center justify-between p-4 sm:p-6 relative overflow-hidden">
      {/* 배경 장식 글로우 조명 (몽환적인 힐링 다크 무드) */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* 헤더 */}
      <header className="w-full max-w-xl flex items-center justify-between z-10 pt-2 pb-1">
        <div className="flex items-center gap-2">
          <span className="text-2xl animate-bounce-soft">🍅</span>
          <div>
            <h1 className="font-['Fredoka',sans-serif] font-bold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
              뽀모도로 타이머
              <span className="text-[10px] uppercase font-bold tracking-widest bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full">
                Cute & Lean
              </span>
            </h1>
            <p className="text-xs text-slate-400">1인 기업 대표님을 위한 힐링 몰입 파트너</p>
          </div>
        </div>

        {/* 미니 뱃지 */}
        <div className="hidden sm:flex items-center gap-1 bg-darkCard/80 border border-slate-800 px-3 py-1.5 rounded-full text-xs text-slate-300 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>알렉스 부장 보좌 모드 ON</span>
        </div>
      </header>

      {/* 메인 콘텐츠 카드 */}
      <main className="w-full max-w-md my-auto flex flex-col items-center gap-2 z-10">
        {/* 인터랙티브 귀여운 마스코트 */}
        <CuteMascot
          mode={mode}
          isRunning={isRunning}
          sessionsCompleted={sessionsCompleted}
        />

        {/* 대형 원형 타이머 */}
        <TimerDisplay
          timeLeft={timeLeft}
          totalDuration={getTotalDuration()}
          mode={mode}
          isRunning={isRunning}
          onAdjustTime={handleAdjustTime}
        />

        {/* 컨트롤 패널 */}
        <Controls
          isRunning={isRunning}
          mode={mode}
          soundEnabled={soundEnabled}
          onToggleStart={handleToggleStart}
          onReset={handleReset}
          onSkip={handleSkip}
          onChangeMode={(newMode) => switchMode(newMode, false)}
          onToggleSound={handleToggleSound}
          onOpenSettings={() => {
            sounds.playClick();
            setIsSettingsOpen(true);
          }}
        />

        {/* 세션 달성 트래커 */}
        <div className="w-full mt-3">
          <SessionTracker
            sessionsCompleted={sessionsCompleted}
            dailyGoal={settings.longBreakInterval}
            focusDurationMinutes={settings.focusMinutes}
            onResetStats={() => setSessionsCompleted(0)}
          />
        </div>
      </main>

      {/* 푸터 */}
      <footer className="w-full max-w-xl text-center z-10 py-3 text-xs text-slate-500 flex items-center justify-center gap-2">
        <span>충성! 대표님의 성공을 응원합니다 ⚡🚀</span>
      </footer>

      {/* 설정 모달 */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={handleSaveSettings}
      />
    </div>
  );
}
