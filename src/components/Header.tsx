import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Wallet, LogOut, Copy, Check, ExternalLink } from "lucide-react";
import { useWallet } from "../hooks/useWallet";
import { useState } from "react";
import logoImage from "figma:asset/290da8987c9026f76a099f1ba7c8d1651478df93.png";
import { FLOW_NETWORK } from "../lib/flow-config";
import { formatFlowAddress, getBlockExplorerUrl } from "../lib/flow-utils";

interface HeaderProps {
  currentPage: string;
  navigate: (path: string) => void;
}

export function Header({ currentPage, navigate }: HeaderProps) {
  const { walletConnected, walletAddress, balance, connectWallet, disconnectWallet, isConnecting } = useWallet();
  const [copied, setCopied] = useState(false);
  
  const handleConnectWallet = async () => {
    await connectWallet();
  };

  const handleDisconnect = () => {
    disconnectWallet();
    navigate("/");
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-50 border-b-2 border-black bg-white/80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center justify-between">
          <a href="/" className="group flex items-center gap-2 transition-all sm:gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-white p-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:h-12 sm:w-12 sm:p-2">
              <img src={logoImage} alt="InOrOut" className="h-full w-full object-contain transition-transform group-hover:scale-110" />
            </div>
            <span className="text-xl tracking-tight sm:text-2xl">
              InOrOut
            </span>
          </a>
          
          <div className="flex items-center gap-3 sm:gap-8">
            {walletConnected && (
              <nav className="flex items-center gap-3 text-sm sm:gap-8 sm:text-base">
                <a href="/dashboard" className="relative text-gray-600 transition-colors hover:text-black after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-black after:transition-all hover:after:w-full">
                  Pools
                </a>
                <a href="/explorer" className="hidden text-gray-600 transition-colors hover:text-black after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-black after:transition-all hover:after:w-full sm:block">
                  History
                </a>
                <a href="/profile" className="relative text-gray-600 transition-colors hover:text-black after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-black after:transition-all hover:after:w-full">
                  Profile
                </a>
              </nav>
            )}
            
            {currentPage !== "landing" && (
              <>
                {!walletConnected ? (
                  <Button 
                    onClick={handleConnectWallet}
                    disabled={isConnecting}
                    className="h-9 gap-2 text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:h-10"
                  >
                    <Wallet className="h-4 w-4" />
                    <span className="hidden sm:inline">{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
                    <span className="sm:hidden">{isConnecting ? '...' : 'Connect'}</span>
                  </Button>
                ) : (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline"
                        className="h-9 gap-2 text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:h-10"
                      >
                        <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                        <span className="hidden sm:inline">{formatFlowAddress(walletAddress)}</span>
                        <span className="sm:hidden">{walletAddress.slice(0, 6)}...</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <div className="space-y-4">
                        <div>
                          <p className="mb-1 text-xs text-gray-500">Wallet Address</p>
                          <div className="flex items-center gap-2">
                            <p className="text-sm">{formatFlowAddress(walletAddress)}</p>
                            <button
                              onClick={copyAddress}
                              className="rounded p-1 hover:bg-gray-100 transition-colors"
                              title="Copy address"
                            >
                              {copied ? (
                                <Check className="h-4 w-4 text-green-600" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </button>
                            <a
                              href={getBlockExplorerUrl(walletAddress, FLOW_NETWORK)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded p-1 hover:bg-gray-100 transition-colors"
                              title="View on Flowscan"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                        </div>
                        
                        <div className="border-t-2 border-black pt-3">
                          <p className="mb-1 text-xs text-gray-500">Balance</p>
                          <p className="text-lg">{balance} FLOW</p>
                        </div>

                        <div className="border-t-2 border-black pt-3">
                          <p className="mb-1 text-xs text-gray-500">Network</p>
                          <div className="flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full ${FLOW_NETWORK === 'mainnet' ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
                            <p className="text-sm capitalize">{FLOW_NETWORK}</p>
                          </div>
                        </div>

                        <Button
                          onClick={handleDisconnect}
                          variant="outline"
                          className="w-full gap-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                        >
                          <LogOut className="h-4 w-4" />
                          Disconnect
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
