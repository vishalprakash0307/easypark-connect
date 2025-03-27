
import React from 'react';
import { ParkingSpot as ParkingSpotType } from '../types';

interface ParkingSpotProps {
  spot: ParkingSpotType;
  onClick?: (spot: ParkingSpotType) => void;
  selected?: boolean;
}

const ParkingSpot: React.FC<ParkingSpotProps> = ({ 
  spot, 
  onClick,
  selected = false
}) => {
  const handleClick = () => {
    if (onClick && spot.status !== 'disabled' && spot.status !== 'occupied') {
      onClick(spot);
    }
  };

  const getStatusColor = () => {
    switch (spot.status) {
      case 'available':
        return 'bg-green-500 hover:bg-green-600 cursor-pointer';
      case 'occupied':
        return 'bg-red-500 cursor-not-allowed';
      case 'reserved':
        return 'bg-yellow-500 cursor-not-allowed';
      case 'disabled':
        return 'bg-gray-400 cursor-not-allowed';
      default:
        return 'bg-green-500 hover:bg-green-600 cursor-pointer';
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        relative h-12 w-14 rounded-md flex items-center justify-center text-white font-medium
        transition-all duration-200 ${getStatusColor()}
        ${selected ? 'ring-4 ring-primary scale-110 z-10' : ''}
      `}
      role="button"
      aria-label={`Parking spot ${spot.spotNumber}, status: ${spot.status}`}
    >
      {spot.spotNumber}
    </div>
  );
};

export default ParkingSpot;
