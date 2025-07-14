import ProfileIcon from '@/assets/profile.svg?react';
import Tag from '@/components/Tag';

const StudyTitleBlock = () => {
  return (
    <div className="flex flex-col gap-3">
      {/* 작성자 정보 */}
      <div className="flex items-center gap-2">
        <ProfileIcon className="w-9 h-9" />
        <p className="text-sm font-medium text-[#1F1F1F]">김즈에</p>
      </div>

      {/* 스터디 제목 */}
      <h2 className="text-lg font-semibold text-[#1F1F1F] leading-snug">
        코딩 스터디 하실 분 구해요~!
      </h2>

      {/* 태그 목록 */}
      <div className="flex gap-2 flex-wrap">
        <Tag text="서울/경기" type="region" />
        <Tag text="코딩" />
        <Tag text="코딩테스트" />
        <Tag text="모각코" />
      </div>
    </div>
  );
};

export default StudyTitleBlock;
