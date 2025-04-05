
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import FoodRunner from '@/components/games/FoodRunner';

interface ActiveGameProps {
  gameId: string;
  score: number;
  isGameActive: boolean;
  onScoreUpdate: (score: number) => void;
}

const ActiveGame: React.FC<ActiveGameProps> = ({ 
  gameId, 
  score, 
  isGameActive, 
  onScoreUpdate 
}) => {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="text-center py-4">
          <div className="mb-6">
            <h2 className="text-4xl font-bold">{score}</h2>
            <p className="text-gray-500">Current Score</p>
          </div>
          
          <div className="max-w-xl mx-auto">
            {gameId === 'food-runner' && (
              <FoodRunner onScoreUpdate={onScoreUpdate} gameActive={isGameActive} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveGame;
