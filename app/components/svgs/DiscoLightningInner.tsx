import * as React from "react";
import type { SVGProps } from "react";

const DiscoLightningInner = ({ width = 36, height = 36, fill = "currentColor", ...props }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      >
 <path 
d="M64.2764 8.94721L49.7236 38.0528C49.3912 38.7177 49.8747 39.5 50.618 39.5H72.1573C72.9508 39.5 73.4282 40.3797 72.9958 41.045L38.5108 94.0988C37.8882 95.0566 36.4052 94.3901 36.7081 93.2887L45.6521 60.7652C45.8272 60.1285 45.3481 59.5 44.6879 59.5H27.1656C26.5527 59.5 26.084 58.9537 26.1772 58.3479L33.8695 8.34794C33.9446 7.86011 34.3643 7.5 34.8579 7.5H63.382C64.1253 7.5 64.6088 8.28231 64.2764 8.94721Z" 
/>
</svg>
)

export default DiscoLightningInner