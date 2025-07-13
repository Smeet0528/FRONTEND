import StudyCard from '@/components/StudyCard';

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

export default function HomePage() {
  return (
    <div className="px-6">
      <h2 className="font-[pretendard] font-medium text-[#1F1F1F] pb-3.5">
        내 스터디
      </h2>
      <div className="flex flex-col gap-3">
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
      </div>
    </div>
  );
}
