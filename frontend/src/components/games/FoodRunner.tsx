
import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface FoodItem {
  x: number;
  y: number;
  speed: number;
  type: 'burger' | 'pizza' | 'fries';
  width: number;
  height: number;
}

interface Player {
  x: number;
  width: number;
  height: number;
}

interface FoodRunnerProps {
  onScoreUpdate: (score: number) => void;
  gameActive: boolean;
}

const FoodRunner: React.FC<FoodRunnerProps> = ({ onScoreUpdate, gameActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [player, setPlayer] = useState<Player>({ x: 0, width: 50, height: 30 });
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [gameLoop, setGameLoop] = useState<number | null>(null);
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());

  // Initialize the game
  useEffect(() => {
    if (!gameActive) {
      if (gameLoop) {
        cancelAnimationFrame(gameLoop);
        setGameLoop(null);
      }
      return;
    }
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // Initialize player position
    setPlayer(prev => ({ ...prev, x: canvas.width / 2 - prev.width / 2 }));
    
    // Start game loop
    let animationId: number;
    const runGameLoop = () => {
      updateGameState();
      drawGame();
      animationId = requestAnimationFrame(runGameLoop);
    };
    
    animationId = requestAnimationFrame(runGameLoop);
    setGameLoop(animationId);
    
    // Set up event listeners for keyboard
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeysPressed(prev => {
        const newKeys = new Set(prev);
        newKeys.add(e.key);
        return newKeys;
      });
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeysPressed(prev => {
        const newKeys = new Set(prev);
        newKeys.delete(e.key);
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Food generation interval
    const foodInterval = setInterval(generateFood, 1000);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationId);
      clearInterval(foodInterval);
    };
  }, [gameActive]);

  // Update game state based on user input and physics
  const updateGameState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Move the player based on keys pressed
    const speed = 5;
    if (keysPressed.has('ArrowLeft') || keysPressed.has('a')) {
      setPlayer(prev => ({
        ...prev,
        x: Math.max(0, prev.x - speed)
      }));
    }
    if (keysPressed.has('ArrowRight') || keysPressed.has('d')) {
      setPlayer(prev => ({
        ...prev,
        x: Math.min(canvas.width - prev.width, prev.x + speed)
      }));
    }

    // Update food positions and check collisions
    setFoodItems(prevItems => {
      const updatedItems = prevItems.filter(item => {
        // Move the food item down
        item.y += item.speed;
        
        // Check if the food item is out of bounds
        if (item.y > canvas.height) {
          return false;
        }
        
        // Check for collision with player
        if (
          item.y + item.height > canvas.height - player.height &&
          item.x + item.width > player.x &&
          item.x < player.x + player.width
        ) {
          // Increase score
          setScore(prev => {
            const newScore = prev + 10;
            onScoreUpdate(newScore);
            return newScore;
          });
          return false;
        }
        
        return true;
      });
      
      return updatedItems;
    });
  };

  // Draw all game elements
  const drawGame = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx) return;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the player (delivery person)
    ctx.fillStyle = '#ff4500';
    ctx.fillRect(player.x, canvas.height - player.height, player.width, player.height);
    
    // Draw all food items
    foodItems.forEach(food => {
      switch (food.type) {
        case 'burger':
          ctx.fillStyle = '#8B4513';
          break;
        case 'pizza':
          ctx.fillStyle = '#FFA500';
          break;
        case 'fries':
          ctx.fillStyle = '#FFD700';
          break;
      }
      ctx.fillRect(food.x, food.y, food.width, food.height);
    });
    
    // Draw score
    ctx.fillStyle = '#000';
    ctx.font = '16px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
  };

  // Generate new food items
  const generateFood = () => {
    const canvas = canvasRef.current;
    if (!canvas || !gameActive) return;
    
    const foodTypes: ('burger' | 'pizza' | 'fries')[] = ['burger', 'pizza', 'fries'];
    const randomType = foodTypes[Math.floor(Math.random() * foodTypes.length)];
    
    const width = 30;
    const height = 30;
    const x = Math.random() * (canvas.width - width);
    
    const newFood: FoodItem = {
      x,
      y: 0,
      speed: 2 + Math.random() * 3, // Random speed between 2-5
      type: randomType,
      width,
      height
    };
    
    setFoodItems(prev => [...prev, newFood]);
  };

  // Handle touch controls for mobile
  const handleTouchMove = (e: React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    
    setPlayer(prev => ({
      ...prev,
      x: Math.max(0, Math.min(canvas.width - prev.width, x - prev.width / 2))
    }));
  };

  return (
    <div className="relative flex flex-col items-center">
      <canvas 
        ref={canvasRef}
        className="border border-gray-300 bg-gray-50 w-full h-80 rounded-md touch-none"
        onTouchMove={handleTouchMove}
      />
      {gameActive && (
        <div className="mt-4 grid grid-cols-2 gap-4 w-full md:hidden">
          <button
            className="p-6 bg-gray-200 rounded-full flex justify-center items-center"
            onTouchStart={() => setKeysPressed(prev => {
              const newKeys = new Set(prev);
              newKeys.add('ArrowLeft');
              return newKeys;
            })}
            onTouchEnd={() => setKeysPressed(prev => {
              const newKeys = new Set(prev);
              newKeys.delete('ArrowLeft');
              return newKeys;
            })}
          >
            <ArrowLeft size={28} />
          </button>
          <button
            className="p-6 bg-gray-200 rounded-full flex justify-center items-center"
            onTouchStart={() => setKeysPressed(prev => {
              const newKeys = new Set(prev);
              newKeys.add('ArrowRight');
              return newKeys;
            })}
            onTouchEnd={() => setKeysPressed(prev => {
              const newKeys = new Set(prev);
              newKeys.delete('ArrowRight');
              return newKeys;
            })}
          >
            <ArrowRight size={28} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodRunner;
