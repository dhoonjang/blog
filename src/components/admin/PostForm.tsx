'use client';
import { MarkdownEditor } from '@/components/Markdown';
import { useRouter } from '@/navigation';
import { useCategories } from '@/utils/hooks';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
} from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { FC, FormEvent, useRef, useState } from 'react';

type PostFormProps = {
  id?: string;
  category?: string;
  content?: string;
  title?: string;
  imageUrl?: string | null;
};

const PostForm: FC<PostFormProps> = ({
  id,
  category: defaultCategory = '',
  content: defaultContent = '',
  title: defaultTitle = '',
  imageUrl,
}) => {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const { data: existingCategories } = useCategories();

  const [title, setTitle] = useState(defaultTitle);
  const [category, setCategory] = useState(defaultCategory);
  const [content, setContent] = useState(defaultContent);

  const { mutate, isPending } = useMutation({
    mutationKey: ['posts', id],
    mutationFn: async (formData: FormData) => {
      if (id) {
        const { data } = await axios.put(`/api/posts/${id}`, formData);
        return data;
      } else {
        const { data } = await axios.post('/api/posts', formData);
        return data;
      }
    },
    onSuccess: (data) => {
      if (id) {
        revalidatePath(`/blog/posts/${id}`);
        router.refresh();
      } else router.push(`/posts/${data.id}`);
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.length === 0) return alert('제목을 입력해주세요.');
    if (category.length === 0) return alert('카테고리를 입력해주세요.');
    if (content.length === 0) return alert('글 내용을 입력해주세요.');

    const formData = new FormData();

    formData.append('title', title);
    formData.append('category', category);
    formData.append('tags', '[]');
    formData.append('content', content);

    if (fileRef.current?.files?.[0]) {
      formData.append('preview_image', fileRef.current.files[0]);
    }

    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <Input
          type="text"
          label="제목"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <div className="flex items-end gap-3">
          <Autocomplete
            label="카테고리"
            placeholder="카테고리 선택 (필수)"
            defaultItems={(existingCategories ?? []).map((category) => ({
              label: category,
              value: category,
            }))}
            labelPlacement="outside"
            className="max-w-xs"
            disableSelectorIconRotation
            fullWidth
            defaultSelectedKey={defaultCategory}
            onSelectionChange={(key) => {
              setCategory(key as string);
            }}
          >
            {(item) => (
              <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
          <div className="flex w-full flex-col gap-2">
            <div className="flex gap-2">
              <label htmlFor="image" className="text-sm">
                이미지
              </label>
              {imageUrl && (
                <Link
                  href={imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 hover:underline"
                >
                  (기존 이미지 보기)
                </Link>
              )}
            </div>
            <Input
              id="image"
              type="file"
              accept="image/*"
              ref={fileRef}
              classNames={{
                inputWrapper: 'py-0 h-10',
                innerWrapper: 'h-10',
              }}
            />
          </div>
        </div>
        <MarkdownEditor
          height={500}
          value={content}
          onChange={(s) => setContent(s ?? '')}
        />
      </div>
      <Button
        isLoading={isPending}
        fullWidth
        color="primary"
        type="submit"
        className="mt-4"
      >
        {id ? '수정하기' : '작성하기'}
      </Button>
    </form>
  );
};

export default PostForm;
