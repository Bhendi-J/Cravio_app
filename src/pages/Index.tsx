
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FoodCategories from '@/components/FoodCategories';
import FeaturedItems from '@/components/FeaturedItems';
import RewardsPromo from '@/components/RewardsPromo';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FoodCategories />
        <FeaturedItems />
        <RewardsPromo />
        
        <section className="py-10 md:py-16 container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to order?</h2>
            <p className="text-gray-600 mb-8">
              Discover local restaurants, order your favorite meals, play games, and earn rewards - all in one app!
            </p>
            <Button size="lg" className="bg-brand hover:bg-brand-light">
              Explore Restaurants
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-white py-10">
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

export default Index;
