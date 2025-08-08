import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatMessage from '@/components/ChatPage/ChatMessage';
import SendIcon from '@/assets/send.svg';
import PeopleIcon from '@/assets/people-offblack2.svg';
import BackIcon from '@/assets/back.svg';

interface ChatPageProps {
  title: string;
}

export default function ChatPage({ title }: ChatPageProps) {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex justify-center bg-white font-[pretendard]">
      {/* 💡 가운데 채팅 화면만 배경색 적용 */}
      <div className="w-full max-w-[480px] h-screen flex flex-col relative bg-[#FFF1F1]">
        {/* 고정 헤더 */}
        <div className="fixed top-0 inset-x-0 mx-auto w-full max-w-[480px] h-[64px] px-5 flex items-center justify-between z-50 bg-[#FFF1F1]">
          <button onClick={() => navigate(-1)}>
            <img src={BackIcon} alt="뒤로가기" className="w-5 h-5" />
          </button>
          <h1 className="text-[18px] font-semibold text-[#1F1F1F] text-center flex-1 ml-2">
            {title}
          </h1>
          <img
            src={PeopleIcon}
            alt="참여자 보기"
            className="w-6 h-6 cursor-pointer"
          />
        </div>

        {/* 채팅 메시지 영역 */}
        <div className="flex-1 overflow-y-auto mt-[18px] mb-[88px] px-6 flex flex-col gap-3">
          <p className="text-sm text-[#1F1F1F]">김즈에</p>

          <ChatMessage
            message="모두 안녕하세요 만나서 반갑습니다!!"
            isMine={false}
          />
          <ChatMessage message="저희 모두 열심히 잘해보아요" isMine={false} />
          <ChatMessage
            message="파이팅!!"
            isMine={false}
            showTime
            time="오후 3:02"
          />
          <ChatMessage message="저는 앞으로 JAVA를 공부할 예정입니다" isMine />
          <ChatMessage
            message="JAVA다들 많이 해보셨나요? 저는 어렵더라구요"
            isMine
            showTime
            time="오후 3:02"
          />
        </div>

        {/* 고정 입력창 */}
        <div className="fixed bottom-0 inset-x-0 mx-auto w-full max-w-[480px] px-6 py-4 flex items-center gap-3 z-50 bg-[#FFF1F1]">
          <div className="flex-1 px-3 py-3 rounded-lg bg-white border border-[#D1D1D1]">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="메세지를 입력해주세요"
              className="w-full text-sm text-[#2C2C2C] bg-transparent outline-none"
            />
          </div>
          <button className="w-12 h-12 rounded-lg bg-[#FA7D71] flex justify-center items-center hover:brightness-110 transition cursor-pointer">
            <img src={SendIcon} alt="보내기" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
