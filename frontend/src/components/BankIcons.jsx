
import React from "react";

const Svg = ({ children, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
    {children}
  </svg>
);

export const DashboardIcon = (p) => (
  <Svg {...p}><path d="M4 13h6v7H4v-7Zm0-9h6v7H4V4Zm10 0h6v11h-6V4Zm0 13h6v3h-6v-3Z" fill="currentColor"/></Svg>
);

export const TransactionsIcon = (p) => (
  <Svg {...p}><path d="M5 6h9v2H5V6Zm0 5h14v2H5v-2Zm0 5h9v2H5v-2Z" fill="currentColor"/></Svg>
);

export const TransferIcon = (p) => (
  <Svg {...p}><path d="M8 5l4-4 4 4H8Zm8 14H8l4 4 4-4ZM3 9h10v2H3V9Zm8 4h10v2H11v-2Z" fill="currentColor"/></Svg>
);

export const DepositIcon = (p) => (
  <Svg {...p}><path d="M12 3l3.5 3.5-1.4 1.4L13 6.3V14h-2V6.3L9.9 7.9 8.5 6.5 12 3Zm-7 16h14v2H5v-2Z" fill="currentColor"/></Svg>
);

export const WithdrawIcon = (p) => (
  <Svg {...p}><path d="M11 4v7.7L9.9 10.1 8.5 11.5 12 15l3.5-3.5-1.4-1.4L13 11.7V4h-2Zm-6 13h14v2H5v-2Z" fill="currentColor"/></Svg>
);

export const LoansIcon = (p) => (
  <Svg {...p}><path d="M3 10l9-6 9 6v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10Zm9-3.8L6 10h12l-6-3.8ZM7 13h10v2H7v-2Z" fill="currentColor"/></Svg>
);

export const ReportsIcon = (p) => (
  <Svg {...p}><path d="M5 19h14v2H5v-2Zm2-10h3v8H7v-8Zm5-4h3v12h-3V5Zm5 6h3v6h-3v-6Z" fill="currentColor"/></Svg>
);

export const LogoutIcon = (p) => (
  <Svg {...p}><path d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5v-2H5V5h5V3Zm7.6 7.6-2.6 2.6 1.4 1.4 5-5-5-5-1.4 1.4 2.6 2.6H12v2h5.6Z" fill="currentColor"/></Svg>
);

export const MenuIcon = (p) => (
  <Svg {...p}><path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" fill="currentColor"/></Svg>
);

export const CloseIcon = (p) => (
  <Svg {...p}><path d="M6.2 4.8 4.8 6.2 10.6 12l-5.8 5.8 1.4 1.4L12 13.4l5.8 5.8 1.4-1.4L13.4 12l5.8-5.8-1.4-1.4L12 10.6 6.2 4.8Z" fill="currentColor"/></Svg>
);