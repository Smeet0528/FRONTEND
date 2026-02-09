import ToggleButton from '@/components/ToggleButton';
import { useNavigate } from 'react-router';
import { useCreateStudyStore } from '@/store/useCreateStudyStore';

const mockData = [
  {
    subTitle: '개발',
    keywords: [
      '프론트엔드',
      '백엔드',
      '알고리즘',
      '데이터베이스',
      '인공지능',
      '코딩테스트',
    ],
  },
  {
    subTitle: '디자인',
    keywords: ['Figma', 'UI/UX', 'Photoshop', 'Blender'],
  },
  {
    subTitle: '영어',
    keywords: [
      '토익',
      '토플',
      '아이엘츠',
      '비즈니스 영어',
      '오픽',
      '영문학',
      '영어회화',
      '미드',
    ],
  },
];

export default function FilterPage() {
  const navigate = useNavigate();

  const { selectedKeywords, setField } = useCreateStudyStore();

  const handleToggle = (keyword: string) => {
    //selectedKeywords를 기준으로 토글 로직을 처리
    const nextKeywords = selectedKeywords.includes(keyword)
      ? selectedKeywords.filter((kw) => kw !== keyword)
      : [...selectedKeywords, keyword];

    //최대 3개 제한
    if (nextKeywords.length > 3) return;

    setField('selectedKeywords', nextKeywords);
  };

  const handleSelect = () => {
    void navigate(-1);
  };

  return (
    <>
      <h2 className="px-6 font-[pretendard] font-medium">상세 카테고리</h2>
      <div className="px-6">
        {mockData.map((data) => (
          <div key={data.subTitle}>
            <h3 className="font-[pretendard] font-normal text-[14px] text-[#ABABAB] pt-4 pb-3">
              {data.subTitle}
            </h3>
            <div className="flex gap-2 flex-wrap">
              {data.keywords.map((keyword) => (
                <ToggleButton
                  key={keyword}
                  isToggle={true}
                  text={keyword}
                  toggled={selectedKeywords.includes(keyword)}
                  onToggle={() => handleToggle(keyword)}
                  borderColor="#ABABAB"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="fixed max-w-[480px] bottom-0 w-full pb-8 px-6">
        <button
          type="button"
          className="w-full max-w-[480px] h-12 rounded-lg bg-[#FA7D71] shadow-lg font-[pretendard] font-semibold text-white text-lg"
          onClick={handleSelect}
        >
          완료
        </button>
      </div>
    </>
  );
}
