import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  User, 
  MapPin, 
  Clock, 
  Award, 
  Gift, 
  Trophy, 
  Star,
  Heart,
  Crown,
  Flame,
  ArrowRight
} from 'lucide-react';

const ProfilePage: React.FC = () => {
  // Mock user data
  const userData = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, CA 90210',
    rewardPoints: 750,
    memberSince: 'January 2025',
    level: 'Silver',
    nextLevel: 'Gold',
    nextLevelPoints: 1000,
  };
  
  // Mock order history
  const orders = [
    {
      id: 'ORD-1234',
      date: 'April 2, 2025',
      restaurant: 'Pizza Palace',
      items: ['Margherita Pizza (2)', 'Garlic Knots'],
      total: 29.98,
      status: 'Delivered'
    },
    {
      id: 'ORD-1233',
      date: 'March 28, 2025',
      restaurant: 'Burger Haven',
      items: ['Cheeseburger', 'Fries', 'Milkshake'],
      total: 18.47,
      status: 'Delivered'
    },
    {
      id: 'ORD-1232',
      date: 'March 15, 2025',
      restaurant: 'Spice Garden',
      items: ['Butter Chicken', 'Naan', 'Rice'],
      total: 32.50,
      status: 'Delivered'
    }
  ];
  
  // Mock rewards
  const rewards = [
    {
      id: '1',
      name: '$10 Off Your Next Order',
      points: 500,
      icon: Gift,
      expiresIn: '30 days',
      isAvailable: true
    },
    {
      id: '2',
      name: 'Free Delivery',
      points: 300,
      icon: MapPin,
      expiresIn: '30 days',
      isAvailable: true
    },
    {
      id: '3',
      name: 'Free Dessert',
      points: 200,
      icon: Heart,
      expiresIn: '30 days',
      isAvailable: true
    },
    {
      id: '4',
      name: '20% Off on Pizza',
      points: 400,
      icon: Flame,
      expiresIn: '30 days',
      isAvailable: true
    },
    {
      id: '5',
      name: 'Buy One Get One Free',
      points: 800,
      icon: Crown,
      expiresIn: '30 days',
      isAvailable: false
    }
  ];
  
  // Calculate progress to next level
  const progress = (userData.rewardPoints / userData.nextLevelPoints) * 100;
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-6 md:py-10">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 bg-brand-purple rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3">
                    {userData.name.charAt(0)}
                  </div>
                  <h2 className="text-xl font-semibold">{userData.name}</h2>
                  <p className="text-sm text-gray-500">{userData.email}</p>
                  <Badge className="mt-2">
                    {userData.level} Member
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <User size={18} className="text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p>{userData.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin size={18} className="text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p>{userData.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock size={18} className="text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p>{userData.memberSince}</p>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-6">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="rewards">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
                <TabsTrigger value="orders">Order History</TabsTrigger>
                <TabsTrigger value="games">Game Stats</TabsTrigger>
              </TabsList>
              
              <TabsContent value="rewards" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">Reward Points</h3>
                        <p className="text-sm text-gray-500">
                          Keep ordering and playing games to earn more points
                        </p>
                      </div>
                      <div className="text-3xl font-bold text-brand-purple">
                        {userData.rewardPoints}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress to {userData.nextLevel}</span>
                        <span>{userData.rewardPoints} / {userData.nextLevelPoints}</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <p className="text-xs text-gray-500 text-right">
                        {userData.nextLevelPoints - userData.rewardPoints} more points needed
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 mt-6">
                      <div className="bg-gray-50 p-3 rounded-md text-center">
                        <Award className="mx-auto text-brand mb-1" size={24} />
                        <p className="text-sm font-medium">Current Level</p>
                        <p className="text-lg font-bold">{userData.level}</p>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-md text-center">
                        <Gift className="mx-auto text-brand mb-1" size={24} />
                        <p className="text-sm font-medium">Rewards Claimed</p>
                        <p className="text-lg font-bold">7</p>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-md text-center">
                        <Trophy className="mx-auto text-brand mb-1" size={24} />
                        <p className="text-sm font-medium">Games Played</p>
                        <p className="text-lg font-bold">15</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <h3 className="text-xl font-semibold mt-8 mb-4">Available Rewards</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rewards.map((reward) => (
                    <Card key={reward.id} className={`overflow-hidden ${!reward.isAvailable ? 'opacity-60' : ''}`}>
                      <div className="flex h-full">
                        <div className={`w-2 h-full ${!reward.isAvailable ? 'bg-gray-300' : 'bg-brand-purple'}`}></div>
                        <CardContent className="flex-1 p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center mr-3">
                                <reward.icon size={20} className="text-brand-purple" />
                              </div>
                              <div>
                                <h4 className="font-medium">{reward.name}</h4>
                                <p className="text-xs text-gray-500">
                                  Expires in {reward.expiresIn}
                                </p>
                              </div>
                            </div>
                            <Badge variant="outline" className={!reward.isAvailable ? 'bg-gray-100' : 'bg-brand-purple/10 text-brand-purple'}>
                              {reward.points} pts
                            </Badge>
                          </div>
                          
                          <div className="mt-4">
                            <Button 
                              className="w-full"
                              variant={!reward.isAvailable ? "outline" : "default"}
                              disabled={!reward.isAvailable || userData.rewardPoints < reward.points}
                            >
                              {!reward.isAvailable || userData.rewardPoints < reward.points ? 
                                'Not Available' : 'Redeem Reward'}
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
                
                <div className="text-center mt-8">
                  <Link to="/games">
                    <Button variant="outline" className="mx-auto">
                      Play Games to Earn More Points
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>
              
              <TabsContent value="orders">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
                    
                    {orders.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">You haven't placed any orders yet.</p>
                        <Button className="mt-4">Browse Restaurants</Button>
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Restaurant</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">{order.id}</TableCell>
                              <TableCell>{order.date}</TableCell>
                              <TableCell>{order.restaurant}</TableCell>
                              <TableCell>${order.total.toFixed(2)}</TableCell>
                              <TableCell>
                                <Badge 
                                  variant="outline"
                                  className={`
                                    ${order.status === 'Delivered' ? 'bg-green-50 text-green-600 border-green-200' : ''}
                                    ${order.status === 'Processing' ? 'bg-blue-50 text-blue-600 border-blue-200' : ''}
                                    ${order.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-200' : ''}
                                  `}
                                >
                                  {order.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                    
                    <div className="mt-6 text-center">
                      <Button variant="outline">View All Orders</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="games">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Game Statistics</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500 mb-1">Games Played</p>
                        <p className="text-3xl font-bold">15</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500 mb-1">Points Earned</p>
                        <p className="text-3xl font-bold">450</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500 mb-1">Highest Score</p>
                        <p className="text-3xl font-bold">285</p>
                      </div>
                    </div>
                    
                    <h4 className="font-medium mb-3">Game Breakdown</h4>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Game</TableHead>
                          <TableHead>Times Played</TableHead>
                          <TableHead>High Score</TableHead>
                          <TableHead>Points Earned</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Food Runner</TableCell>
                          <TableCell>8</TableCell>
                          <TableCell>285</TableCell>
                          <TableCell>240</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Burger Stack</TableCell>
                          <TableCell>5</TableCell>
                          <TableCell>190</TableCell>
                          <TableCell>150</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Pizza Flip</TableCell>
                          <TableCell>2</TableCell>
                          <TableCell>120</TableCell>
                          <TableCell>60</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    
                    <div className="mt-6 text-center">
                      <Link to="/games">
                        <Button>
                          Play More Games
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Leaderboard Ranking</h3>
                      <Badge className="bg-brand-purple text-white">#4</Badge>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Rank</TableHead>
                          <TableHead>Player</TableHead>
                          <TableHead>Points</TableHead>
                          <TableHead>Highest Score</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <div className="w-6 h-6 rounded-full bg-brand-purple text-white flex items-center justify-center text-xs">
                              1
                            </div>
                          </TableCell>
                          <TableCell>Alex S.</TableCell>
                          <TableCell>1,250</TableCell>
                          <TableCell>342</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs">
                              2
                            </div>
                          </TableCell>
                          <TableCell>Jamie T.</TableCell>
                          <TableCell>980</TableCell>
                          <TableCell>315</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs">
                              3
                            </div>
                          </TableCell>
                          <TableCell>Riley K.</TableCell>
                          <TableCell>805</TableCell>
                          <TableCell>290</TableCell>
                        </TableRow>
                        <TableRow className="bg-gray-50">
                          <TableCell>
                            <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs">
                              4
                            </div>
                          </TableCell>
                          <TableCell>You</TableCell>
                          <TableCell>750</TableCell>
                          <TableCell>285</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-900 text-white py-10 mt-16">
        {/* Keep the same footer content as Index page */}
      </footer>
    </div>
  );
};

export default ProfilePage;
