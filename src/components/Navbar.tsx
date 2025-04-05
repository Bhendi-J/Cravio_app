
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Search, 
  ShoppingBag, 
  User, 
  Home, 
  Utensils, 
  Store, 
  GamepadIcon,
  Award
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [itemsInCart] = useState(3); // Mock data for items in cart
  
  const navigationItems = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Menu', path: '/menu', icon: <Utensils size={18} /> },
    { name: 'Restaurants', path: '/restaurants', icon: <Store size={18} /> },
    { name: 'Play & Earn', path: '/games', icon: <GamepadIcon size={18} /> },
    { name: 'Rewards', path: '/profile', icon: <Award size={18} /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-brand">QuickBite</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-6">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center space-x-1 text-sm font-medium text-gray-700 transition-colors hover:text-brand"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 text-gray-500 hover:text-gray-800 transition-colors">
            <Search size={20} />
          </button>
          <Link 
            to="/cart" 
            className="p-2 text-gray-500 hover:text-gray-800 transition-colors relative"
          >
            <ShoppingBag size={20} />
            {itemsInCart > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-brand text-white min-w-[18px] h-[18px] flex items-center justify-center p-0 text-xs rounded-full">
                {itemsInCart}
              </Badge>
            )}
          </Link>
          <Button variant="outline" size="sm" className="ml-4">
            Log In
          </Button>
          <Button size="sm">Sign Up</Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden space-x-4">
          <Link 
            to="/cart" 
            className="p-2 text-gray-500 hover:text-gray-800 transition-colors relative"
          >
            <ShoppingBag size={20} />
            {itemsInCart > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-brand text-white min-w-[18px] h-[18px] flex items-center justify-center p-0 text-xs rounded-full">
                {itemsInCart}
              </Badge>
            )}
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-500 hover:text-gray-800 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white pt-16 pb-6 animate-fade-in md:hidden">
          <div className="container flex flex-col h-full">
            <div className="flex-1 space-y-4 py-6">
              {navigationItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center py-3 px-2 space-x-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="border-t pt-4 mt-6">
                <button className="flex items-center py-3 px-2 space-x-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-md w-full">
                  <Search size={20} />
                  <span>Search</span>
                </button>
                <button className="flex items-center py-3 px-2 space-x-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-md w-full">
                  <User size={20} />
                  <span>Account</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-auto px-2">
              <Button variant="outline" className="w-full">Log In</Button>
              <Button className="w-full">Sign Up</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
