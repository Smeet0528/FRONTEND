import { useState } from 'react';
import OptionSelectModal from './OptionSelectModal';
import DownArrow from '@/assets/down.svg';

interface OptionSelectorProps {
  type: 'member' | 'region';
  selected: string;
  onChange: (value: string) => void;
}

function OptionSelector({ type, selected, onChange }: OptionSelectorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 자동 옵션 목록
  const options =
    type === 'member'
      ? Array.from({ length: 10 }, (_, i) => (i + 1).toString()) // '1' ~ '10'
      : [
          '전체',
          '서울/경기',
          '인천',
          '부산',
          '대전',
          '대구',
          '광주',
          '울산',
          '강원',
          '전북',
          '전남',
        ];

  const label = type === 'member' ? '모집인원' : '지역선택';

  return (
    <>
      <div className="flex flex-col justify-start items-start w-[327px] gap-2">
        {/* 제목 */}
        <div className="flex justify-between items-end w-[315px]">
          <div className="flex items-center gap-2.5">
            <p className="text-base font-semibold text-[#2c2c2c]">
              {label}
              <span className="text-black"> 선택 </span>
              <span className="text-[#ff2323]">*</span>
            </p>
          </div>
        </div>

        {/* 선택 버튼 */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex justify-between items-center w-[130px] h-12 px-4 rounded-lg bg-white border border-[#ABABAB]"
        >
          <p
            className={`text-sm font-medium ${
              selected ? 'text-[#2C2C2C]' : 'text-[#ABABAB]'
            }`}
          >
            {selected || `${label}`}
          </p>
          <img
            src={DownArrow}
            alt="열기"
            className="w-5 h-5 transform transition-transform duration-200"
          />
        </button>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <OptionSelectModal
          options={options}
          selectedOption={selected}
          onSelect={(value) => {
            onChange(value);
            setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default OptionSelector;
