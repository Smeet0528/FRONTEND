import { useNavigate } from 'react-router-dom';
import Back from '/src/assets/back.svg';

interface BackHeaderProps {
  title?: string;
}

const BackHeader = ({ title }: BackHeaderProps) => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    void navigate(-1);
  };

  return (
    <div className="fixed top-0 w-full max-w-[480px] flex justify-between p-3 px-5 bg-[#F8F8F8] z-50">
      <button type="button" className="left-10 cursor-pointer">
        <img src={Back} alt="뒤로가기" onClick={handleClickBack} />
      </button>
      <h1 className="select-none font-[pretendard] font-semibold">{title}</h1>
    </div>
  );
};

export default BackHeader;
