import type { IconProps } from './icontypes';
export default function FirstIcon({ width, height }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 12 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 1 1 5l4 4m6-8L7 5l4 4"
      />
    </svg>
  );
}
