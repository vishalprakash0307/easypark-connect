
export interface ParkingSpot {
  id: string;
  status: 'available' | 'occupied' | 'reserved' | 'disabled';
  spotNumber: string;
}

export interface ParkingLot {
  id: string;
  name: string;
  address: string;
  totalSpots: number;
  availableSpots: number;
  hourlyRate: number;
  coordinates: [number, number]; // [latitude, longitude]
  distance?: number; // distance from user in kilometers (optional)
  openTime: string;
  closeTime: string;
  image?: string;
  spots: ParkingSpot[];
  estimatedTime?: string; // estimated walking/driving time
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  preferences?: {
    useIndianNumberFormat?: boolean;
  };
  vehicleNumber?: string; // User's vehicle number
}

export interface Statistics {
  totalParkingLots: number;
  totalSpots: number;
  availableSpots: number;
  occupancyRate: number;
}

export interface Transaction {
  id: string;
  userId: string;
  parkingLotId: string;
  spotId: string;
  startTime: Date;
  endTime: Date | null;
  amount: number;
  status: 'pending' | 'completed' | 'canceled';
  receiptId?: string;
  paymentMethod?: string;
  baseFare?: number;
  taxes?: number;
  duration?: number; // in hours
}

export interface ParkingFilter {
  minAvailableSpots?: number;
  maxPrice?: number;
  maxDistance?: number;
  openNow?: boolean;
}

export interface BookingDetails {
  user: User;
  parkingLot: ParkingLot;
  spot: ParkingSpot;
  startTime: Date;
  duration: number; // in hours
  baseFare: number;
  taxes: number;
  totalAmount: number;
}
