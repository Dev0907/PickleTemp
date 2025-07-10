import React from 'react';

interface PickleballLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const PickleballLogo: React.FC<PickleballLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Paddle background */}
        <ellipse
          cx="50"
          cy="35"
          rx="25"
          ry="30"
          fill="#1E40AF"
          stroke="#FCD34D"
          strokeWidth="3"
        />
        
        {/* Paddle holes */}
        <circle cx="42" cy="25" r="3" fill="#FCD34D" />
        <circle cx="58" cy="25" r="3" fill="#FCD34D" />
        <circle cx="50" cy="35" r="3" fill="#FCD34D" />
        <circle cx="42" cy="45" r="3" fill="#FCD34D" />
        <circle cx="58" cy="45" r="3" fill="#FCD34D" />
        
        {/* Paddle handle */}
        <rect
          x="45"
          y="65"
          width="10"
          height="25"
          rx="5"
          fill="#10B981"
          stroke="#1E40AF"
          strokeWidth="2"
        />
        
        {/* Handle grip lines */}
        <line x1="47" y1="70" x2="53" y2="70" stroke="#1E40AF" strokeWidth="1" />
        <line x1="47" y1="75" x2="53" y2="75" stroke="#1E40AF" strokeWidth="1" />
        <line x1="47" y1="80" x2="53" y2="80" stroke="#1E40AF" strokeWidth="1" />
        <line x1="47" y1="85" x2="53" y2="85" stroke="#1E40AF" strokeWidth="1" />
        
        {/* Ball */}
        <circle
          cx="75"
          cy="20"
          r="8"
          fill="#FCD34D"
          stroke="#1E40AF"
          strokeWidth="2"
        />
        
        {/* Ball holes */}
        <circle cx="72" cy="17" r="1.5" fill="#1E40AF" />
        <circle cx="78" cy="17" r="1.5" fill="#1E40AF" />
        <circle cx="75" cy="23" r="1.5" fill="#1E40AF" />
      </svg>
    </div>
  );
};

export default PickleballLogo;