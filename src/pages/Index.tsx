
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, CreditCard, BarChart, ChevronRight, ArrowRight, Phone, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParkingLotCard from '@/components/ParkingLotCard';
import Map from '@/components/Map';
import { useParkingContext } from '@/context/ParkingContext';

const Index = () => {
  const { parkingLots } = useParkingContext();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="animate-fade-in">
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-4">
                  Find & Reserve Parking Spots in Real-Time
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-xl">
                  Park Smart helps you find available parking spaces instantly, saving you time and reducing urban congestion.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="font-medium">
                    <Link to="/dashboard">
                      Find Parking Now
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href="#features">
                      Learn More
                    </a>
                  </Button>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 animate-fade-in">
                <img 
                  src="https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=800&auto=format&fit=crop&q=80" 
                  alt="Smart parking" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Real-time map section */}
        <section className="py-16 bg-white" id="map">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Real-Time Parking Availability</h2>
              <p className="text-lg text-gray-600">
                View available parking spaces across the city in real-time. Our interactive map shows you exactly where to find parking.
              </p>
            </div>
            
            <div className="animate-fade-in">
              <Map />
            </div>
            
            <div className="mt-8 text-center">
              <Button asChild size="lg">
                <Link to="/dashboard">
                  Find and Reserve Spots
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features section */}
        <section className="py-16 bg-gray-50" id="features">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Smart Parking Features</h2>
              <p className="text-lg text-gray-600">
                Our innovative platform offers everything you need for a seamless parking experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-transform hover:shadow-md hover:scale-105">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-Time Availability</h3>
                <p className="text-gray-600">
                  See exactly which parking spots are available in real-time across all connected parking lots.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-transform hover:shadow-md hover:scale-105">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Advance Reservations</h3>
                <p className="text-gray-600">
                  Reserve parking spots in advance for worry-free arrivals at your destination.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-transform hover:shadow-md hover:scale-105">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Contactless Payment</h3>
                <p className="text-gray-600">
                  Pay for parking directly through the app with secure, contactless transactions.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-transform hover:shadow-md hover:scale-105">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Analytics</h3>
                <p className="text-gray-600">
                  Access parking history, receipts, and trends to optimize your parking routines.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Available parking section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Parking Locations</h2>
              <p className="text-lg text-gray-600">
                Discover our most popular parking facilities with real-time availability information.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parkingLots.slice(0, 3).map((lot) => (
                <ParkingLotCard key={lot.id} parkingLot={lot} className="animate-fade-in" />
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Button asChild variant="outline" size="lg">
                <Link to="/dashboard">
                  View All Parking Locations
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Call to action section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight mb-6">Ready to Simplify Your Parking Experience?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of drivers who save time and reduce stress with Park Smart.
              </p>
              <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                <Link to="/dashboard">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Contact section */}
        <section className="py-16 bg-gray-50" id="contact">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Get in Touch</h2>
              <p className="text-lg text-gray-600">
                Have questions or need assistance? Our team is here to help.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-primary mr-3" />
                    <span className="text-gray-700">+1 (123) 456-7890</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-3" />
                    <span className="text-gray-700">info@parksmart.com</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-3 mt-1" />
                    <span className="text-gray-700">
                      123 Innovation Drive<br />
                      Smart City, SC 10001
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Business Hours</h4>
                  <p className="text-gray-600">
                    Monday - Friday: 9am - 6pm<br />
                    Saturday: 10am - 4pm<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">Send us a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
