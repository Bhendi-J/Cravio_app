
import React from 'react';
import { Button } from '@/components/ui/button';
import { GamepadIcon, Gift, Trophy } from 'lucide-react';

const RewardsPromo: React.FC = () => {
  return (
    <section className="py-10 md:py-16">
      <div className="container">
        <div className="bg-gradient-to-r from-brand-purple to-brand rounded-2xl p-6 md:p-10 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 opacity-10">
            <GamepadIcon size={300} />
          </div>
          
          <div className="max-w-2xl relative z-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Play Games, Earn Rewards
            </h2>
            <p className="text-lg mb-6 text-white/90">
              Join our exclusive rewards program where you can play fun games and earn points with every order. 
              Redeem your points for discounts, free meals, and other exciting rewards!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <GamepadIcon size={24} className="mb-2" />
                <h3 className="font-semibold mb-1">Play Games</h3>
                <p className="text-sm text-white/80">
                  Play fun games in our app
                </p>
              </div>
              
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <Trophy size={24} className="mb-2" />
                <h3 className="font-semibold mb-1">Score Points</h3>
                <p className="text-sm text-white/80">
                  Win points from games and orders
                </p>
              </div>
              
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <Gift size={24} className="mb-2" />
                <h3 className="font-semibold mb-1">Get Rewards</h3>
                <p className="text-sm text-white/80">
                  Redeem points for exciting offers
                </p>
              </div>
            </div>
            
            <Button size="lg" className="bg-white text-brand-purple hover:bg-gray-100">
              Start Playing Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RewardsPromo;
