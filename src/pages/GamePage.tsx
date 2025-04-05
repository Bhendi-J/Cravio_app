import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Gift } from 'lucide-react';
import { toast } from 'sonner';
import FoodRunner from '@/components/games/FoodRunner';

interface GameData {
  id: string;
  name: string;
  description: string;
  instructions: string;
}

const games: Record<string, GameData> = {
  'food-runner': {
    id: 'food-runner',
    name: 'Food Runner',
    description: 'Deliver food and dodge obstacles in this fast-paced runner game!',
    instructions: 'Use arrow keys or swipe to move left and right. Collect falling food items to score points.'
  },
  'burger-stack': {
    id: 'burger-stack',
    name: 'Burger Stack',
    description: 'Stack burger ingredients perfectly to score points!',
    instructions: 'Tap or click to drop the ingredient. Stack them as perfectly as possible to score points.'
  },
  'pizza-flip': {
    id: 'pizza-flip',
    name: 'Pizza Flip',
    description: 'Toss and catch pizza dough without dropping it!',
    instructions: 'Tap or click to toss the pizza dough. Tap again to catch it before it falls.'
  }
};

const GamePage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [score, setScore] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  
  const game = gameId ? games[gameId] : null;
  
  useEffect(() => {
    if (isGameActive) {
      // End game after 60 seconds
      const gameTimer = setTimeout(() => {
        endGame();
      }, 60000);
      
      return () => {
        clearTimeout(gameTimer);
      };
    }
  }, [isGameActive]);

  const startGame = () => {
    setScore(0);
    setIsGameActive(true);
    setIsGameOver(false);
  };

  const endGame = () => {
    setIsGameActive(false);
    setIsGameOver(true);
    // Calculate points based on score
    const points = Math.floor(score * 0.8);
    setEarnedPoints(points);
  };

  const claimPoints = () => {
    toast.success(`Congratulations! You earned ${earnedPoints} reward points!`);
    setIsGameOver(false);
  };
  
  const handleScoreUpdate = (newScore: number) => {
    setScore(newScore);
  };

  if (!game) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Game not found</h1>
          <p className="mb-6">Sorry, we couldn't find the game you're looking for.</p>
          <Link to="/games">
            <Button>Back to Games</Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-6 md:py-10">
        <div className="mb-6">
          <Link to="/games" className="flex items-center text-brand hover:underline">
            <ArrowLeft size={16} className="mr-1" />
            Back to Games
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">{game.name}</h1>
            <p className="text-gray-600">{game.description}</p>
          </div>
          
          {!isGameActive && !isGameOver && (
            <Button onClick={startGame} size="lg" className="mt-4 md:mt-0">
              Start Game
            </Button>
          )}
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            {!isGameActive && !isGameOver ? (
              <div className="text-center py-8">
                <h2 className="text-xl font-semibold mb-4">How to Play</h2>
                <p className="mb-6">{game.instructions}</p>
                <Badge className="bg-brand-purple text-white">
                  Earn up to 100 points per play!
                </Badge>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="mb-6">
                  <h2 className="text-4xl font-bold">{score}</h2>
                  <p className="text-gray-500">Current Score</p>
                </div>
                
                <div className="max-w-xl mx-auto">
                  {gameId === 'food-runner' && (
                    <FoodRunner onScoreUpdate={handleScoreUpdate} gameActive={isGameActive} />
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <Trophy className="text-brand mr-2" size={20} />
                <h3 className="font-semibold">High Scores</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Alex S.</span>
                  <span className="font-medium">285</span>
                </li>
                <li className="flex justify-between">
                  <span>Jamie T.</span>
                  <span className="font-medium">253</span>
                </li>
                <li className="flex justify-between">
                  <span>Riley K.</span>
                  <span className="font-medium">241</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <Gift className="text-brand-purple mr-2" size={20} />
                <h3 className="font-semibold">Your Best Score</h3>
              </div>
              <div className="text-center py-2">
                <p className="text-3xl font-bold">175</p>
                <p className="text-sm text-gray-500">Earned 140 points</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <Trophy className="text-yellow-500 mr-2" size={20} />
                <h3 className="font-semibold">Today's Challenge</h3>
              </div>
              <p className="text-sm mb-3">Score over 200 points to earn a bonus 50 reward points!</p>
              <div className="bg-gray-100 rounded-md p-2 text-center">
                <span className="text-xs text-gray-600">Challenge ends in 5h 23m</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Dialog open={isGameOver} onOpenChange={setIsGameOver}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Congratulations!</DialogTitle>
            <DialogDescription>
              You've earned {earnedPoints} reward points from this game.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-6 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center mb-4 animate-bounce-subtle">
              <Gift className="text-white" size={32} />
            </div>
            
            <p className="text-center text-lg font-medium mb-1">
              Your Score: {score}
            </p>
            <p className="text-center text-gray-500">
              Keep playing to earn more rewards!
            </p>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsGameOver(false)} className="sm:w-full">
              Play Again
            </Button>
            <Button onClick={claimPoints} className="sm:w-full">
              Claim Points
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <footer className="bg-gray-900 text-white py-10 mt-16">
        {/* Keep the same footer content as Index page */}
      </footer>
    </div>
  );
};

export default GamePage;
