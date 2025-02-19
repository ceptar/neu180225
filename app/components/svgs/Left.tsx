import * as React from 'react';
import type { SVGProps } from 'react';
const Left = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64" // Set the viewBox attribute for responsive scaling
    fill="none"
    {...props}
  >
    <path
      fill="url(#a)"
      d="M47 2v8.792L21.677 32.06 47 53.327V62L17 36.455v-8.792L47 2Z"
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
export default Left;
