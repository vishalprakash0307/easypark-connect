

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
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  preferences?: {
    useIndianNumberFormat?: boolean;
  };
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
}

export interface ParkingFilter {
  minAvailableSpots?: number;
  maxPrice?: number;
  maxDistance?: number;
  openNow?: boolean;
}

