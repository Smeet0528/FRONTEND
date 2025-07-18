type DescriptionBlockProps = {
  description: string;
};

const DescriptionBlock = ({ description }: DescriptionBlockProps) => {
  return (
    <div className="text-sm text-[#2c2c2c] whitespace-pre-line leading-relaxed">
      {description}
    </div>
  );
};

export default DescriptionBlock;
