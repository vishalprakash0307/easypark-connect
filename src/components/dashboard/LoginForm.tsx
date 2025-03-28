
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Car } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useParkingContext } from '@/context/ParkingContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useParkingContext();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoggingIn(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Success",
          description: "You have successfully logged in",
        });
        
        // Redirect admin users to admin page
        if (email === "admin@gmail.com" && password === "1234") {
          navigate('/admin');
        }
      } else {
        toast({
          title: "Error",
          description: "Invalid email or password. Hint: try 'john@example.com' or 'admin@gmail.com'",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while logging in",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-2">
          <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <Car className="h-6 w-6" />
          </div>
        </div>
        <CardTitle className="text-2xl text-center">Welcome to Park Smart</CardTitle>
        <CardDescription className="text-center">
          Log in to find and reserve parking spots
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Button variant="link" size="sm" className="px-0 font-normal text-xs text-muted-foreground h-auto">
                Forgot password?
              </Button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoggingIn}>
            {isLoggingIn ? "Logging in..." : "Log in"}
          </Button>
          <div className="text-center text-sm text-muted-foreground mt-2">
            <p>Demo accounts:</p>
            <p>User: john@example.com</p>
            <p>Admin: admin@gmail.com (password: 1234)</p>
            <p>(Use any password for non-admin accounts)</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
