
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Category {
  id: string;
  name: string;
  image: string;
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1398&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Indian',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1336&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Chinese',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1374&auto=format&fit=crop'
  },
  {
    id: '5',
    name: 'Desserts',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1374&auto=format&fit=crop'
  }
];

const FoodCategories: React.FC = () => {
  return (
    <section className="py-10 md:py-16">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Browse Categories</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Card key={category.id} className="group cursor-pointer overflow-hidden card-hover">
              <CardContent className="p-0 relative">
                <div className="h-28 md:h-36 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-lg md:text-xl font-semibold">{category.name}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodCategories;
