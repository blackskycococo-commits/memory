import React, { useState } from 'react';
import { sounds } from '../utils/audio';
import { Sparkles, Heart } from 'lucide-react';

/**
 * 상태별 표정과 인터랙션이 있는 귀여운 마스코트 컴포넌트
 * @param {string} mode - 'focus' | 'shortBreak' | 'longBreak'
 * @param {boolean} isRunning - 타이머 실행 여부
 * @param {number} sessionsCompleted - 완료한 뽀모도로 세션 수
 */
export default function CuteMascot({ mode, isRunning, sessionsCompleted }) {
  const [isWiggling, setIsWiggling] = useState(false);
  const [customQuote, setCustomQuote] = useState(null);

  // 마스코트를 클릭했을 때 나오는 귀여운 응원 멘트
  const cheers = [
    "대표님! 지금 집중력 우주 최강입니다! 🚀",
    "충성! 알렉스 부장이 든든하게 보좌 중입니다! 🫡⚡",
    "조금만 더 힘내면 꿀맛 같은 휴식 시간! ☕",
    "대표님의 열정은 꺾이지 않습니다! 🔥",
    "찌르지 마세용~ 부끄러워요! 🍅✨",
    "오늘 목표 매출 100배 달성 각입니다! 💰",
  ];

  const handleMascotClick = () => {
    sounds.playPoke();
    setIsWiggling(true);
    const randomQuote = cheers[Math.floor(Math.random() * cheers.length)];
    setCustomQuote(randomQuote);

    setTimeout(() => {
      setIsWiggling(false);
    }, 800);

    setTimeout(() => {
      setCustomQuote(null);
    }, 4000);
  };

  // 기본 상태별 안내 멘트
  const getDefaultMessage = () => {
    if (customQuote) return customQuote;
    if (mode === 'focus') {
      if (isRunning) return "대표님만의 몰입 타임! 뽀모도로가 함께해요 🍅✨";
      return "준비되셨나요? 시작 버튼을 눌러주세요! 🚀";
    }
    if (mode === 'shortBreak') {
      if (isRunning) return "꿀맛 같은 5분 휴식! 스트레칭 한번 쭈욱~ 🍃";
      return "잠깐 쉬어갈까요? 편안하게 충전하세요 ☕";
    }
    if (mode === 'longBreak') {
      return "대단해요! 오늘 정말 수고 많으셨습니다 푹 쉬세요 🌟";
    }
    return "오늘도 멋지게 달려봐요!";
  };

  return (
    <div className="flex flex-col items-center justify-center my-2 select-none relative">
      {/* 귀여운 말풍선 */}
      <div className="relative mb-3 max-w-[280px] sm:max-w-xs text-center">
        <div className="bg-darkCardLighter/90 border border-slate-700/60 shadow-lg backdrop-blur-md px-4 py-2 rounded-2xl text-xs sm:text-sm font-medium text-slate-200 transition-all duration-300 flex items-center justify-center gap-1.5 animate-bounce-soft">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span>{getDefaultMessage()}</span>
        </div>
        {/* 말풍선 꼬리 */}
        <div className="w-3 h-3 bg-darkCardLighter/90 border-r border-b border-slate-700/60 transform rotate-45 mx-auto -mt-1.5 backdrop-blur-md"></div>
      </div>

      {/* 마스코트 SVG 본체 */}
      <div 
        onClick={handleMascotClick}
        className={`relative cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 ${
          isWiggling ? 'animate-wiggle' : isRunning ? 'animate-float' : 'animate-bounce-soft'
        }`}
        title="클릭해서 응원받기!"
      >
        {/* 주변 글로우 효과 */}
        <div className={`absolute -inset-2 rounded-full blur-xl opacity-40 transition-colors duration-500 ${
          mode === 'focus' ? 'bg-focusPink-glow' : mode === 'shortBreak' ? 'bg-breakMint-glow' : 'bg-restPurple-glow'
        }`} />

        <svg className="w-28 h-28 sm:w-32 sm:h-32 drop-shadow-2xl" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 캐릭터 몸체 (토마토 / 데이비드 믹스 캐릭터) */}
          {mode === 'focus' ? (
            // 집중 모드: 귀여운 붉은 뽀모도로
            <>
              {/* 토마토 꼭지 */}
              <path d="M60 14 C60 10 63 6 68 8 C65 12 63 16 61 18 Z" fill="#22c55e" />
              <path d="M52 20 C42 16 38 22 46 25 C52 26 56 24 58 22 Z" fill="#16a34a" />
              <path d="M68 20 C78 16 82 22 74 25 C68 26 64 24 62 22 Z" fill="#16a34a" />
              <path d="M60 22 C60 16 60 16 60 22 Z" fill="#16a34a" />

              {/* 토마토 몸통 */}
              <ellipse cx="60" cy="65" rx="44" ry="40" fill="url(#tomatoGradient)" />
              {/* 반사광 하이라이트 */}
              <ellipse cx="44" cy="48" rx="8" ry="4" transform="rotate(-30 44 48)" fill="white" fillOpacity="0.4" />

              {/* 볼터치 */}
              <circle cx="34" cy="68" r="7" fill="#fb7185" fillOpacity="0.8" />
              <circle cx="86" cy="68" r="7" fill="#fb7185" fillOpacity="0.8" />

              {/* 헤드폰 (열공 모드) */}
              {isRunning && (
                <g>
                  <path d="M22 62 C22 36 98 36 98 62" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
                  <rect x="16" y="56" width="10" height="20" rx="5" fill="#0284c7" />
                  <rect x="94" y="56" width="10" height="20" rx="5" fill="#0284c7" />
                </g>
              )}

              {/* 눈 & 입 */}
              {isRunning ? (
                // 열공하는 눈 (반짝반짝 집중)
                <>
                  <circle cx="45" cy="58" r="5" fill="#0f172a" />
                  <circle cx="47" cy="56" r="1.8" fill="white" />
                  <circle cx="75" cy="58" r="5" fill="#0f172a" />
                  <circle cx="77" cy="56" r="1.8" fill="white" />
                  {/* 야무진 미소 */}
                  <path d="M54 68 Q60 74 66 68" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                </>
              ) : (
                // 대기 중인 눈 (깜찍하게 깜빡임)
                <>
                  <circle cx="45" cy="58" r="4.5" fill="#0f172a" />
                  <circle cx="46.5" cy="56.5" r="1.5" fill="white" />
                  <circle cx="75" cy="58" r="4.5" fill="#0f172a" />
                  <circle cx="76.5" cy="56.5" r="1.5" fill="white" />
                  {/* 동그란 귀여운 입 */}
                  <ellipse cx="60" cy="70" rx="3.5" ry="4" fill="#0f172a" />
                  <ellipse cx="60" cy="71" rx="2" ry="1.5" fill="#f43f5e" />
                </>
              )}
            </>
          ) : (
            // 휴식 모드 (민트/세이지 힐링 버디)
            <>
              {/* 새싹 잎사귀 */}
              <path d="M60 16 C60 10 52 10 54 18 C56 22 59 22 60 22 Z" fill="#34d399" />
              <path d="M60 18 C64 12 72 14 68 20 C64 24 61 22 60 22 Z" fill="#10b981" />

              {/* 몸통 */}
              <ellipse cx="60" cy="65" rx="44" ry="40" fill="url(#mintGradient)" />
              <ellipse cx="44" cy="48" rx="8" ry="4" transform="rotate(-30 44 48)" fill="white" fillOpacity="0.4" />

              {/* 볼터치 */}
              <circle cx="34" cy="68" r="7" fill="#f472b6" fillOpacity="0.6" />
              <circle cx="86" cy="68" r="7" fill="#f472b6" fillOpacity="0.6" />

              {/* 휴식 중 눈 (웃는 눈 ^_^) */}
              <path d="M39 60 Q45 53 51 60" stroke="#064e3b" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M69 60 Q75 53 81 60" stroke="#064e3b" strokeWidth="3" strokeLinecap="round" fill="none" />

              {/* 행복한 미소 */}
              <path d="M52 68 Q60 76 68 68" stroke="#064e3b" strokeWidth="2.5" strokeLinecap="round" fill="none" />

              {/* 작은 찻잔 들고 있기 */}
              <g transform="translate(68, 70)">
                <rect x="0" y="0" width="14" height="11" rx="3" fill="#ffffff" />
                <path d="M14 3 C17 3 17 8 14 8" stroke="#ffffff" strokeWidth="1.5" fill="none" />
                {/* 김 모락모락 */}
                <path d="M4 -3 Q6 -6 4 -9" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" fill="none" />
                <path d="M9 -3 Q11 -6 9 -9" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" fill="none" />
              </g>
            </>
          )}

          {/* 그라데이션 정의 */}
          <defs>
            <linearGradient id="tomatoGradient" x1="20" y1="25" x2="90" y2="105" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ff6b81" />
              <stop offset="0.6" stopColor="#ee5253" />
              <stop offset="1" stopColor="#c23616" />
            </linearGradient>
            <linearGradient id="mintGradient" x1="20" y1="25" x2="90" y2="105" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6ee7b7" />
              <stop offset="0.6" stopColor="#34d399" />
              <stop offset="1" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>

        {/* 미니 클릭 힌트 */}
        <div className="absolute -bottom-1 -right-1 bg-rose-500 text-white rounded-full p-1 shadow-md scale-90 sm:scale-100 animate-pulse">
          <Heart className="w-3 h-3 fill-current" />
        </div>
      </div>
    </div>
  );
}
