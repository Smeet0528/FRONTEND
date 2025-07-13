import { useNavigate } from 'react-router';
import { useState } from 'react';
import ToggleButton from '@/components/ToggleButton';
import StudyCard from '@/components/StudyCard';
import Filter from '@/assets/filter.svg';
import Plus from '@/assets/plus.svg';

const mockData = [
  {
    id: 1,
    title: '코딩 스터디 하실 분 구해요~!',
    keywords: ['코딩', '코딩테스트', '모각코'],
    member: 1,
    limit: 4,
  },
  {
    id: 2,
    title: '코딩 스터디 하실 분 구해요~!',
    keywords: ['코딩', '코딩테스트', '모각코'],
    member: 1,
    limit: 4,
  },
  {
    id: 3,
    title: '코딩 스터디 하실 분 구해요~!',
    keywords: ['코딩', '코딩테스트', '모각코'],
    member: 4,
    limit: 4,
  },
];

const StateList = [
  '서울/경기',
  '인천',
  '대구',
  '부산',
  '울산',
  '광주',
  '대전',
  '전북',
];

export default function StudyListPage() {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState('서울/경기');

  const localStorageKeywords = JSON.parse(
    localStorage.getItem('selectedKeywords') ?? 'null'
  ) as string[] | null;

  const [selectedKeywords, setSelectedKeywords] = useState<string[] | null>(
    localStorageKeywords
  );

  const handleClick = () => {
    void navigate('/filter');
  };

  const handleChangeState = (state: string) => {
    setSelectedState(state);
  };

  const handleMakeStudy = () => {
    void navigate('/new-study');
  };

  const handleDelete = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev ? prev.filter((kw) => kw !== keyword) : null
    );
  };

  return (
    <div>
      <div className="fixed top-12 w-full max-w-[480px] px-6 pb-2 bg-[#F8F8F8] flex gap-2">
        <ToggleButton
          icon={Filter}
          text="필터"
          borderColor="#ABABAB"
          onClick={handleClick}
        />
        {selectedKeywords?.map((keyword) => (
          <ToggleButton
            key={keyword}
            text={keyword}
            bgColor="#FA7D71"
            textColor="#FFFFFF"
            hasDelete={true}
            onClick={() => handleDelete(keyword)}
          />
        ))}
      </div>

      <div className="fixed top-24 w-full max-w-[480px] bg-[#F8F8F8] flex gap-4 justify-between flex-nowrap overflow-x-scroll px-6 pb-3">
        {StateList.map((state) => (
          <button
            type="button"
            key={state}
            className={`font-[pretendard] font-normal text-[14px] whitespace-nowrap cursor-pointer ${selectedState === state && 'text-[#FA7D71]'}`}
            onClick={() => handleChangeState(state)}
          >
            {state}
          </button>
        ))}
      </div>

      <h2 className="fixed top-33 w-full max-w-[480px] px-6 bg-[#F8F8F8] font-[pretendard] font-medium text-[#1F1F1F]">
        현재 모집 중인 스터디
      </h2>

      <div className="px-6 mt-25 flex flex-col gap-3 min-h-screen">
        {mockData?.map((data) => (
          <StudyCard
            key={data.id}
            id={data.id}
            title={data.title}
            keywords={data.keywords}
            member={data.member}
            limit={data.limit}
          />
        ))}
        <button
          type="button"
          title="새로운 스터디 생성"
          className="px-6 py-8 flex justify-center items-center bg-[#F1F1F1] rounded-lg shadow-lg cursor-pointer"
          onClick={handleMakeStudy}
        >
          <img
            src={Plus}
            alt="생성하기"
            className="w-8 h-8 bg-[#D1D1D1] rounded-full"
          />
        </button>
      </div>
    </div>
  );
}
