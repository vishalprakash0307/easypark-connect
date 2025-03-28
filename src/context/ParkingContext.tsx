
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { ParkingLot, ParkingFilter, Statistics, User, BookingDetails, ParkingSpot as ParkingSpotType } from '../types';
import { mockParkingLots, mockStatistics, mockUsers } from '../lib/mockData';
import { toast } from '@/components/ui/use-toast';

interface ParkingContextType {
  parkingLots: ParkingLot[];
  filteredParkingLots: ParkingLot[];
  statistics: Statistics;
  currentUser: User | null;
  loadingParkingData: boolean;
  selectedLot: ParkingLot | null;
  filter: ParkingFilter;
  bookingDetails: BookingDetails | null;
  setFilter: (filter: ParkingFilter) => void;
  selectLot: (lotId: string | null) => void;
  updateParkingLot: (updatedLot: ParkingLot) => void;
  refreshParkingData: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  createBooking: (spot: ParkingSpotType, duration: number) => void;
  clearBooking: () => void;
  completePayment: (paymentMethod: string) => Promise<string>; // returns receipt ID
}

const ParkingContext = createContext<ParkingContextType | undefined>(undefined);

export const ParkingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);
  const [filteredParkingLots, setFilteredParkingLots] = useState<ParkingLot[]>([]);
  const [statistics, setStatistics] = useState<Statistics>(mockStatistics);
  const [loadingParkingData, setLoadingParkingData] = useState(true);
  const [selectedLot, setSelectedLot] = useState<ParkingLot | null>(null);
  const [filter, setFilter] = useState<ParkingFilter>({});
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  const refreshParkingData = () => {
    setLoadingParkingData(true);
    // Simulate API call
    setTimeout(() => {
      // Add estimated time to each parking lot
      const lotsWithEstimatedTime = mockParkingLots.map(lot => {
        // Calculate estimated time based on distance (rough estimate)
        const distance = lot.distance || 0;
        const walkingTimeMinutes = Math.round(distance * 12); // Assume average walking speed of 5 km/h
        const drivingTimeMinutes = Math.round(distance * 2); // Assume average driving speed of 30 km/h
        
        return {
          ...lot,
          estimatedTime: distance < 1 
            ? `${walkingTimeMinutes} min walk` 
            : `${drivingTimeMinutes} min drive`
        };
      });
      
      setParkingLots(lotsWithEstimatedTime);
      setStatistics(mockStatistics);
      setLoadingParkingData(false);
    }, 800);
  };

  useEffect(() => {
    refreshParkingData();
  }, []);

  useEffect(() => {
    if (parkingLots.length > 0) {
      let filtered = [...parkingLots];

      if (filter.minAvailableSpots) {
        filtered = filtered.filter(lot => lot.availableSpots >= (filter.minAvailableSpots || 0));
      }

      if (filter.maxPrice) {
        filtered = filtered.filter(lot => lot.hourlyRate <= (filter.maxPrice || Infinity));
      }

      if (filter.maxDistance) {
        filtered = filtered.filter(lot => (lot.distance || 0) <= (filter.maxDistance || Infinity));
      }

      if (filter.openNow) {
        const now = new Date();
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        filtered = filtered.filter(lot => {
          return lot.openTime <= currentTime && lot.closeTime >= currentTime;
        });
      }

      setFilteredParkingLots(filtered);
    }
  }, [parkingLots, filter]);

  const selectLot = (lotId: string | null) => {
    if (!lotId) {
      setSelectedLot(null);
      return;
    }
    
    const lot = parkingLots.find(l => l.id === lotId);
    setSelectedLot(lot || null);
  };

  const updateParkingLot = (updatedLot: ParkingLot) => {
    setParkingLots(prevLots => 
      prevLots.map(lot => lot.id === updatedLot.id ? updatedLot : lot)
    );
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Add admin account
    const adminAccount: User = {
      id: "admin1",
      name: "Admin User",
      email: "admin@gmail.com",
      role: "admin",
      preferences: { useIndianNumberFormat: true }
    };

    // Check if admin account already exists in mockUsers
    const adminExists = mockUsers.some(user => user.email === adminAccount.email);
    if (!adminExists) {
      mockUsers.push(adminAccount);
    }

    // Simulated login - in a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check for admin login
        if (email === "admin@gmail.com" && password === "1234") {
          setCurrentUser(adminAccount);
          resolve(true);
          return;
        }

        // Check for regular user login
        const user = mockUsers.find(u => u.email === email);
        if (user) {
          // Ensure user has preferences with useIndianNumberFormat set to true by default
          if (!user.preferences) {
            user.preferences = { useIndianNumberFormat: true };
          } else if (user.preferences.useIndianNumberFormat === undefined) {
            user.preferences.useIndianNumberFormat = true;
          }
          setCurrentUser(user);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 800);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    setBookingDetails(null);
  };

  const createBooking = (spot: ParkingSpotType, duration: number) => {
    if (!currentUser || !selectedLot) {
      toast({
        title: "Error",
        description: "User or parking lot not selected",
        variant: "destructive",
      });
      return;
    }

    const baseFare = selectedLot.hourlyRate * duration;
    const taxes = baseFare * 0.18; // 18% tax rate
    const totalAmount = baseFare + taxes;

    setBookingDetails({
      user: currentUser,
      parkingLot: selectedLot,
      spot: spot,
      startTime: new Date(),
      duration: duration,
      baseFare: baseFare,
      taxes: taxes,
      totalAmount: totalAmount
    });
  };

  const clearBooking = () => {
    setBookingDetails(null);
  };

  const completePayment = async (paymentMethod: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (bookingDetails) {
          // Generate a random receipt ID
          const receiptId = `RCP-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
          
          // In a real app, we would save the transaction to the database
          const transaction = {
            id: `txn-${Date.now()}`,
            userId: bookingDetails.user.id,
            parkingLotId: bookingDetails.parkingLot.id,
            spotId: bookingDetails.spot.id,
            startTime: bookingDetails.startTime,
            endTime: new Date(bookingDetails.startTime.getTime() + bookingDetails.duration * 60 * 60 * 1000),
            amount: bookingDetails.totalAmount,
            status: 'completed',
            receiptId: receiptId,
            paymentMethod: paymentMethod,
            baseFare: bookingDetails.baseFare,
            taxes: bookingDetails.taxes,
            duration: bookingDetails.duration
          };
          
          // Update the spot status in the selected lot
          if (selectedLot) {
            const updatedLot = {
              ...selectedLot,
              availableSpots: selectedLot.availableSpots - 1,
              spots: selectedLot.spots.map(s => 
                s.id === bookingDetails.spot.id 
                  ? { ...s, status: 'reserved' as const } 
                  : s
              )
            };
            updateParkingLot(updatedLot);
          }
          
          resolve(receiptId);
        } else {
          resolve("");
        }
      }, 1500);
    });
  };

  return (
    <ParkingContext.Provider
      value={{
        parkingLots,
        filteredParkingLots,
        statistics,
        currentUser,
        loadingParkingData,
        selectedLot,
        filter,
        bookingDetails,
        setFilter,
        selectLot,
        updateParkingLot,
        refreshParkingData,
        login,
        logout,
        createBooking,
        clearBooking,
        completePayment,
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
};

export const useParkingContext = () => {
  const context = useContext(ParkingContext);
  if (context === undefined) {
    throw new Error('useParkingContext must be used within a ParkingProvider');
  }
  return context;
};
