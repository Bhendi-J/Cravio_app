
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface GameInfoProps {
  name: string;
  description: string;
  instructions: string;
  isGameActive: boolean;
  isGameOver: boolean;
  onStartGame: () => void;
}

const GameInfo: React.FC<GameInfoProps> = ({ 
  name, 
  description, 
  instructions,
  isGameActive,
  isGameOver,
  onStartGame
}) => {
  return (
    <>
      <div className="mb-6">
        <Link to="/games" className="flex items-center text-brand hover:underline">
          <ArrowLeft size={16} className="mr-1" />
          Back to Games
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
        
        {!isGameActive && !isGameOver && (
          <Button onClick={onStartGame} size="lg" className="mt-4 md:mt-0">
            Start Game
          </Button>
        )}
      </div>

      {!isGameActive && !isGameOver && (
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold mb-4">How to Play</h2>
          <p className="mb-6">{instructions}</p>
          <Badge className="bg-brand-purple text-white">
            Earn up to 100 points per play!
          </Badge>
        </div>
      )}
    </>
  );
};

export default GameInfo;
