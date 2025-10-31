import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { toast } from '../lib/toast';
import { getFlowConfig, FLOW_NETWORK } from '../lib/flow-config';

/*
 * MOCK WALLET IMPLEMENTATION
 * 
 * This file currently uses a mock wallet for demonstration purposes.
 * 
 * To integrate with real Flow blockchain:
 * 1. Install: npm install @onflow/fcl
 * 2. Import: import * as fcl from '@onflow/fcl';
 * 3. Configure FCL at top level:
 *    const flowConfig = getFlowConfig();
 *    fcl.config({
 *      'accessNode.api': flowConfig.accessNode,
 *      'discovery.wallet': flowConfig.discoveryWallet,
 *      'app.detail.title': 'InOrOut',
 *      'app.detail.description': 'Decentralized Gambling Platform on Flow',
 *    });
 * 4. Replace mockFlowWallet methods with:
 *    - fcl.authenticate() for connecting
 *    - fcl.unauthenticate() for disconnecting
 *    - fcl.currentUser.subscribe() for state changes
 *    - fcl.query() for balance fetching
 * 
 * See Flow FCL docs: https://developers.flow.com/tools/fcl-js
 */

interface WalletContextType {
  walletConnected: boolean;
  walletAddress: string;
  balance: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnecting: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Mock Flow wallet implementation for demo purposes
const mockFlowWallet = {
  generateAddress: () => {
    // Generate a realistic Flow address (8 bytes hex with 0x prefix)
    const randomBytes = Array.from({ length: 16 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    return `0x${randomBytes}`;
  },
  
  generateBalance: () => {
    // Generate a random balance between 10 and 1000 FLOW
    return (Math.random() * 990 + 10).toFixed(4);
  },

  simulateConnection: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      address: mockFlowWallet.generateAddress(),
      balance: mockFlowWallet.generateBalance(),
    };
  },

  fetchBalance: async (address: string) => {
    // Simulate fetching balance from blockchain
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockFlowWallet.generateBalance();
  }
};

export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('0.00');
  const [isConnecting, setIsConnecting] = useState(false);

  // Check for persisted wallet connection on mount
  useEffect(() => {
    const savedAddress = localStorage.getItem('flow_wallet_address');
    const savedBalance = localStorage.getItem('flow_wallet_balance');
    
    if (savedAddress) {
      setWalletAddress(savedAddress);
      setWalletConnected(true);
      setBalance(savedBalance || '0.00');
    }
  }, []);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      // Simulate wallet connection
      const { address, balance: walletBalance } = await mockFlowWallet.simulateConnection();
      
      setWalletAddress(address);
      setBalance(walletBalance);
      setWalletConnected(true);

      // Persist to localStorage
      localStorage.setItem('flow_wallet_address', address);
      localStorage.setItem('flow_wallet_balance', walletBalance);
      
      toast.success('Wallet connected successfully!', {
        description: `Connected to Flow ${FLOW_NETWORK}`,
      });
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      toast.error('Connection failed', {
        description: 'Please try again.',
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      setWalletConnected(false);
      setWalletAddress('');
      setBalance('0.00');
      
      // Clear localStorage
      localStorage.removeItem('flow_wallet_address');
      localStorage.removeItem('flow_wallet_balance');
      
      toast.info('Wallet disconnected');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        walletConnected,
        walletAddress,
        balance,
        connectWallet,
        disconnectWallet,
        isConnecting,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
