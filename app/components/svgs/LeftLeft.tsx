import * as React from 'react';
import type { SVGProps } from 'react';
const LeftLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64" // Set the viewBox attribute for responsive scaling
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="url(#b)"
        d="M32 2v8.792L6.677 32.06 32 53.327V62L2 36.455v-8.792L32 2Z"
      />
      <path
        fill="url(#c)"
        d="M62 2v8.792L36.677 32.06 62 53.327V62L32 36.455v-8.792L62 2Z"
      />
    </g>
    <defs>
      <linearGradient
        id="b"
        x1={17}
        x2={17}
        y1={2}
        y2={62}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF00F5" />
        <stop offset={1} stopColor="#00F0FF" />
      </linearGradient>
      <linearGradient
        id="c"
        x1={47}
        x2={47}
        y1={2}
        y2={62}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF00F5" />
        <stop offset={1} stopColor="#00F0FF" />
      </linearGradient>
      <clipPath id="a">
        <path fill="#fff" d="M2 2h60v60H2z" />
      </clipPath>
    </defs>
  </svg>
);
export default LeftLeft;
