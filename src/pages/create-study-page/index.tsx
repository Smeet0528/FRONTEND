import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useState, useEffect, forwardRef } from 'react';
import { useNavigate } from 'react-router';
import BackHeader from '@/components/Headers/BackHeader';
import StudyTitleInput from '@/components/CreateStudyPage/StudyTitleInput';
import StudyIntroTextarea from '@/components/CreateStudyPage/StudyIntroTextarea';
import OptionSelector from '@/components/CreateStudyPage/OptionSelector';
import ToggleButton from '@/components/ToggleButton';
import CalendarIcon from '@/assets/calender.svg';
import PlusIcon from '@/assets/plus.svg';
import { createGroup } from '@/api/group';

type DateInputProps = {
  value?: string;
  onClick?: () => void;
};

const CustomDateInput = forwardRef<HTMLButtonElement, DateInputProps>(
  ({ value, onClick }, ref) => (
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
CustomDateInput.displayName = 'CustomDateInput';

function CreateStudyPage() {
  const [form, setForm] = useState({
    title: '',
    intro: '',
  });

  const [memberCount, setMemberCount] = useState('');
  const [region, setRegion] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('selectedKeywords');
    if (stored) {
      setSelectedKeywords(JSON.parse(stored) as string[]); 
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  //date객체 YYYY-MM-DD문자열로 변환
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  //제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //유효성 검사
    if (
      !form.title ||
      !form.intro ||
      !startDate ||
      !endDate ||
      !memberCount ||
      !region ||
      selectedKeywords.length === 0
    ) {
      alert('모든 필수 항목(*)을 입력하고 카테고리를 선택해주세요.');
      return;
    }

    try {
      const payload = {
        title: form.title,
        content: form.intro,
        start_date: formatDate(startDate),
        end_date: formatDate(endDate),
        max_members: parseInt(memberCount, 10), 
        region: region,
        day_of_week: selectedDays.join(', '), // ['월', '수'] -> "월, 수"
        categoryNames: selectedKeywords,
      };

      const response = await createGroup(payload);

      if (response.id) {
        alert('성공적으로 모임이 생성되었습니다!');
        localStorage.removeItem('selectedKeywords'); 
        navigate(`/study-detail/${response.id}`); 
      }
    } catch (error: any) {
      console.error('모임 생성 에러:', error);
      alert(
        error.response?.data?.message || '모임 생성 중 오류가 발생했습니다.'
      );
    }
  };

  return (
    <div className="w-full flex justify-center bg-[#F8F8F8] min-h-screen">
      <div className="w-full max-w-[480px] bg-[#F8F8F8]">
        <BackHeader title="Smeet" />

        <form
          className="px-6 flex flex-col gap-6 "
          onSubmit={handleSubmit}
        >
          <StudyTitleInput value={form.title} onChange={handleChange} />
          <StudyIntroTextarea value={form.intro} onChange={handleChange} />

          {/* 스터디 기간 */}
          <div className="flex flex-col justify-start items-start w-[370px] gap-2">
            <p className="text-base font-semibold text-[#2C2C2C]">
              스터디 기간
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => setStartDate(date)}
                  dateFormat="yyyy.MM.dd"
                  customInput={<CustomDateInput />}
                />
                <span className="text-xs text-[#ABABAB]">부터</span>
              </div>

              <div className="flex items-center gap-2">
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date | null) => setEndDate(date)}
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

          {/* 스터디 카테고리 */}
          <div className="flex flex-col justify-start items-start gap-2">
            <p className="text-base font-semibold text-[#2C2C2C]">
              카테고리 선택 (3개)
            </p>

            <div className="flex gap-2 flex-wrap">
              {selectedKeywords.map((keyword) => {
                return (
                  <ToggleButton
                    key={keyword}
                    text={keyword}
                    isToggle={false}
                    hasDelete={true}
                    bgColor="#FA7D71"
                    textColor="#FFFFFF"
                    borderColor="#FA7D71"
                    onClick={() =>
                      setSelectedKeywords((prev: string[]) =>
                        prev.filter((kw: string) => kw !== keyword)
                      )
                    }
                  />
                );
              })}

              {/* + 버튼 */}
              {selectedKeywords.length < 3 && (
                <button
                  type="button"
                  onClick={() => void navigate('/filter')}
                  className="flex justify-start items-center gap-1 px-5 py-[7px] rounded-[20px] border border-[#ABABAB] text-sm text-[#2C2C2C]"
                >
                  <img
                    src={PlusIcon}
                    alt="추가"
                    className="w-[16px] h-[16px]"
                  />
                </button>
              )}
            </div>
          </div>
          {/* 하단 버튼 */}
          <div className="w-full max-w-[480px] pt-3">
            <button
              type="submit"
              className="w-full h-12 rounded-lg bg-[#FA7D71] hover:bg-[#e45b4f] text-white font-semibold text-lg shadow-md"
            >
              스밋하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateStudyPage;
