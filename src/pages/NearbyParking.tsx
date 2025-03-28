
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { formatIndianNumber } from '@/lib/utils';
import { useParkingContext } from '@/context/ParkingContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Map from '@/components/Map';
import { MapPin, Clock, CreditCard, Car } from 'lucide-react';

const NearbyParking = () => {
  const { parkingLots, selectLot, currentUser } = useParkingContext();
  const [maxDistance, setMaxDistance] = useState<number>(5); // Default 5km
  const navigate = useNavigate();
  const { toast } = useToast();

  // Sort parking lots by distance
  const sortedParkingLots = [...parkingLots]
    .filter(lot => (lot.distance || 0) <= maxDistance)
    .sort((a, b) => (a.distance || 0) - (b.distance || 0));

  const handleBookNow = (lotId: string) => {
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please log in to book a parking spot",
        variant: "destructive",
      });
      navigate('/dashboard');
      return;
    }

    selectLot(lotId);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Nearby Parking</h1>
            <div className="text-sm font-medium text-muted-foreground">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>

          {/* Map Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Find Parking Near You</CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[400px]">
              <Map />
            </CardContent>
          </Card>

          {/* Distance Filter */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Max Distance: {maxDistance} km</h2>
              <span className="text-sm text-muted-foreground">
                Showing {sortedParkingLots.length} parking lots
              </span>
            </div>
            <Slider
              defaultValue={[maxDistance]}
              max={10}
              step={0.5}
              onValueChange={(values) => setMaxDistance(values[0])}
              className="w-full"
            />
          </div>

          {/* Parking Lots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedParkingLots.map((lot) => (
              <Card key={lot.id} className={`overflow-hidden transition-shadow hover:shadow-md ${lot.availableSpots === 0 ? 'opacity-70' : ''}`}>
                {lot.image && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={lot.image}
                      alt={lot.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{lot.name}</CardTitle>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      lot.availableSpots > 10 
                        ? 'bg-green-100 text-green-800' 
                        : lot.availableSpots > 0 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {lot.availableSpots > 0 ? 'Available' : 'Full'}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-gray-600">{lot.address}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <Car className="h-4 w-4 mr-2 text-primary" />
                      <span>
                        {lot.availableSpots} / {lot.totalSpots} spots
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      <span>{lot.estimatedTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <CreditCard className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-semibold">
                      ₹{currentUser?.preferences?.useIndianNumberFormat 
                        ? formatIndianNumber(lot.hourlyRate) 
                        : lot.hourlyRate} /hour
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    <span>{lot.openTime} - {lot.closeTime}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    disabled={lot.availableSpots === 0}
                    onClick={() => handleBookNow(lot.id)}
                  >
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {sortedParkingLots.length === 0 && (
            <div className="text-center py-10">
              <h3 className="text-xl font-medium mb-2">No parking lots found</h3>
              <p className="text-muted-foreground">
                Try increasing the distance range or check back later
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NearbyParking;
