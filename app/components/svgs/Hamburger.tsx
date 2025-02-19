import * as React from 'react';
import type { SVGProps } from 'react';
const Hamburger = ({
  fill = 'currentColor',
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color: fill }}
    {...props}
  >
<path d="M3 16.125V14.625H20.5V16.125H3ZM3 8.5V7H20.5V8.5H3Z" fill="currentColor"/>

  </svg>
);
export default Hamburger;
