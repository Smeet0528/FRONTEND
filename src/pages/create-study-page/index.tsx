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
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

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

          {/* 스터디 요일 */}
          <div className="flex flex-col justify-start items-start w-[244px] gap-2">
            <p className="text-base font-semibold text-[#2C2C2C]">
              스터디 요일
            </p>
            <div className="flex justify-start items-center gap-2">
              {['월', '화', '수', '목', '금', '토', '일'].map((day) => {
                const isSelected = selectedDays.includes(day);

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => {
                      setSelectedDays(
                        (prev) =>
                          prev.includes(day)
                            ? prev.filter((d) => d !== day) // 선택 해제
                            : [...prev, day] // 선택 추가
                      );
                    }}
                    className={`w-8 h-8 rounded-full flex justify-center items-center text-sm font-semibold ${
                      isSelected
                        ? 'bg-[#FA7D71] text-white'
                        : 'bg-white text-[#ABABAB] border border-[#ABABAB]'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

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
