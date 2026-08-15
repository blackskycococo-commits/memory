import React from 'react';
import { Play, Pause, RotateCcw, SkipForward, Volume2, VolumeX, Settings2 } from 'lucide-react';
import { sounds } from '../utils/audio';

/**
 * 타이머 조작 버튼 및 모드 탭 컨트롤러
 */
export default function Controls({
  isRunning,
  mode,
  soundEnabled,
  onToggleStart,
  onReset,
  onSkip,
  onChangeMode,
  onToggleSound,
  onOpenSettings,
}) {
  const handleModeClick = (newMode) => {
    sounds.playClick();
    onChangeMode(newMode);
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-sm">
      {/* 1. 모드 선택 탭 (Focus / Short Break / Long Break) */}
      <div className="flex items-center p-1 bg-darkCard/80 border border-slate-700/50 rounded-2xl w-full justify-between shadow-inner backdrop-blur-md">
        <button
          onClick={() => handleModeClick('focus')}
          className={`flex-1 py-2 px-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-1 ${
            mode === 'focus'
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20 scale-[1.02]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>🍅</span> 집중
        </button>

        <button
          onClick={() => handleModeClick('shortBreak')}
          className={`flex-1 py-2 px-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-1 ${
            mode === 'shortBreak'
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 scale-[1.02]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>🍃</span> 휴식
        </button>

        <button
          onClick={() => handleModeClick('longBreak')}
          className={`flex-1 py-2 px-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-1 ${
            mode === 'longBreak'
              ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20 scale-[1.02]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>🌙</span> 긴 휴식
        </button>
      </div>

      {/* 2. 주 조작 버튼 (재생/일시정지 & 리셋 & 스킵) */}
      <div className="flex items-center justify-center gap-4 w-full">
        {/* 리셋 버튼 */}
        <button
          onClick={onReset}
          className="p-3.5 rounded-2xl bg-darkCard border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700/60 hover:border-slate-600 active:scale-90 transition-all shadow-md"
          title="처음으로 리셋"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        {/* 시작 / 일시정지 (메인 버튼) */}
        <button
          onClick={onToggleStart}
          className={`group flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base sm:text-lg text-white shadow-xl transition-all duration-300 active:scale-95 ${
            mode === 'focus'
              ? 'bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-400 hover:to-red-400 shadow-rose-500/25'
              : mode === 'shortBreak'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-emerald-500/25'
              : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 shadow-purple-500/25'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-6 h-6 fill-current" />
              <span>일시정지</span>
            </>
          ) : (
            <>
              <Play className="w-6 h-6 fill-current ml-0.5" />
              <span>시작하기</span>
            </>
          )}
        </button>

        {/* 다음 세션으로 스킵 버튼 */}
        <button
          onClick={onSkip}
          className="p-3.5 rounded-2xl bg-darkCard border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700/60 hover:border-slate-600 active:scale-90 transition-all shadow-md"
          title="다음 단계로 넘어가기"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* 3. 보조 컨트롤 (사운드 음소거 / 설정 모달) */}
      <div className="flex items-center justify-center gap-3 pt-1">
        <button
          onClick={onToggleSound}
          className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-all ${
            soundEnabled
              ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20'
          }`}
          title={soundEnabled ? "효과음 켜짐" : "효과음 음소거"}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          <span>{soundEnabled ? "소리 ON" : "음소거"}</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 text-xs flex items-center gap-1.5 transition-all"
          title="시간 설정"
        >
          <Settings2 className="w-4 h-4" />
          <span>시간 설정</span>
        </button>
      </div>
    </div>
  );
}
