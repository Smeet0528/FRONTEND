import AlarmCard from '@/components/AlarmPage/AlarmCard';

const mockData = [
  {
    id: 1,
    sender: '닉네임',
    time: '3시간 전',
    comment: '열심히 참여해서 같이 성장하고 싶어요!',
  },
  {
    id: 2,
    sender: '닉네임',
    time: '3시간 전',
    comment:
      '열심히 참여해서 같이 성장하고 싶고 자격증을 빠른시일 내로 취득하고 싶어요',
  },
];

export default function AlarmPage() {
  return (
    <div>
      <h2 className="fixed top-12 w-full max-w-[480px] px-6 py-2 font-[pretendard] font-medium text-[#1F1F1F] bg-[#F8F8F8]">
        새로운 스터디 신청이 도착했어요
      </h2>
      <div className="p-6 flex flex-col gap-3">
        {mockData.map((data) => (
          <AlarmCard
            key={data.id}
            sender={data.sender}
            time={data.time}
            comment={data.comment}
          />
        ))}
      </div>
    </div>
  );
}
