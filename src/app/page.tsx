import Next from '@/assets/next.svg';

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="flex items-center gap-3 text-4xl font-bold">
        dhoonjang{' '}
        <a
          href="https://nextjs.org"
          target="_blank"
          className="group flex min-w-max text-cyan-500 hover:text-cyan-300"
          rel="noreferrer"
        >
          <Next className="w-40 fill-cyan-500 transition-all group-hover:fill-cyan-300" />
        </a>{' '}
        template
      </h1>
    </main>
  );
}
