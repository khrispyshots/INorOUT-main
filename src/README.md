# InOrOut - Decentralized Gambling Platform on Flow

![Flow Blockchain](https://img.shields.io/badge/Flow-Blockchain-00EF8B?style=flat-square&logo=flow)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)

A fully decentralized gambling platform built on the Flow blockchain where users connect their wallets and participate in timed epochs by choosing "IN" or "OUT" pools.

## 🎮 Features

- **Native Flow Wallet Integration** - Connect with Blocto, Flow Wallet, Dapper, and more
- **Timed Epochs** - 30-minute active rounds with 1-hour cooldown periods
- **Pool System** - Choose "IN" or "OUT" pools for each epoch
- **Real-time Balance** - Fetched directly from Flow blockchain
- **User Profiles** - Track your game history and statistics
- **Explorer Page** - View all completed epochs and results
- **Responsive Design** - Works seamlessly on mobile and desktop

## 🚀 Quick Start

### Prerequisites
- A Flow wallet (Blocto, Flow Wallet, or Dapper)
- Modern web browser

### Installation
```bash
# The app will automatically import required packages
# Just open the app and click "Connect Wallet"
```

### First Time Setup
1. Open the application
2. Click "Connect Wallet" on the landing page
3. Select your preferred Flow wallet from the discovery modal
4. Authenticate in your wallet
5. You're ready to play!

## 🔧 Configuration

### Network Selection
Edit `/lib/flow-config.ts` to switch between testnet and mainnet:

```typescript
// For testnet (development)
export const FLOW_NETWORK = 'testnet';

// For mainnet (production)
export const FLOW_NETWORK = 'mainnet';
```

### Get Testnet FLOW
1. Connect your wallet
2. Visit [Flow Testnet Faucet](https://testnet-faucet.onflow.org/)
3. Enter your Flow address
4. Request testnet FLOW tokens

## 📁 Project Structure

```
├── App.tsx                      # Main application component
├── components/
│   ├── Dashboard.tsx           # Pool dashboard view
│   ├── Explorer.tsx            # Epoch history explorer
│   ├── Footer.tsx              # App footer with Flow branding
│   ├── Header.tsx              # Navigation with wallet connect
│   ├── Landing.tsx             # Landing page with countdown
│   ├── NetworkSwitcher.tsx     # Network selection component
│   ├── PoolDetail.tsx          # Individual pool details
│   ├── Profile.tsx             # User profile and history
│   ├── WalletInfo.tsx          # Wallet information display
│   ├── FlowStatus.tsx          # Flow connection status (debug)
│   └── ui/                     # ShadCN UI components
├── hooks/
│   └── useWallet.tsx           # Flow wallet integration hook
├── lib/
│   ├── flow-config.ts          # Flow network configuration
│   ├── flow-utils.ts           # Flow utility functions
│   └── toast.ts                # Toast notifications
└── styles/
    └── globals.css             # Global styles and Tailwind

Documentation:
├── README.md                   # This file
├── QUICK_START.md              # Quick start guide
├── FLOW_WALLET_GUIDE.md        # Wallet integration guide
└── FLOW_INTEGRATION_SUMMARY.md # Technical implementation details
```

## 🔌 Wallet Integration

### Supported Wallets
- **Blocto** - Web and mobile wallet (no extension required)
- **Flow Wallet (Lilico)** - Browser extension
- **Dapper** - Web wallet with custodial options
- **Ledger** - Hardware wallet support
- Any FCL-compatible wallet

### How It Works
1. Click "Connect Wallet" button
2. FCL wallet discovery modal appears
3. Select your preferred wallet
4. Authenticate in your wallet
5. Address and balance automatically synced

## 🎯 User Flow

### Landing Page
- Countdown timer to next epoch
- "Connect Wallet" button
- Platform information

### After Connection
- **Dashboard** - View all active and upcoming pools
- **Profile** - See your betting history and statistics  
- **Explorer** - Browse completed epochs and results
- **Wallet Popover** - View address, balance, and network

## 🛠️ Technology Stack

### Frontend
- **React 18+** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **ShadCN UI** - Component library
- **Lucide React** - Icons

### Blockchain
- **Flow Blockchain** - Layer 1 blockchain
- **FCL (Flow Client Library)** - Wallet and blockchain integration
- **Cadence** - Smart contract language (for future contracts)

### State Management
- React Context API
- Custom hooks for wallet state

## 📱 Pages

### 1. Landing (`/`)
- Hero section with countdown
- Connect wallet CTA
- Platform features

### 2. Dashboard (`/dashboard`)
- Active pools (IN/OUT)
- Pool statistics
- Join pool buttons
- Time remaining display

### 3. Pool Detail (`/pool/:id`)
- Pool information
- Current participants
- Prize pool amount
- Join/leave functionality

### 4. Profile (`/profile`)
- Wallet information
- Betting history
- Win/loss statistics
- Total earnings

### 5. Explorer (`/explorer`)
- All completed epochs
- Historical results
- Participant lists
- Prize distributions

## 🔐 Security

- ✅ No private keys stored in app
- ✅ All transactions signed in user's wallet
- ✅ Read-only balance queries (no gas fees)
- ✅ Open-source FCL library
- ✅ Decentralized authentication

## 🎨 Design System

### Colors
- White backgrounds
- Black borders (2px)
- Red hover states
- Green success indicators
- Orange testnet indicators
- Blue mainnet indicators

### Components
- Brutalist design aesthetic
- Sharp edges and strong shadows
- High contrast
- Bold typography

## 🌐 Network Information

### Testnet (Default)
- **Access Node**: `https://rest-testnet.onflow.org`
- **Explorer**: `https://testnet.flowscan.io`
- **Faucet**: `https://testnet-faucet.onflow.org`
- **Chain ID**: Flow Testnet

### Mainnet
- **Access Node**: `https://rest-mainnet.onflow.org`
- **Explorer**: `https://flowscan.io`
- **Chain ID**: Flow Mainnet

## 🔍 Debugging

### FlowStatus Component
Use the `<FlowStatus />` component in any page to display:
- Current network (testnet/mainnet)
- Connection status
- Wallet address
- FLOW balance
- Access node URL

```tsx
import { FlowStatus } from './components/FlowStatus';

// Add to any component
<FlowStatus />
```

### Browser Console
Check console for:
- FCL authentication events
- Balance query results
- Network connection status
- Error messages

## 📚 Documentation

- **[Quick Start Guide](./QUICK_START.md)** - Get up and running fast
- **[Wallet Guide](./FLOW_WALLET_GUIDE.md)** - Complete wallet integration guide
- **[Integration Summary](./FLOW_INTEGRATION_SUMMARY.md)** - Technical implementation details

## 🚀 Development

### Adding Smart Contracts
1. Write Cadence contracts
2. Deploy to Flow testnet
3. Update contract addresses in `/lib/flow-config.ts`
4. Implement transaction functions in components

### Adding Transactions
```typescript
// Note: Currently using mock wallet for demo purposes
// To integrate real Flow transactions:
// 1. Install @onflow/fcl package
// 2. Replace mock implementation in /hooks/useWallet.tsx
// 3. Follow Flow FCL documentation at https://developers.flow.com/tools/fcl-js

// Example transaction structure:
const txId = await fcl.mutate({
  cadence: `
    // Your Cadence transaction code
  `,
  args: (arg, t) => [
    arg(poolId, t.String),
    arg(amount, t.UFix64),
  ],
});
```

## 🐛 Troubleshooting

**Wallet not connecting?**
- This demo uses a mock wallet implementation
- Click "Connect Wallet" to simulate connection
- A random Flow address will be generated

**Using Real Flow Wallets?**
- Replace mock implementation with @onflow/fcl
- Install a Flow wallet browser extension (Blocto, Lilico, etc.)
- Configure FCL with proper network endpoints

**Navigation not working?**
- Connect your wallet first
- Check current page in browser console

## 📄 License

MIT License - feel free to use this project as a template for your own Flow applications.

## 🤝 Contributing

Contributions welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📧 Support

For issues and questions:
- Check the documentation files
- Review Flow developer docs
- Check FCL documentation
- Open an issue on GitHub

## 🎓 Learn More

- [Flow Blockchain](https://flow.com/)
- [Flow Developer Portal](https://developers.flow.com/)
- [FCL Documentation](https://github.com/onflow/fcl-js)
- [Cadence Language](https://cadence-lang.org/)
- [Flow Forum](https://forum.onflow.org/)

---

**Built with ❤️ on Flow Blockchain**

*InOrOut - Pick a side. Win big. Simple as that.*
