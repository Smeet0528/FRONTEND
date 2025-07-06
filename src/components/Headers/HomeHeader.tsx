import { useNavigate } from 'react-router-dom';
import Write from '/src/assets/write.svg';
import Bell from '/src/assets/bell.svg';

const HomeHeader = () => {
  const navigate = useNavigate();

  const handleClickWrite = () => {
    void navigate('/new-study');
  };

  const handleClickAlarm = () => {
    void navigate('/alarm');
  };

  return (
    <div className="w-full flex justify-between p-3 px-5">
      <h1 className="font-semibold">Smeet</h1>
      <div className="flex gap-2">
        <button type="button" onClick={handleClickWrite}>
          <img src={Write} alt="글 작성하기" className="w-6 h-6" />
        </button>
        <button type="button" onClick={handleClickAlarm}>
          <img src={Bell} alt="알림보기" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default HomeHeader;
