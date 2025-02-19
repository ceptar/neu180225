import * as React from 'react';
import type { SVGProps } from 'react';
const X = ({
  fill = 'currentColor',
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 480 480"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color: fill }}
    {...props}
  >
<path d="M115.313 365V323.661L214.688 240.984L115 158.307V115L240 220.315L365 115V158.307L265.312 240.984L364.688 323.661V365L240 261.982L115.313 365Z"
fill="currentColor"
    />
  </svg>
);
export default X;
