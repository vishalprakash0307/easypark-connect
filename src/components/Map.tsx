
import React, { useEffect, useRef, useState } from 'react';
import { useParkingContext } from '../context/ParkingContext';
import { MapPin, ChevronLeft, ChevronRight, MapIcon, Layers, Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Map = () => {
  const { 
    parkingLots, 
    filteredParkingLots, 
    selectedLot, 
    selectLot, 
    loadingParkingData,
    filter,
    setFilter
  } = useParkingContext();
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [minSpots, setMinSpots] = useState(filter.minAvailableSpots || 0);
  const [maxPrice, setMaxPrice] = useState(filter.maxPrice || 5);
  const [maxDistance, setMaxDistance] = useState(filter.maxDistance || 5);
  const [openNow, setOpenNow] = useState(filter.openNow || false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapView, setMapView] = useState('standard');

  const applyFilters = () => {
    setFilter({
      minAvailableSpots: minSpots,
      maxPrice,
      maxDistance,
      openNow
    });
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setMinSpots(0);
    setMaxPrice(5);
    setMaxDistance(5);
    setOpenNow(false);
    setFilter({});
    setIsFilterOpen(false);
  };

  if (loadingParkingData) {
    return (
      <div className="h-[500px] md:h-[600px] w-full relative rounded-xl overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>
    );
  }

  return (
    <div className="h-[500px] md:h-[600px] w-full relative rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
      <div className="absolute inset-0 bg-slate-200 overflow-hidden">
        {/* Simulated map background */}
        <div className="w-full h-full bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/-73.9876,40.7661,12,0/1200x800?access_token=pk.placeholder')] bg-cover bg-no-repeat bg-center">
          {/* This would be a real map integration in production */}
        </div>
        
        {/* Filter overlay */}
        <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Search locations..."
                className="pl-9 pr-4 py-2 w-[250px] sm:w-[300px] bg-white/90 backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant={Object.keys(filter).length > 0 ? "default" : "outline"} 
                  size="icon"
                  className="h-10 w-10 bg-white/90 backdrop-blur-sm"
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM3 5C3.01671 5 3.03323 4.99918 3.04952 4.99758C3.28022 6.1399 4.28967 7 5.5 7C6.71033 7 7.71978 6.1399 7.95048 4.99758C7.96677 4.99918 7.98329 5 8 5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H8C7.98329 4 7.96677 4.00082 7.95048 4.00242C7.71978 2.86009 6.71033 2 5.5 2C4.28967 2 3.28022 2.86009 3.04952 4.00242C3.03323 4.00082 3.01671 4 3 4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H3ZM11.9505 10.9976C11.7198 12.1399 10.7103 13 9.5 13C8.28967 13 7.28022 12.1399 7.04952 10.9976C7.03323 10.9992 7.01671 11 7 11H1.5C1.22386 11 1 10.7761 1 10.5C1 10.2239 1.22386 10 1.5 10H7C7.01671 10 7.03323 10.0008 7.04952 10.0024C7.28022 8.8601 8.28967 8 9.5 8C10.7103 8 11.7198 8.8601 11.9505 10.0024C11.9668 10.0008 11.9833 10 12 10H13.5C13.7761 10 14 10.2239 14 10.5C14 10.7761 13.7761 11 13.5 11H12C11.9833 11 11.9668 10.9992 11.9505 10.9976ZM8 10.5C8 9.67157 8.67157 9 9.5 9C10.3284 9 11 9.67157 11 10.5C11 11.3284 10.3284 12 9.5 12C8.67157 12 8 11.3284 8 10.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Filter Parking Spots</h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="min-spots">Minimum Available Spots: {minSpots}</Label>
                    </div>
                    <Slider 
                      id="min-spots"
                      defaultValue={[minSpots]} 
                      max={50} 
                      step={1} 
                      onValueChange={(vals) => setMinSpots(vals[0])}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="max-price">Maximum Price: ${maxPrice}/hr</Label>
                    </div>
                    <Slider 
                      id="max-price"
                      defaultValue={[maxPrice]} 
                      max={10} 
                      step={0.5} 
                      onValueChange={(vals) => setMaxPrice(vals[0])}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="max-distance">Maximum Distance: {maxDistance} km</Label>
                    </div>
                    <Slider 
                      id="max-distance"
                      defaultValue={[maxDistance]} 
                      max={10} 
                      step={0.5} 
                      onValueChange={(vals) => setMaxDistance(vals[0])}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="open-now"
                      checked={openNow}
                      onCheckedChange={setOpenNow}
                    />
                    <Label htmlFor="open-now">Open Now</Label>
                  </div>
                  
                  <div className="flex justify-between pt-2">
                    <Button variant="outline" size="sm" onClick={resetFilters}>
                      Reset
                    </Button>
                    <Button size="sm" onClick={applyFilters}>
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="h-10 w-10 bg-white/90 backdrop-blur-sm">
                  <Layers className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-40 p-2">
                <div className="space-y-2">
                  <Button 
                    variant={mapView === 'standard' ? 'default' : 'outline'} 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => setMapView('standard')}
                  >
                    Standard
                  </Button>
                  <Button 
                    variant={mapView === 'satellite' ? 'default' : 'outline'} 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => setMapView('satellite')}
                  >
                    Satellite
                  </Button>
                  <Button 
                    variant={mapView === 'traffic' ? 'default' : 'outline'} 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => setMapView('traffic')}
                  >
                    Traffic
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-10 w-10 bg-white/90 backdrop-blur-sm">
                    <MapIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Center Map</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        {/* Parking markers */}
        {filteredParkingLots.map((lot) => (
          <button
            key={lot.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              selectedLot?.id === lot.id ? 'z-30 scale-125' : 'z-20 hover:scale-110'
            }`}
            style={{
              // Simplified placement for demo - in a real app, these would be actual geo-coordinates
              left: `${30 + Math.random() * 70}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            onClick={() => selectLot(lot.id)}
          >
            <div className={`
              flex items-center justify-center rounded-full
              ${
                selectedLot?.id === lot.id 
                  ? 'h-12 w-12 bg-primary text-white' 
                  : lot.availableSpots > 0 
                    ? 'h-10 w-10 bg-green-500 text-white' 
                    : 'h-10 w-10 bg-red-500 text-white'
              }
              shadow-lg transition-all duration-300 ease-out-expo
            `}>
              <div className="flex flex-col items-center">
                <MapPin className="h-4 w-4" />
                <span className="text-xs font-medium">{lot.availableSpots}</span>
              </div>
            </div>
            
            {selectedLot?.id === lot.id && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-40 bg-white rounded-md shadow-lg p-2 text-center border border-gray-200 animate-fade-in">
                <div className="font-medium text-sm truncate">{lot.name}</div>
                <div className="text-xs text-gray-500">${lot.hourlyRate}/hr</div>
              </div>
            )}
          </button>
        ))}
      </div>
      
      {/* Lot detail panel */}
      {selectedLot && (
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 animate-slide-in">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">{selectedLot.name}</h3>
              <p className="text-gray-600 text-sm">{selectedLot.address}</p>
              <div className="flex items-center mt-1 space-x-4">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  selectedLot.availableSpots > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {selectedLot.availableSpots} spots available
                </span>
                <span className="text-gray-600 text-sm">${selectedLot.hourlyRate}/hr</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => selectLot(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-4">
            <Button size="sm" variant="outline" className="w-full">Details</Button>
            <Button size="sm" className="w-full">Navigate</Button>
            <Button size="sm" variant="outline" className="w-full">Reserve</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
