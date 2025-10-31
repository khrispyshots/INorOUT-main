// Flow network configuration
export const FLOW_NETWORK = 'testnet'; // Change to 'mainnet' for production

export const FLOW_CONFIG = {
  testnet: {
    accessNode: 'https://rest-testnet.onflow.org',
    discoveryWallet: 'https://fcl-discovery.onflow.org/testnet/authn',
    flowscanUrl: 'https://testnet.flowscan.io',
    // Testnet contract addresses
    contracts: {
      FungibleToken: '0x9a0766d93b6608b7',
      FlowToken: '0x7e60df042a9c0868',
    },
  },
  mainnet: {
    accessNode: 'https://rest-mainnet.onflow.org',
    discoveryWallet: 'https://fcl-discovery.onflow.org/authn',
    flowscanUrl: 'https://flowscan.io',
    // Mainnet contract addresses
    contracts: {
      FungibleToken: '0xf233dcee88fe0abe',
      FlowToken: '0x1654653399040a61',
    },
  },
};

export const getFlowConfig = () => {
  return FLOW_CONFIG[FLOW_NETWORK as keyof typeof FLOW_CONFIG];
};
