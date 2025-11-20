import { useEffect, useRef } from "react";

const useIntersectionObserver = ({ onIntersect, enabled = true }) => {
  const targetRef = useRef(null);

  useEffect(() => {
    //enabled가 false면 observeer 동작 안함
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        //요소가 화면에 보이면
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      {
        threshold: 0.1, // 요소의 10%가 보이면 트리거
        rootMargin: "100px", // 100px 전에 미리 로딩
      }
    );

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    //클린업: 컴포넌트 언마운트 시 observer 해제
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [onIntersect, enabled]);

  return targetRef;
};

export default useIntersectionObserver;
