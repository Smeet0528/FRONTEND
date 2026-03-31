import CheckIcon from '@/assets/check.svg';
import CloseIcon from '@/assets/X-offblack2.svg';

interface OptionSelectModalProps {
  options: string[];
  selectedOption: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

function OptionSelectModal({
  options,
  selectedOption,
  onSelect,
  onClose,
}: OptionSelectModalProps) {
  return (
    // 전체 화면을 덮는 검정 배경
    <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.4)] flex justify-center items-center">
      {/* 떠 있는 모달 박스 */}
      <div className="bg-white w-[315px] rounded-xl shadow-md pb-5">
        {/* 상단 닫기 버튼 */}
        <div className="flex justify-end px-2.5 pt-2.5">
          <button type="button" onClick={onClose}>
            <img src={CloseIcon} alt="닫기" className="w-5 h-5" />
          </button>
        </div>

        {/* 리스트 */}
        <div className="flex flex-col justify-start items-start w-[267px] mx-auto">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className="w-full h-12 flex justify-between items-center py-[13px] border-b border-[#d1d1d1] text-base font-medium text-left text-[#2c2c2c]"
            >
              {option}
              {selectedOption === option && (
                <img src={CheckIcon} alt="선택됨" className="w-5 h-5" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OptionSelectModal;
