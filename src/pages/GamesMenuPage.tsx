import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { GamepadIcon, Trophy, Star, Gift, Sparkles } from 'lucide-react';

interface Game {
  id: string;
  name: string;
  description: string;
  image: string;
  pointsPerPlay: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const games: Game[] = [
  {
    id: 'food-runner',
    name: 'Food Runner',
    description: 'Deliver food and dodge obstacles in this fast-paced runner game!',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1470&auto=format&fit=crop',
    pointsPerPlay: 50,
    difficulty: 'Easy'
  },
  {
    id: 'burger-stack',
    name: 'Burger Stack',
    description: 'Stack burger ingredients perfectly to score points!',
    image: 'https://images.unsplash.com/photo-1509743248323-c2e141bedab3?q=80&w=1470&auto=format&fit=crop',
    pointsPerPlay: 75,
    difficulty: 'Medium'
  },
  {
    id: 'pizza-flip',
    name: 'Pizza Flip',
    description: 'Toss and catch pizza dough without dropping it!',
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=1471&auto=format&fit=crop',
    pointsPerPlay: 100,
    difficulty: 'Hard'
  }
];

const GamesMenuPage: React.FC = () => {
  // Mock user reward data
  const points = 350;
  const nextRewardThreshold = 500;
  const progress = (points / nextRewardThreshold) * 100;
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-6 md:py-10">
        <h1 className="text-3xl font-bold mb-2">Play & Earn</h1>
        <p className="text-gray-600 mb-8">Play games, win points, unlock rewards!</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {games.map((game) => (
                <Card key={game.id} className="overflow-hidden card-hover">
                  <div className="aspect-video relative">
                    <img 
                      src={game.image} 
                      alt={game.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <Badge className={`
                        ${game.difficulty === 'Easy' ? 'bg-green-500' : ''} 
                        ${game.difficulty === 'Medium' ? 'bg-yellow-500' : ''} 
                        ${game.difficulty === 'Hard' ? 'bg-red-500' : ''}
                        text-white
                      `}>
                        {game.difficulty}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{game.name}</h3>
                      <Badge variant="outline" className="text-brand bg-brand/10">
                        +{game.pointsPerPlay} pts
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{game.description}</p>
                    
                    <Link to={`/games/${game.id}`}>
                      <Button className="w-full">Play Now</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Trophy size={20} className="mr-2 text-brand" />
                  Your Rewards
                </h2>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Current Points</span>
                    <span className="font-bold text-xl">{points}</span>
                  </div>
                  
                  <Progress value={progress} className="h-2 mb-2" />
                  
                  <div className="text-xs text-gray-500 flex justify-between">
                    <span>{points} points</span>
                    <span>{nextRewardThreshold} points</span>
                  </div>
                  
                  <div className="mt-3 text-sm text-center">
                    <span className="text-brand-purple">
                      {nextRewardThreshold - points} more points
                    </span>
                    {' '}until your next reward!
                  </div>
                </div>
                
                <h3 className="font-medium text-gray-800 mb-3">Available Rewards</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div className="flex items-center">
                      <Gift size={18} className="text-brand mr-3" />
                      <div>
                        <p className="font-medium">$5 Off Your Next Order</p>
                        <p className="text-xs text-gray-500">Valid for 30 days</p>
                      </div>
                    </div>
                    <Badge className="bg-gray-100 text-gray-600">
                      500 pts
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div className="flex items-center">
                      <Gift size={18} className="text-brand mr-3" />
                      <div>
                        <p className="font-medium">Free Delivery</p>
                        <p className="text-xs text-gray-500">Valid for 7 days</p>
                      </div>
                    </div>
                    <Badge className="bg-gray-100 text-gray-600">
                      300 pts
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div className="flex items-center">
                      <Sparkles size={18} className="text-brand-purple mr-3" />
                      <div>
                        <p className="font-medium">Free Dessert</p>
                        <p className="text-xs text-gray-500">With any order over $20</p>
                      </div>
                    </div>
                    <Badge className="bg-gray-100 text-gray-600">
                      200 pts
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Star size={20} className="mr-2 text-yellow-500" />
                  Leaderboard
                </h2>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-brand-purple/5 rounded-md">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-brand-purple text-white flex items-center justify-center text-xs mr-3">1</div>
                      <span>Alex S.</span>
                    </div>
                    <span className="font-medium">1,250 pts</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 rounded-md">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs mr-3">2</div>
                      <span>Jamie T.</span>
                    </div>
                    <span className="font-medium">980 pts</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 rounded-md">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs mr-3">3</div>
                      <span>Riley K.</span>
                    </div>
                    <span className="font-medium">805 pts</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 rounded-md">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs mr-3">4</div>
                      <span>You</span>
                    </div>
                    <span className="font-medium">350 pts</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-900 text-white py-10 mt-16">
        {/* Keep the same footer content as Index page */}
      </footer>
    </div>
  );
};

export default GamesMenuPage;
