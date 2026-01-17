import { getMyStudyList } from '@/api/list';
import StudyCard from '@/components/StudyCard';
import type { ResponseMyStudyList } from '@/types/list';
import { useEffect, useState } from 'react';

// const mockData = [
//   {
//     id: 1,
//     title: '코딩 스터디 하실 분 구해요~!',
//     keywords: ['코딩', '코딩테스트', '모각코'],
//     member: 1,
//     limit: 4,
//   },
//   {
//     id: 2,
//     title: '코딩 스터디 하실 분 구해요~!',
//     keywords: ['코딩', '코딩테스트', '모각코'],
//     member: 1,
//     limit: 4,
//   },
//   {
//     id: 3,
//     title: '코딩 스터디 하실 분 구해요~!',
//     keywords: ['코딩', '코딩테스트', '모각코'],
//     member: 4,
//     limit: 4,
//   },
// ];

export default function HomePage() {
  const [list, setList] = useState<ResponseMyStudyList>();

  useEffect(() => {
    const fetctMyStudyList = async () => {
      try {
        const data = await getMyStudyList();
        setList(data);
      } catch (e) {
        console.log('my study list error', e);
      }
    };

    fetctMyStudyList();
  }, []);
  return (
    <div>
      <h2 className="fixed w-full max-w-[480px] px-6 font-[pretendard] font-medium text-[#1F1F1F] bg-[#F8F8F8]">
        내 스터디
      </h2>
      <div className="flex flex-col gap-3 p-6 scroll-auto">
        {list && list?.length > 0 ? (
          list?.map((lst) => (
            <StudyCard
              key={lst.id}
              id={lst.id}
              title={lst.title}
              keywords={lst.categories}
              member={lst.current_members}
              limit={lst.max_members}
            />
          ))
        ) : (
          <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            참여중인 스터디가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
