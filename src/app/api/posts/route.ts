import { PostRequest } from '@/types';
import { createClient } from '@/utils/supabase/server';
import { format } from 'date-fns';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const supabase = await createClient(cookies());
  const formEntries = Array.from((await request.formData()).entries());

  const formData = formEntries.reduce<Record<string, FormDataEntryValue>>(
    (acc, [key, value]) => {
      acc[key] = value;
      return acc;
    },
    {}
  );

  const { preview_image, ...postRequest } = formData;

  let preview_image_url: string | null = null;

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

  const { data } = await supabase
    .from('Post')
    .insert([{ ...postRequest, preview_image_url } as PostRequest])
    .select();

  if (data && data.length === 1) {
    const { tags, ...rest } = data[0];
    return NextResponse.json({
      ...rest,
      tags: JSON.parse(tags) as string[],
    });
  } else {
    return NextResponse.json({ error: '새로운 글 등록 실패' }, { status: 500 });
  }
};
