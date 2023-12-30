'use client';

import type { MarkdownPreviewProps } from '@uiw/react-markdown-preview';
import type { MDEditorProps } from '@uiw/react-md-editor';
import dynamic from 'next/dynamic';

import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-md-editor/markdown-editor.css';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const MDViewer = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
});

export const MarkdownEditor = ({ ...rest }: MDEditorProps) => (
  <div data-dark-mode="dark">
    <MDEditor {...rest} className="!bg-background" />
  </div>
);

export const MarkdownViewer = ({ ...rest }: MarkdownPreviewProps) => (
  <MDViewer
    {...rest}
    wrapperElement={{
      'data-color-mode': 'dark',
    }}
    className="!bg-background"
  />
);
