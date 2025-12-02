import { memo } from 'react';
import { cn } from '@/utils';
import buttonVariants from '@/components/buttons/buttonVariants';

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
      className={cn(buttonVariants({ variant, size }), className, {
        'pointer-events-none bg-stone-400 select-none dark:bg-stone-500':
          disabled,
      })}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
