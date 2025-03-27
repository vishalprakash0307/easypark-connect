
import { ParkingLot, Statistics, User, Transaction } from "../types";

// Mock user data
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
  },
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
];

// Mock parking lot data
export const mockParkingLots: ParkingLot[] = [
  {
    id: "lot1",
    name: "Downtown Garage",
    address: "123 Main St, Downtown",
    totalSpots: 120,
    availableSpots: 45,
    hourlyRate: 2.5,
    coordinates: [40.7128, -74.006], // New York coordinates
    distance: 0.5,
    openTime: "06:00",
    closeTime: "23:00",
    image: "https://images.unsplash.com/photo-1470224114660-3f6686c562eb?q=80&w=2358&auto=format&fit=crop",
    spots: Array.from({ length: 120 }, (_, i) => ({
      id: `lot1-spot-${i + 1}`,
      status: Math.random() > 0.4 ? "available" : "occupied",
      spotNumber: `A${i + 1}`,
    })),
  },
  {
    id: "lot2",
    name: "Central Park Parking",
    address: "45 Park Ave, Midtown",
    totalSpots: 80,
    availableSpots: 12,
    hourlyRate: 3.0,
    coordinates: [40.7736, -73.9656], // Central Park coordinates
    distance: 1.2,
    openTime: "07:00",
    closeTime: "22:00",
    image: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?q=80&w=2274&auto=format&fit=crop",
    spots: Array.from({ length: 80 }, (_, i) => ({
      id: `lot2-spot-${i + 1}`,
      status: Math.random() > 0.8 ? "available" : "occupied",
      spotNumber: `B${i + 1}`,
    })),
  },
  {
    id: "lot3",
    name: "Riverside Parking",
    address: "78 River Rd, Westside",
    totalSpots: 60,
    availableSpots: 32,
    hourlyRate: 1.75,
    coordinates: [40.8075, -73.9626], // Upper West Side coordinates
    distance: 2.4,
    openTime: "08:00",
    closeTime: "20:00",
    image: "https://images.unsplash.com/photo-1590674899484-8da3b9f7c5f9?q=80&w=2274&auto=format&fit=crop",
    spots: Array.from({ length: 60 }, (_, i) => ({
      id: `lot3-spot-${i + 1}`,
      status: Math.random() > 0.5 ? "available" : "occupied",
      spotNumber: `C${i + 1}`,
    })),
  },
  {
    id: "lot4",
    name: "Harbor View Parking",
    address: "221 Harbor St, Eastside",
    totalSpots: 100,
    availableSpots: 67,
    hourlyRate: 2.25,
    coordinates: [40.7214, -73.9998], // Lower East Side coordinates
    distance: 3.1,
    openTime: "06:30",
    closeTime: "23:30",
    image: "https://images.unsplash.com/photo-1573167710701-90d965d3707e?q=80&w=2369&auto=format&fit=crop",
    spots: Array.from({ length: 100 }, (_, i) => ({
      id: `lot4-spot-${i + 1}`,
      status: Math.random() > 0.35 ? "available" : "occupied",
      spotNumber: `D${i + 1}`,
    })),
  },
];

// Mock transactions
export const mockTransactions: Transaction[] = [
  {
    id: "trans1",
    userId: "user1",
    parkingLotId: "lot1",
    spotId: "lot1-spot-15",
    startTime: new Date(2023, 3, 15, 10, 30),
    endTime: new Date(2023, 3, 15, 14, 45),
    amount: 10.75,
    status: "completed",
  },
  {
    id: "trans2",
    userId: "user2",
    parkingLotId: "lot2",
    spotId: "lot2-spot-8",
    startTime: new Date(2023, 3, 16, 9, 15),
    endTime: null,
    amount: 6.0,
    status: "pending",
  },
  {
    id: "trans3",
    userId: "user1",
    parkingLotId: "lot3",
    spotId: "lot3-spot-22",
    startTime: new Date(2023, 3, 14, 14, 0),
    endTime: new Date(2023, 3, 14, 16, 30),
    amount: 4.38,
    status: "completed",
  },
];

// Mock statistics
export const mockStatistics: Statistics = {
  totalParkingLots: mockParkingLots.length,
  totalSpots: mockParkingLots.reduce((acc, lot) => acc + lot.totalSpots, 0),
  availableSpots: mockParkingLots.reduce((acc, lot) => acc + lot.availableSpots, 0),
  occupancyRate: 
    Math.round(
      (1 - 
        mockParkingLots.reduce((acc, lot) => acc + lot.availableSpots, 0) / 
        mockParkingLots.reduce((acc, lot) => acc + lot.totalSpots, 0)
      ) * 100
    )
};
