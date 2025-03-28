
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import ParkingSpot from '@/components/ParkingSpot';
import { ParkingLot, ParkingSpot as ParkingSpotType } from '@/types';
import { useParkingContext } from '@/context/ParkingContext';

interface ParkingSpotSelectorProps {
  selectedLot: ParkingLot;
  selectedSpot: ParkingSpotType | null;
  setSelectedSpot: (spot: ParkingSpotType | null) => void;
  duration: number;
  setDuration: (duration: number) => void;
}

const ParkingSpotSelector = ({ 
  selectedLot, 
  selectedSpot, 
  setSelectedSpot, 
  duration, 
  setDuration 
}: ParkingSpotSelectorProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createBooking, selectLot } = useParkingContext();

  const handleSpotSelect = (spot: ParkingSpotType) => {
    if (spot.status === 'available') {
      setSelectedSpot(spot);
    } else {
      toast({
        title: "Spot Unavailable",
        description: "This parking spot is not available",
        variant: "destructive",
      });
    }
  };

  const handleReservation = () => {
    if (!selectedSpot) {
      toast({
        title: "Error",
        description: "Please select a parking spot",
        variant: "destructive",
      });
      return;
    }
    
    createBooking(selectedSpot, duration);
    navigate('/payment');
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{selectedLot.name}</CardTitle>
          <CardDescription>{selectedLot.address}</CardDescription>
        </div>
        <Button variant="outline" onClick={() => selectLot(null)}>
          Back to Map
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 mb-6">
          {selectedLot.spots.slice(0, 48).map((spot) => (
            <ParkingSpot
              key={spot.id}
              spot={spot}
              onClick={handleSpotSelect}
              selected={selectedSpot?.id === spot.id}
            />
          ))}
        </div>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center">
            <div className="h-4 w-4 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm">Occupied</span>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 bg-yellow-500 rounded-full mr-2"></div>
            <span className="text-sm">Reserved</span>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 bg-gray-400 rounded-full mr-2"></div>
            <span className="text-sm">Disabled</span>
          </div>
        </div>
        
        {selectedSpot && (
          <Card className="mt-6 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Book Spot {selectedSpot.spotNumber}</CardTitle>
              <CardDescription>
                Select duration and confirm your booking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <span className="font-medium">{duration} {duration === 1 ? 'hour' : 'hours'}</span>
                </div>
                <Slider
                  id="duration"
                  min={1}
                  max={12}
                  step={1}
                  defaultValue={[duration]}
                  onValueChange={(value) => setDuration(value[0])}
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Hourly Rate</span>
                  <span>₹{selectedLot.hourlyRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Duration</span>
                  <span>{duration} {duration === 1 ? 'hour' : 'hours'}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Estimated Total</span>
                  <span>₹{(selectedLot.hourlyRate * duration).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleReservation}>
                Proceed to Payment
              </Button>
            </CardFooter>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default ParkingSpotSelector;
