import { useNavigate } from 'react-router';

interface ModalProps {
  icon?: string;
  title: string;
  content: string;
  navigateUrl?: string;
  isError?: boolean;
  onClick?: () => void;
}

const Modal = ({
  icon,
  title,
  content,
  navigateUrl,
  isError = false,
  onClick,
}: ModalProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    void navigate(`/${navigateUrl}`);
  };

  const handleClick = () => {
    onClick?.();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <div className="w-full max-w-[400px] h-[268px] flex flex-col justify-center items-center bg-white rounded-2xl">
        {icon && <img src={icon} alt="모달 아이콘" className="w-25 h-25" />}
        <div className="pt-2 pb-4.5">
          <p className="font-[pretendard] font-medium text-center whitespace-pre-line">
            {title}
          </p>
          <p className="font-[pretendard] font-normal text-[14px] text-[#ABABAB] text-center">
            {content}
          </p>
        </div>
        <button
          type="button"
          className="w-full max-w-[80%] h-12 font-[pretendard] font-semibold text-[18px] text-white bg-[#FA7D71] rounded-[8px]"
          onClick={!isError ? handleNavigate : handleClick}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Modal;
