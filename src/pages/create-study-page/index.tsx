import { useState } from 'react';
import BackHeader from '@/components/Headers/BackHeader';
import StudyTitleInput from '@/components/CreateStudyPage/StudyTitleInput';
import StudyIntroTextarea from '@/components/CreateStudyPage/StudyIntroTextarea';
import StudyCategorySection from '@/components/CreateStudyPage/StudyCategorySection';
import OptionSelector from '@/components/CreateStudyPage/OptionSelector';

function CreateStudyPage() {
  const [form, setForm] = useState({
    title: '',
    intro: '',
  });

  const [memberCount, setMemberCount] = useState('');
  const [region, setRegion] = useState('');

  // 입력창 값 변경 핸들러
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full flex justify-center bg-[#F8F8F8] min-h-screen">
      <div className="w-full max-w-[480px] bg-[#F8F8F8]">
        {/* 상단 헤더 */}
        <BackHeader title="Smeet" />

        <form className="px-6 pt-14 flex flex-col gap-6 pb-36">
          {/* 스터디 이름 */}
          <StudyTitleInput value={form.title} onChange={handleChange} />

          {/* 스터디 소개 */}
          <StudyIntroTextarea value={form.intro} onChange={handleChange} />

          {/* 모집인원 선택 */}
          <OptionSelector
            type="member"
            selected={memberCount}
            onChange={setMemberCount}
          />

          {/* 지역 선택 */}
          <OptionSelector
            type="region"
            selected={region}
            onChange={setRegion}
          />

          {/* 스터디 카테고리 */}
          <StudyCategorySection />
        </form>

        {/* 하단 고정 버튼 */}
        <div className="fixed max-w-[480px] bottom-0 w-full pb-8 px-6 bg-[#F8F8F8]">
          <button
            type="submit"
            className="w-full h-12 rounded-lg bg-[#FA7D71] hover:bg-[#e45b4f] text-white font-semibold text-lg shadow-md"
          >
            스밋하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateStudyPage;
