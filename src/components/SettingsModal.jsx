import React, { useState } from 'react';
import { X, Check, Clock, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

/**
 * 시간 및 옵션 커스텀 설정 모달 컴포넌트
 */
export default function SettingsModal({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
}) {
  if (!isOpen) return null;

  const [form, setForm] = useState({ ...settings });

  const handleChange = (key, value) => {
    const num = Math.max(1, Math.min(120, Number(value) || 1));
    setForm((prev) => ({ ...prev, [key]: num }));
  };

  const handleToggle = (key) => {
    sounds.playClick();
    setForm((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    sounds.playStart();
    onSaveSettings(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-darkCard border border-slate-700/80 rounded-3xl p-6 shadow-2xl relative text-slate-100">
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-700/50 mb-5">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-rose-400" />
            <h3 className="font-bold text-lg">타이머 세부 설정</h3>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-4">
          {/* 시간 설정 (분 단위) */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1.5 bg-darkBg/60 p-3 rounded-2xl border border-slate-800">
              <label className="text-xs font-semibold text-rose-300">집중 시간 (분)</label>
              <input
                type="number"
                min="1"
                max="120"
                value={form.focusMinutes}
                onChange={(e) => handleChange('focusMinutes', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-center font-bold text-lg text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex flex-col gap-1.5 bg-darkBg/60 p-3 rounded-2xl border border-slate-800">
              <label className="text-xs font-semibold text-emerald-300">휴식 시간 (분)</label>
              <input
                type="number"
                min="1"
                max="60"
                value={form.shortBreakMinutes}
                onChange={(e) => handleChange('shortBreakMinutes', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-center font-bold text-lg text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex flex-col gap-1.5 bg-darkBg/60 p-3 rounded-2xl border border-slate-800">
              <label className="text-xs font-semibold text-purple-300">긴 휴식 (분)</label>
              <input
                type="number"
                min="1"
                max="60"
                value={form.longBreakMinutes}
                onChange={(e) => handleChange('longBreakMinutes', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-center font-bold text-lg text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* 추가 옵션 토글 */}
          <div className="flex flex-col gap-2.5 pt-2">
            <label className="flex items-center justify-between p-3 rounded-xl bg-darkBg/40 border border-slate-800/80 cursor-pointer hover:bg-darkBg/70 transition">
              <span className="text-xs font-medium text-slate-300">휴식 시간 자동 시작</span>
              <input
                type="checkbox"
                checked={form.autoStartBreaks}
                onChange={() => handleToggle('autoStartBreaks')}
                className="w-4 h-4 accent-rose-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-darkBg/40 border border-slate-800/80 cursor-pointer hover:bg-darkBg/70 transition">
              <span className="text-xs font-medium text-slate-300">집중 시간 자동 시작</span>
              <input
                type="checkbox"
                checked={form.autoStartFocus}
                onChange={() => handleToggle('autoStartFocus')}
                className="w-4 h-4 accent-rose-500 cursor-pointer"
              />
            </label>
          </div>

          {/* 저장 버튼 */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-700/50 mt-2">
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-medium transition"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-400 hover:to-red-400 text-white font-bold text-xs shadow-lg shadow-rose-500/20 transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>설정 저장하기</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
