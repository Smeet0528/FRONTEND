// src/pages/create-study-page/index.tsx
import { useState } from 'react';
import BackHeader from '@/components/Headers/BackHeader';
import StudyTitleInput from '@/components/CreateStudyPage/StudyTitleInput';
import StudyIntroTextarea from '@/components/CreateStudyPage/StudyIntroTextarea';

function CreateStudyPage() {
  const [form, setForm] = useState({
    title: '',
    intro: '',
  });

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
        </form>

        <div className="fixed max-w-[480px] bottom-0 w-full pb-8 px-6">
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
