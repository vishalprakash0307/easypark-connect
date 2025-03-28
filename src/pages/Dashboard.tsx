
import React, { useState } from 'react';
import { useParkingContext } from '@/context/ParkingContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { formatIndianNumber } from '@/lib/utils';
import { ParkingSpot as ParkingSpotType } from '@/types';
import LoginForm from '@/components/dashboard/LoginForm';
import StatisticsSection from '@/components/dashboard/StatisticsSection';
import ParkingSpotSelector from '@/components/dashboard/ParkingSpotSelector';
import DashboardTabs from '@/components/dashboard/DashboardTabs';

const Dashboard = () => {
  const { 
    currentUser, 
    parkingLots, 
    selectedLot, 
    statistics,
  } = useParkingContext();
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpotType | null>(null);
  const [duration, setDuration] = useState(2); // Default 2 hours
  
  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-16">
          <div className="w-full max-w-md px-4">
            <LoginForm />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="text-sm font-medium text-muted-foreground">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
          
          <StatisticsSection statistics={statistics} user={currentUser} />
          
          {selectedLot ? (
            <ParkingSpotSelector 
              selectedLot={selectedLot}
              selectedSpot={selectedSpot}
              setSelectedSpot={setSelectedSpot}
              duration={duration}
              setDuration={setDuration}
            />
          ) : (
            <DashboardTabs parkingLots={parkingLots} user={currentUser} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
