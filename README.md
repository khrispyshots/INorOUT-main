
# InOrOut

InOrOut is a decentralized gambling platform built on the Flow blockchain.

Core concept
--------------
Winner-Takes-All Betting Pools — Users stake FLOW tokens in timed betting rounds (epochs) where one random winner receives the entire pot, while non-winners receive $IOO token compensation.

How it works
------------
- 1-minute epochs: each betting round lasts exactly 60 seconds.
- Place bets: users commit FLOW tokens (minimum entry requirement enforced by the UI/contract).
- Random winner selection: after the countdown completes, one winner is randomly chosen.
- Payouts:
  - Winner receives the entire pot of staked FLOW.
  - Losers receive $IOO tokens at a 1:1 ratio with their stake.

Key features
------------
- Landing.tsx: homepage with wallet connection
- Dashboard.tsx: view active and upcoming pools
- PoolDetail.tsx: join pools, place bets, and see the countdown timer
- Profile.tsx: view betting history and statistics
- Explorer.tsx: browse completed epochs and results
- Wallet integration: Flow blockchain wallet connection (see `src/hooks/useWallet.tsx`)
- Network switching: toggle between testnet and mainnet via the config

Tech stack
----------
- React + TypeScript
- Flow blockchain integration (FCL-ready; currently includes a mock wallet implementation for demo)
- Tailwind CSS with shadcn/ui-style components

Run locally
-----------
1. npm install
2. npm run dev
3. Open the URL printed by Vite (usually http://localhost:5173)

Notes
-----
- The repository contains documentation and examples under `src/` including a more detailed `src/README.md` that covers Flow integration and the app architecture.
- I updated the project PostCSS config and installed missing dependencies during a local build check; the production build now succeeds and creates `build/`.

If you'd like, I can also add a short project overview badge, license, or contributor instructions to this README.
  