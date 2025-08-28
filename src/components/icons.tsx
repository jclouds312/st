
import type { SVGProps } from 'react';

export function MediFlowLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path 
      fill="currentColor"
      d="M17.13 2.87A11 11 0 0 0 6.87 21.13A11 11 0 0 0 21.13 6.87A11 11 0 0 0 17.13 2.87M12 21a9 9 0 1 1 9-9a9 9 0 0 1-9 9m2-11h-2v2h-2v2h2v2h2v-2h2v-2h-2z"
      />
    </svg>
  );
}
