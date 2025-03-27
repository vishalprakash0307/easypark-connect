
import React, { useState } from 'react';
import { ParkingLot } from '../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ChevronDown, Search, Plus } from 'lucide-react';

interface AdminParkingTableProps {
  parkingLots: ParkingLot[];
  onEditLot?: (lot: ParkingLot) => void;
  onViewLot?: (lot: ParkingLot) => void;
  onDeleteLot?: (lot: ParkingLot) => void;
}

const AdminParkingTable: React.FC<AdminParkingTableProps> = ({
  parkingLots,
  onEditLot,
  onViewLot,
  onDeleteLot,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof ParkingLot>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof ParkingLot) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredLots = parkingLots.filter(lot => 
    lot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lot.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedLots = [...filteredLots].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const SortIcon = ({ field }: { field: keyof ParkingLot }) => {
    if (field !== sortField) return null;
    
    return (
      <ChevronDown 
        className={`h-4 w-4 inline-block ml-1 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} 
      />
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search parking lots..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Parking Lot
        </Button>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('name')}
              >
                Name <SortIcon field="name" />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('address')}
              >
                Address <SortIcon field="address" />
              </TableHead>
              <TableHead 
                className="text-right cursor-pointer"
                onClick={() => handleSort('totalSpots')}
              >
                Total Spots <SortIcon field="totalSpots" />
              </TableHead>
              <TableHead 
                className="text-right cursor-pointer"
                onClick={() => handleSort('availableSpots')}
              >
                Available <SortIcon field="availableSpots" />
              </TableHead>
              <TableHead 
                className="text-right cursor-pointer"
                onClick={() => handleSort('hourlyRate')}
              >
                Rate ($/hr) <SortIcon field="hourlyRate" />
              </TableHead>
              <TableHead className="text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedLots.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                  No parking lots found
                </TableCell>
              </TableRow>
            ) : (
              sortedLots.map((lot) => (
                <TableRow key={lot.id}>
                  <TableCell className="font-medium">{lot.name}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={lot.address}>
                    {lot.address}
                  </TableCell>
                  <TableCell className="text-right">{lot.totalSpots}</TableCell>
                  <TableCell className="text-right">
                    <span className={
                      lot.availableSpots === 0 
                        ? 'text-red-600' 
                        : lot.availableSpots < lot.totalSpots * 0.2 
                          ? 'text-yellow-600' 
                          : 'text-green-600'
                    }>
                      {lot.availableSpots}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">${lot.hourlyRate.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => onViewLot && onViewLot(lot)}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onEditLot && onEditLot(lot)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => onDeleteLot && onDeleteLot(lot)}
                          className="text-red-600"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminParkingTable;
