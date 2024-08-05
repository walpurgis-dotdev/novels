import * as React from "react";

export const useSticky = () => {
  const [isSticky, setIsSticky] = React.useState(false);
  const [lastScrollTop, setLastScrollTop] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if the scroll position is within 100px of the top
      if (currentScrollY > 0) {
        if (currentScrollY < lastScrollTop) {
          setIsSticky(true);
        } else if (currentScrollY > lastScrollTop) {
          setIsSticky(false);
        }
      } else {
        setIsSticky(false);
      }

      setLastScrollTop(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  return { isSticky };
};
