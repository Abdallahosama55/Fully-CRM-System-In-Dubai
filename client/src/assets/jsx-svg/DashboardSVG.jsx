import * as React from "react";
const DashboardSVG = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 64 64" {...props}>
    <rect width={56} height={43} x={6} y={7} fill="#f5f5f5" rx={3} />
    <path fill="#f44336" d="M39 31h-2a2 2 0 0 0-2 2v13h6V33a2 2 0 0 0-2-2z" />
    <path fill="#fbc02d" d="M46 28h-2a2 2 0 0 0-2 2v16h6V30a2 2 0 0 0-2-2z" />
    <path fill="#7cb342" d="M53 34h-2a2 2 0 0 0-2 2v10h6V36a2 2 0 0 0-2-2z" />
    <g fill="#212121">
      <path d="M37.771 15.363a1 1 0 0 0-1.408-.134l-10.877 8.986-8.866-7a1.002 1.002 0 0 0-1.285.038l-9 8a1 1 0 0 0 1.33 1.494l8.373-7.443 8.842 6.981a.999.999 0 0 0 1.257-.014l11.5-9.5a1 1 0 0 0 .134-1.408zM56 15h-9a1 1 0 0 1 0-2h9a1 1 0 0 1 0 2z" />
      <circle cx={44} cy={14} r={1} />
      <path d="M56 19h-9a1 1 0 0 1 0-2h9a1 1 0 0 1 0 2zM56 23h-9a1 1 0 0 1 0-2h9a1 1 0 0 1 0 2z" />
      <circle cx={44} cy={18} r={1} />
      <circle cx={44} cy={22} r={1} />
    </g>
    <path fill="#f44336" d="M15 44 3.529 50.114A12.999 12.999 0 0 0 28 44z" />
    <path fill="#fbc02d" d="M15 31A12.997 12.997 0 0 0 3.529 50.113L15 44z" />
    <path fill="#7cb342" d="M15 31v13h13a13.015 13.015 0 0 0-13-13z" />
    <path
      fill="#212121"
      d="M57 46H35a3.003 3.003 0 0 1-3-3V27a1 1 0 0 1 2 0v16a1.001 1.001 0 0 0 1 1h22a1 1 0 0 1 0 2z"
    />
    <circle cx={6.5} cy={26.5} r={3.5} fill="#f44336" />
    <circle cx={16.5} cy={17.5} r={3.5} fill="#fbc02d" />
    <circle cx={36.5} cy={16.5} r={3.5} fill="#1976d2" />
    <circle cx={25.5} cy={25.5} r={3.5} fill="#7cb342" />
  </svg>
);
export default DashboardSVG;
