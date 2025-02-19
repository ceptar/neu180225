import * as React from 'react';
import type { SVGProps } from 'react';
const RightRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_604_874)">
      <path
        d="M32 53.3267L57.2419 32.0594L32 10.7921V2L62 27.6634V36.4554L32 62V53.3267Z"
        fill="url(#paint0_linear_604_874)"
      />
      <path
        d="M2 53.3267L27.2419 32.0594L2 10.7921V2L32 27.6634V36.4554L2 62V53.3267Z"
        fill="url(#paint1_linear_604_874)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_604_874"
        x1={32}
        y1={2}
        x2={32}
        y2={62}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF00F5" />
        <stop offset={1} stopColor="#00F0FF" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_604_874"
        x1={32}
        y1={2}
        x2={32}
        y2={62}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF00F5" />
        <stop offset={1} stopColor="#00F0FF" />
      </linearGradient>
      <clipPath id="clip0_604_874">
        <rect width={60} height={60} fill="white" transform="translate(2 2)" />
      </clipPath>
    </defs>
  </svg>
);
export default RightRight;
