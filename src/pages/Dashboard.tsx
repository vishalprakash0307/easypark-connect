
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Car, MapPin, History, CreditCard, Settings, User, Clock } from 'lucide-react';
import { useParkingContext } from '@/context/ParkingContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Map from '@/components/Map';
import ParkingLotCard from '@/components/ParkingLotCard';
import ParkingSpot from '@/components/ParkingSpot';
import StatCard from '@/components/StatCard';
import { ParkingSpot as ParkingSpotType } from '@/types';

const Dashboard = () => {
  const { currentUser, login, parkingLots, selectedLot, selectLot, statistics } = useParkingContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpotType | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoggingIn(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Success",
          description: "You have successfully logged in",
        });
      } else {
        toast({
          title: "Error",
          description: "Invalid email or password. Hint: try 'john@example.com' or 'admin@example.com'",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while logging in",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSpotSelect = (spot: ParkingSpotType) => {
    setSelectedSpot(spot);
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
    
    toast({
      title: "Success",
      description: `Spot ${selectedSpot.spotNumber} has been reserved`,
    });
    
    // In a real app, this would update the database
    setSelectedSpot(null);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-16">
          <div className="w-full max-w-md px-4">
            <Card className="w-full">
              <CardHeader className="space-y-1">
                <div className="flex justify-center mb-2">
                  <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Car className="h-6 w-6" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-center">Welcome to Park Smart</CardTitle>
                <CardDescription className="text-center">
                  Log in to find and reserve parking spots
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Button variant="link" size="sm" className="px-0 font-normal text-xs text-muted-foreground h-auto">
                        Forgot password?
                      </Button>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoggingIn}>
                    {isLoggingIn ? "Logging in..." : "Log in"}
                  </Button>
                  <div className="text-center text-sm text-muted-foreground mt-2">
                    <p>Demo accounts:</p>
                    <p>User: john@example.com</p>
                    <p>Admin: admin@example.com</p>
                    <p>(Use any password)</p>
                  </div>
                </form>
              </CardContent>
            </Card>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Available Parking Lots"
              value={statistics.totalParkingLots}
              icon={MapPin}
              trend="neutral"
              trendValue="All connected"
            />
            <StatCard
              title="Total Parking Spots"
              value={statistics.totalSpots}
              icon={Car}
              trend="up"
              trendValue="+5% from last week"
            />
            <StatCard
              title="Available Spots"
              value={statistics.availableSpots}
              icon={MapPin}
              trend="down"
              trendValue="-12% from yesterday"
            />
            <StatCard
              title="Occupancy Rate"
              value={`${statistics.occupancyRate}%`}
              icon={Settings}
              trend="up"
              trendValue="+8% from average"
            />
          </div>
          
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
              </Card>
              
              {selectedLot && (
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedLot.name} - Available Spots</CardTitle>
                    <CardDescription>
                      Select an available spot to reserve
                    </CardDescription>
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
                    
                    <div className="flex justify-between items-center pt-4 border-t">
                      <div>
                        {selectedSpot && (
                          <div className="text-sm">
                            Selected Spot: <span className="font-medium">{selectedSpot.spotNumber}</span>
                          </div>
                        )}
                      </div>
                      <Button 
                        onClick={handleReservation}
                        disabled={!selectedSpot}
                      >
                        Reserve Spot
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
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
                  <div className="space-y-4">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">Downtown Garage</h3>
                          <p className="text-sm text-muted-foreground">Spot A15</p>
                        </div>
                        <div className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                          Active
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground space-x-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Today, 2:30 PM - 5:30 PM</span>
                        </div>
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-1" />
                          <span>$7.50</span>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end space-x-2">
                        <Button variant="outline" size="sm">Extend</Button>
                        <Button variant="destructive" size="sm">Cancel</Button>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">Central Park Parking</h3>
                          <p className="text-sm text-muted-foreground">Spot B22</p>
                        </div>
                        <div className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                          Upcoming
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground space-x-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Tomorrow, 9:00 AM - 12:00 PM</span>
                        </div>
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-1" />
                          <span>$9.00</span>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end space-x-2">
                        <Button variant="outline" size="sm">Modify</Button>
                        <Button variant="destructive" size="sm">Cancel</Button>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">Harbor View Parking</h3>
                          <p className="text-sm text-muted-foreground">Spot D07</p>
                        </div>
                        <div className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                          Completed
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground space-x-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Aug 12, 10:00 AM - 2:30 PM</span>
                        </div>
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-1" />
                          <span>$10.12</span>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end space-x-2">
                        <Button variant="outline" size="sm">Receipt</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="account">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>
                      Manage your account information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="h-20 w-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 mx-auto">
                        <User className="h-10 w-10" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={currentUser.name} readOnly />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={currentUser.email} readOnly />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input id="role" value={currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)} readOnly />
                      </div>
                      
                      <Button className="w-full">Edit Profile</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="col-span-1 md:col-span-2">
                  <CardHeader>
                    <CardTitle>Parking History</CardTitle>
                    <CardDescription>
                      Review your recent parking activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center p-4 rounded-lg border">
                        <div className="mr-4">
                          <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                            <History className="h-5 w-5" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium">Downtown Garage</h4>
                              <p className="text-sm text-gray-500">August 15, 2023</p>
                            </div>
                            <div className="text-right">
                              <span className="font-medium">$10.75</span>
                              <p className="text-sm text-gray-500">4.25 hours</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-4 rounded-lg border">
                        <div className="mr-4">
                          <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                            <History className="h-5 w-5" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium">Riverside Parking</h4>
                              <p className="text-sm text-gray-500">August 10, 2023</p>
                            </div>
                            <div className="text-right">
                              <span className="font-medium">$4.38</span>
                              <p className="text-sm text-gray-500">2.5 hours</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-4 rounded-lg border">
                        <div className="mr-4">
                          <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                            <History className="h-5 w-5" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium">Central Park Parking</h4>
                              <p className="text-sm text-gray-500">August 5, 2023</p>
                            </div>
                            <div className="text-right">
                              <span className="font-medium">$6.00</span>
                              <p className="text-sm text-gray-500">2 hours</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-4 rounded-lg border">
                        <div className="mr-4">
                          <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                            <History className="h-5 w-5" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium">Harbor View Parking</h4>
                              <p className="text-sm text-gray-500">July 28, 2023</p>
                            </div>
                            <div className="text-right">
                              <span className="font-medium">$8.44</span>
                              <p className="text-sm text-gray-500">3.75 hours</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <Button variant="outline">View All History</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="col-span-1 md:col-span-3">
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>
                      Manage your payment options
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                              <line x1="1" y1="10" x2="23" y2="10"></line>
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Visa ending in 4242</h4>
                            <p className="text-sm text-gray-500">Expires 04/25</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2">
                            Default
                          </span>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                              <line x1="1" y1="10" x2="23" y2="10"></line>
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Mastercard ending in 5678</h4>
                            <p className="text-sm text-gray-500">Expires 09/24</p>
                          </div>
                        </div>
                        <div>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-center">
                        <Button variant="outline" className="flex items-center">
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2">
                            <path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                          </svg>
                          Add Payment Method
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
