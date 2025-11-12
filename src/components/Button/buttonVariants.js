import { cva } from 'class-variance-authority';
import { cn } from '@/utils';

const stoneBase =
  'bg-stone-500 text-stone-50 hover:bg-stone-900 dark:bg-stone-700';

const buttonVariants = cva(
  'flex-center rounded-md border border-transparent font-bold transition-all hover:border-stone-50',
  {
    variants: {
      variant: {
        stone: stoneBase,
        icon: 'bg-transparent text-3xl',
        carousel: cn(
          stoneBase,
          'absolute top-[50%] h-40 w-18 -translate-y-[50%] text-4xl opacity-90',
        ),
        profile: 'size-9 overflow-hidden rounded-full md:size-10',
      },
      size: {
        sm: 'w-11 py-1',
        md: 'w-22 py-2',
        lg: 'w-33 py-2',
        xl: 'w-44 py-2',
        full: 'w-full py-2',
        screen: 'h-[60px] w-screen rounded-none',
      },
    },
  },
);

export default buttonVariants;
