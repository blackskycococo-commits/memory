import React from 'react';
import { Plus, Minus, Flame, Coffee, Moon } from 'lucide-react';
import { sounds } from '../utils/audio';

/**
 * 대형 타이머 및 원형 프로그레스 게이지 디스플레이
 */
export default function TimerDisplay({
  timeLeft,
  totalDuration,
  mode,
  isRunning,
  onAdjustTime,
}) {
  // 분/초 포맷팅 (MM:SS)
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // 프로그레스 링 계산
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = totalDuration > 0 ? (timeLeft / totalDuration) : 0;
  const strokeDashoffset = circumference - (progress * circumference);

  // 모드별 테마 색상 설정
  const getThemeConfig = () => {
    switch (mode) {
      case 'focus':
        return {
          stroke: '#fb7185',
          glow: 'drop-shadow(0 0 12px rgba(251, 113, 133, 0.45))',
          badgeBg: 'bg-rose-500/15 border-rose-500/30 text-rose-300',
          badgeText: '몰입 집중 모드',
          icon: <Flame className="w-4 h-4 text-rose-400 animate-pulse" />,
        };
      case 'shortBreak':
        return {
          stroke: '#34d399',
          glow: 'drop-shadow(0 0 12px rgba(52, 211, 153, 0.45))',
          badgeBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
          badgeText: '힐링 5분 휴식',
          icon: <Coffee className="w-4 h-4 text-emerald-400 animate-bounce-soft" />,
        };
      case 'longBreak':
        return {
          stroke: '#c084fc',
          glow: 'drop-shadow(0 0 12px rgba(192, 132, 252, 0.45))',
          badgeBg: 'bg-purple-500/15 border-purple-500/30 text-purple-300',
          badgeText: '꿀맛 긴 휴식',
          icon: <Moon className="w-4 h-4 text-purple-400" />,
        };
      default:
        return {
          stroke: '#fb7185',
          glow: 'none',
          badgeBg: 'bg-rose-500/10 text-rose-400',
          badgeText: '집중 모드',
          icon: null,
        };
    }
  };

  const theme = getThemeConfig();

  const handleAdjust = (secondsDelta) => {
    sounds.playClick();
    onAdjustTime(secondsDelta);
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none py-2">
      {/* 모드 뱃지 */}
      <div className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-semibold tracking-wide mb-3 backdrop-blur-md transition-all duration-300 ${theme.badgeBg}`}>
        {theme.icon}
        <span>{theme.badgeText}</span>
      </div>

      {/* 대형 원형 프로그레스 게이지 */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 280 280">
          {/* 배경 트랙 */}
          <circle
            cx="140"
            cy="140"
            r={radius}
            stroke="#1e293b"
            strokeWidth="12"
            fill="transparent"
            className="opacity-50"
          />
          {/* 활성 프로그레스 바 */}
          <circle
            cx="140"
            cy="140"
            r={radius}
            stroke={theme.stroke}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              filter: theme.glow,
              transition: isRunning ? 'stroke-dashoffset 1s linear, stroke 0.5s ease' : 'stroke-dashoffset 0.3s ease, stroke 0.5s ease'
            }}
          />
        </svg>

        {/* 타이머 텍스트 (원 중앙) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-['Fredoka',sans-serif] text-5xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-md">
            {formattedTime}
          </span>
          <span className="text-xs text-slate-400 font-medium mt-1">
            {isRunning ? '집중 진행 중 ⚡' : '일시정지 상태'}
          </span>
        </div>
      </div>

      {/* 미세 시간 조절 (+1분 / -1분) */}
      <div className="flex items-center gap-2 mt-3 text-slate-400">
        <button
          onClick={() => handleAdjust(-60)}
          disabled={timeLeft <= 60}
          className="p-1.5 rounded-lg bg-darkCardLighter/70 hover:bg-slate-700/80 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition text-xs flex items-center gap-1 font-medium text-slate-300"
          title="1분 줄이기"
        >
          <Minus className="w-3.5 h-3.5" /> 1분
        </button>
        <span className="text-xs text-slate-600">•</span>
        <button
          onClick={() => handleAdjust(60)}
          className="p-1.5 rounded-lg bg-darkCardLighter/70 hover:bg-slate-700/80 active:scale-95 transition text-xs flex items-center gap-1 font-medium text-slate-300"
          title="1분 늘리기"
        >
          <Plus className="w-3.5 h-3.5" /> 1분
        </button>
      </div>
    </div>
  );
}
