
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatIndianNumber } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { useParkingContext } from '@/context/ParkingContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Car, CreditCard, User, Clock, ChevronRight, ArrowLeft, Smartphone, Check } from 'lucide-react';

const PaymentPage = () => {
  const { bookingDetails, currentUser, completePayment, clearBooking } = useParkingContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCvv] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!bookingDetails) {
      navigate('/dashboard');
    }
  }, [bookingDetails, navigate]);

  useEffect(() => {
    // Countdown timer
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0) {
      toast({
        title: "Time Expired",
        description: "Your reservation time has expired",
        variant: "destructive",
      });
      clearBooking();
      navigate('/dashboard');
    }
  }, [timeLeft, navigate, toast, clearBooking]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    
    // Add spaces for readability
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) formattedValue += ' ';
      formattedValue += value[i];
    }
    
    setCardNumber(formattedValue);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    
    if (value.length > 2) {
      setCardExpiry(`${value.slice(0, 2)}/${value.slice(2)}`);
    } else {
      setCardExpiry(value);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 3) value = value.slice(0, 3);
    setCvv(value);
  };

  const handlePayment = async () => {
    if (!bookingDetails) return;

    if (selectedPaymentMethod === 'card') {
      if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
        toast({
          title: "Incomplete Information",
          description: "Please fill in all card details",
          variant: "destructive",
        });
        return;
      }
    }

    setIsProcessing(true);
    
    try {
      const receiptId = await completePayment(selectedPaymentMethod);
      if (receiptId) {
        toast({
          title: "Payment Successful",
          description: `Your payment has been processed. Receipt ID: ${receiptId}`,
        });
        navigate(`/confirmation/${receiptId}`);
      } else {
        throw new Error("Payment failed");
      }
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    clearBooking();
    navigate('/dashboard');
  };

  if (!bookingDetails || !currentUser) {
    return null;
  }

  const useIndianFormat = currentUser.preferences?.useIndianNumberFormat ?? true;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-4">
            <Button 
              variant="ghost" 
              onClick={handleCancel}
              className="flex items-center text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Complete Your Booking</h1>
            <div className="flex items-center space-x-2 text-sm font-medium">
              <Clock className="h-4 w-4 text-yellow-600" />
              <span className="text-yellow-600">
                Time remaining: {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Summary */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
                <CardDescription>Review your booking details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Parking Lot</span>
                    <span className="font-medium">{bookingDetails.parkingLot.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Spot Number</span>
                    <span className="font-medium">{bookingDetails.spot.spotNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Duration</span>
                    <span className="font-medium">{bookingDetails.duration} hour{bookingDetails.duration > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Start Time</span>
                    <span className="font-medium">
                      {bookingDetails.startTime.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">End Time</span>
                    <span className="font-medium">
                      {new Date(bookingDetails.startTime.getTime() + bookingDetails.duration * 60 * 60 * 1000).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Base Fare</span>
                      <span className="font-medium">
                        ₹{useIndianFormat 
                          ? formatIndianNumber(bookingDetails.baseFare) 
                          : bookingDetails.baseFare.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Taxes (18%)</span>
                      <span className="font-medium">
                        ₹{useIndianFormat 
                          ? formatIndianNumber(bookingDetails.taxes) 
                          : bookingDetails.taxes.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-base font-semibold">Total Amount</span>
                    <span className="text-base font-semibold">
                      ₹{useIndianFormat 
                        ? formatIndianNumber(bookingDetails.totalAmount) 
                        : bookingDetails.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex space-x-3">
                    <div className="bg-primary/10 text-primary p-2 rounded-full">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">{currentUser.name}</h4>
                      <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                      {currentUser.vehicleNumber && (
                        <div className="flex items-center mt-1 text-sm">
                          <Car className="h-3 w-3 mr-1" />
                          <span>{currentUser.vehicleNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Choose how you want to pay</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="card" onValueChange={setSelectedPaymentMethod}>
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="card">Credit/Debit Card</TabsTrigger>
                    <TabsTrigger value="upi">UPI</TabsTrigger>
                    <TabsTrigger value="wallet">Wallet</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="card" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <div className="relative">
                        <Input
                          id="card-number"
                          placeholder="4242 4242 4242 4242"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                        />
                        <CreditCard className="absolute right-3 top-2 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name">Cardholder Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          type="password"
                          value={cardCvv}
                          onChange={handleCvvChange}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="upi">
                    <div className="text-center py-6 space-y-6">
                      <div className="mx-auto w-48 h-48 border-2 border-dashed border-gray-300 p-2 flex items-center justify-center rounded-lg">
                        <div className="bg-gray-200 w-full h-full flex flex-col items-center justify-center rounded">
                          <span className="text-sm text-gray-600 mb-2">UPI QR Code</span>
                          <div className="grid grid-cols-4 grid-rows-4 gap-1 w-24 h-24">
                            {Array.from({ length: 16 }).map((_, i) => (
                              <div key={i} className="bg-black w-full h-full"></div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-center">
                          <div className="h-px bg-gray-200 w-24"></div>
                          <span className="px-2 text-sm text-gray-500">or pay with UPI ID</span>
                          <div className="h-px bg-gray-200 w-24"></div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Input placeholder="username@upi" />
                          <Button variant="outline" className="whitespace-nowrap">
                            Verify
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="wallet">
                    <div className="space-y-4 py-6">
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center space-x-4">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Smartphone className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium">Park Smart Wallet</h4>
                            <p className="text-sm text-muted-foreground">
                              Fast and secure in-app wallet
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Top Up
                          </Button>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Current Balance</span>
                          <span className="font-semibold">₹0.00</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground text-center">
                        Your wallet doesn't have sufficient balance for this transaction.
                        Please top up or choose a different payment method.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="flex items-center"
                >
                  {isProcessing ? (
                    <>Processing...</>
                  ) : (
                    <>
                      Pay ₹{useIndianFormat 
                        ? formatIndianNumber(bookingDetails.totalAmount) 
                        : bookingDetails.totalAmount.toFixed(2)}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
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

export default PaymentPage;
