import StudyTitleBlock from '@/components/DetailPage/StudyTitleBlock';
import StudyMetaInfo from '@/components/DetailPage/StudyMetaInfo';
import BackHeader from '@/components/Headers/BackHeader';

const StudyDetailPage = () => {
  return (
    <div className="min-h-screen bg-[#f8f8f8] px-6 pt-4">
      <BackHeader title="Smeet" />

      <div className="mt-12">
        <StudyTitleBlock />

        <div className="mt-3">
          <StudyMetaInfo
            current={1}
            capacity={4}
            startDate="25.06.26"
            endDate="25.07.26"
            days="화, 수, 목"
          />
        </div>
      </div>
    </div>
  );
};

export default StudyDetailPage;
