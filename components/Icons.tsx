
import React from 'react';

type SVGProps = React.SVGProps<SVGSVGElement>;

export const YahooIcon: React.FC<SVGProps> = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.07 18.94V13.6h-2.52v5.34H5.2V5.06h3.21v5.19h2.52V5.06h3.21v13.88h-3.21zM20.44 5.06h-3.21l-3.4 8.54v5.34h3.21v-3.74h.07l2.84 3.74h3.69l-4.1-5.38L24 5.06z" />
  </svg>
);

export const CheckCircleIcon: React.FC<SVGProps> = (props) => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const LoadingSpinner: React.FC<SVGProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="animate-spin"
    {...props}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export const MagicWandIcon: React.FC<SVGProps> = (props) => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.252v-1.5m0 12.504v-1.5m6.252-4.752h-1.5m-12.504 0h-1.5m10.134-7.018l-1.06-1.06m-7.018 7.018l-1.06-1.06m7.018-7.018l1.06-1.06m-7.018 7.018l1.06-1.06M12 18.75a6.75 6.75 0 100-13.5 6.75 6.75 0 000 13.5zm0-2.25a4.5 4.5 0 110-9 4.5 4.5 0 010 9z" />
    </svg>
);
