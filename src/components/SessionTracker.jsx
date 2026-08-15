import React from 'react';
import { Award, CheckCircle2, RotateCcw, Zap } from 'lucide-react';
import { sounds } from '../utils/audio';

/**
 * 완료한 뽀모도로 세션 수와 통계를 보여주는 귀여운 트래커
 */
export default function SessionTracker({
  sessionsCompleted,
  dailyGoal = 4,
  focusDurationMinutes = 25,
  onResetStats,
}) {
  const totalFocusedMinutes = sessionsCompleted * focusDurationMinutes;

  // 레벨 및 칭호 계산
  const getRankTitle = () => {
    if (sessionsCompleted >= 8) return { title: "👑 전설의 1인 기업가", color: "text-amber-400" };
    if (sessionsCompleted >= 4) return { title: "🔥 몰입 마스터", color: "text-rose-400" };
    if (sessionsCompleted >= 2) return { title: "⚡ 집중력 폭발 중", color: "text-cyan-400" };
    if (sessionsCompleted >= 1) return { title: "🌱 산뜻한 스타트", color: "text-emerald-400" };
    return { title: "😴 슬로우 스타터", color: "text-slate-400" };
  };

  const rank = getRankTitle();

  const handleReset = () => {
    if (window.confirm("오늘의 뽀모도로 달성 기록을 초기화할까요?")) {
      sounds.playClick();
      onResetStats();
    }
  };

  return (
    <div className="w-full max-w-sm bg-darkCard/60 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
          <Award className="w-4 h-4 text-amber-400" />
          <span>오늘의 몰입 기록</span>
        </div>
        <span className={`text-xs font-bold ${rank.color}`}>
          {rank.title}
        </span>
      </div>

      {/* 토마토 스탬프 슬롯 */}
      <div className="flex items-center justify-center gap-2 py-2 bg-darkBg/60 rounded-xl border border-slate-800/50 mb-3">
        {Array.from({ length: Math.max(dailyGoal, sessionsCompleted) }).map((_, idx) => {
          const isDone = idx < sessionsCompleted;
          return (
            <div
              key={idx}
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all duration-300 ${
                isDone
                  ? 'bg-rose-500/20 border border-rose-500/40 shadow-sm shadow-rose-500/20 scale-105 animate-bounce-soft'
                  : 'bg-slate-800/40 border border-slate-700/30 opacity-40'
              }`}
              title={isDone ? `${idx + 1}번째 뽀모도로 완료!` : `${idx + 1}번째 뽀모도로 대기 중`}
            >
              {isDone ? '🍅' : '⚪'}
            </div>
          );
        })}
      </div>

      {/* 요약 통계 */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <div className="flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-rose-400" />
          <span>총 몰입 시간: <strong className="text-slate-200 font-bold">{totalFocusedMinutes}분</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <span>달성률: <strong className="text-slate-200 font-bold">{Math.round((sessionsCompleted / dailyGoal) * 100)}%</strong></span>
          {sessionsCompleted > 0 && (
            <button
              onClick={handleReset}
              className="text-slate-500 hover:text-rose-400 p-0.5 transition"
              title="통계 초기화"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
