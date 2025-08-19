import BackIcon from '@/assets/back.svg';
import MemberItem from './MemberItem';

interface MemberListProps {
  members: string[];
  onClose: () => void;
}

function MemberList({ members, onClose }: MemberListProps) {
  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-screen z-50">
      <div
        className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)]"
        onClick={onClose}
      />

      <div className="absolute top-0 right-0 w-[280px] h-full bg-[#F8F8F8] shadow-lg z-50">
        {/* 헤더 */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#D1D1D1]">
          <button onClick={onClose}>
            <img src={BackIcon} alt="뒤로가기" className="w-5 h-5" />
          </button>
          <p className="text-sm font-medium text-[#1F1F1F]">대화 멤버</p>
        </div>

        {/* 멤버 리스트 */}
        <div className="flex flex-col">
          {members.map((name) => (
            <MemberItem key={name} name={name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MemberList;
