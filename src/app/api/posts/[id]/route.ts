import { createClient } from '@/utils/supabase/server';
import { format } from 'date-fns';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const PUT = async (request: Request) => {
  const supabase = await createClient(cookies());
  const formEntries = Array.from((await request.formData()).entries());

  const formData = formEntries.reduce<Record<string, FormDataEntryValue>>(
    (acc, [key, value]) => {
      acc[key] = value;
      return acc;
    },
    {}
  );

  const { preview_image, ...putRequest } = formData;

  let preview_image_url: string | undefined = undefined;

  if (preview_image) {
    const imageFile = preview_image as File;
    const fileName = `${imageFile.name}-${format(new Date(), 'yyyyMMdd')}`;
    const { data: uploadData, error } = await supabase.storage
      .from('blog-image')
      .upload(fileName, imageFile, {
        contentType: imageFile.type,
      });

    if (error) {
      return NextResponse.json({ error }, { status: 403 });
    } else if (uploadData.path) {
      const { data } = await supabase.storage
        .from('blog-image')
        .getPublicUrl(uploadData.path);
      preview_image_url = data.publicUrl;
    }
  }

  const id = new URL(request.url).pathname.split('/').at(-1);

  const { data } = await supabase
    .from('Post')
    .update({ ...putRequest, preview_image_url })
    .eq('id', Number(id))
    .select();

  if (data && data.length === 1) {
    const { tags, ...rest } = data[0];
    return NextResponse.json({
      ...rest,
      tags: JSON.parse(tags) as string[],
    });
  } else {
    return NextResponse.json({ error: '글 수정 실패' }, { status: 500 });
  }
};

export const GET = async (request: Request) => {
  const id = new URL(request.url).pathname.split('/').at(-1);

  const supabase = await createClient(cookies());
  const { data } = await supabase.from('Post').select('*').eq('id', Number(id));

  if (!data || !data[0])
    return NextResponse.json({ success: false }, { status: 404 });
  return NextResponse.json({ success: true, ...data[0] });
};
