import { Card } from '@nextui-org/card';

const Home = () => {
  return (
    <div className="grid gap-3 py-3">
      <Card>
        <h1 className="py-24 text-center text-4xl">
          <span className="font-toss">📝</span> Post
        </h1>
      </Card>
      <Card>
        <h1 className="py-24 text-center text-4xl">
          <span className="font-toss">✈️</span> Travel
        </h1>
      </Card>
      <Card>
        <h1 className="py-24 text-center text-4xl">
          <span className="font-toss">📖</span> Book
        </h1>
      </Card>
    </div>
  );
};

export default Home;
