import peopleIcon from '@/assets/people-offblack2.svg';
import calendarIcon from '@/assets/calender.svg';
import studyIcon from '@/assets/study.svg';

type StudyMetaInfoProps = {
  current: number;
  capacity: number;
  startDate: string;
  endDate: string;
  days: string;
};

const StudyMetaInfo = ({
  current,
  capacity,
  startDate,
  endDate,
  days,
}: StudyMetaInfoProps) => {
  return (
    <div className="flex flex-col gap-2 text-sm text-[#2c2c2c]">
      <div className="flex items-center gap-2">
        <img src={peopleIcon} alt="모집 인원" className="w-6 h-6" />
        <span>{`${current} / ${capacity}명`}</span>
      </div>
      <div className="flex items-center gap-2">
        <img src={calendarIcon} alt="스터디 기간" className="w-6 h-6" />
        <span>{`${startDate} ~ ${endDate}`}</span>
      </div>
      <div className="flex items-center gap-2">
        <img src={studyIcon} alt="스터디 요일" className="w-6 h-6" />
        <span>{days}</span>
      </div>
    </div>
  );
};

export default StudyMetaInfo;
