
import React from 'react';
import { WeatherConditionCode } from '../types';

interface WeatherIconProps extends React.SVGProps<SVGSVGElement> {
  code: WeatherConditionCode;
}

const Sunny: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <circle cx="32" cy="32" r="12" fill="#FFD700" stroke="none" />
    <path d="M32 4 L32 10" stroke="#FFD700" />
    <path d="M32 54 L32 60" stroke="#FFD700" />
    <path d="M50.6 13.4 L46 18" stroke="#FFD700" />
    <path d="M18 46 L13.4 50.6" stroke="#FFD700" />
    <path d="M60 32 L54 32" stroke="#FFD700" />
    <path d="M10 32 L4 32" stroke="#FFD700" />
    <path d="M50.6 50.6 L46 46" stroke="#FFD700" />
    <path d="M18 18 L13.4 13.4" stroke="#FFD700" />
  </svg>
);

const Cloudy: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <path d="M41.5 20 A12 12 0 0 0 20 20 A10 10 0 0 0 9 29 A10 10 0 0 0 9 49 L48 49 A10 10 0 0 0 48 31 A12 12 0 0 0 41.5 20 Z" fill="#FFFFFF" stroke="#FFFFFF"/>
  </svg>
);

const PartlyCloudy: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 64 64" fill="none" strokeWidth="3" strokeLinecap="round">
    <circle cx="26" cy="26" r="10" fill="#FFD700" stroke="none" />
    <path d="M26 8 L26 13" stroke="#FFD700" />
    <path d="M41.6 10.4 L38.5 14.5" stroke="#FFD700" />
    <path d="M46 26 L41 26" stroke="#FFD700" />
    <path d="M41.6 41.6 L38.5 37.5" stroke="#FFD700" />
    <path d="M26 44 L26 39" stroke="#FFD700" />
    <path d="M10.4 41.6 L13.5 37.5" stroke="#FFD700" />
    <path d="M8 26 L13 26" stroke="#FFD700" />
    <path d="M10.4 10.4 L13.5 14.5" stroke="#FFD700" />
    <path d="M41.5 24 A12 12 0 0 0 20 24 A10 10 0 0 0 9 33 A10 10 0 0 0 9 53 L48 53 A10 10 0 0 0 48 35 A12 12 0 0 0 41.5 24 Z" fill="#FFFFFF" stroke="#FFFFFF"/>
  </svg>
);

const Rain: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 64 64" fill="none" strokeLinecap="round">
    <path d="M41.5 20 A12 12 0 0 0 20 20 A10 10 0 0 0 9 29 A10 10 0 0 0 9 49 L48 49 A10 10 0 0 0 48 31 A12 12 0 0 0 41.5 20 Z" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="3"/>
    <path d="M24 52 L20 60" stroke="#4682B4" strokeWidth="3"/>
    <path d="M34 52 L30 60" stroke="#4682B4" strokeWidth="3"/>
    <path d="M44 52 L40 60" stroke="#4682B4" strokeWidth="3"/>
  </svg>
);

const Storm: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 64 64" fill="none" strokeLinecap="round">
    <path d="M41.5 20 A12 12 0 0 0 20 20 A10 10 0 0 0 9 29 A10 10 0 0 0 9 49 L48 49 A10 10 0 0 0 48 31 A12 12 0 0 0 41.5 20 Z" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="3"/>
    <path d="M30 49 L25 56 L33 56 L28 63" stroke="#FFD700" strokeWidth="3"/>
  </svg>
);

const Snow: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 64 64" fill="none" strokeLinecap="round">
    <path d="M41.5 20 A12 12 0 0 0 20 20 A10 10 0 0 0 9 29 A10 10 0 0 0 9 49 L48 49 A10 10 0 0 0 48 31 A12 12 0 0 0 41.5 20 Z" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="3"/>
    <path d="M24 56 L24 60" stroke="#ADD8E6" strokeWidth="3"/>
    <path d="M22 58 L26 58" stroke="#ADD8E6" strokeWidth="3"/>
    <path d="M34 52 L34 56" stroke="#ADD8E6" strokeWidth="3"/>
    <path d="M32 54 L36 54" stroke="#ADD8E6" strokeWidth="3"/>
    <path d="M44 56 L44 60" stroke="#ADD8E6" strokeWidth="3"/>
    <path d="M42 58 L46 58" stroke="#ADD8E6" strokeWidth="3"/>
  </svg>
);

const Fog: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 64 64" fill="none" strokeLinecap="round">
    <path d="M41.5 20 A12 12 0 0 0 20 20 A10 10 0 0 0 9 29 A10 10 0 0 0 9 49 L48 49 A10 10 0 0 0 48 31 A12 12 0 0 0 41.5 20 Z" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="3"/>
    <path d="M12 55 L52 55" stroke="#B0C4DE" strokeWidth="4"/>
    <path d="M16 60 L48 60" stroke="#B0C4DE" strokeWidth="4"/>
  </svg>
);


const WeatherIcon: React.FC<WeatherIconProps> = ({ code, ...props }) => {
  switch (code) {
    case 'sunny':
      return <Sunny {...props} />;
    case 'cloudy':
      return <Cloudy {...props} />;
    case 'partly-cloudy':
      return <PartlyCloudy {...props} />;
    case 'rain':
      return <Rain {...props} />;
    case 'storm':
      return <Storm {...props} />;
    case 'snow':
      return <Snow {...props} />;
    case 'fog':
      return <Fog {...props} />;
    default:
      return <Cloudy {...props} />;
  }
};

export default WeatherIcon;
