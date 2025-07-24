import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useState, forwardRef } from 'react';
import BackHeader from '@/components/Headers/BackHeader';
import StudyTitleInput from '@/components/CreateStudyPage/StudyTitleInput';
import StudyIntroTextarea from '@/components/CreateStudyPage/StudyIntroTextarea';
import StudyCategorySection from '@/components/CreateStudyPage/StudyCategorySection';
import OptionSelector from '@/components/CreateStudyPage/OptionSelector';
import CalendarIcon from '@/assets/calender.svg';

const CustomDateInput = forwardRef(
  ({ value, onClick }: any, ref: React.Ref<HTMLButtonElement>) => (
    <button
      type="button"
      onClick={onClick}
      ref={ref}
      className="flex items-center gap-2 px-3 py-2 border border-[#ABABAB] rounded-lg bg-white w-[130px]"
    >
      <img src={CalendarIcon} alt="달력" className="w-5 h-5" />
      <span className="text-sm text-[#2C2C2C]">{value || '날짜 선택'}</span>
    </button>
  )
);

function CreateStudyPage() {
  const [form, setForm] = useState({
    title: '',
    intro: '',
  });

  const [memberCount, setMemberCount] = useState('');
  const [region, setRegion] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full flex justify-center bg-[#F8F8F8] min-h-screen">
      <div className="w-full max-w-[480px] bg-[#F8F8F8]">
        <BackHeader title="Smeet" />

        <form className="px-6 pt-14 flex flex-col gap-6 pb-36">
          <StudyTitleInput value={form.title} onChange={handleChange} />
          <StudyIntroTextarea value={form.intro} onChange={handleChange} />

          <div className="flex flex-col justify-start items-start w-[370px] gap-2">
            <p className="text-base font-semibold text-[#2C2C2C]">
              스터디 기간
            </p>

            <div className="flex items-center gap-4">
              {/* 시작일 + 부터 */}
              <div className="flex items-center gap-2">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="yyyy.MM.dd"
                  customInput={<CustomDateInput />}
                />
                <span className="text-xs text-[#ABABAB]">부터</span>
              </div>

              {/* 종료일 + 까지 */}
              <div className="flex items-center gap-2">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="yyyy.MM.dd"
                  customInput={<CustomDateInput />}
                />
                <span className="text-xs text-[#ABABAB]">까지</span>
              </div>
            </div>
          </div>

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
                    onClick={() =>
                      setSelectedDays((prev) =>
                        prev.includes(day)
                          ? prev.filter((d) => d !== day)
                          : [...prev, day]
                      )
                    }
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

          <OptionSelector
            type="member"
            selected={memberCount}
            onChange={setMemberCount}
          />
          <OptionSelector
            type="region"
            selected={region}
            onChange={setRegion}
          />
          <StudyCategorySection />
        </form>

        {/* 하단 버튼 */}
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
