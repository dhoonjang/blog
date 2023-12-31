'use client';

import type { MarkdownPreviewProps } from '@uiw/react-markdown-preview';
import type { MDEditorProps } from '@uiw/react-md-editor';
import dynamic from 'next/dynamic';

import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-md-editor/markdown-editor.css';
import { createContext, useContext } from 'react';

const SourceContext = createContext<string>('');

const MarkdownLoading = () => {
  const source = useContext(SourceContext);
  return (
    <div className="whitespace-pre-wrap font-base text-base text-markdown-textColor">
      {source}
    </div>
  );
};

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const MDViewer = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
  loading: MarkdownLoading,
});

export const MarkdownEditor = ({ ...rest }: MDEditorProps) => (
  <div data-dark-mode="dark">
    <MDEditor
      {...rest}
      className="!bg-background !font-base"
      previewOptions={{
        className: '!bg-background !font-base',
      }}
    />
  </div>
);

export const MarkdownViewer = ({ source, ...rest }: MarkdownPreviewProps) => (
  <SourceContext.Provider value={source ?? ''}>
    <MDViewer
      source={source}
      {...rest}
      wrapperElement={{
        'data-color-mode': 'dark',
      }}
      className="!bg-background !font-base"
    />
  </SourceContext.Provider>
);
