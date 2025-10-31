# Flow Wallet Integration Guide

## Overview
InOrOut is designed for Flow blockchain integration. Currently, it uses a **mock wallet implementation** for prototyping and demonstration purposes. This allows you to explore the UI and functionality before integrating with real Flow wallets.

## Mock Wallet (Current)
The application currently simulates Flow wallet functionality:

- ✅ Generates realistic Flow addresses (0x format)
- ✅ Simulates FLOW balance
- ✅ Persists wallet state across page reloads
- ✅ Provides full UI/UX flow
- ⚠️ No real blockchain interaction

## How to Connect (Mock)

1. Click the "Connect Wallet" button in the header
2. Wait ~1 second for simulated connection
3. A random Flow address will be generated
4. You'll see a simulated FLOW balance
5. Navigate through the app with your "connected" wallet

## Real Flow Wallets (After Upgrade)
When upgraded to use `@onflow/fcl`, these wallets will be supported:

- **Blocto** - Web and mobile wallet
- **Lilico** (Now Flow Wallet) - Browser extension
- **Dapper Wallet** - Web wallet
- **Ledger** - Hardware wallet support
- **Flow Wallet** - Official Flow wallet

## Network Configuration

The app is currently configured for **Flow Testnet**. To switch to mainnet:

1. Open `/lib/flow-config.ts`
2. Change `FLOW_NETWORK` from `'testnet'` to `'mainnet'`

```typescript
export const FLOW_NETWORK = 'mainnet'; // Changed from 'testnet'
```

## Upgrading to Real Flow Integration

To connect to actual Flow blockchain:

### Step 1: Install FCL
```bash
npm install @onflow/fcl
```

### Step 2: Replace Mock Implementation
Open `/hooks/useWallet.tsx` and replace the mock wallet code with real FCL integration. The file contains comments marking where changes are needed.

### Step 3: Configure Network
The configuration in `/lib/flow-config.ts` is already set up for both testnet and mainnet.

### Step 4: Get Testnet FLOW
To test with real Flow blockchain:
1. Connect your wallet to Flow Testnet
2. Visit the [Flow Testnet Faucet](https://testnet-faucet.onflow.org/)
3. Enter your Flow address
4. Request testnet FLOW tokens

## Technical Details

### Current Implementation
- Mock wallet in `/hooks/useWallet.tsx`
- Simulates connection flow
- Uses localStorage for persistence
- Generates random addresses and balances

### After FCL Upgrade
- `fcl.authenticate()` - Opens wallet discovery and connects
- `fcl.unauthenticate()` - Disconnects the wallet
- `fcl.currentUser.subscribe()` - Listens for wallet state changes
- `fcl.query()` - Executes Cadence scripts to read blockchain data

## Development

### Required Package (For Real Integration)
```bash
npm install @onflow/fcl
```

### Key Files
- `/hooks/useWallet.tsx` - Wallet connection logic (currently mock)
- `/lib/flow-config.ts` - Network configuration (ready for real use)
- `/lib/flow-utils.ts` - Flow utility functions (ready for real use)

## Troubleshooting

### Mock Wallet Issues
- **State not persisting?** - Check browser localStorage
- **Want different balance?** - Disconnect and reconnect to generate new values

### After Real FCL Integration
- **No wallets found** - Install a Flow wallet browser extension
- **Balance shows 0.00** - Request testnet FLOW from faucet
- **Connection fails** - Check network configuration in `/lib/flow-config.ts`

### Connection fails
- Check browser console for detailed error messages
- Ensure your wallet extension is unlocked
- Try a different wallet provider

## Resources
- [Flow Documentation](https://developers.flow.com/)
- [FCL Documentation](https://github.com/onflow/fcl-js)
- [Flow Testnet Faucet](https://testnet-faucet.onflow.org/)
- [Flowscan Explorer](https://flowscan.io/)
