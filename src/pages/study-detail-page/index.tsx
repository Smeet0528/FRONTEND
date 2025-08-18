// src/pages/study-detail-page/index.tsx
import { useState } from 'react';
import JoinModal from '@/components/JoinModal';

import StudyTitleBlock from '@/components/DetailPage/StudyTitleBlock';
import StudyMetaInfo from '@/components/DetailPage/StudyMetaInfo';
import DescriptionBlock from '@/components/DetailPage/DescriptionBlock';
import BackHeader from '@/components/Headers/BackHeader';

import Modal from '@/components/Modal';
import successIcon from '@/assets/3D-fire.svg';

type TagType = 'region' | 'default';
type UserRole = 'GUEST' | 'CREATOR' | 'MEMBER';
type StudyStatus = '모집중' | '모집완료' | '종료';
type ApplicationStatus = 'NONE' | 'PENDING' | 'ACCEPTED' | 'REJECTED';

interface GroupCategory {
  id: number;
  name: string; // 화면에선 name만 사용
  type: string; // 명세상 존재하나 화면 표시는 안함
}

interface GroupDetailResponse {
  current_members: number;
  id: number;
  title: string;
  start_date: string; // "YYYY-MM-DD"
  end_date: string; // "YYYY-MM-DD"
  max_members: number;
  status: StudyStatus; // "모집중" | "모집완료" | "종료"
  region: string; // "서울/경기" 문자열
  content: string;
  day_of_week: string; // "월, 화, 수"
  categories: GroupCategory[];
  nickname: string; // 작성자 닉네임
  role_of_current_user: UserRole; // 현재 유저 역할
  application_status: ApplicationStatus; // 현재 유저의 신청 상태
}

interface StudyUIModel {
  nickname: string;
  title: string;
  tags: { text: string; type?: TagType }[];
  current: number;
  capacity: number;
  startDate: string; // "YY.MM.DD"
  endDate: string; // "YY.MM.DD"
  days: string; // "월, 화, 수"
  description: string;
}

//"YYYY-MM-DD" → "YY.MM.DD" 포맷 변환
function formatDate(yyyyMmDd: string) {
  if (!yyyyMmDd.includes('-')) return yyyyMmDd;
  const [y, m, d] = yyyyMmDd.split('-');
  return `${y.slice(2)}.${m}.${d}`;
}

function ActionButton(props: {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  kind: 'apply' | 'end' | 'chat';
}) {
  const { label, disabled, onClick, kind } = props;

  const baseByKind: Record<typeof kind, string> = {
    apply: 'w-full h-12 rounded-lg font-semibold text-lg px-[136px] py-[11px]',
    end: 'flex flex-col justify-center items-center h-12 w-[200px] rounded-lg px-[18px] py-[11px]',
    chat: 'flex flex-col justify-center items-center h-12 w-[200px] rounded-lg  px-[18px] py-[11px]',
  };

  const enabledByKind: Record<typeof kind, string> = {
    apply: 'bg-[#FA7D71] text-white border border-[#FA7D71]',
    end: 'bg-white text-[#fa7d71] border border-[#fa7d71]',
    chat: 'bg-[#fa7d71] text-white',
  };

  // 비활성 스타일
  const disabledStyle =
    'bg-[#D1D1D1] text-[#656565] border border-transparent cursor-not-allowed';

  const className = [
    baseByKind[kind],
    'shadow-[0px_2px_2px_rgba(0,0,0,0.25)]',
    disabled ? disabledStyle : enabledByKind[kind],
  ].join(' ');

  return (
    <button
      type="button"
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function StudyDetailPage() {
  //실제 API 연동 전까지 사용할 응답
  const mockApi: GroupDetailResponse = {
    current_members: 1,
    id: 1,
    title: '코딩 스터디 하실 분 구해요~!',
    start_date: '2025-07-20',
    end_date: '2025-08-20',
    max_members: 5,
    status: '모집중',
    region: '서울/경기',
    content: `모각코할 사람 구해요,,,
아직 정확한 계획은 안세웠지만
혼자 공부하려니까 안되네요ㅠㅠ
꼭 같은 분야 아니어도 됩니다
디코로 모각코해요`,
    day_of_week: '화, 수, 목',
    categories: [
      { id: 1, name: '코딩', type: '개발' },
      { id: 2, name: '코딩테스트', type: '개발' },
      { id: 3, name: '모각코', type: '개발' },
    ],
    nickname: '김즈에',
    //상태 바꿔서 테스트
    role_of_current_user: 'GUEST', // 'GUEST' | 'CREATOR' | 'MEMBER'
    application_status: 'NONE', // 'NONE' | 'PENDING' | 'ACCEPTED' | 'REJECTED'
  };

  // 서버 응답 화면 상태 셋업
  const [studyStatus, setStudyStatus] = useState<StudyStatus>(mockApi.status);
  // const [role, setRole] = useState<UserRole>(mockApi.role_of_current_user);
  const [role] = useState<UserRole>(mockApi.role_of_current_user);
  const [appStatus, setAppStatus] = useState<ApplicationStatus>(
    mockApi.application_status
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // 화면 표시 모델
  const regionTag = { text: mockApi.region, type: 'region' as const };
  const categoryTags = mockApi.categories.map((c) => ({
    text: c.name,
    type: 'default' as const,
  }));

  const study: StudyUIModel = {
    nickname: mockApi.nickname,
    title: mockApi.title,
    tags: [regionTag, ...categoryTags],
    current: mockApi.current_members,
    capacity: mockApi.max_members,
    startDate: formatDate(mockApi.start_date),
    endDate: formatDate(mockApi.end_date),
    days: mockApi.day_of_week,
    description: mockApi.content,
  };

  // 상태
  const isStudyEnded = studyStatus === '종료';
  const isRecruitClosed = studyStatus === '모집완료' || isStudyEnded;

  function renderFooter() {
    if (role === 'CREATOR') {
      return (
        <div className="w-full flex items-center justify-between">
          <ActionButton
            label="종료하기"
            kind="end"
            disabled={isStudyEnded}
            onClick={() => {
              // 종료 API 호출
              setStudyStatus('종료');
            }}
          />
          <ActionButton
            label="채팅하기"
            kind="chat"
            disabled={isStudyEnded}
            onClick={() => alert('채팅으로 이동')}
          />
        </div>
      );
    }

    if (role === 'MEMBER') {
      return (
        <div className="w-full flex items-center justify-end">
          <ActionButton
            label="채팅하기"
            kind="chat"
            disabled={isStudyEnded}
            onClick={() => alert('채팅으로 이동')}
          />
        </div>
      );
    }

    if (role === 'GUEST') {
      //종료/모집완료는 신청 비활성
      if (isStudyEnded || isRecruitClosed) {
        return <ActionButton label="신청하기" kind="apply" disabled />;
      }
      //대기 -> 비활성 중복 신청 방지
      if (appStatus === 'PENDING') {
        return <ActionButton label="대기중" kind="apply" disabled />;
      }
      // 승인 -> 채팅하기
      if (appStatus === 'ACCEPTED') {
        return (
          <ActionButton
            label="채팅하기"
            kind="chat"
            onClick={() => alert('채팅으로 이동')}
          />
        );
      }
      // NONE/REJECTED → 신청 가능
      return (
        <ActionButton
          label="신청하기"
          kind="apply"
          onClick={() => setIsModalOpen(true)}
        />
      );
    }

    return null;
  }

  // JoinModal 제출 시
  function handleApplySubmit(message: string) {
    console.log('신청 사유:', message);
    setIsModalOpen(false);
    setAppStatus('PENDING'); //중복신청방지
    setIsSuccessModalOpen(true);
  }

  return (
    <div className="w-full flex justify-center bg-[#f8f8f8] min-h-screen">
      <div className="w-full max-w-[480px] bg-[#f8f8f8]">
        <BackHeader title="Smeet" />

        <div className="px-6 pt-14 pb-32">
          {/* 작성자 / 제목 / 태그 */}
          <StudyTitleBlock
            nickname={study.nickname}
            title={study.title}
            tags={study.tags}
          />

          {/* 인원 / 기간 / 요일 */}
          <div className="mt-3">
            <StudyMetaInfo
              current={study.current}
              capacity={study.capacity}
              startDate={study.startDate}
              endDate={study.endDate}
              days={study.days}
            />
          </div>

          {/* 소개 */}
          <div className="mt-4">
            <DescriptionBlock description={study.description} />
          </div>
        </div>

        {/* 하단 액션 영역 */}
        <div className="fixed bottom-0 w-full max-w-[480px] px-6 pb-8">
          {renderFooter()}
        </div>

        {/* 신청 모달 (자기소개 입력) */}
        {isModalOpen && (
          <JoinModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleApplySubmit}
          />
        )}

        {isSuccessModalOpen && (
          <Modal
            icon={successIcon}
            //줄바꿈하려면 모달컴포넌트에 whitespace-pre-line 추가해야함
            title={`'${study.title}'\n스터디 신청이 완료되었습니다`}
            content="열정 가득한 배움, 시작해볼까요?"
            onConfirm={() => setIsSuccessModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default StudyDetailPage;
