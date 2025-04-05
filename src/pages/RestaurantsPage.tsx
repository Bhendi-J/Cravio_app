import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Star, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  distance: number;
  cuisines: string[];
  priceRange: string;
  location: string;
}

// Mock data
const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Pizza Palace',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=1470&auto=format&fit=crop',
    rating: 4.7,
    deliveryTime: '25-35',
    distance: 1.2,
    cuisines: ['Italian', 'Pizza'],
    priceRange: '$$',
    location: '123 Main St'
  },
  {
    id: '2',
    name: 'Burger Haven',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1374&auto=format&fit=crop',
    rating: 4.5,
    deliveryTime: '15-25',
    distance: 0.8,
    cuisines: ['American', 'Burgers'],
    priceRange: '$',
    location: '456 Oak Ave'
  },
  {
    id: '3',
    name: 'Spice Garden',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop',
    rating: 4.8,
    deliveryTime: '30-45',
    distance: 1.5,
    cuisines: ['Indian', 'Vegetarian'],
    priceRange: '$$',
    location: '789 Elm St'
  },
  {
    id: '4',
    name: 'Dragon Palace',
    image: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1374&auto=format&fit=crop',
    rating: 4.3,
    deliveryTime: '20-30',
    distance: 2.1,
    cuisines: ['Chinese', 'Asian'],
    priceRange: '$$',
    location: '101 Pine Ave'
  },
  {
    id: '5',
    name: 'Sweet Treats',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1471&auto=format&fit=crop',
    rating: 4.9,
    deliveryTime: '15-25',
    distance: 0.7,
    cuisines: ['Bakery', 'Desserts'],
    priceRange: '$',
    location: '202 Maple Dr'
  },
  {
    id: '6',
    name: 'Fresh & Healthy',
    image: 'https://images.unsplash.com/photo-1593040637938-12effbd5a650?q=80&w=1374&auto=format&fit=crop',
    rating: 4.6,
    deliveryTime: '20-30',
    distance: 1.3,
    cuisines: ['Healthy', 'Salads'],
    priceRange: '$$$',
    location: '303 Birch St'
  }
];

const RestaurantsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [maxDistance, setMaxDistance] = useState(5); // miles
  const [activeCuisine, setActiveCuisine] = useState('all');

  const cuisineTypes = ['all', 'Italian', 'American', 'Indian', 'Chinese', 'Bakery', 'Healthy'];
  
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisines.some(cuisine => cuisine.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCuisine = activeCuisine === 'all' || restaurant.cuisines.some(cuisine => cuisine.toLowerCase() === activeCuisine.toLowerCase());
    
    const matchesDistance = restaurant.distance <= maxDistance;
    
    return matchesSearch && matchesCuisine && matchesDistance;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-6 md:py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Restaurants Near You</h1>
          
          <div className="w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search restaurants or cuisines..."
                className="pl-10 w-full md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-64 space-y-6">
            <div>
              <h3 className="font-medium mb-3">Filter by Distance</h3>
              <div className="space-y-4">
                <Slider
                  defaultValue={[maxDistance]}
                  max={5}
                  step={0.1}
                  onValueChange={(values) => setMaxDistance(values[0])}
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>0 miles</span>
                  <span>{maxDistance.toFixed(1)} miles</span>
                  <span>5 miles</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Cuisine Type</h3>
              <div className="space-y-2">
                {cuisineTypes.map((cuisine) => (
                  <Button
                    key={cuisine}
                    variant={activeCuisine === cuisine ? "default" : "outline"}
                    size="sm"
                    className="mr-2 mb-2"
                    onClick={() => setActiveCuisine(cuisine)}
                  >
                    {cuisine === 'all' ? 'All Cuisines' : cuisine}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            {filteredRestaurants.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium text-gray-600">No restaurants found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredRestaurants.map((restaurant) => (
                  <Card key={restaurant.id} className="overflow-hidden card-hover">
                    <div className="md:flex">
                      <div className="md:w-40 h-40 md:h-full overflow-hidden">
                        <img 
                          src={restaurant.image} 
                          alt={restaurant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <CardContent className="p-4 flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                          <div className="flex items-center">
                            <Star size={16} className="text-yellow-500 mr-1" fill="currentColor" />
                            <span>{restaurant.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin size={14} className="mr-1" />
                          <span>{restaurant.distance} miles away • {restaurant.location}</span>
                        </div>
                        
                        <div className="mt-2 flex flex-wrap gap-1">
                          {restaurant.cuisines.map((cuisine, index) => (
                            <Badge 
                              key={index} 
                              variant="outline"
                              className="text-xs bg-gray-100"
                            >
                              {cuisine}
                            </Badge>
                          ))}
                          <Badge 
                            variant="outline"
                            className="text-xs bg-gray-100"
                          >
                            {restaurant.priceRange}
                          </Badge>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center">
                          <div className="text-sm">
                            <span className="text-brand font-medium">{restaurant.deliveryTime} min</span>
                            <span className="text-gray-500"> delivery time</span>
                          </div>
                          <Button>View Menu</Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-900 text-white py-10 mt-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">QuickBite</h3>
              <p className="text-gray-400 text-sm">
                The best food delivery service with integrated rewards system.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Menu</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Restaurants</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Play & Earn</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Cookie Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400 text-sm">Email: info@quickbite.com</li>
                <li className="text-gray-400 text-sm">Phone: (123) 456-7890</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 QuickBite. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RestaurantsPage;
