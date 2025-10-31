# Wallet Integration Guide

## Overview

InOrOut now features full EVM wallet integration with support for Flow blockchain networks. Users can connect their MetaMask or other Web3 wallets to participate in the platform.

## Features Implemented

### 1. Real Wallet Connection
- Connect to MetaMask or any EVM-compatible wallet
- Automatic wallet detection and connection
- Persistent wallet state across sessions
- Account change detection

### 2. Flow Network Support
- **Flow EVM Mainnet** (Chain ID: 747)
  - RPC: https://mainnet.evm.nodes.onflow.org
  - Explorer: https://evm.flowscan.io
  
- **Flow EVM Testnet** (Chain ID: 545)
  - RPC: https://testnet.evm.nodes.onflow.org
  - Explorer: https://evm-testnet.flowscan.io

### 3. Balance Display
- Real-time FLOW token balance
- Automatically fetched from connected wallet
- Displayed in header dropdown and profile page

### 4. User Interface
- **Connect Button**: Click to connect wallet
- **Wallet Dropdown**: Click connected address to see:
  - Full wallet address with copy button
  - Current FLOW balance
  - Disconnect button
  
### 5. Network Management
- Automatic prompt to add Flow network on first connection
- Manual network addition via Profile page
- Network switcher component with one-click addition

## How to Use

### For Users

1. **Install MetaMask**
   - Download from https://metamask.io
   - Create or import a wallet

2. **Connect Wallet**
   - Click "Connect Wallet" on landing page or header
   - Approve the connection in MetaMask
   - You'll be prompted to add Flow network (optional)

3. **Add Flow Networks** (Optional)
   - Go to your Profile page
   - Scroll to "Add Flow Networks" section
   - Click "Add to Wallet" for Mainnet or Testnet
   - Confirm in your wallet

4. **View Balance**
   - Click on your wallet address in the header
   - See your FLOW balance in the dropdown
   - Also visible on Profile page

5. **Disconnect**
   - Click your wallet address
   - Click "Disconnect" button

### For Developers

#### Wallet Hook Usage

```tsx
import { useWallet } from '../hooks/useWallet';

function YourComponent() {
  const { 
    walletConnected, 
    walletAddress, 
    balance, 
    connectWallet, 
    disconnectWallet,
    isConnecting 
  } = useWallet();

  return (
    <div>
      {walletConnected ? (
        <p>Connected: {walletAddress}</p>
        <p>Balance: {balance} FLOW</p>
      ) : (
        <button onClick={connectWallet}>Connect</button>
      )}
    </div>
  );
}
```

#### Network Configuration

Flow network configurations are defined in `/hooks/useWallet.tsx`:

```typescript
const FLOW_MAINNET = {
  chainId: '0x2eb', // 747
  chainName: 'Flow EVM Mainnet',
  nativeCurrency: { name: 'Flow', symbol: 'FLOW', decimals: 18 },
  rpcUrls: ['https://mainnet.evm.nodes.onflow.org'],
  blockExplorerUrls: ['https://evm.flowscan.io'],
};
```

## Components

### WalletProvider
Location: `/hooks/useWallet.tsx`
- Context provider for wallet state
- Handles all wallet interactions
- Manages balance fetching

### Header
Location: `/components/Header.tsx`
- Shows connect button or wallet address
- Popover dropdown with wallet info
- Copy address functionality

### NetworkSwitcher
Location: `/components/NetworkSwitcher.tsx`
- UI for adding Flow networks
- One-click network addition
- Links to block explorers

## Next Steps

To make this a fully functional gambling platform, you'll need to:

1. **Deploy Smart Contracts** on Flow EVM
2. **Integrate Contract Calls** for:
   - Joining pools (deposit FLOW)
   - Claiming winnings
   - Reading pool state
3. **Add Transaction Handling**:
   - Loading states during transactions
   - Success/error notifications
   - Transaction history

## Testing

### Testnet Testing
1. Connect to Flow EVM Testnet (Chain ID: 545)
2. Get testnet FLOW from faucet
3. Test all wallet functions
4. Verify balance updates

### Mainnet Deployment
1. Ensure contracts are audited
2. Test thoroughly on testnet first
3. Deploy contracts to Flow EVM Mainnet
4. Update contract addresses in app

## Security Notes

- Never store private keys in the application
- All wallet interactions happen through MetaMask
- Users maintain full custody of their funds
- Always verify contract addresses before transactions
