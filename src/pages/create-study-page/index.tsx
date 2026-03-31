import axios, { AxiosError } from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useState, forwardRef } from 'react';
import { useNavigate } from 'react-router';
import BackHeader from '@/components/Headers/BackHeader';
import StudyTitleInput from '@/components/CreateStudyPage/StudyTitleInput';
import StudyIntroTextarea from '@/components/CreateStudyPage/StudyIntroTextarea';
import OptionSelector from '@/components/CreateStudyPage/OptionSelector';
import ToggleButton from '@/components/ToggleButton';
import CalendarIcon from '@/assets/calender.svg';
import PlusIcon from '@/assets/plus.svg';
import { createGroup } from '@/api/group';
import Modal from '@/components/Modal';
import BookIcon from '@/assets/3D-book.svg';
import { useCreateStudyStore } from '@/store/useCreateStudyStore';

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
  const navigate = useNavigate();

  //모든 상태와 업데이트 함수를 가져오기
  const {
    title,
    intro,
    startDate,
    endDate,
    selectedDays,
    memberCount,
    region,
    selectedKeywords,
    setField,
    reset,
  } = useCreateStudyStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdGroupId, setCreatedGroupId] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setField(name === 'intro' ? 'intro' : 'title', value);
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
      !title ||
      !intro ||
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
        title: title,
        content: intro,
        start_date: formatDate(startDate),
        end_date: formatDate(endDate),
        max_members: parseInt(memberCount, 10),
        region: region,
        day_of_week: selectedDays.join(', '),
        categoryNames: selectedKeywords,
      };

      const response = await createGroup(payload);

      if (response.id) {
        setCreatedGroupId(response.id);
        setIsModalOpen(true);
      }
    } catch (error: unknown) {
      console.error('모임 생성 에러:', error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string }>;
        alert(
          axiosError.response?.data?.message ||
            '모임 생성 중 오류가 발생했습니다.'
        );
      } else {
        alert('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="w-full flex justify-center bg-[#F8F8F8] min-h-screen">
      <div className="w-full max-w-[480px] bg-[#F8F8F8]">
        <BackHeader title="Smeet" />

        <form
          className="px-6 flex flex-col gap-6 pb-36"
          onSubmit={(e) => {
            void handleSubmit(e);
          }}
        >
          <StudyTitleInput value={title} onChange={handleChange} />
          <StudyIntroTextarea value={intro} onChange={handleChange} />

          <div className="flex flex-col justify-start items-start w-full gap-2">
            <p className="text-base font-semibold text-[#2C2C2C]">
              스터디 기간
            </p>
            <div className="flex items-center gap-4">
              <DatePicker
                selected={startDate}
                onChange={(date) => setField('startDate', date)}
                dateFormat="yyyy.MM.dd"
                customInput={<CustomDateInput />}
              />
              <span className="text-xs text-[#ABABAB]">부터</span>
              <DatePicker
                selected={endDate}
                onChange={(date) => setField('endDate', date)}
                dateFormat="yyyy.MM.dd"
                customInput={<CustomDateInput />}
              />
              <span className="text-xs text-[#ABABAB]">까지</span>
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-full gap-2">
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
                      const nextDays = isSelected
                        ? selectedDays.filter((d) => d !== day)
                        : [...selectedDays, day];
                      setField('selectedDays', nextDays);
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

          <OptionSelector
            type="member"
            selected={memberCount}
            onChange={(val) => setField('memberCount', val)}
          />
          <OptionSelector
            type="region"
            selected={region}
            onChange={(val) => setField('region', val)}
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
                    onClick={() => {
                      const nextKeywords = selectedKeywords.filter(
                        (kw) => kw !== keyword
                      );
                      setField('selectedKeywords', nextKeywords);
                    }}
                  />
                );
              })}

              {/* + 버튼 */}
              {selectedKeywords.length < 3 && (
                <button
                  type="button"
                  onClick={() => {
                    void navigate('/filter');
                  }}
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

        {isModalOpen && (
          <Modal
            icon={BookIcon}
            title={`'${title}'\n스터디 생성이 완료되었습니다`}
            content="열정 가득한 배움, 시작해볼까요?"
            onConfirm={() => {
              // 확인 버튼 클릭 시 상세 페이지로 이동
              reset();
              if (createdGroupId) {
                void navigate(`/study-detail/${createdGroupId}`);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

export default CreateStudyPage;
