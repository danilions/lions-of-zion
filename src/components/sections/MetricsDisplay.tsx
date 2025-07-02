import React from 'react';

interface MetricsDisplayProps {
  label: string;
  value: string;
  trend: string;
  type: 'success' | 'info' | 'primary' | 'warning';
}

export const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ label, value, trend, type }) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'border-secondary-200 bg-secondary-50/80 text-secondary-900';
      case 'info':
        return 'border-primary-200 bg-primary-50/80 text-primary-900';
      case 'primary':
        return 'border-primary-200 bg-primary-50/80 text-primary-900';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50/80 text-yellow-900';
      default:
        return 'border-neutral-200 bg-white/80 text-neutral-900';
    }
  };

  const getTrendColor = () => {
    if (trend.startsWith('+')) return 'text-secondary-600';
    if (trend === 'stable') return 'text-neutral-600';
    return 'text-yellow-600';
  };

  return (
    <div 
      className={`
        relative backdrop-blur-sm border rounded-lg p-4 shadow-soft
        transition-all duration-300 hover:shadow-medium hover:-translate-y-1
        ${getTypeStyles()}
      `}
    >
      {/* Pulse indicator */}
      <div className="absolute top-2 right-2">
        <div className="w-2 h-2 bg-current rounded-full opacity-60 animate-pulse"></div>
      </div>
      
      <div className="space-y-1">
        <p className="text-xs font-medium opacity-70 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-2xl font-bold font-display">
          {value}
        </p>
        <div className="flex items-center space-x-1">
          <span className={`text-xs font-medium ${getTrendColor()}`}>
            {trend}
          </span>
          {trend !== 'stable' && (
            <svg 
              className={`w-3 h-3 ${getTrendColor()}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor"
            >
              {trend.startsWith('+') ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 17L7 7M7 7H17M7 7V17" />
              )}
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};
