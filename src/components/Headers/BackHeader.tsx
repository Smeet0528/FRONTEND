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
    <div className="w-full flex gap-3 items-center p-3 pl-7">
      <button type="button" className="left-10 cursor-pointer">
        <img src={Back} alt="뒤로가기" onClick={handleClickBack} />
      </button>
      <h1 className="select-none font-semibold">{title}</h1>
    </div>
  );
};

export default BackHeader;
