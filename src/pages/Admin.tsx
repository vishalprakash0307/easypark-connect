
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useParkingContext } from '@/context/ParkingContext';
import { BarChart, LineChart, PieChart, UsersRound, Car, Database, Settings, ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatCard from '@/components/StatCard';
import AdminParkingTable from '@/components/AdminParkingTable';
import { ParkingLot } from '@/types';

const Admin = () => {
  const { currentUser, parkingLots, statistics } = useParkingContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Redirect if the user is not admin
  React.useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [currentUser, navigate, toast]);

  const handleEditLot = (lot: ParkingLot) => {
    toast({
      title: "Edit Lot",
      description: `Editing ${lot.name}`,
    });
  };

  const handleViewLot = (lot: ParkingLot) => {
    toast({
      title: "View Lot",
      description: `Viewing details for ${lot.name}`,
    });
  };

  const handleDeleteLot = (lot: ParkingLot) => {
    toast({
      title: "Delete Lot",
      description: `Are you sure you want to delete ${lot.name}?`,
      variant: "destructive",
    });
  };

  // Don't render the page if the user is not admin
  if (!currentUser || currentUser.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              System Settings
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Parking Lots"
              value={statistics.totalParkingLots.toString()}
              icon={Database}
              trend="up"
              trendValue="+1 this month"
            />
            <StatCard
              title="Total Spots"
              value={statistics.totalSpots.toString()}
              icon={Car}
              trend="up"
              trendValue="+60 this month"
            />
            <StatCard
              title="Occupancy Rate"
              value={`${statistics.occupancyRate}%`}
              icon={PieChart}
              trend="up"
              trendValue="+8% from average"
            />
            <StatCard
              title="Active Users"
              value="185"
              icon={UsersRound}
              trend="up"
              trendValue="+12% this week"
            />
          </div>
          
          <Tabs defaultValue="lots" className="space-y-6">
            <TabsList className="grid grid-cols-4 md:w-[400px]">
              <TabsTrigger value="lots">Parking Lots</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="lots" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Parking Lots</CardTitle>
                  <CardDescription>
                    View and manage all connected parking facilities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AdminParkingTable
                    parkingLots={parkingLots}
                    onEditLot={handleEditLot}
                    onViewLot={handleViewLot}
                    onDeleteLot={handleDeleteLot}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Occupancy Rate Over Time</CardTitle>
                    <CardDescription>
                      Weekly parking occupancy trends across all facilities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <div className="h-full w-full bg-gray-50 rounded-md flex items-center justify-center">
                      <div className="text-gray-500 flex flex-col items-center">
                        <LineChart className="h-12 w-12 mb-2 text-primary/50" />
                        <span>Occupancy Rate Chart</span>
                        <span className="text-sm text-gray-400">(Visualization would appear here)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue by Parking Lot</CardTitle>
                    <CardDescription>
                      Monthly revenue distribution
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-72">
                    <div className="h-full w-full bg-gray-50 rounded-md flex items-center justify-center">
                      <div className="text-gray-500 flex flex-col items-center">
                        <BarChart className="h-12 w-12 mb-2 text-primary/50" />
                        <span>Revenue Chart</span>
                        <span className="text-sm text-gray-400">(Visualization would appear here)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Peak Usage Times</CardTitle>
                    <CardDescription>
                      Hourly distribution of parking usage
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-72">
                    <div className="h-full w-full bg-gray-50 rounded-md flex items-center justify-center">
                      <div className="text-gray-500 flex flex-col items-center">
                        <PieChart className="h-12 w-12 mb-2 text-primary/50" />
                        <span>Usage Distribution</span>
                        <span className="text-sm text-gray-400">(Visualization would appear here)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                  <CardDescription>
                    Key metrics for system health and performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="rounded-lg bg-white border p-4">
                      <div className="text-sm text-gray-500 mb-1">Sensor Uptime</div>
                      <div className="flex items-end justify-between">
                        <div className="text-2xl font-semibold">99.8%</div>
                        <div className="text-green-600 text-sm flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          1.2%
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg bg-white border p-4">
                      <div className="text-sm text-gray-500 mb-1">API Response Time</div>
                      <div className="flex items-end justify-between">
                        <div className="text-2xl font-semibold">142ms</div>
                        <div className="text-green-600 text-sm flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" transform="rotate(90)" />
                          -12ms
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg bg-white border p-4">
                      <div className="text-sm text-gray-500 mb-1">Error Rate</div>
                      <div className="flex items-end justify-between">
                        <div className="text-2xl font-semibold">0.05%</div>
                        <div className="text-green-600 text-sm flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" transform="rotate(90)" />
                          -0.02%
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg bg-white border p-4">
                      <div className="text-sm text-gray-500 mb-1">Processing Jobs</div>
                      <div className="flex items-end justify-between">
                        <div className="text-2xl font-semibold">24,518</div>
                        <div className="text-green-600 text-sm flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          5.4%
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage system users and permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">Admin User</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-500">admin@example.com</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              Admin
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="ghost" size="sm">Edit</Button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">John Doe</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-500">john@example.com</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              User
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="ghost" size="sm">Edit</Button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">Jane Smith</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-500">jane@example.com</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              User
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="ghost" size="sm">Edit</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button className="flex items-center gap-2">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                      Add User
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>
                    Configure global system parameters
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Sensor Configuration</h3>
                        <div className="rounded-lg border p-4 space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Data Refresh Interval</label>
                            <select className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                              <option>Every 30 seconds</option>
                              <option>Every 1 minute</option>
                              <option>Every 5 minutes</option>
                              <option>Every 15 minutes</option>
                            </select>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Error Threshold</label>
                            <input 
                              type="range" 
                              min="1" 
                              max="10" 
                              defaultValue="3" 
                              className="w-full" 
                            />
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>Low Sensitivity</span>
                              <span>High Sensitivity</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Enable Auto-Calibration</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Payment Settings</h3>
                        <div className="rounded-lg border p-4 space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Default Payment Gateway</label>
                            <select className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                              <option>Stripe</option>
                              <option>PayPal</option>
                              <option>Square</option>
                              <option>Authorize.net</option>
                            </select>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Transaction Fee (%)</label>
                            <input 
                              type="number" 
                              min="0" 
                              max="10" 
                              step="0.1" 
                              defaultValue="2.9" 
                              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" 
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Enable Receipt Emails</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">System Maintenance</h3>
                      <div className="rounded-lg border p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Database Backup</h4>
                          <div className="flex items-center space-x-4">
                            <select className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                              <option>Daily</option>
                              <option>Weekly</option>
                              <option>Monthly</option>
                            </select>
                            <Button variant="outline">Run Now</Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Sensor Diagnostics</h4>
                          <Button variant="outline">Run Diagnostics</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-4 pt-4 border-t">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Settings</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
