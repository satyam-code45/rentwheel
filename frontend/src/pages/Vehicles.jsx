/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Car, Users, Fuel, Activity, CarTaxiFront } from "lucide-react";

// The function component that renders the vehicle page
export default function VehiclePage() {
  // State for vehicles and search term
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch vehicle data from the backend API when the component mounts
  useEffect(() => {
    // Here you would replace the URL with the endpoint for fetching data from your database
    fetch("/api/vehicles")
      .then((res) => res.json())
      .then((data) => setVehicles(data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, []);

  // Filter vehicles based on the search term
  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Available Vehicles</h2>

      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <Input
          placeholder="Search vehicles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md"
        />
      </div>

      {/* Vehicle Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 font-bold text-2xl"><span className="inline-flex gap-2 items-center">no vehicles found<CarTaxiFront/></span></p>
        )}
      </div>
    </div>
  );
}

// Component for individual vehicle cards
function VehicleCard({ vehicle }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="overflow-hidden transition-all duration-300 transform hover:shadow-lg hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">{vehicle.name}</h3>
          <p className="text-lg font-bold text-primary">${vehicle.pricePerDay}/day</p>
        </div>
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        {!isHovered && (
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-2">
                <Car className="w-4 h-4 text-primary" />
              </div>
              <span>{vehicle.transmission}</span>
            </div>
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-2">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <span>{vehicle.seats} seats</span>
            </div>
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-2">
                <Fuel className="w-4 h-4 text-primary" />
              </div>
              <span>{vehicle.fuelType}</span>
            </div>
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-2">
                <Activity className="w-4 h-4 text-primary" />
              </div>
              <span>{vehicle.condition}</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4">
        {isHovered && (
          <Button className="w-full" onClick={() => window.location.href = `/rent/${vehicle.id}`}>
            Rent Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}