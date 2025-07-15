import ProfileIcon from '@/assets/profile.svg?react';
import Tag from '@/components/Tag';

type StudyTitleBlockProps = {
  nickname?: string;
  title?: string;
  tags?: { text: string; type?: 'region' | 'default' }[];
};

const StudyTitleBlock = ({
  nickname = '김즈에', // 기본값
  title = '코딩 스터디 하실 분 구해요~!', // 기본값
  tags = [
    { text: '서울/경기', type: 'region' },
    { text: '코딩' },
    { text: '코딩테스트' },
    { text: '모각코' },
  ], // 기본값
}: StudyTitleBlockProps) => {
  return (
    <div className="flex flex-col gap-3">
      {/* 작성자 정보 */}
      <div className="flex items-center gap-2">
        <ProfileIcon className="w-9 h-9" />
        <p className="text-sm font-medium text-[#1F1F1F]">{nickname}</p>
      </div>

      {/* 스터디 제목 */}
      <h2 className="text-lg font-semibold text-[#1F1F1F] leading-snug">
        {title}
      </h2>

      {/* 태그 목록 */}
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag) => (
          <Tag key={tag.text} text={tag.text} type={tag.type} />
        ))}
      </div>
    </div>
  );
};

export default StudyTitleBlock;
