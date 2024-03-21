import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.

export const runtime = 'edge';

export async function GET(request: Request) {
  const title = decodeURIComponent(request.url.split('?title=')[1]).replace(
    /\+/g,
    ' '
  );

  let fontSize = 800 / title.length;

  if (title.length < 9) fontSize = 90;
  if (title.length > 16) fontSize = 50;

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: 'monospace',
          fontSize,
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
