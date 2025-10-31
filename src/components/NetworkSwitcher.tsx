import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Network, Plus, ExternalLink } from "lucide-react";
import { toast } from "../lib/toast";

export function NetworkSwitcher() {
  const addFlowMainnet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x2eb', // 747 in hex
            chainName: 'Flow EVM Mainnet',
            nativeCurrency: {
              name: 'Flow',
              symbol: 'FLOW',
              decimals: 18,
            },
            rpcUrls: ['https://mainnet.evm.nodes.onflow.org'],
            blockExplorerUrls: ['https://evm.flowscan.io'],
          }],
        });
        toast.success('Flow Mainnet added successfully!');
      } catch (error: any) {
        console.error('Error adding Flow Mainnet:', error);
        if (error.code === 4001) {
          toast.error('Request rejected', {
            description: 'You cancelled the network addition.',
          });
        } else {
          toast.error('Failed to add network', {
            description: 'Please try again.',
          });
        }
      }
    } else {
      toast.error('Wallet not found', {
        description: 'Please install MetaMask or another Web3 wallet.',
      });
    }
  };

  const addFlowTestnet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x221', // 545 in hex
            chainName: 'Flow EVM Testnet',
            nativeCurrency: {
              name: 'Flow',
              symbol: 'FLOW',
              decimals: 18,
            },
            rpcUrls: ['https://testnet.evm.nodes.onflow.org'],
            blockExplorerUrls: ['https://evm-testnet.flowscan.io'],
          }],
        });
        toast.success('Flow Testnet added successfully!');
      } catch (error: any) {
        console.error('Error adding Flow Testnet:', error);
        if (error.code === 4001) {
          toast.error('Request rejected', {
            description: 'You cancelled the network addition.',
          });
        } else {
          toast.error('Failed to add network', {
            description: 'Please try again.',
          });
        }
      }
    } else {
      toast.error('Wallet not found', {
        description: 'Please install MetaMask or another Web3 wallet.',
      });
    }
  };

  return (
    <Card className="rounded-xl border-2 border-black bg-gradient-to-b from-white to-gray-50 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg border-2 border-black bg-white p-2">
          <Network className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg">Add Flow Networks</h3>
          <p className="text-sm text-gray-500">Add Flow EVM to your wallet</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border-2 border-black bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span>Flow EVM Mainnet</span>
                <Badge variant="outline" className="border-green-500 text-green-700">Live</Badge>
              </div>
              <p className="text-xs text-gray-500">Chain ID: 747</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={addFlowMainnet}
              size="sm"
              className="flex-1 gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              <Plus className="h-4 w-4" />
              Add to Wallet
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              <a href="https://evm.flowscan.io" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="rounded-lg border-2 border-black bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span>Flow EVM Testnet</span>
                <Badge variant="outline" className="border-orange-500 text-orange-700">Test</Badge>
              </div>
              <p className="text-xs text-gray-500">Chain ID: 545</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={addFlowTestnet}
              size="sm"
              className="flex-1 gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              <Plus className="h-4 w-4" />
              Add to Wallet
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              <a href="https://evm-testnet.flowscan.io" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-gray-100 p-3">
        <p className="text-xs text-gray-600">
          <strong>Note:</strong> Make sure you have MetaMask or another Web3 wallet installed. 
          Clicking "Add to Wallet" will prompt your wallet to add the Flow network.
        </p>
      </div>
    </Card>
  );
}
