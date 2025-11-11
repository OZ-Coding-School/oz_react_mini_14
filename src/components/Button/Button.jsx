import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import buttonVariants from '@/components/Button/buttonVariants';

const Button = memo(function ({
  variant,
  size,
  className,
  disabled,
  children,
  ...rest
}) {
  return (
    <button
      className={twMerge(
        buttonVariants({ variant, size }),
        className,
        disabled &&
          'pointer-events-none bg-stone-400 select-none dark:bg-stone-500',
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
