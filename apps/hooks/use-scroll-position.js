import * as React from "react";

const SCROLL_AMOUNT = 300;

export const useScrollPosition = () => {
  const contentRef = React.useRef(null);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [showPrevButton, setShowPrevButton] = React.useState(false);
  const [showNextButton, setShowNextButton] = React.useState(true);

  const handleScroll = (direction) => {
    const newScrollPosition = direction === "left" ? scrollPosition - SCROLL_AMOUNT : scrollPosition + SCROLL_AMOUNT;
    contentRef.current.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    });
  };

  React.useEffect(() => {
    const onScroll = () => {
      const currentScrollPosition = contentRef.current.scrollLeft;
      const clientWidth = contentRef.current.clientWidth;
      const contentWidth = contentRef.current.scrollWidth;
      setScrollPosition(currentScrollPosition);
      setShowPrevButton(currentScrollPosition > 0);
      setShowNextButton(currentScrollPosition < contentWidth - clientWidth);
    };

    if (contentRef.current) {
      contentRef.current.addEventListener("scroll", onScroll);
    }

    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener("scroll", onScroll);
      }
    };
  }, [scrollPosition]);

  return { contentRef, showPrevButton, showNextButton, handleScroll };
};
