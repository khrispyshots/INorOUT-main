import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Clock, Users, Coins } from "lucide-react";
import { useWallet } from "../hooks/useWallet";

interface Pool {
  id: number;
  minEntry: number;
  timeLeft: string;
  participants: number;
  status: "Active" | "Ongoing" | "Closed";
  totalPot: number;
}

interface DashboardProps {
  navigate: (path: string) => void;
}

export function Dashboard({ navigate }: DashboardProps) {
  const { walletConnected } = useWallet();
  const [activeTab, setActiveTab] = useState<"active" | "ongoing" | "closed">("active");

  // Redirect to landing if wallet is not connected
  useEffect(() => {
    if (!walletConnected) {
      navigate("/");
    }
  }, [walletConnected, navigate]);

  const [activePools] = useState<Pool[]>([
    { id: 28, minEntry: 5, timeLeft: "1m 0s", participants: 42, status: "Active", totalPot: 210 },
    { id: 29, minEntry: 10, timeLeft: "0m 45s", participants: 38, status: "Active", totalPot: 380 },
    { id: 30, minEntry: 2, timeLeft: "0m 30s", participants: 95, status: "Active", totalPot: 190 },
  ]);

  const [ongoingPools] = useState<Pool[]>([
    { id: 27, minEntry: 5, timeLeft: "In Progress", participants: 56, status: "Ongoing", totalPot: 280 },
    { id: 26, minEntry: 10, timeLeft: "In Progress", participants: 44, status: "Ongoing", totalPot: 440 },
  ]);

  const [closedPools] = useState<Pool[]>([
    { id: 25, minEntry: 5, timeLeft: "Ended", participants: 62, status: "Closed", totalPot: 310 },
    { id: 24, minEntry: 10, timeLeft: "Ended", participants: 51, status: "Closed", totalPot: 510 },
    { id: 23, minEntry: 2, timeLeft: "Ended", participants: 102, status: "Closed", totalPot: 204 },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "border-2 border-green-500 bg-green-50 text-green-700";
      case "Ongoing":
        return "border-2 border-blue-500 bg-blue-50 text-blue-700";
      case "Closed":
        return "border-2 border-gray-400 bg-gray-50 text-gray-700";
      default:
        return "";
    }
  };

  const PoolCard = ({ pool }: { pool: Pool }) => (
    <Card className="group relative overflow-hidden rounded-2xl border-2 border-black bg-gradient-to-b from-white to-gray-50 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 sm:p-6">
      {/* Decorative corner */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full border-2 border-black opacity-5"></div>
      
      <div className="relative mb-4 flex items-center justify-between sm:mb-6">
        <span className="text-2xl sm:text-3xl">#{pool.id}</span>
        <Badge className={getStatusColor(pool.status)}>{pool.status}</Badge>
      </div>
      
      <div className="relative mb-4 space-y-2 sm:mb-6 sm:space-y-3">
        <div className="flex items-center justify-between rounded-xl border-2 border-black bg-white p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] sm:p-4">
          <span className="flex items-center gap-2 text-sm text-gray-500 sm:text-base">
            <Coins className="h-4 w-4" />
            Min Entry
          </span>
          <span className="sm:text-lg">
            {pool.minEntry} FLOW
          </span>
        </div>
        
        <div className="flex items-center justify-between rounded-xl border-2 border-black bg-white p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] sm:p-4">
          <span className="flex items-center gap-2 text-sm text-gray-500 sm:text-base">
            <Users className="h-4 w-4" />
            Players
          </span>
          <span className="sm:text-lg">{pool.participants}</span>
        </div>
        
        <div className="flex items-center justify-between rounded-xl border-2 border-black bg-white p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] sm:p-4">
          <span className="flex items-center gap-2 text-sm text-gray-500 sm:text-base">
            <Clock className="h-4 w-4" />
            Time
          </span>
          <span className="sm:text-lg">{pool.timeLeft}</span>
        </div>
      </div>
      
      <Button 
        className="relative w-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
        onClick={() => navigate(`/pool/${pool.id}`)}
        disabled={pool.status === "Closed"}
      >
        {pool.status === "Active" ? "Commit FLOW" : pool.status === "Ongoing" ? "View" : "Results"}
      </Button>
    </Card>
  );

  const pools = activeTab === "active" ? activePools : activeTab === "ongoing" ? ongoingPools : closedPools;

  return (
    <div className="relative min-h-[calc(100vh-140px)] px-4 py-8 sm:px-6 sm:py-12">
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015]">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-12">
          <h1 className="mb-2 bg-gradient-to-b from-black to-gray-600 bg-clip-text text-4xl text-transparent sm:mb-3 sm:text-6xl">
            Pools
          </h1>
          <p className="text-lg text-gray-500 sm:text-xl">Commit and see if luck is on your side</p>
        </div>

        {/* Enhanced tabs */}
        <div className="mb-8 flex w-full gap-1.5 overflow-x-auto rounded-xl border-2 border-black bg-gradient-to-b from-white to-gray-50 p-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:mb-12 sm:inline-flex sm:w-auto sm:gap-2 sm:rounded-2xl sm:p-2">
          <button
            onClick={() => setActiveTab("active")}
            className={`shrink-0 rounded-lg px-6 py-3 text-sm transition-all sm:rounded-xl sm:px-8 sm:py-4 sm:text-base ${
              activeTab === "active"
                ? "border-2 border-black bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                : "text-gray-600 hover:bg-white hover:text-black"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveTab("ongoing")}
            className={`shrink-0 rounded-lg px-6 py-3 text-sm transition-all sm:rounded-xl sm:px-8 sm:py-4 sm:text-base ${
              activeTab === "ongoing"
                ? "border-2 border-black bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                : "text-gray-600 hover:bg-white hover:text-black"
            }`}
          >
            Ongoing
          </button>
          <button
            onClick={() => setActiveTab("closed")}
            className={`shrink-0 rounded-lg px-6 py-3 text-sm transition-all sm:rounded-xl sm:px-8 sm:py-4 sm:text-base ${
              activeTab === "closed"
                ? "border-2 border-black bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                : "text-gray-600 hover:bg-white hover:text-black"
            }`}
          >
            Closed
          </button>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pools.map(pool => (
            <PoolCard key={pool.id} pool={pool} />
          ))}
        </div>
      </div>
    </div>
  );
}
