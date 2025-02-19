import * as React from "react";
import type { SVGProps } from "react";

const DiscoPfeilLinks = ({ width = 24, height = 24, fill = "white", ...props }) => (
    <svg
      width={width}
      height={height}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      >
<path d="M15.41 16.58L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.58Z"
 fill="currentColor"/>

</svg>
)

export default DiscoPfeilLinks
