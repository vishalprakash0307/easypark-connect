
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Banknote, Car } from 'lucide-react';
import { ParkingLot } from '../types';
import { Button } from '@/components/ui/button';
import { useParkingContext } from '../context/ParkingContext';

interface ParkingLotCardProps {
  parkingLot: ParkingLot;
  className?: string;
}

const ParkingLotCard: React.FC<ParkingLotCardProps> = ({ parkingLot, className = '' }) => {
  const { selectLot } = useParkingContext();
  
  const availabilityColor = () => {
    const ratio = parkingLot.availableSpots / parkingLot.totalSpots;
    if (ratio > 0.3) return 'bg-green-500';
    if (ratio > 0.1) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-transform hover:shadow-md ${className}`}>
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={parkingLot.image || 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?w=800&auto=format&fit=crop'} 
          alt={parkingLot.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <div className={`${availabilityColor()} text-white text-xs font-medium px-2 py-1 rounded-full`}>
            {parkingLot.availableSpots} spots available
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg">{parkingLot.name}</h3>
        
        <div className="space-y-2 mt-2">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-sm truncate">{parkingLot.address}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-sm">{parkingLot.openTime} - {parkingLot.closeTime}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Banknote className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-sm">${parkingLot.hourlyRate}/hour</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Car className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-sm">{parkingLot.availableSpots}/{parkingLot.totalSpots} spaces</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => selectLot(parkingLot.id)}
          >
            View on Map
          </Button>
          <Button 
            size="sm" 
            className="w-full"
            asChild
          >
            <Link to="/dashboard">Reserve</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParkingLotCard;
