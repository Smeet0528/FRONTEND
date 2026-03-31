import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

import JoinModal from '@/components/JoinModal';
import StudyTitleBlock from '@/components/DetailPage/StudyTitleBlock';
import StudyMetaInfo from '@/components/DetailPage/StudyMetaInfo';
import DescriptionBlock from '@/components/DetailPage/DescriptionBlock';
import BackHeader from '@/components/Headers/BackHeader';
import Modal from '@/components/Modal';
import successIcon from '@/assets/3D-fire.svg';

import { getGroupDetail } from '@/api/group';
import { applyGroup } from '@/api/group';
import type {
  GroupDetailResponse,
  UserRole,
  ApplicationStatus,
} from '@/types/group';

type TagType = 'region' | 'default';
interface StudyUIModel {
  nickname: string;
  title: string;
  tags: { text: string; type?: TagType }[];
  current: number;
  capacity: number;
  startDate: string;
  endDate: string;
  days: string;
  description: string;
}

//YYYY-MM-DD → YY.MM.DD
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

  //비활성
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
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [data, setData] = useState<GroupDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  async function handleApplySubmit(message: string) {
    if (!id) return;

    try {
      console.log('신청 메시지:', message);
      await applyGroup(id, { message });

      setIsModalOpen(false);
      setIsSuccessModalOpen(true);

      //신청후 버튼 대기중 수정
      const res = await getGroupDetail(id);
      setData(res);
    } catch (error) {
      console.error('신청 실패:', error);
      alert('신청 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  }

  //API 호출
  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      try {
        const res = await getGroupDetail(id);
        setData(res);
      } catch (error) {
        console.error('상세 정보 호출 실패:', error);
        alert('데이터를 가져오지 못했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    void fetchDetail();
  }, [id]);

  if (isLoading || !data) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        로딩 중...
      </div>
    );
  }

  const study: StudyUIModel = {
    nickname: data.nickname,
    title: data.title,
    tags: [
      { text: data.region, type: 'region' as const },
      ...data.categories.map((name) => ({
        text: name,
        type: 'default' as const,
      })),
    ],
    current: data.current_members,
    capacity: data.max_members,
    startDate: formatDate(data.start_date),
    endDate: formatDate(data.end_date),
    days: data.day_of_week,
    description: data.content,
  };

  function renderFooter() {
    if (!data) return null;
    const role: UserRole = data.roleOfCurrentUser;
    const appStatus: ApplicationStatus = data.applicationStatus;
    const status = data.status;

    if (role === 'CREATOR') {
      return (
        <div className="w-full flex items-center justify-between gap-3">
          <ActionButton
            label="종료하기"
            kind="end"
            disabled={status === '종료'}
            onClick={() => {
              if (confirm('모임을 종료하시겠습니까?')) {
                //종료 API 연결 예정
              }
            }}
          />
          <ActionButton
            label="채팅하기"
            kind="chat"
            onClick={() => {
              void navigate(`/chat/${data.id}`); //수정예정
            }}
          />
        </div>
      );
    }

    if (role === 'MEMBER') {
      return (
        <div className="w-full flex justify-end">
          <ActionButton
            label="채팅하기"
            kind="chat"
            onClick={() => {
              void navigate(`/chat/${data.id}`); //수정예정
            }}
          />
        </div>
      );
    }

    if (role === 'GUEST') {
      if (appStatus === 'PENDING') {
        return <ActionButton label="대기중" kind="apply" disabled />;
      }
      if (appStatus === 'REJECTED') {
        return <ActionButton label="신청 거절됨" kind="apply" disabled />;
      }
      if (status !== '모집 중') {
        return <ActionButton label="신청 불가" kind="apply" disabled />;
      }

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
            onConfirm={() => {
              setIsSuccessModalOpen(false);
              window.location.reload();
            }}
          />
        )}
      </div>
    </div>
  );
}

export default StudyDetailPage;
