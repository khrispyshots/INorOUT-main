import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Search, ChevronDown, ChevronUp, Filter } from "lucide-react";
import { useWallet } from "../hooks/useWallet";

interface Epoch {
  id: number;
  winnerAddress: string;
  winningSide: "IN" | "OUT";
  totalPot: number;
  participants: number;
  timestamp: string;
}

interface ExplorerProps {
  navigate: (path: string) => void;
}

export function Explorer({ navigate }: ExplorerProps) {
  const { walletConnected } = useWallet();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Redirect to landing if wallet is not connected
  useEffect(() => {
    if (!walletConnected) {
      navigate("/");
    }
  }, [walletConnected, navigate]);

  const epochs: Epoch[] = [
    { id: 25, winnerAddress: "0x1234...5678", winningSide: "IN", totalPot: 310, participants: 62, timestamp: "2025-10-27 14:30" },
    { id: 24, winnerAddress: "0xabcd...ef01", winningSide: "OUT", totalPot: 510, participants: 51, timestamp: "2025-10-27 12:00" },
    { id: 23, winnerAddress: "0x9876...5432", winningSide: "IN", totalPot: 204, participants: 102, timestamp: "2025-10-27 09:30" },
    { id: 22, winnerAddress: "0x4567...89ab", winningSide: "OUT", totalPot: 380, participants: 38, timestamp: "2025-10-26 16:00" },
    { id: 21, winnerAddress: "0xdef0...1234", winningSide: "IN", totalPot: 250, participants: 50, timestamp: "2025-10-26 13:30" },
    { id: 20, winnerAddress: "0x7890...cdef", winningSide: "OUT", totalPot: 420, participants: 42, timestamp: "2025-10-26 11:00" },
    { id: 19, winnerAddress: "0x2345...6789", winningSide: "IN", totalPot: 315, participants: 63, timestamp: "2025-10-26 08:30" },
    { id: 18, winnerAddress: "0x5678...90ab", winningSide: "OUT", totalPot: 290, participants: 29, timestamp: "2025-10-25 18:00" },
  ];

  const filteredEpochs = epochs
    .filter(epoch => 
      epoch.id.toString().includes(searchTerm) || 
      epoch.winnerAddress.includes(searchTerm)
    )
    .sort((a, b) => sortOrder === "desc" ? b.id - a.id : a.id - b.id);

  const toggleSort = () => {
    setSortOrder(prev => prev === "desc" ? "asc" : "desc");
  };

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
            History
          </h1>
          <p className="text-lg text-gray-500 sm:text-xl">All completed rounds</p>
        </div>

        {/* Search */}
        <Card className="mb-6 rounded-xl border-2 border-black bg-gradient-to-b from-white to-gray-50 p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:mb-8 sm:rounded-2xl sm:p-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 sm:left-5 sm:h-5 sm:w-5" />
            <Input
              type="text"
              placeholder="Search by pool ID or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 rounded-xl border-2 border-black bg-white pl-10 placeholder:text-gray-400 sm:h-14 sm:pl-14 sm:text-lg"
            />
            <Filter className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 sm:right-5 sm:h-5 sm:w-5" />
          </div>
        </Card>

        {/* Table */}
        <Card className="overflow-hidden rounded-xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:rounded-2xl sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b-2 border-gray-200 bg-gradient-to-b from-gray-50 to-white">
                <tr>
                  <th className="p-3 text-left sm:p-5">
                    <button
                      onClick={toggleSort}
                      className="flex items-center gap-1 text-sm text-gray-600 transition-colors hover:text-black sm:gap-2 sm:text-base"
                    >
                      Pool
                      {sortOrder === "desc" ? (
                        <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                      ) : (
                        <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </button>
                  </th>
                  <th className="p-3 text-left text-sm text-gray-600 sm:p-5 sm:text-base">Winner</th>
                  <th className="p-3 text-left text-sm text-gray-600 sm:p-5 sm:text-base">Side</th>
                  <th className="hidden p-3 text-left text-sm text-gray-600 sm:table-cell sm:p-5 sm:text-base">Prize Pool</th>
                  <th className="hidden p-3 text-left text-sm text-gray-600 md:table-cell sm:p-5 sm:text-base">Players</th>
                  <th className="hidden p-3 text-left text-sm text-gray-600 lg:table-cell sm:p-5 sm:text-base">Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredEpochs.map((epoch, index) => (
                  <tr 
                    key={epoch.id} 
                    className={`border-t-2 border-gray-100 transition-colors hover:bg-gray-50 ${
                      index % 2 === 1 ? "bg-gray-50/30" : ""
                    }`}
                  >
                    <td className="p-3 sm:p-5">
                      <a 
                        href={`/pool/${epoch.id}`}
                        className="transition-colors hover:text-blue-600 hover:underline sm:text-lg"
                      >
                        #{epoch.id}
                      </a>
                    </td>
                    <td className="p-3 sm:p-5">
                      <code className="rounded-lg border-2 border-black bg-white px-2 py-1 text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)] sm:px-4 sm:py-2 sm:text-sm">
                        {epoch.winnerAddress}
                      </code>
                    </td>
                    <td className="p-3 sm:p-5">
                      <Badge
                        className={
                          epoch.winningSide === "IN"
                            ? "border-2 border-green-500 bg-green-50 text-green-700"
                            : "border-2 border-red-500 bg-red-50 text-red-700"
                        }
                      >
                        {epoch.winningSide}
                      </Badge>
                    </td>
                    <td className="hidden p-3 sm:table-cell sm:p-5 sm:text-lg">
                      {epoch.totalPot} FLOW
                    </td>
                    <td className="hidden p-3 md:table-cell sm:p-5 sm:text-lg">{epoch.participants}</td>
                    <td className="hidden p-3 text-gray-500 lg:table-cell sm:p-5">{epoch.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEpochs.length === 0 && (
            <div className="p-8 text-center text-gray-400 sm:p-16 sm:text-xl">
              No results found
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
