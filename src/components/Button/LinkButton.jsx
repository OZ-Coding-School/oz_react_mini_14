import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import buttonVariants from '@/components/Button/buttonVariants';

function LinkButton({ variant, size, className, children, ...rest }) {
  return (
    <Link
      className={twMerge(buttonVariants({ variant, size }), className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

export default LinkButton;
