/**
 * Flow blockchain utility functions
 */

/**
 * Format a Flow address for display
 * @param address - Full Flow address (e.g., "0x1234567890abcdef")
 * @param short - If true, returns short format (0x1234...cdef)
 */
export function formatFlowAddress(address: string, short: boolean = true): string {
  if (!address) return '';
  
  // Flow addresses are hex addresses starting with 0x
  if (short) {
    // Show first 6 chars (0x1234) and last 4 chars
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }
  
  return address;
}

/**
 * Validate if a string is a valid Flow address
 * @param address - Address to validate
 */
export function isValidFlowAddress(address: string): boolean {
  // Flow addresses are hex strings starting with 0x
  // They are 16 characters long (including 0x prefix)
  const flowAddressRegex = /^0x[a-fA-F0-9]{16}$/;
  return flowAddressRegex.test(address);
}

/**
 * Format FLOW amount for display
 * @param amount - Amount in FLOW
 * @param decimals - Number of decimal places (default: 4)
 */
export function formatFlowAmount(amount: string | number, decimals: number = 4): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(num)) return '0.00';
  
  return num.toFixed(decimals);
}

/**
 * Convert UFix64 (Flow's fixed-point type) to number
 * @param ufix64 - UFix64 value as string
 */
export function ufix64ToNumber(ufix64: string): number {
  return parseFloat(ufix64);
}

/**
 * Get block explorer URL for an address
 * @param address - Flow address
 * @param network - Network (testnet or mainnet)
 */
export function getBlockExplorerUrl(address: string, network: 'testnet' | 'mainnet' = 'testnet'): string {
  const baseUrl = network === 'mainnet' 
    ? 'https://flowscan.io' 
    : 'https://testnet.flowscan.io';
  
  return `${baseUrl}/account/${address}`;
}

/**
 * Get transaction explorer URL
 * @param txId - Transaction ID
 * @param network - Network (testnet or mainnet)
 */
export function getTxExplorerUrl(txId: string, network: 'testnet' | 'mainnet' = 'testnet'): string {
  const baseUrl = network === 'mainnet' 
    ? 'https://flowscan.io' 
    : 'https://testnet.flowscan.io';
  
  return `${baseUrl}/transaction/${txId}`;
}
