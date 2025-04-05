
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';

interface GameResultDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  score: number;
  earnedPoints: number;
  onClaimPoints: () => void;
}

const GameResultDialog: React.FC<GameResultDialogProps> = ({
  isOpen,
  setIsOpen,
  score,
  earnedPoints,
  onClaimPoints
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
          <Button variant="outline" onClick={() => setIsOpen(false)} className="sm:w-full">
            Play Again
          </Button>
          <Button onClick={onClaimPoints} className="sm:w-full">
            Claim Points
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameResultDialog;
