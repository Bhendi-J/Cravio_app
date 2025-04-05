import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, X, ArrowRight } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  restaurant: string;
  price: number;
  quantity: number;
  image: string;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Margherita Pizza',
      restaurant: 'Pizza Palace',
      price: 12.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=1470&auto=format&fit=crop'
    },
    {
      id: '3',
      name: 'Cheeseburger',
      restaurant: 'Burger Haven',
      price: 8.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1398&auto=format&fit=crop'
    }
  ]);

  const handleUpdateQuantity = (id: string, amount: number) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + amount);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 2.99;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-6 md:py-10">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-medium text-gray-600">Your cart is empty</h2>
            <p className="text-gray-500 mt-2 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Link to="/menu">
              <Button>Browse Menu</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex py-4 first:pt-0 last:pb-0">
                      <div className="h-24 w-24 rounded-md overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.restaurant}</p>
                          </div>
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, -1)}
                              className="h-8 w-8 flex items-center justify-center rounded-full border text-gray-600 hover:bg-gray-100"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-3">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, 1)}
                              className="h-8 w-8 flex items-center justify-center rounded-full border text-gray-600 hover:bg-gray-100"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    
                    <Separator className="my-3" />
                    
                    <div className="flex justify-between text-base font-medium">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>

                    <div className="pt-4">
                      <p className="text-xs text-gray-500 mb-4">
                        By proceeding to checkout, you'll earn 100 reward points on this order!
                      </p>
                      <Link to="/checkout">
                        <Button className="w-full mb-3">
                          Proceed to Checkout
                          <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </Link>
                      <Link to="/menu">
                        <Button variant="outline" className="w-full">
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-gray-900 text-white py-10 mt-16">
        {/* Keep the same footer content as Index page */}
      </footer>
    </div>
  );
};

export default CartPage;
