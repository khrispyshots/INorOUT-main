import { useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Trophy, TrendingUp, Target, Award } from "lucide-react";
import { useWallet } from "../hooks/useWallet";
import { NetworkSwitcher } from "./NetworkSwitcher";

interface GameHistory {
  poolId: number;
  side: "IN" | "OUT";
  result: "Win" | "Lost";
  points: number;
  date: string;
}

interface ProfileProps {
  navigate: (path: string) => void;
}

export function Profile({ navigate }: ProfileProps) {
  const { walletAddress, balance, walletConnected } = useWallet();

  // Redirect to landing if wallet is not connected
  useEffect(() => {
    if (!walletConnected) {
      navigate("/");
    }
  }, [walletConnected, navigate]);
  const stats = {
    totalGames: 47,
    totalWins: 28,
    totalPoints: 1420,
    winRate: 59.6,
  };

  const gameHistory: GameHistory[] = [
    { poolId: 25, side: "IN", result: "Win", points: 50, date: "2025-10-27" },
    { poolId: 24, side: "OUT", result: "Win", points: 45, date: "2025-10-27" },
    { poolId: 23, side: "IN", result: "Lost", points: 5, date: "2025-10-26" },
    { poolId: 22, side: "OUT", result: "Win", points: 38, date: "2025-10-26" },
    { poolId: 21, side: "IN", result: "Lost", points: 5, date: "2025-10-25" },
    { poolId: 20, side: "OUT", result: "Win", points: 42, date: "2025-10-25" },
  ];

  return (
    <div className="relative min-h-[calc(100vh-140px)] px-4 py-8 sm:px-6 sm:py-12">
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015]">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 sm:mb-12">
          <h1 className="mb-2 bg-gradient-to-b from-black to-gray-600 bg-clip-text text-4xl text-transparent sm:mb-3 sm:text-6xl">
            Profile
          </h1>
          <p className="text-lg text-gray-500 sm:text-xl">Your journey so far</p>
        </div>

        <div className="mb-8 grid gap-6 sm:mb-10 sm:gap-8 lg:grid-cols-3">
          {/* Wallet Info */}
          <Card className="rounded-xl border-2 border-black bg-gradient-to-b from-white to-gray-50 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:rounded-2xl sm:p-8">
            <div className="mb-6 flex items-center gap-3 sm:mb-8 sm:gap-5">
              <Avatar className="h-16 w-16 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:h-20 sm:w-20">
                <AvatarFallback className="bg-gradient-to-br from-gray-100 to-white text-lg sm:text-xl">
                  {walletAddress.slice(2, 4).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <div className="mb-1 text-[10px] tracking-wide text-gray-500 sm:mb-2 sm:text-xs">WALLET ADDRESS</div>
                <div className="truncate text-sm sm:break-all sm:text-lg">{walletAddress}</div>
              </div>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between rounded-xl border-2 border-black bg-white p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] sm:p-4">
                <span className="text-sm text-gray-600 sm:text-base">Balance</span>
                <span className="sm:text-lg">{balance} FLOW</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border-2 border-black bg-white p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] sm:p-4">
                <span className="text-sm text-gray-600 sm:text-base">Network</span>
                <span className="sm:text-lg">Flow EVM</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border-2 border-black bg-white p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] sm:p-4">
                <span className="text-sm text-gray-600 sm:text-base">Joined</span>
                <span className="sm:text-lg">Oct 2025</span>
              </div>
            </div>
          </Card>

          {/* Stats Grid */}
          <Card className="lg:col-span-2 rounded-xl border-2 border-black bg-gradient-to-b from-white to-gray-50 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:rounded-2xl sm:p-8">
            <div className="mb-5 flex items-center gap-2 sm:mb-8 sm:gap-3">
              <Trophy className="h-5 w-5 sm:h-6 sm:w-6" />
              <h3 className="text-xl sm:text-2xl">Statistics</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
              <div className="rounded-xl border-2 border-black bg-white p-4 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] sm:rounded-2xl sm:p-6">
                <div className="mb-2 flex items-center justify-center sm:mb-3">
                  <Target className="h-5 w-5 text-gray-600 sm:h-6 sm:w-6" />
                </div>
                <div className="mb-1 text-2xl sm:mb-2 sm:text-4xl">{stats.totalGames}</div>
                <div className="text-[10px] tracking-wide text-gray-500 sm:text-xs">GAMES</div>
              </div>
              <div className="rounded-xl border-2 border-green-500 bg-gradient-to-b from-green-50 to-white p-4 text-center sm:rounded-2xl sm:p-6">
                <div className="mb-2 flex items-center justify-center sm:mb-3">
                  <Award className="h-5 w-5 text-green-600 sm:h-6 sm:w-6" />
                </div>
                <div className="mb-1 text-2xl text-green-700 sm:mb-2 sm:text-4xl">{stats.totalWins}</div>
                <div className="text-[10px] tracking-wide text-gray-500 sm:text-xs">WINS</div>
              </div>
              <div className="rounded-xl border-2 border-black bg-white p-4 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] sm:rounded-2xl sm:p-6">
                <div className="mb-2 flex items-center justify-center sm:mb-3">
                  <TrendingUp className="h-5 w-5 text-gray-600 sm:h-6 sm:w-6" />
                </div>
                <div className="mb-1 text-2xl sm:mb-2 sm:text-4xl">
                  {stats.totalPoints}
                </div>
                <div className="text-[10px] tracking-wide text-gray-500 sm:text-xs">POINTS</div>
              </div>
              <div className="rounded-xl border-2 border-black bg-white p-4 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] sm:rounded-2xl sm:p-6">
                <div className="mb-2 flex items-center justify-center sm:mb-3">
                  <Trophy className="h-5 w-5 text-gray-600 sm:h-6 sm:w-6" />
                </div>
                <div className="mb-1 text-2xl sm:mb-2 sm:text-4xl">{stats.winRate}%</div>
                <div className="text-[10px] tracking-wide text-gray-500 sm:text-xs">WIN RATE</div>
              </div>
            </div>
          </Card>
        </div>

        {/* History */}
        <Card className="overflow-hidden rounded-xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:rounded-2xl sm:p-8 sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="mb-5 flex items-center gap-2 sm:mb-8 sm:gap-3">
            <Target className="h-5 w-5 sm:h-6 sm:w-6" />
            <h3 className="text-xl sm:text-2xl">Recent Games</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gradient-to-b from-gray-50 to-white">
                  <th className="p-3 text-left text-sm text-gray-600 sm:p-5 sm:text-base">Pool</th>
                  <th className="p-3 text-left text-sm text-gray-600 sm:p-5 sm:text-base">Side</th>
                  <th className="p-3 text-left text-sm text-gray-600 sm:p-5 sm:text-base">Result</th>
                  <th className="hidden p-3 text-left text-sm text-gray-600 sm:table-cell sm:p-5 sm:text-base">Points</th>
                  <th className="hidden p-3 text-left text-sm text-gray-600 md:table-cell sm:p-5 sm:text-base">Date</th>
                </tr>
              </thead>
              <tbody>
                {gameHistory.map((game, index) => (
                  <tr key={game.poolId} className={`border-t-2 border-gray-100 transition-colors hover:bg-gray-50 ${
                    index % 2 === 1 ? "bg-gray-50/30" : ""
                  }`}>
                    <td className="p-3 sm:p-5">
                      <a 
                        href={`/pool/${game.poolId}`}
                        className="transition-colors hover:text-blue-600 hover:underline sm:text-lg"
                      >
                        #{game.poolId}
                      </a>
                    </td>
                    <td className="p-3 sm:p-5">
                      <Badge
                        className={
                          game.side === "IN"
                            ? "border-2 border-green-500 bg-green-50 text-green-700"
                            : "border-2 border-red-500 bg-red-50 text-red-700"
                        }
                      >
                        {game.side}
                      </Badge>
                    </td>
                    <td className="p-3 sm:p-5">
                      <Badge
                        className={
                          game.result === "Win"
                            ? "border-2 border-green-500 bg-green-50 text-green-700"
                            : "border-2 border-gray-400 bg-gray-50 text-gray-700"
                        }
                      >
                        {game.result}
                      </Badge>
                    </td>
                    <td className="hidden p-3 sm:table-cell sm:p-5">
                      <div className="flex items-center gap-2 sm:text-lg">
                        <TrendingUp className="h-4 w-4 text-gray-600 sm:h-5 sm:w-5" />
                        <span>{game.points}</span>
                      </div>
                    </td>
                    <td className="hidden p-3 text-gray-500 md:table-cell sm:p-5">{game.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Network Switcher */}
        <div className="mt-8 sm:mt-10">
          <NetworkSwitcher />
        </div>
      </div>
    </div>
  );
}
