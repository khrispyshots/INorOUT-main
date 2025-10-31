import { Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { FLOW_NETWORK } from "../lib/flow-config";

export function WalletInfo() {
  return (
    <Alert className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
      <Info className="h-4 w-4" />
      <AlertTitle>Flow Wallet Required</AlertTitle>
      <AlertDescription>
        <p className="mb-2">
          InOrOut uses Flow blockchain wallets. When you click "Connect Wallet", you'll see available wallet options.
        </p>
        <p className="mb-2">
          <strong>Supported wallets:</strong> Blocto, Flow Wallet (Lilico), Dapper, and more.
        </p>
        <p className="text-xs text-gray-500">
          Currently connected to: <span className="capitalize font-medium">{FLOW_NETWORK}</span>
        </p>
      </AlertDescription>
    </Alert>
  );
}
