import React from 'react';
import icons from './icons';

interface IconProps {
  fill?: string,
  icon: string,
  size?: number,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getKeyValue = (key: string) => (obj: Record<string, any>) => obj[key];

function Icon({ fill, icon, size }:IconProps) {
  return (
    <svg height={size} width={size} viewBox="0 0 24 24">
      <path
        fill={`${fill}`}
        d={getKeyValue(icon)(icons)}
      />
    </svg>
  );
}

Icon.defaultProps = {
  fill: 'black',
  size: 24,
};

export default Icon;
