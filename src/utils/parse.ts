export interface MdxMetadata {
  author: string;
  title: string;
  category: string;
  date: string;
  previewImage?: string;
  description?: string;
}

export const getMdxMetdata = (source: string): MdxMetadata => {
  const contentArray = source.split('\n');
  const descriptionFilter = source.substring(source.search('\n\n---\n\n'));
  const descriptionArray = descriptionFilter.split('\n\n');
  const metadataRecord: Record<string, string> = {};

  let i = 1;

  if (contentArray[0] === 'export const metadata = {') {
    while (contentArray[i] !== '};') {
      const curr = contentArray[i];
      const [key, value] = curr.trim().split(': ');
      metadataRecord[key] = value.replaceAll("',", '').substring(1);
      i++;
    }
  }

  const description = descriptionArray.find((s) => s.includes('. '));
  if (description) metadataRecord['description'] = description;

  return metadataRecord as unknown as MdxMetadata;
};
