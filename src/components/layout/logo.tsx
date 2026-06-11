import * as React from "react";

export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="100"
    height="100"
    {...props}
  >
    <defs>
      <linearGradient id="dropGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: "hsl(210, 80%, 50%)" }} />
        <stop offset="100%" style={{ stopColor: "hsl(140, 70%, 50%)" }} />
      </linearGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g transform="translate(0, -5)">
      <path
        d="M50 10 C50 10 20 50 20 75 C20 95 33 110 50 110 C67 110 80 95 80 75 C80 50 50 10 50 10 Z"
        fill="url(#dropGradient)"
      />
      <path
        d="M25,80 A35,35 0 0,1 75,80"
        stroke="hsl(200, 100%, 70%)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        filter="url(#glow)"
      />
      <text
        x="50"
        y="78"
        fontFamily="cursive, sans-serif"
        fontSize="30"
        fontWeight="bold"
        fill="black"
        textAnchor="middle"
        dy=".3em"
      >
        R2G
      </text>
    </g>
  </svg>
);