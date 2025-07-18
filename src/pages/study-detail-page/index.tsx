import { useState } from 'react';
import JoinModal from '@/components/JoinModal';

import StudyTitleBlock from '@/components/DetailPage/StudyTitleBlock';
import StudyMetaInfo from '@/components/DetailPage/StudyMetaInfo';
import DescriptionBlock from '@/components/DetailPage/DescriptionBlock';
import BackHeader from '@/components/Headers/BackHeader';

type TagType = 'region' | 'default';

interface Study {
  nickname: string;
  title: string;
  tags: { text: string; type?: TagType }[];
  current: number;
  capacity: number;
  startDate: string;
  endDate: string;
  days: string;
  description: string;
}

const StudyDetailPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 상태 추가 - 모달창

  const study: Study = {
    nickname: '김즈에',
    title: '코딩 스터디 하실 분 구해요~!',
    tags: [
      { text: '서울/경기', type: 'region' },
      { text: '코딩' },
      { text: '코딩테스트' },
      { text: '모각코' },
    ],
    current: 1,
    capacity: 4,
    startDate: '25.06.26',
    endDate: '25.07.26',
    days: '화, 수, 목',
    description: `모각코할 사람 구해요,,,
아직 정확한 계획은 안세웠지만
혼자 공부하려니까 안되네요ㅠㅠ
꼭 같은 분야 아니어도 됩니다
디코로 모각코해요`,
  };

  return (
    <div className="w-full flex justify-center bg-[#f8f8f8] min-h-screen">
      <div className="w-full max-w-[480px] bg-[#f8f8f8]">
        <BackHeader title="Smeet" />

        <div className="px-6 pt-14 pb-32">
          <StudyTitleBlock
            nickname={study.nickname}
            title={study.title}
            tags={study.tags}
          />

          <div className="mt-3">
            <StudyMetaInfo
              current={study.current}
              capacity={study.capacity}
              startDate={study.startDate}
              endDate={study.endDate}
              days={study.days}
            />
          </div>

          <div className="mt-4">
            <DescriptionBlock description={study.description} />
          </div>
        </div>

        <div className="fixed max-w-[480px] bottom-0 w-full pb-8 px-6">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)} // ✅ 클릭 시 모달 열기
            className="w-full h-12 rounded-lg bg-[#FA7D71] hover:bg-[#e45b4f] text-white font-semibold text-lg shadow-md"
          >
            신청하기
          </button>
        </div>

        {/* 모달창 */}
        {isModalOpen && (
          <JoinModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={(text) => console.log('제출됨:', text)}
          />
        )}
      </div>
    </div>
  );
};

export default StudyDetailPage;
