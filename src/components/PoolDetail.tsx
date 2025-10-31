import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "./ui/alert-dialog";
import { Clock, Users, ArrowLeft, TrendingUp, Trophy, Coins, DollarSign } from "lucide-react";
import { useWallet } from "../hooks/useWallet";
import { formatFlowAddress } from "../lib/flow-utils";

interface PoolDetailProps {
  navigate: (path: string) => void;
}

interface Participant {
  wallet: string;
  amount: number;
}

export function PoolDetail({ navigate }: PoolDetailProps) {
  const { walletConnected, balance, walletAddress } = useWallet();
  const [commitAmount, setCommitAmount] = useState("");
  const [timeLeft, setTimeLeft] = useState({ minutes: 1, seconds: 0 });
  const [hasJoined, setHasJoined] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [winner, setWinner] = useState<{ wallet: string; amount: number } | null>(null);
  const [allParticipants, setAllParticipants] = useState<Participant[]>([]);
  const [isWinner, setIsWinner] = useState(false);

  // Redirect to landing if wallet is not connected
  useEffect(() => {
    if (!walletConnected) {
      navigate("/");
    }
  }, [walletConnected, navigate]);

  // Mock participants
  const participants: Participant[] = [
    { wallet: "0x1234567890abcdef", amount: 10 },
    { wallet: "0x2345678901bcdefg", amount: 5 },
    { wallet: "0x3456789012cdefgh", amount: 15 },
    { wallet: "0x4567890123defghi", amount: 8 },
    { wallet: "0x5678901234efghij", amount: 12 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          // Epoch ended - select winner
          if (hasJoined) {
            selectWinner();
          }
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasJoined]);

  const selectWinner = () => {
    // Show analyzing phase
    setShowResultDialog(true);
    setIsAnalyzing(true);
    
    // After 5 seconds, show results
    setTimeout(() => {
      // Add current user to participants list
      const allParts = [...participants, { wallet: walletAddress, amount: parseFloat(commitAmount) }];
      
      // Randomly select a winner
      const randomIndex = Math.floor(Math.random() * allParts.length);
      const selectedWinner = allParts[randomIndex];
      
      // Calculate total pot (sum of all participants' amounts)
      const totalPot = allParts.reduce((sum, p) => sum + p.amount, 0);
      
      setWinner({ wallet: selectedWinner.wallet, amount: totalPot });
      setIsWinner(selectedWinner.wallet === walletAddress);
      setAllParticipants(allParts);
      setIsAnalyzing(false);
      
      // After 15 seconds, redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 15000);
    }, 5000);
  };

  const handleJoinPool = () => {
    const amount = parseFloat(commitAmount);
    if (amount >= poolData.minEntry && amount <= parseFloat(balance)) {
      setHasJoined(true);
    }
  };

  const poolData = {
    id: 28,
    minEntry: 5,
    totalPot: 210,
    participants: 42,
  };

  const isValidAmount = () => {
    const amount = parseFloat(commitAmount);
    return !isNaN(amount) && amount >= poolData.minEntry && amount <= parseFloat(balance);
  };

  return (
    <div className="relative min-h-[calc(100vh-140px)] bg-white px-4 py-6 sm:px-6 sm:py-8">
      {/* Subtle pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 4px)',
        }} />
      </div>
      
      <div className="relative mx-auto max-w-6xl">
        <Button 
          variant="ghost" 
          className="mb-4 gap-2 text-gray-600 hover:text-black"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Pools
        </Button>

        {/* Pool Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <h1 className="text-4xl sm:text-5xl">Pool #{poolData.id}</h1>
              <Badge className="border-2 border-green-600 bg-green-50 px-3 py-1 text-green-700">
                LIVE
              </Badge>
            </div>
            <p className="text-gray-500">In or Out - Winner Takes All</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Timer & Stats */}
          <div className="space-y-6 lg:col-span-1">
            {/* Countdown Timer - Large and Prominent */}
            <Card className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="mb-3 text-center text-xs uppercase tracking-wider text-gray-500">
                Epoch Closes In
              </div>
              <div className="mb-6 flex items-center justify-center gap-2 text-center">
                <div className="flex flex-col">
                  <div className="rounded-lg border-2 border-black bg-gray-50 px-6 py-4 text-5xl tabular-nums">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="mt-2 text-xs text-gray-500">MIN</div>
                </div>
                <div className="text-4xl">:</div>
                <div className="flex flex-col">
                  <div className="rounded-lg border-2 border-black bg-gray-50 px-6 py-4 text-5xl tabular-nums">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="mt-2 text-xs text-gray-500">SEC</div>
                </div>
              </div>
            </Card>

            {/* Pool Statistics */}
            <Card className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="mb-4 text-sm uppercase tracking-wider text-gray-500">Pool Statistics</div>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4" />
                    Total Pot
                  </div>
                  <div className="text-xl">{poolData.totalPot} FLOW</div>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    Active Players
                  </div>
                  <div className="text-xl">{poolData.participants}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    Minimum Entry
                  </div>
                  <div className="text-xl">{poolData.minEntry} FLOW</div>
                </div>
              </div>
            </Card>

            {/* Odds Info */}
            <Card className="border-2 border-gray-300 bg-gradient-to-b from-gray-50 to-white p-4">
              <div className="space-y-2 text-center text-xs text-gray-600">
                <p>Every participant has an equal chance to win</p>
                <p className="text-gray-400">· Winner takes entire pot ·</p>
              </div>
            </Card>
          </div>

          {/* Right Column - Betting Interface */}
          <div className="lg:col-span-2">
            {!hasJoined ? (
              <Card className="border-2 border-black bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="mb-8 border-b-2 border-gray-200 pb-6">
                  <h2 className="mb-2 text-2xl">Place Your Bet</h2>
                  <p className="text-sm text-gray-600">
                    Enter your stake amount and join the pool
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Stake Input */}
                  <div>
                    <label className="mb-3 block text-sm uppercase tracking-wide text-gray-500">
                      Stake Amount
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={commitAmount}
                        onChange={(e) => setCommitAmount(e.target.value)}
                        placeholder="0.00"
                        min={poolData.minEntry}
                        step="0.01"
                        className="h-16 rounded-lg border-2 border-black pr-20 text-center text-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] focus-visible:ring-offset-0"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <span className="text-sm text-gray-400">FLOW</span>
                      </div>
                    </div>
                  </div>

                  {/* Balance Display */}
                  <div className="flex items-center justify-between rounded-lg border border-gray-300 bg-gray-50 p-4">
                    <span className="text-sm text-gray-600">Available Balance</span>
                    <span className="text-lg">{balance} FLOW</span>
                  </div>

                  {/* Quick Bet Buttons */}
                  <div>
                    <div className="mb-2 text-xs uppercase tracking-wide text-gray-500">Quick Select</div>
                    <div className="grid grid-cols-4 gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setCommitAmount(poolData.minEntry.toString())}
                        className="border-2 border-black py-6 hover:bg-black hover:text-white"
                      >
                        Min
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setCommitAmount((parseFloat(balance) * 0.25).toFixed(2))}
                        className="border-2 border-black py-6 hover:bg-black hover:text-white"
                      >
                        25%
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setCommitAmount((parseFloat(balance) * 0.5).toFixed(2))}
                        className="border-2 border-black py-6 hover:bg-black hover:text-white"
                      >
                        50%
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setCommitAmount(balance)}
                        className="border-2 border-black py-6 hover:bg-black hover:text-white"
                      >
                        Max
                      </Button>
                    </div>
                  </div>

                  {/* Potential Win Display */}
                  {commitAmount && isValidAmount() && (
                    <div className="rounded-lg border-2 border-green-600 bg-green-50 p-4">
                      <div className="mb-1 text-center text-xs uppercase tracking-wide text-green-700">
                        Potential Winnings
                      </div>
                      <div className="text-center text-3xl text-green-700">
                        {(poolData.totalPot + parseFloat(commitAmount)).toFixed(2)} FLOW
                      </div>
                      <div className="mt-2 text-center text-xs text-green-600">
                        If you win, you take the entire pot
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    onClick={handleJoinPool}
                    disabled={!isValidAmount()}
                    className="w-full rounded-lg border-2 border-black bg-black py-6 text-lg text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-gray-900 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:bg-gray-300 disabled:text-gray-500"
                  >
                    {isValidAmount() ? `Place Bet - ${commitAmount} FLOW` : "Enter Valid Amount"}
                  </Button>

                  {/* Rules */}
                  <div className="rounded-lg border border-gray-300 bg-gray-50 p-4">
                    <div className="mb-2 text-xs uppercase tracking-wide text-gray-500">How It Works</div>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li>• Place your stake before the countdown ends</li>
                      <li>• One random winner selected from all participants</li>
                      <li>• Winner receives the entire pot</li>
                      <li>• Losers receive $IOO tokens (1:1 with stake)</li>
                    </ul>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="border-2 border-black bg-gradient-to-b from-green-50 to-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-center">
                  <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-green-600 bg-green-100">
                    <Trophy className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-2xl text-green-700">Bet Placed Successfully</h3>
                  <p className="mb-8 text-gray-600">
                    You've committed <span className="text-lg">{commitAmount} FLOW</span> to this pool
                  </p>

                  <div className="mx-auto mb-8 max-w-sm rounded-xl border-2 border-black bg-white p-6">
                    <div className="mb-2 text-xs uppercase tracking-wider text-gray-500">
                      Waiting for Epoch to Close
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="rounded-lg bg-gray-100 px-4 py-2 text-3xl tabular-nums">
                        {String(timeLeft.minutes).padStart(2, '0')}
                      </div>
                      <div className="text-2xl">:</div>
                      <div className="rounded-lg bg-gray-100 px-4 py-2 text-3xl tabular-nums">
                        {String(timeLeft.seconds).padStart(2, '0')}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-green-300 bg-green-50/50 p-4">
                    <p className="text-sm text-gray-600">
                      Your result will be revealed when the countdown ends
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Result Dialog */}
      <AlertDialog open={showResultDialog} onOpenChange={() => {}}>
        <AlertDialogContent className="border-2 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] sm:max-w-3xl">
          {isAnalyzing ? (
            // Analyzing Phase
            <>
              <AlertDialogHeader>
                <AlertDialogTitle className="sr-only">Analyzing Results</AlertDialogTitle>
                <AlertDialogDescription className="sr-only">
                  Please wait while we randomly select the winner from all participants
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="py-12">
                <div className="mb-8 text-center text-6xl">⚖️</div>
                <h2 className="mb-4 text-center text-3xl">Drawing Winner</h2>
                <div className="mx-auto max-w-md">
                  <div className="mb-6 overflow-hidden rounded-lg border-2 border-gray-300 bg-gray-100">
                    <div className="h-2 bg-black" style={{ 
                      width: '60%',
                      transition: 'width 5s linear'
                    }}></div>
                  </div>
                  <p className="text-center text-sm text-gray-600">
                    Verifying {allParticipants.length > 0 ? allParticipants.length : participants.length + 1} participants...
                  </p>
                </div>
              </div>
            </>
          ) : (
            // Results Phase
            <>
              <AlertDialogHeader>
                <AlertDialogTitle className="sr-only">Results</AlertDialogTitle>
                <AlertDialogDescription className="sr-only">
                  The epoch has ended and results are now available. View the winner and all participant standings.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="py-6">
                {/* Winner Announcement */}
                <div className="mb-8 text-center">
                  <div className="mb-4 text-6xl">{isWinner ? '🏆' : '🎲'}</div>
                  <h2 className="mb-2 text-3xl">{isWinner ? 'Congratulations!' : 'Round Complete'}</h2>
                  <p className="text-gray-600">
                    {isWinner ? 'You won the pot!' : 'Better luck next time'}
                  </p>
                </div>

                {/* Winner Card */}
                <div className="mb-6 rounded-xl border-2 border-black bg-gradient-to-b from-yellow-50 to-white p-6">
                  <div className="mb-4 flex items-center justify-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    <span className="text-sm uppercase tracking-wider text-yellow-700">Winner</span>
                  </div>
                  <div className="mb-2 text-center text-xl">
                    {winner && formatFlowAddress(winner.wallet)}
                    {winner?.wallet === walletAddress && <span className="text-green-600"> (You!)</span>}
                  </div>
                  <div className="text-center text-4xl">
                    {winner && `${winner.amount.toFixed(2)} FLOW`}
                  </div>
                </div>

                {/* Other Participants - Losers Only */}
                <div className="mb-6 rounded-xl border-2 border-gray-300 bg-white p-6">
                  <div className="mb-4 flex items-center gap-2 border-b border-gray-200 pb-3">
                    <Users className="h-4 w-4 text-gray-600" />
                    <span className="text-sm uppercase tracking-wider text-gray-600">
                      Other Participants
                    </span>
                  </div>
                  <div className="max-h-64 space-y-2 overflow-y-auto">
                    {allParticipants
                      .filter(participant => participant.wallet !== winner?.wallet)
                      .map((participant, index) => {
                        const iooReward = participant.amount;
                        
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between rounded-lg border-2 border-gray-200 bg-gray-50 p-4"
                          >
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="text-sm">
                                  {formatFlowAddress(participant.wallet)}
                                  {participant.wallet === walletAddress && (
                                    <span className="ml-1 text-xs text-gray-500">(You)</span>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Staked: {participant.amount.toFixed(2)} FLOW
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 text-sm text-blue-600">
                                <Coins className="h-3 w-3" />
                                +{iooReward.toFixed(2)} $IOO
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Auto-redirect Notice */}
                <div className="rounded-lg border border-gray-300 bg-gray-50 p-4 text-center">
                  <div className="mb-1 text-xs uppercase tracking-wider text-gray-500">
                    Automatically Redirecting
                  </div>
                  <p className="text-sm text-gray-600">
                    Returning to pools in a moment...
                  </p>
                </div>
              </div>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
