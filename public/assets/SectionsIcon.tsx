import React from 'react';

const SectionsIcon = ({
  height,
  width,
}: {
  height?: string;
  width?: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6V4H20V6H4ZM4 20V14H3V12L4 7H20L21 12V14H20V20H18V14H14V20H4ZM6 18H12V14H6V18ZM5.05 12H18.95L18.35 9H5.65L5.05 12Z"
        fill="#5D6679"
      />
    </svg>
  );
};

export default SectionsIcon;
