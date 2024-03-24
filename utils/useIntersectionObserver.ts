import { useEffect } from "react";

const useIntersectionObserver = (): void => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("isVisible");
          }
        });
      },
      { threshold: 0.5 }
    );

    const fadeElements = document.querySelectorAll(".fadeInFromBottom");
    fadeElements.forEach((el: Node) => observer.observe(el as Element));

    return () => observer.disconnect();
  }, []);
};

export default useIntersectionObserver;
