import ProfileIcon from '@/assets/profile.svg';

interface MemberItemProps {
  name: string;
}

function MemberItem({ name }: MemberItemProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-[#D1D1D1]">
      <img src={ProfileIcon} alt="프로필" className="w-9 h-9" />
      <p className="text-sm font-medium text-[#1F1F1F]">{name}</p>
    </div>
  );
}

export default MemberItem;
