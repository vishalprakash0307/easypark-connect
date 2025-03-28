
import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Map from '@/components/Map';
import ParkingLotCard from '@/components/ParkingLotCard';
import ReservationList from './ReservationList';
import ProfileCard from './ProfileCard';
import ParkingHistoryCard from './ParkingHistoryCard';
import PaymentMethodsCard from './PaymentMethodsCard';
import { ParkingLot, User } from '@/types';

interface DashboardTabsProps {
  parkingLots: ParkingLot[];
  user: User;
}

const DashboardTabs = ({ parkingLots, user }: DashboardTabsProps) => {
  return (
    <Tabs defaultValue="map" className="space-y-6">
      <TabsList className="grid grid-cols-4 md:w-[400px]">
        <TabsTrigger value="map">Map</TabsTrigger>
        <TabsTrigger value="lots">Parking Lots</TabsTrigger>
        <TabsTrigger value="reservations">Reservations</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
      </TabsList>
      
      <TabsContent value="map" className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Find Parking Near You</CardTitle>
            <CardDescription>
              Explore real-time parking availability across all connected locations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Map />
          </CardContent>
          <CardFooter className="justify-end">
            <Button asChild variant="outline">
              <Link to="/nearby">
                View Nearby Parking
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="lots" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parkingLots.map((lot) => (
            <ParkingLotCard key={lot.id} parkingLot={lot} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="reservations">
        <Card>
          <CardHeader>
            <CardTitle>Your Reservations</CardTitle>
            <CardDescription>
              View and manage your current and upcoming parking reservations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReservationList useIndianNumberFormat={user.preferences?.useIndianNumberFormat} />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="account">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProfileCard user={user} />
          <ParkingHistoryCard useIndianNumberFormat={user.preferences?.useIndianNumberFormat} />
          <PaymentMethodsCard />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
