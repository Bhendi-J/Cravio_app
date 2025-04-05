
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/90 to-brand/90 z-10" />
      
      <div 
        className="relative h-[70vh] md:h-[60vh] bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1470&auto=format&fit=crop')" 
        }}
      >
        <div className="container relative z-20 flex flex-col justify-center items-start h-full text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-2xl animate-fade-in">
            Delicious Meals Delivered Fast
          </h1>
          <p className="mt-4 md:mt-6 text-lg md:text-xl max-w-xl animate-fade-in">
            Order from your favorite restaurants and earn rewards while you eat.
            Play games, collect points, and unlock exclusive offers.
          </p>
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in">
            <Button size="lg" className="bg-white text-brand-purple hover:bg-gray-100">
              Explore Menu
              <ArrowRight size={16} className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Find Restaurants
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
