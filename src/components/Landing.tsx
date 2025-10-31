import { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { Wallet, ArrowRight, Zap } from "lucide-react";
import { useWallet } from "../hooks/useWallet";
import logoImage from "figma:asset/290da8987c9026f76a099f1ba7c8d1651478df93.png";

interface LandingProps {
  navigate: (path: string) => void;
}

export function Landing({ navigate }: LandingProps) {
  const { connectWallet, isConnecting, walletConnected } = useWallet();
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 30, seconds: 0 });
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleConnect = useCallback(async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.log('Wallet connection failed');
    }
  }, [connectWallet]);

  // Navigate to dashboard when wallet is successfully connected (only once)
  useEffect(() => {
    if (walletConnected && !hasNavigated) {
      setHasNavigated(true);
      navigate("/dashboard");
    }
  }, [walletConnected, hasNavigated, navigate]);

  return (
    <div className="relative min-h-[calc(100vh-140px)] overflow-hidden px-4 py-10 sm:px-6 sm:py-20">
      {/* Animated background grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Floating shapes - hide on mobile */}
      <div className="pointer-events-none absolute left-10 top-20 hidden h-32 w-32 rounded-full border-2 border-black opacity-5 md:block" />
      <div className="pointer-events-none absolute right-20 top-40 hidden h-24 w-24 rotate-45 border-2 border-black opacity-5 md:block" />
      <div className="pointer-events-none absolute bottom-40 left-1/4 hidden h-40 w-40 rounded-full border-2 border-black opacity-5 md:block" />
      
      <div className="relative mx-auto max-w-5xl text-center">
        {/* Logo with animation */}
        <div className="mb-8 flex justify-center sm:mb-12">
          <div className="group flex h-20 w-20 items-center justify-center rounded-2xl border-3 border-black bg-white p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:h-28 sm:w-28 sm:p-4 sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <img src={logoImage} alt="InOrOut" className="h-full w-full object-contain transition-transform group-hover:scale-110" />
          </div>
        </div>
        
        {/* Title with better typography */}
        <div className="mb-4 sm:mb-6">
          <h1 className="mb-3 bg-gradient-to-b from-black to-gray-600 bg-clip-text text-5xl tracking-tighter text-transparent sm:mb-4 sm:text-8xl">
            InOrOut
          </h1>
          <div className="mx-auto mb-3 h-1 w-16 bg-black sm:mb-4 sm:w-24"></div>
        </div>
        
        <p className="mb-10 px-4 text-lg tracking-tight text-gray-500 sm:mb-20 sm:text-2xl">
          Pick a side. Win big. Simple as that.
        </p>
        
        {/* Enhanced countdown with better design */}
        <div className="mb-10 overflow-hidden rounded-2xl border-2 border-black bg-gradient-to-b from-white to-gray-50 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:mb-16 sm:rounded-3xl sm:p-10 sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="mb-5 flex items-center justify-center gap-2 text-xs text-gray-500 sm:mb-8 sm:text-base">
            <Zap className="h-4 w-4 animate-pulse sm:h-5 sm:w-5" />
            <span className="tracking-wide">NEXT ROUND STARTS IN</span>
          </div>
          <div className="flex items-center justify-center gap-3 sm:gap-8">
            <div className="flex flex-col items-center">
              <div className="relative mb-2 sm:mb-3">
                <div className="absolute inset-0 rounded-xl bg-black opacity-5 blur-lg sm:rounded-2xl"></div>
                <div className="relative flex h-16 w-16 items-center justify-center rounded-xl border-2 border-black bg-white text-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:h-28 sm:w-28 sm:rounded-2xl sm:text-5xl sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
              </div>
              <div className="text-[10px] tracking-widest text-gray-400 sm:text-xs">HOURS</div>
            </div>
            <div className="text-2xl text-gray-300 sm:text-4xl">:</div>
            <div className="flex flex-col items-center">
              <div className="relative mb-2 sm:mb-3">
                <div className="absolute inset-0 rounded-xl bg-black opacity-5 blur-lg sm:rounded-2xl"></div>
                <div className="relative flex h-16 w-16 items-center justify-center rounded-xl border-2 border-black bg-white text-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:h-28 sm:w-28 sm:rounded-2xl sm:text-5xl sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
              </div>
              <div className="text-[10px] tracking-widest text-gray-400 sm:text-xs">MINUTES</div>
            </div>
            <div className="text-2xl text-gray-300 sm:text-4xl">:</div>
            <div className="flex flex-col items-center">
              <div className="relative mb-2 sm:mb-3">
                <div className="absolute inset-0 rounded-xl bg-black opacity-5 blur-lg sm:rounded-2xl"></div>
                <div className="relative flex h-16 w-16 items-center justify-center rounded-xl border-2 border-black bg-white text-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:h-28 sm:w-28 sm:rounded-2xl sm:text-5xl sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
              </div>
              <div className="text-[10px] tracking-widest text-gray-400 sm:text-xs">SECONDS</div>
            </div>
          </div>
        </div>
        
        {/* Enhanced CTA button */}
        <Button 
          onClick={handleConnect}
          disabled={isConnecting}
          size="lg"
          className="group h-14 gap-2 rounded-xl px-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:h-16 sm:gap-3 sm:rounded-2xl sm:px-12 sm:text-lg sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        >
          <Wallet className="h-4 w-4 sm:h-5 sm:w-5" />
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" />
        </Button>
        
        {/* Trust indicators */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 text-xs text-gray-400 sm:mt-16 sm:flex-row sm:gap-8 sm:text-sm">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span>Flow Blockchain</span>
          </div>
          <div className="hidden h-4 w-px bg-gray-300 sm:block"></div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <span>Fully Decentralized</span>
          </div>
          <div className="hidden h-4 w-px bg-gray-300 sm:block"></div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-purple-500"></div>
            <span>Provably Fair</span>
          </div>
        </div>
      </div>
    </div>
  );
}
