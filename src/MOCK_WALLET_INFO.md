# Mock Wallet Implementation

## Overview
InOrOut currently uses a **mock Flow wallet** implementation for demonstration and prototyping purposes. This allows you to explore the full UI/UX without needing actual blockchain connectivity.

## What It Does

### ✅ Simulates
- Flow wallet connection process
- Realistic Flow addresses (0x + 16 hex characters)
- FLOW token balances (10-1000 FLOW range)
- Wallet state persistence
- Connect/disconnect flows

### ⚠️ Does NOT
- Connect to actual Flow blockchain
- Interact with real wallets
- Execute real transactions
- Fetch real balances
- Use real private keys

## How It Works

### Connection Flow
1. User clicks "Connect Wallet"
2. Mock simulates 1-second connection delay
3. Generates random Flow address: `mockFlowWallet.generateAddress()`
4. Generates random balance: `mockFlowWallet.generateBalance()`
5. Saves to localStorage for persistence
6. Updates UI with wallet info

### Address Generation
```typescript
generateAddress: () => {
  const randomBytes = Array.from({ length: 16 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
  return `0x${randomBytes}`;
}
```

### Balance Generation
```typescript
generateBalance: () => {
  // Random balance between 10 and 1000 FLOW
  return (Math.random() * 990 + 10).toFixed(4);
}
```

### Persistence
- Uses browser localStorage
- Keys: `flow_wallet_address` and `flow_wallet_balance`
- Persists across page reloads
- Cleared on disconnect

## Why Mock Instead of Real?

### Benefits for Prototyping
✅ **No Dependencies** - Works without external packages
✅ **Instant Setup** - No wallet installation required
✅ **Fast Iteration** - No blockchain delays
✅ **Demo Ready** - Perfect for presentations
✅ **No Testnet** - No need for testnet tokens

### When to Upgrade
Upgrade to real Flow FCL when you need:
- Actual blockchain transactions
- Real wallet integration
- Smart contract interaction
- Production deployment
- Testing with real Flow tokens

## Upgrading to Real FCL

### Quick Upgrade Path

1. **Install FCL Package**
   ```bash
   npm install @onflow/fcl
   ```

2. **Open `/hooks/useWallet.tsx`**
   - Follow the detailed instructions in comments at the top
   - Replace mock methods with FCL calls

3. **Key Replacements**
   ```typescript
   // Mock → Real FCL
   mockFlowWallet.simulateConnection() → fcl.authenticate()
   disconnectWallet() with localStorage → fcl.unauthenticate()
   useEffect with localStorage → fcl.currentUser.subscribe()
   generateBalance() → fcl.query() with Cadence script
   ```

4. **Configuration Ready**
   - `/lib/flow-config.ts` already has network configs
   - Switch between testnet/mainnet easily
   - Contract addresses prepared

### Full FCL Example
```typescript
// After installing @onflow/fcl
import * as fcl from '@onflow/fcl';

// Configure
const flowConfig = getFlowConfig();
fcl.config({
  'accessNode.api': flowConfig.accessNode,
  'discovery.wallet': flowConfig.discoveryWallet,
  'app.detail.title': 'InOrOut',
});

// Connect
const connectWallet = async () => {
  await fcl.authenticate();
};

// Monitor state
useEffect(() => {
  const unsubscribe = fcl.currentUser.subscribe((user) => {
    if (user.loggedIn) {
      setWalletAddress(user.addr);
      setWalletConnected(true);
      fetchBalance(user.addr);
    }
  });
  return unsubscribe;
}, []);

// Fetch balance
const fetchBalance = async (address: string) => {
  const balance = await fcl.query({
    cadence: `/* Cadence script */`,
    args: (arg, t) => [arg(address, t.Address)],
  });
  setBalance(balance);
};
```

## Files Involved

### Core Implementation
- `/hooks/useWallet.tsx` - Main wallet logic (mock)
- `/lib/flow-config.ts` - Network configuration (production-ready)
- `/lib/flow-utils.ts` - Utility functions (production-ready)

### UI Components
- `/components/Header.tsx` - Shows wallet info
- `/components/WalletInfo.tsx` - Wallet details popover
- `/components/NetworkSwitcher.tsx` - Network indicator
- `/components/FlowStatus.tsx` - Status display

### Documentation
- `/README.md` - Main documentation
- `/QUICK_START.md` - Getting started guide
- `/FLOW_WALLET_GUIDE.md` - Wallet integration guide
- `/FLOW_INTEGRATION_SUMMARY.md` - Technical summary
- `/MOCK_WALLET_INFO.md` - This file

## Testing the Mock

### What to Test
1. **Connect** - Click "Connect Wallet" button
2. **Verify** - Check address format starts with "0x"
3. **Balance** - Confirm balance shows 4 decimal places
4. **Navigation** - Test all pages work when connected
5. **Persistence** - Reload page, verify still connected
6. **Disconnect** - Click disconnect, verify state clears
7. **Reconnect** - Connect again, get new address/balance

### Expected Behavior
- Connection takes ~1 second
- New address each time you connect
- New balance each time you connect
- Address and balance persist on reload
- Clean state after disconnect

## Limitations

### Current Limitations
⚠️ No real blockchain queries
⚠️ No transaction signing
⚠️ No smart contract interaction
⚠️ No event listening
⚠️ No multi-wallet support
⚠️ Balance never changes

### Not Affected
✅ UI/UX is identical to real integration
✅ Navigation flows work normally
✅ All pages accessible
✅ State management works correctly
✅ Components render properly

## Production Checklist

Before launching with real Flow:
- [ ] Install @onflow/fcl package
- [ ] Replace mock in useWallet.tsx
- [ ] Test with Flow testnet
- [ ] Get testnet FLOW from faucet
- [ ] Verify balance fetching works
- [ ] Test wallet disconnect/reconnect
- [ ] Deploy smart contracts to testnet
- [ ] Test contract interactions
- [ ] Switch to mainnet configuration
- [ ] Deploy contracts to mainnet
- [ ] Final testing with real FLOW
- [ ] Launch! 🚀

## Support

### For Mock Questions
- Check localStorage in browser DevTools
- Clear site data to reset
- Review code comments in useWallet.tsx

### For Real FCL Integration
- [Flow Docs](https://developers.flow.com/)
- [FCL Documentation](https://github.com/onflow/fcl-js)
- [Flow Discord](https://discord.gg/flow)
- [Cadence Language](https://cadence-lang.org/)

---

**Current Status**: ✅ Mock wallet fully functional for prototyping
**Next Step**: Upgrade to @onflow/fcl when ready for blockchain integration
