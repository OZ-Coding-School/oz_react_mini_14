import { Link } from 'react-router-dom';
import { cn } from '@/utils';
import buttonVariants from '@/components/buttons/buttonVariants';

function LinkButton({ variant, size, className, children, ...rest }) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size }), className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

export default LinkButton;
