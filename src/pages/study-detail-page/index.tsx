import StudyTitleBlock from '@/components/DetailPage/StudyTitleBlock';
import StudyMetaInfo from '@/components/DetailPage/StudyMetaInfo';
import BackHeader from '@/components/Headers/BackHeader';

const StudyDetailPage = () => {
  return (
    <div className="min-h-screen bg-[#f8f8f8] px-6 pt-4">
      <BackHeader title="Smeet" />

      <div className="mt-12">
        <StudyTitleBlock
          nickname="김즈에"
          title="코딩 스터디 하실 분 구해요~!"
          tags={[
            { text: '서울/경기', type: 'region' },
            { text: '코딩' },
            { text: '코딩테스트' },
            { text: '모각코' },
          ]}
        />

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
