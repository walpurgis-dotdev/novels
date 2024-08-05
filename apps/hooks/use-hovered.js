import * as React from "react";

export const useHovered = () => {
  const [hovered, setHovered] = React.useState(null);

  const handleHover = (id) => {
    setHovered(id);
  };

  return {
    hovered,
    handleHover,
  };
};
