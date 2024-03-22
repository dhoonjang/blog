type PoetryProps = {
  title: string;
  content: string;
};

const Poetry = ({ title, content }: PoetryProps) => (
  <div className="px-2">
    <h2 className="text-lg">{title}</h2>
    {content}
  </div>
);

export default Poetry;
