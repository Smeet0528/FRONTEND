// src/components/CreateStudyPage/StudyIntroTextarea.tsx
import { useEffect, useState } from 'react';

interface StudyIntroTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function StudyIntroTextarea({ value, onChange }: StudyIntroTextareaProps) {
  const [count, setCount] = useState(value.length);
  const maxLength = 150;

  useEffect(() => {
    setCount(value.length);
  }, [value]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-end">
        <label
          htmlFor="intro"
          className="font-[pretendard] text-base font-semibold text-[#2C2C2C]"
        >
          스터디 소개를 작성해주세요 <span className="text-[#FF2323]">*</span>
        </label>
        <span className="text-xs text-[#ABABAB] font-[pretendard]">
          {count}/{maxLength}
        </span>
      </div>

      <textarea
        id="intro"
        name="intro"
        placeholder="내용을 입력해주세요(장소, 진행방식, 규칙 등)"
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className="w-full min-h-[108px] px-3 py-3 resize-none rounded-lg bg-white border border-[#ABABAB] font-[pretendard] text-sm text-[#2C2C2C] leading-[1.5]"
      />
    </div>
  );
}

export default StudyIntroTextarea;
