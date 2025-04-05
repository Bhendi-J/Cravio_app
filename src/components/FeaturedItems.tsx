
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FoodItem {
  id: string;
  name: string;
  restaurant: string;
  price: number;
  rating: number;
  image: string;
  isFeatured: boolean;
}

const foodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Classic Margherita Pizza',
    restaurant: 'Pizza Palace',
    price: 12.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=1470&auto=format&fit=crop',
    isFeatured: true
  },
  {
    id: '2',
    name: 'Double Cheeseburger',
    restaurant: 'Burger Haven',
    price: 8.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=1622&auto=format&fit=crop',
    isFeatured: true
  },
  {
    id: '3',
    name: 'Chicken Tikka Masala',
    restaurant: 'Spice Garden',
    price: 14.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1471&auto=format&fit=crop',
    isFeatured: true
  },
  {
    id: '4',
    name: 'Chocolate Lava Cake',
    restaurant: 'Sweet Treats',
    price: 6.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d8e3d0c74?q=80&w=1287&auto=format&fit=crop',
    isFeatured: true
  }
];

const FeaturedItems: React.FC = () => {
  return (
    <section className="py-10 md:py-16 bg-gray-50">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Items</h2>
          <Button variant="link" className="text-brand">
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {foodItems.map((item) => (
            <Card key={item.id} className="food-card">
              <div className="relative h-44 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {item.isFeatured && (
                  <Badge className="absolute top-2 left-2 bg-brand text-white">
                    Featured
                  </Badge>
                )}
              </div>
              
              <CardContent className="pt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.restaurant}</p>
                  </div>
                  <div className="flex items-center text-sm">
                    <Star size={16} className="text-yellow-500 mr-1" fill="currentColor" />
                    <span>{item.rating}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between items-center pt-0">
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
      </div>
    </section>
  );
};

export default FeaturedItems;
