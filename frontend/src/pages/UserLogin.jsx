import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// This is a placeholder function. Replace it with your actual API call.
const loginUser = async (credentials) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('User logged in:', credentials);
  // In a real app, you'd make an API call here and handle the response
  return { success: true };
};

export default function LoginPage() {
  const router = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [redirectTo, setRedirectTo] = useState(null); // State to handle redirects

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(credentials);
      if (result.success) {
        router.push('/dashboard'); // Redirect to dashboard after successful login
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  // Handle redirects for the links
  if (redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </form>
        <div className="mt-4 text-center">
          <Button variant="outline"
            onClick={() => setRedirectTo('/register')}
            className="text-blue-600 hover:underline border-none shadow-none"
          >
            Don't have an account? Register
          </Button>
        </div>
        <div className="mt-2 text-center">
          <Button variant="outline"
            onClick={() => setRedirectTo('/admin')}
            className="text-green-600 hover:underline border-none shadow-none"
          >
            Admin Login
          </Button>
        </div>
      </div>
    </div>
  );
}