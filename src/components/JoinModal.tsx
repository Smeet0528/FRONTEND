import { useState } from 'react';
import xIcon from '@/assets/X-offblack2.svg';

interface JoinModalProps {
  onClose: () => void;
  onSubmit: (text: string) => void;
}

const JoinModal = ({ onClose, onSubmit }: JoinModalProps) => {
  const [text, setText] = useState('');
  const maxLength = 45;

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
      <div className="w-[calc(100%-60px)] max-w-[360px] rounded-xl bg-white p-5 shadow-md relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-5 h-5"
        >
          <img src={xIcon} alt="닫기" className="w-5 h-5" />
        </button>

        <p className="text-base font-medium text-[#1f1f1f] mt-2 mb-2 break-keep">
          간단한 자기소개나 각오를 적어주세요!
        </p>

        {/* 입력창 */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={maxLength}
          placeholder="자기소개를 입력해주세요."
          className="w-full h-[100px] border border-[#ababab] rounded-lg p-3 text-sm resize-none outline-none placeholder-[#ababab]"
        />

        {/* 글자 수 */}
        <div className="text-right text-xs text-[#ababab] mt-0.5">
          {text.length}/{maxLength}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 w-full h-12 rounded-lg bg-[#fa7d71] hover:bg-[#e45b4f] transition-colors duration-200 text-white font-semibold text-lg shadow"
        >
          신청하기
        </button>
      </div>
    </div>
  );
};

export default JoinModal;
