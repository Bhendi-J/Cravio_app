import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import GameInfo from '@/components/games/GameInfo';
import GameStats from '@/components/games/GameStats';
import ActiveGame from '@/components/games/ActiveGame';
import GameResultDialog from '@/components/games/GameResultDialog';

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
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-6 md:py-10">
        <GameInfo 
          name={game.name}
          description={game.description}
          instructions={game.instructions}
          isGameActive={isGameActive}
          isGameOver={isGameOver}
          onStartGame={startGame}
        />
        
        <Card className="mb-8">
          <CardContent className="p-6">
            {!isGameActive && !isGameOver ? (
              <GameInfo
                name={game.name}
                description={game.description}
                instructions={game.instructions}
                isGameActive={isGameActive}
                isGameOver={isGameOver}
                onStartGame={startGame}
              />
            ) : (
              <ActiveGame
                gameId={gameId || ''}
                score={score}
                isGameActive={isGameActive}
                onScoreUpdate={handleScoreUpdate}
              />
            )}
          </CardContent>
        </Card>
        
        <GameStats />
      </main>
      
      <GameResultDialog
        isOpen={isGameOver}
        setIsOpen={setIsGameOver}
        score={score}
        earnedPoints={earnedPoints}
        onClaimPoints={claimPoints}
      />
      
      <footer className="bg-gray-900 text-white py-10 mt-16">
        {/* Keep the same footer content as Index page */}
      </footer>
    </div>
  );
};

export default GamePage;
