import X from '@/assets/X.svg';

interface ToggleButtonProps {
  icon?: string; //필터 버튼으로 사용 시 텍스트 앞 아이콘 추가용
  text?: string;
  hasDelete?: boolean; // x 버튼 추가 시 사용
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  isToggle?: boolean; // 토글 버튼으로 사용 시 추가
  toggled?: boolean;
  onToggle?: (text: string) => void; // 선택된 토클 버튼 텍스트 전달
  onClick?: () => void; // 토글 버튼 이외 용도로 사용 시 추가
}

const ToggleButton = ({
  icon,
  text,
  hasDelete = false,
  bgColor = '#FFFFFF',
  textColor = '#2C2C2C',
  borderColor,
  isToggle = false,
  toggled = false,
  onToggle,
  onClick,
}: ToggleButtonProps) => {
  const handleToggle = () => {
    if (text) {
      onToggle?.(text);
    }
  };

  const handleClick = () => {
    onClick?.();
  };

  const toggleStyle = {
    backgroundColor: toggled ? '#FA7D71' : bgColor,
    color: toggled ? '#FFFFFF' : textColor,
  };

  return (
    <div
      className={`w-fit rounded-3xl px-2 flex gap-1 items-center text-[14px] ${borderColor && 'border border-[${borderColor}] px-3.5 py-2'}`}
      style={toggleStyle}
      onClick={
        isToggle
          ? !icon
            ? handleToggle // isToggle && !icon
            : undefined // isToggle && icon
          : icon
            ? handleClick // !isToggle && icon
            : undefined // !isToggle && !icon
      }
    >
      {icon && <img src={icon} className="w-5" />}
      <span className="select-none font-[pretendard] font-normal">{text}</span>
      {hasDelete && (
        <button type="button" className="cursor-pointer" onClick={handleClick}>
          <img src={X} alt="삭제" className="w-5" />
        </button>
      )}
    </div>
  );
};

export default ToggleButton;
