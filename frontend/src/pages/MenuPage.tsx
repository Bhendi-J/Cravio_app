import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  restaurant: string;
  rating: number;
}

// Mock data
const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and basil',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=1470&auto=format&fit=crop',
    category: 'pizza',
    restaurant: 'Pizza Palace',
    rating: 4.7
  },
  {
    id: '2',
    name: 'Pepperoni Pizza',
    description: 'Traditional pizza topped with pepperoni slices',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1480&auto=format&fit=crop',
    category: 'pizza',
    restaurant: 'Pizza Palace',
    rating: 4.8
  },
  {
    id: '3',
    name: 'Cheeseburger',
    description: 'Classic burger with cheese, lettuce, and tomato',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1398&auto=format&fit=crop',
    category: 'burger',
    restaurant: 'Burger Haven',
    rating: 4.5
  },
  {
    id: '4',
    name: 'Double Bacon Burger',
    description: 'Double patty burger with extra bacon and cheese',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=1376&auto=format&fit=crop',
    category: 'burger',
    restaurant: 'Burger Haven',
    rating: 4.9
  },
  {
    id: '5',
    name: 'Butter Chicken',
    description: 'Creamy curry with tender chicken pieces',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1470&auto=format&fit=crop',
    category: 'indian',
    restaurant: 'Spice Garden',
    rating: 4.8
  },
  {
    id: '6',
    name: 'Vegetable Biryani',
    description: 'Fragrant rice dish with mixed vegetables and spices',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1374&auto=format&fit=crop',
    category: 'indian',
    restaurant: 'Spice Garden',
    rating: 4.6
  },
  {
    id: '7',
    name: 'Kung Pao Chicken',
    description: 'Spicy stir-fried chicken with peanuts and vegetables',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1625938145594-838716a437cc?q=80&w=1470&auto=format&fit=crop',
    category: 'chinese',
    restaurant: 'Dragon Palace',
    rating: 4.7
  },
  {
    id: '8',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten chocolate center',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d8e3d0c74?q=80&w=1287&auto=format&fit=crop',
    category: 'dessert',
    restaurant: 'Sweet Treats',
    rating: 4.9
  }
];

const MenuPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'pizza', name: 'Pizza' },
    { id: 'burger', name: 'Burgers' },
    { id: 'indian', name: 'Indian' },
    { id: 'chinese', name: 'Chinese' },
    { id: 'dessert', name: 'Desserts' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-6 md:py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Menu</h1>
          
          <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search menu items..."
                className="pl-10 w-full md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-600">No menu items found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="food-card">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <div className="flex items-center text-sm">
                      <Star size={16} className="text-yellow-500 mr-1" fill="currentColor" />
                      <span>{item.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-2">{item.restaurant}</p>
                  <p className="text-sm line-clamp-2">{item.description}</p>
                </CardContent>
                
                <CardFooter className="flex justify-between items-center pt-2">
                  <div className="font-bold text-lg">
                    ${item.price.toFixed(2)}
                  </div>
                  <Button size="sm" className="rounded-full h-9 w-9 p-0">
                    <Plus size={16} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
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

export default MenuPage;
