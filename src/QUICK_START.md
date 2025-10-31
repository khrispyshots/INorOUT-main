# InOrOut - Quick Start Guide

## 🎉 Mock Flow Wallet Integration Ready!

Your InOrOut platform is designed for Flow blockchain with a mock wallet implementation for prototyping.

## 🚀 Current Status

### Mock Wallet (Demo Mode)
- ✅ Simulates Flow wallet connection flow
- ✅ Generates realistic Flow addresses
- ✅ Shows simulated FLOW balances
- ✅ Full UI/UX experience
- ⚠️ No real blockchain interaction

### Ready for Upgrade
- Configuration files ready for real FCL
- Network settings prepared
- Utility functions in place
- Just needs `@onflow/fcl` package integration

## 📦 Key Files

### `/hooks/useWallet.tsx`
- Mock Flow wallet implementation
- Simulates authentication flow
- Generates addresses and balances
- Ready for FCL upgrade (see comments in file)

### `/lib/flow-config.ts`
- Network configuration (testnet/mainnet)
- Contract addresses for each network
- Ready for production use

### `/components/Header.tsx`
- Shows network indicator (testnet/mainnet)
- Displays Flow address and balance
- Connect/disconnect functionality

## 🎮 How to Use (Demo Mode)

1. **Start the app** - Users see the landing page
2. **Click "Connect Wallet"** - Simulates wallet connection
3. **Wait ~1 second** - Mock connection in progress
4. **Address generated** - Random Flow address created
5. **Start exploring** - Navigate pools with simulated wallet

## 🔧 Configuration

### Switch Networks

Open `/lib/flow-config.ts` and change:

```typescript
export const FLOW_NETWORK = 'testnet'; // or 'mainnet'
```

### Testnet vs Mainnet

**Testnet** (default):
- For testing and development
- Free testnet FLOW from faucet
- No real money involved

**Mainnet**:
- For production use
- Real FLOW tokens
- Real money transactions

## 🔄 Upgrading to Real Flow Blockchain

### Step 1: Install FCL
```bash
npm install @onflow/fcl
```

### Step 2: Update Wallet Hook
Replace mock implementation in `/hooks/useWallet.tsx` with real FCL code (instructions in file comments)

### Step 3: Get Testnet FLOW
1. Connect your real wallet to the app
2. Copy your Flow address
3. Visit: https://testnet-faucet.onflow.org/
4. Request testnet FLOW tokens

## 🔌 Wallets (After Real Integration)

With real FCL, these wallets will work:

- **Blocto** - Web and mobile wallet
- **Flow Wallet (Lilico)** - Browser extension
- **Dapper** - Web wallet
- **Ledger** - Hardware wallet
- And more...

## 🏗️ Technical Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Flow blockchain
- **Wallet**: FCL (Flow Client Library)
- **Language**: Cadence (for smart contracts)

## 📝 Next Steps

### For Development:
1. Keep using testnet
2. Test all wallet flows
3. Test balance display
4. Test pool joining/leaving

### For Production:
1. Switch to mainnet in config
2. Deploy smart contracts to mainnet
3. Update contract addresses in config
4. Test with small amounts first

## 🐛 Troubleshooting

### Mock Wallet Issues
**Connection not persisting?**
- Check browser localStorage is enabled
- Clear site data and reconnect

**Want different address/balance?**
- Disconnect and reconnect to generate new values

### After Real FCL Integration
**No wallets appear**
- Install a Flow wallet browser extension
- Try Blocto (works without extension)

**Balance shows 0.00**
- Get testnet FLOW from faucet
- Wait a few seconds for sync
- Check you're on correct network

**Connection fails**
- Check browser console for errors
- Make sure wallet is unlocked
- Verify network configuration

## 📚 Resources

- [Flow Docs](https://developers.flow.com/)
- [FCL Docs](https://github.com/onflow/fcl-js)
- [Testnet Faucet](https://testnet-faucet.onflow.org/)
- [Flow Explorer](https://flowscan.io/)

---

**Ready to prototype!** 🎮 Your InOrOut platform has a working Flow-compatible wallet interface.
