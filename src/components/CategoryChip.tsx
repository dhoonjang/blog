import { Chip, ChipProps } from '@nextui-org/react';
import { FC } from 'react';

type CategoryChipProps = ChipProps & {
  category: string;
};

const COLOR_BY_CATEGORY = {
  Life: 'success',
  Career: 'primary',
} as const;

const CategoryChip: FC<CategoryChipProps> = ({ category, ...props }) => {
  const color = Object.keys(COLOR_BY_CATEGORY).includes(category)
    ? COLOR_BY_CATEGORY[category as keyof typeof COLOR_BY_CATEGORY]
    : 'default';

  return (
    <Chip color={color} {...props}>
      {category}
    </Chip>
  );
};

export default CategoryChip;
