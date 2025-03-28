
import React from 'react';
import { Clock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatIndianNumber } from '@/lib/utils';

interface ReservationListProps {
  useIndianNumberFormat?: boolean;
}

const ReservationList = ({ useIndianNumberFormat = false }: ReservationListProps) => {
  return (
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
            <span>₹{useIndianNumberFormat ? formatIndianNumber(7.50) : '7.50'}</span>
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
            <span>₹{useIndianNumberFormat ? formatIndianNumber(9.00) : '9.00'}</span>
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
            <span>₹{useIndianNumberFormat ? formatIndianNumber(10.12) : '10.12'}</span>
          </div>
        </div>
        <div className="mt-3 flex justify-end space-x-2">
          <Button variant="outline" size="sm">Receipt</Button>
        </div>
      </div>
    </div>
  );
};

export default ReservationList;
