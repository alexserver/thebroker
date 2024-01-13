import type { IconProps } from './icontypes';
export default function ForwardIcon({ width, height }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 6 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m1 9 4-4-4-4"
      />
    </svg>
  );
}
