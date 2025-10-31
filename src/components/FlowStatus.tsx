/**
 * FlowStatus Component
 * Displays current Flow blockchain connection status
 * Useful for debugging and development
 */

import { useWallet } from "../hooks/useWallet";
import { FLOW_NETWORK, getFlowConfig } from "../lib/flow-config";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

export function FlowStatus() {
  const { walletConnected, walletAddress, balance, isConnecting } = useWallet();
  const config = getFlowConfig();

  return (
    <Card className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Flow Blockchain Status
          {isConnecting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : walletConnected ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <XCircle className="h-4 w-4 text-gray-400" />
          )}
        </CardTitle>
        <CardDescription>
          Connection and network information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs text-gray-500 mb-1">Network</p>
            <Badge variant={FLOW_NETWORK === 'mainnet' ? 'default' : 'outline'}>
              {FLOW_NETWORK.toUpperCase()}
            </Badge>
          </div>
          
          <div>
            <p className="text-xs text-gray-500 mb-1">Connection</p>
            <Badge variant={walletConnected ? 'default' : 'outline'}>
              {walletConnected ? 'Connected' : 'Disconnected'}
            </Badge>
          </div>
          
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Access Node</p>
            <p className="text-xs break-all">{config.accessNode}</p>
          </div>
          
          {walletConnected && (
            <>
              <div className="col-span-2">
                <p className="text-xs text-gray-500 mb-1">Wallet Address</p>
                <p className="text-xs break-all font-mono">{walletAddress}</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-500 mb-1">Balance</p>
                <p className="font-medium">{balance} FLOW</p>
              </div>
            </>
          )}
        </div>
        
        <div className="pt-4 border-t-2 border-black">
          <p className="text-xs text-gray-500">
            Using Flow Client Library (FCL) for blockchain connectivity
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
