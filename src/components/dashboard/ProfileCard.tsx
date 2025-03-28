
import React from 'react';
import { User as UserIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@/types';

interface ProfileCardProps {
  user: User;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Manage your account information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-20 w-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 mx-auto">
            <UserIcon className="h-10 w-10" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={user.name} readOnly />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user.email} readOnly />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" value={user.role.charAt(0).toUpperCase() + user.role.slice(1)} readOnly />
          </div>
          
          <Button className="w-full">Edit Profile</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
