interface ChatMessageProps {
  message: string;
  isMine: boolean;
  showTime?: boolean;
  time?: string;
}

function ChatMessage({ message, isMine, showTime, time }: ChatMessageProps) {
  return (
    <div
      className={`flex items-end gap-2 ${
        isMine ? 'justify-end self-end' : 'justify-start self-start'
      }`}
    >
      {!isMine && (
        <div className="px-2 py-1.5 rounded-tr-lg rounded-bl-lg rounded-br-lg bg-white text-black text-base max-w-[95%]">
          {message}
        </div>
      )}
      {isMine && showTime && <p className="text-xs text-[#ababab]">{time}</p>}
      {isMine && (
        <div className="px-2 py-1.5 rounded-tl-lg rounded-bl-lg rounded-br-lg bg-[#FA7D71] text-white text-base max-w-[95%] text-left">
          {message}
        </div>
      )}
      {!isMine && showTime && <p className="text-xs text-[#ababab]">{time}</p>}
    </div>
  );
}

export default ChatMessage;
