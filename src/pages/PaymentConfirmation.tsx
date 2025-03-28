
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useParkingContext } from '@/context/ParkingContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Clock, CreditCard, Car, Check, ArrowRight } from 'lucide-react';

const PaymentConfirmation = () => {
  const { receiptId } = useParams<{ receiptId: string }>();
  const { currentUser, bookingDetails, clearBooking } = useParkingContext();
  const [loadingQR, setLoadingQR] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!bookingDetails) {
      navigate('/dashboard');
      return;
    }

    // Simulate QR code loading
    const timer = setTimeout(() => {
      setLoadingQR(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [bookingDetails, navigate]);

  const handleDone = () => {
    clearBooking();
    navigate('/dashboard');
  };

  const handleNavigate = () => {
    // In a real app, this would navigate to a map with directions
    // For now, just redirect to the dashboard
    clearBooking();
    navigate('/dashboard');
  };

  if (!bookingDetails || !currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-md">
              <CardHeader className="bg-green-50 border-b border-green-100">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-100 text-green-600">
                    <Check className="h-6 w-6" />
                  </div>
                </div>
                <CardTitle className="text-center text-xl">Booking Confirmed!</CardTitle>
                <p className="text-center text-sm text-muted-foreground mt-1">
                  Receipt ID: {receiptId}
                </p>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Parking Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      <div>
                        <div className="font-medium">{bookingDetails.parkingLot.name}</div>
                        <div className="text-muted-foreground">{bookingDetails.parkingLot.address}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Car className="h-4 w-4 mr-2 text-primary" />
                      <span>Spot: {bookingDetails.spot.spotNumber}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      <span>
                        {bookingDetails.startTime.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })} - {' '}
                        {new Date(bookingDetails.startTime.getTime() + bookingDetails.duration * 60 * 60 * 1000).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2 text-primary" />
                      <span>
                        Amount Paid: ₹{bookingDetails.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <h3 className="font-medium mb-3">Access QR Code</h3>
                  <div className="w-48 h-48 border-2 border-dashed border-gray-300 p-2 flex items-center justify-center rounded-lg">
                    {loadingQR ? (
                      <div className="animate-pulse bg-gray-200 w-full h-full rounded"></div>
                    ) : (
                      <div className="bg-white w-full h-full flex flex-col items-center justify-center">
                        <div className="grid grid-cols-5 grid-rows-5 gap-1 w-36 h-36">
                          {/* Simulated QR code pattern */}
                          {Array.from({ length: 25 }).map((_, i) => (
                            <div key={i} className={`${Math.random() > 0.3 ? 'bg-black' : 'bg-white'} w-full h-full`}></div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Scan this QR code at the parking entrance
                  </p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="mt-1 text-blue-500">
                      <Car className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-blue-800">Parking Instructions</h4>
                      <ul className="list-disc list-inside text-sm text-blue-700 mt-1 space-y-1">
                        <li>Show your QR code at the entrance barrier</li>
                        <li>Park only in your designated spot {bookingDetails.spot.spotNumber}</li>
                        <li>Your booking is valid until {new Date(bookingDetails.startTime.getTime() + bookingDetails.duration * 60 * 60 * 1000).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}</li>
                        <li>For extending your time, use the app before expiry</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between p-6 border-t">
                <Button variant="outline" onClick={handleDone}>
                  Done
                </Button>
                <Button onClick={handleNavigate} className="flex items-center">
                  Navigate to Parking Spot
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentConfirmation;
