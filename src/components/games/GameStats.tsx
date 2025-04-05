
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Gift } from 'lucide-react';

const GameStats: React.FC = () => {
  return (
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
  );
};

export default GameStats;
