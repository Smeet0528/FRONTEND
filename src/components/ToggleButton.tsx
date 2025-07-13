import { useState } from 'react';
import X from '@/assets/X.svg';

interface ToggleButtonProps {
  icon?: string; //필터 버튼으로 사용 시 텍스트 앞 아이콘 추가용
  text?: string;
  hasDelete?: boolean; // x 버튼 추가 시 사용
  bgColor?: string;
  textColor?: string;
  isToggle?: boolean; // 토글 버튼으로 사용 시 추가
  onClick?: () => void; // 토글 버튼 이외 용도로 사용 시 추가
}

const ToggleButton = ({
  icon,
  text,
  hasDelete = false,
  bgColor = '#FFFFFF',
  textColor = '#2C2C2C',
  isToggle = false,
  onClick,
}: ToggleButtonProps) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleClick = () => {
    onClick?.();
  };

  const toggleStyle = {
    backgroundColor: toggle ? '#FA7D71' : bgColor,
    color: toggle ? '#FFFFFF' : textColor,
  };

  return (
    <div
      className="w-fit rounded-3xl px-2 flex items-center text-[13px]"
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
