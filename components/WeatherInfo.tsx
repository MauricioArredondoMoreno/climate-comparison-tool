
import React from 'react';

type IconType = 'humidity' | 'wind' | 'uv';

interface WeatherInfoProps {
  label: string;
  value: string;
  icon: IconType;
}

const HumidityIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
  </svg>
);

const WindIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
  </svg>
);

const UvIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 12.5A4.5 4.5 0 1 1 7.5 8a4.5 4.5 0 0 1 4.5 4.5z"></path>
    <path d="M12 3v1"></path><path d="M12 20v1"></path>
    <path d="M3 12h1"></path><path d="M20 12h1"></path>
    <path d="m18.36 5.64-.7.7"></path><path d="m6.34 17.66-.7.7"></path>
    <path d="m18.36 18.36-.7-.7"></path><path d="m6.34 6.34-.7-.7"></path>
  </svg>
);

const icons: Record<IconType, React.ReactNode> = {
  humidity: <HumidityIcon className="w-6 h-6" />,
  wind: <WindIcon className="w-6 h-6" />,
  uv: <UvIcon className="w-6 h-6" />,
};

const WeatherInfo: React.FC<WeatherInfoProps> = ({ label, value, icon }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="text-white/80">{icons[icon]}</div>
      <div>
        <p className="text-sm text-white/80">{label}</p>
        <p className="font-bold text-lg">{value}</p>
      </div>
    </div>
  );
};

export default WeatherInfo;
