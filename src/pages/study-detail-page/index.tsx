import StudyTitleBlock from '@/components/DetailPage/StudyTitleBlock';
import BackHeader from '@/components/Headers/BackHeader';

const StudyDetailPage = () => {
  return (
    <div className="min-h-screen bg-[#f8f8f8] px-6 pt-4">
      <BackHeader title="Smeet" />

      {/* 작성자 정보, 제목,태그 */}
      <div className="mt-12">
        <StudyTitleBlock />
      </div>
    </div>
  );
};

export default StudyDetailPage;
