interface TagProps {
  text: string;
  type?: 'region' | 'default'; //지역만 스타일 다르게 처리
}

const Tag = ({ text, type = 'default' }: TagProps) => {
  const isRegion = type === 'region';

  const bgColor = isRegion ? '#FF9389' : '#FFDEDA';
  const textColor = isRegion ? 'white' : '#E06155';

  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {text}
    </span>
  );
};

export default Tag;
