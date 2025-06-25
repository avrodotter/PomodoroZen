
import React from 'react';

interface CircularProgressProps {
  progress: number;
  mode: 'work' | 'break';
}

const CircularProgress: React.FC<CircularProgressProps> = ({ progress, mode }) => {
  const strokeWidth = 8;
  const radius = 136; // Fixed radius for consistent calculations
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  const progressColor = mode === 'work' ? '#10b981' : '#3b82f6'; // green for work, blue for break

  return (
    <div className="flex items-center justify-center w-full">
      <div className="relative w-72 h-72 max-w-full max-h-full">
        <svg
          viewBox="0 0 288 288"
          className="w-full h-full transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx="144"
            cy="144"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="144"
            cy="144"
            r={radius}
            stroke={progressColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-in-out"
            style={{
              filter: 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.3))',
            }}
          />
        </svg>
      </div>
    </div>
  );
};

export default CircularProgress;
