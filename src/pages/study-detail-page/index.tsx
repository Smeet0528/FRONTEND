import StudyTitleBlock from '@/components/DetailPage/StudyTitleBlock';
import StudyMetaInfo from '@/components/DetailPage/StudyMetaInfo';
import DescriptionBlock from '@/components/DetailPage/DescriptionBlock';
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

        <div className="mt-4">
          <DescriptionBlock
            description={`모각코할 사람 구해요,,,
아직 정확한 계획은 안세웠지만
혼자 공부하려니까 안되네요ㅠㅠ
꼭 같은 분야 아니어도 됩니다
디코로 모각코해요`}
          />
        </div>
      </div>
    </div>
  );
};

export default StudyDetailPage;
