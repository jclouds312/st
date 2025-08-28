import type { SVGProps } from 'react';

export function MediFlowLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      {...props}
    >
      <path fill="none" d="M0 0h256v256H0z" />
      <path
        fill="currentColor"
        d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm-19.16 140.23a12 12 0 0 1-17 0l-24-24a12 12 0 0 1 17-17L104 139.09l42.13-56.17a12 12 0 1 1 19.74 14.8l-52 69.33a12.06 12.06 0 0 1-8.5.18Z"
      />
    </svg>
  );
}
