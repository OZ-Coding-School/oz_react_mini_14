import { useEffect } from 'react';

function useInfiniteScroll({ targetRef, hasNextPage, fetchNextPage }) {
  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      const isInView = entries[0].isIntersecting;
      if (isInView && hasNextPage) fetchNextPage();
    });

    observer.observe(targetRef.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage]);
}

export default useInfiniteScroll;
