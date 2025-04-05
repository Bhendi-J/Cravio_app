import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const CheckoutPage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Order placed successfully! You'll be redirected to track your order.");
    // In a real app, we would redirect to an order tracking page
  };

  // Mock order summary data
  const subtotal = 34.97;
  const deliveryFee = 2.99;
  const tax = 3.50;
  const total = subtotal + deliveryFee + tax;
  const rewardPoints = 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-6 md:py-10">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <Link to="/cart" className="text-brand hover:underline mt-2 md:mt-0">
            Back to Cart
          </Link>
        </div>
        
        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Delivery Address */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="First Name" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Last Name" required />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" placeholder="123 Main St" required />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="City" required />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="State" required />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input id="zipCode" placeholder="ZIP Code" required />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="(123) 456-7890" type="tel" required />
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                    <Textarea 
                      id="instructions" 
                      placeholder="E.g., Leave at the door, call upon arrival, etc."
                      className="resize-none"
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Payment Method */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                  
                  <RadioGroup 
                    defaultValue="credit-card" 
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                        Credit Card
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                        PayPal
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex-1 cursor-pointer">
                        Cash on Delivery
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  {paymentMethod === 'credit-card' && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input id="expiryDate" placeholder="MM/YY" required />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" required />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Order Summary */}
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
                    
                    <div className="bg-brand-purple/10 p-3 rounded-md mt-4">
                      <div className="flex justify-between text-sm font-medium text-brand-purple">
                        <span>Reward Points to Earn</span>
                        <span>+{rewardPoints} pts</span>
                      </div>
                    </div>

                    <div className="pt-6">
                      <Button type="submit" className="w-full">
                        Place Order
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>
      
      <footer className="bg-gray-900 text-white py-10 mt-16">
        {/* Keep the same footer content as Index page */}
      </footer>
    </div>
  );
};

export default CheckoutPage;
