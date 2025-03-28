
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { ParkingLot, ParkingFilter, Statistics, User } from '../types';
import { mockParkingLots, mockStatistics, mockUsers } from '../lib/mockData';

interface ParkingContextType {
  parkingLots: ParkingLot[];
  filteredParkingLots: ParkingLot[];
  statistics: Statistics;
  currentUser: User | null;
  loadingParkingData: boolean;
  selectedLot: ParkingLot | null;
  filter: ParkingFilter;
  setFilter: (filter: ParkingFilter) => void;
  selectLot: (lotId: string | null) => void;
  updateParkingLot: (updatedLot: ParkingLot) => void;
  refreshParkingData: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
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

  const refreshParkingData = () => {
    setLoadingParkingData(true);
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be an API call to get fresh data
      setParkingLots(mockParkingLots);
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
    // Simulated login - in a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
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
        setFilter,
        selectLot,
        updateParkingLot,
        refreshParkingData,
        login,
        logout,
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
