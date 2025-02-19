import * as React from 'react';
import type { SVGProps } from 'react';
const Right = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64" // Set the viewBox attribute for responsive scaling
    fill="none"
    {...props}
  >
    <path
      fill="url(#a)"
      d="m17 53.327 25.242-21.268L17 10.792V2l30 25.663v8.792L17 62v-8.673Z"
    />
    <defs>
      <linearGradient
        id="a"
        x1={32}
        x2={32}
        y1={2}
        y2={62}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF00F5" />
        <stop offset={1} stopColor="#00F0FF" />
      </linearGradient>
    </defs>
  </svg>
);
export default Right;
