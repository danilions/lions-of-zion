import React from 'react';

export default function Skyline() {
  return (
    <div
      className="w-full h-[75px] opacity-20 pointer-events-none bg-no-repeat bg-bottom"
      style={{
        backgroundImage:
          "url('https://assets-global.website-files.com/65e72f91b7828e4b9ff72c3e/660d8bfb7d2490f1012d62e6_jerusalem-skyline.svg')",
        backgroundSize: 'contain',
      }}
    />
  );
}
