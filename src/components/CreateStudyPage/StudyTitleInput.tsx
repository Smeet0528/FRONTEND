import { useEffect, useState } from 'react';

interface StudyTitleInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function StudyTitleInput({ value, onChange }: StudyTitleInputProps) {
  const [count, setCount] = useState(value.length);
  const maxLength = 20;

  useEffect(() => {
    setCount(value.length);
  }, [value]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-end">
        <label
          htmlFor="title"
          className="font-[pretendard] text-base font-semibold text-[#2C2C2C]"
        >
          스터디 이름을 작성해주세요 <span className="text-[#FF2323]">*</span>
        </label>
        <span className="text-xs text-[#ABABAB] font-[pretendard]">
          {count}/{maxLength}
        </span>
      </div>

      <input
        type="text"
        id="title"
        name="title"
        placeholder="스터디 이름을 적어주세요"
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className="h-12 w-full px-3 py-2 rounded-lg bg-white border border-[#ABABAB] font-[pretendard] text-sm text-[#2C2C2C]"
      />
    </div>
  );
}

export default StudyTitleInput;
