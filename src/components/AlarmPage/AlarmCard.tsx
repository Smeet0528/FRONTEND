import Alarm from '@/assets/alarm.svg';

interface AlarmCardProps {
  sender: string;
  time: string;
  comment: string;
}

const AlarmCard = ({ sender, time, comment }: AlarmCardProps) => {
  return (
    <div className="px-5 py-5 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img
            src={Alarm}
            alt="알림"
            className="w-4.5 h-4.5 bg-[#FFA59D] rounded-full p-0.5"
          />
          <div>
            <p className="font-[pretendard] font-semibold text-[#1F1F1F] text-[14px]">
              ‘{sender}’님의 스터디 참여 요청
            </p>
          </div>
        </div>
        <time className="font-[pretendard] font-normal text-[12px] text-[#ABABAB]">
          {time}
        </time>
      </div>
      <p className="px-7 pt-1 font-[pretendard] font-normal text-[12px] text-[#656565] break-keep">
        {comment}
      </p>

      <div className="flex justify-end pt-3 gap-3">
        <button
          type="button"
          className="font-[pretendard] font-normal text-[14px] py-1 px-4.5 text-white bg-[#FA7D71] rounded-2xl cursor-pointer"
        >
          수락
        </button>
        <button
          type="button"
          className="font-[pretendard] font-normal text-[14px] py-1 px-4.5 text-[#656565] bg-[#F8F8F8] rounded-2xl border border-[#D1D1D1] cursor-pointer"
        >
          거절
        </button>
      </div>
    </div>
  );
};

export default AlarmCard;
