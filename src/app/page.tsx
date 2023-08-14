import { cn } from '@/utils';

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col justify-center p-24">
      {[
        'font-thin',
        'font-extralight',
        'font-light',
        'font-normal',
        'font-medium',
        'font-semibold',
        'font-bold',
        'font-extrabold',
        'font-black',
      ].map((weight) => (
        <h1 className={cn(`${weight} text-large text-left`)} key={weight}>
          Donghoon Jang
        </h1>
      ))}
    </main>
  );
}
