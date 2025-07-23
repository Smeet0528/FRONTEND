// src/components/CreateStudyPage/StudyCategorySection.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ToggleButton from '@/components/ToggleButton';
import PlusIcon from '@/assets/plus.svg';

function StudyCategorySection() {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const navigate = useNavigate();

  // 페이지 처음 진입 시 localStorage에서 선택된 키워드 불러오기
  useEffect(() => {
    const stored = localStorage.getItem('createStudyKeywords');
    if (stored) {
      setSelectedKeywords(JSON.parse(stored));
    }
  }, []);

  // 카테고리 삭제 시 localStorage도 업데이트
  const handleDeleteKeyword = (keyword: string) => {
    const updated = selectedKeywords.filter((kw) => kw !== keyword);
    setSelectedKeywords(updated);
    localStorage.setItem('createStudyKeywords', JSON.stringify(updated));
  };

  // 필터 페이지로 이동 (from 정보 전달)
  const handleGoToFilter = () => {
    navigate('/filter', { state: { from: '/create-study-page' } });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* 제목 + 개수 */}
      <div className="flex justify-between items-end w-full">
        <p className="font-[pretendard] text-base font-semibold text-[#2C2C2C]">
          스터디 카테고리
        </p>
        <p className="text-xs text-[#ABABAB] font-[pretendard]">
          {selectedKeywords.length}/3
        </p>
      </div>

      {/* 선택된 카테고리 태그 + +버튼 */}
      <div className="flex flex-wrap gap-2">
        {selectedKeywords.slice(0, 3).map((keyword) => (
          <ToggleButton
            key={keyword}
            text={keyword}
            hasDelete={true}
            onClick={() => handleDeleteKeyword(keyword)}
            bgColor="#FA7D71"
            textColor="#FFFFFF"
          />
        ))}

        {/* + 버튼 */}
        <button
          type="button"
          onClick={handleGoToFilter}
          className="w-[36px] h-[36px] rounded-full border border-[#ABABAB] flex items-center justify-center"
        >
          <img src={PlusIcon} alt="추가" className="w-[14px] h-[14px]" />
        </button>
      </div>
    </div>
  );
}

export default StudyCategorySection;
