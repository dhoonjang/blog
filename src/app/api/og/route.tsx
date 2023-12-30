import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.

export const runtime = 'edge';

export async function GET(request: Request) {
  const title = decodeURIComponent(request.url.split('?title=')[1]).replace(
    /\+/g,
    ' '
  );

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: Math.max(500 / title.length, 40),
          color: 'white',
          background: 'rgb(17 24 39)',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {title}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
