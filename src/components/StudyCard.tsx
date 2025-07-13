import People from '@/assets/people.svg';
import ToggleButton from './ToggleButton';
import { useNavigate } from 'react-router';

interface StudyCardProps {
  id: number;
  title: string;
  keywords: string[];
  member: number;
  limit: number;
}

const StudyCard = ({ id, title, keywords, member, limit }: StudyCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    void navigate(`/study-detail/${id}`);
  };

  return (
    <div
      className="px-6 py-5 bg-white rounded-lg shadow-lg cursor-pointer"
      onClick={handleClick}
    >
      <p className="pb-3 font-[pretendard] font-semibold text-[#1F1F1F] text-[18px]">
        {title}
      </p>
      <div className="flex justify-between">
        <div className="flex gap-2">
          {keywords?.map((keyword, index) => (
            <ToggleButton
              key={index}
              text={keyword}
              bgColor="#FFDEDA"
              textColor="#E06155"
            />
          ))}
        </div>
        <span className="flex items-end font-[pretendard] font-normal text-[#E06155]">
          {member ?? 0}/{limit ?? 0}{' '}
          <img src={People} alt="인원수" className="inline w-9 h-9" />
        </span>
      </div>
    </div>
  );
};

export default StudyCard;
