
import React from 'react';
import { History } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatIndianNumber } from '@/lib/utils';

interface ParkingHistoryCardProps {
  useIndianNumberFormat?: boolean;
}

const ParkingHistoryCard = ({ useIndianNumberFormat = false }: ParkingHistoryCardProps) => {
  return (
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
                  <span className="font-medium">₹{useIndianNumberFormat ? formatIndianNumber(10.75) : '10.75'}</span>
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
                  <span className="font-medium">₹{useIndianNumberFormat ? formatIndianNumber(4.38) : '4.38'}</span>
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
                  <span className="font-medium">₹{useIndianNumberFormat ? formatIndianNumber(6.00) : '6.00'}</span>
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
                  <span className="font-medium">₹{useIndianNumberFormat ? formatIndianNumber(8.44) : '8.44'}</span>
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
  );
};

export default ParkingHistoryCard;
