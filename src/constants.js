import { chain } from 'wagmi';

// Environments
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
export const IS_MAINNET = process.env.NEXT_PUBLIC_IS_MAINNET === 'true'

// Messages
export const ERROR_MESSAGE = 'Something went wrong!'
export const CONNECT_WALLET = 'Please connect your wallet.'
export const WRONG_NETWORK = IS_MAINNET
	? 'Please change network to Polygon mainnet.'
	: 'Please change network to Polygon Mumbai testnet.'
export const SIGN_ERROR = 'Failed to sign data'

//URL
export const POLYGONSCAN_URL = IS_MAINNET
	? 'https://polygonscan.com'
	: 'https://mumbai.polygonscan.com'

export const PUBLIC_URL = process.env.NODE_ENV==='production' ? process.env.NEXT_PUBLIC_URL : process.env.NEXT_PUBLIC_URL_DEV

// Web3
export const ALCHEMY_KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY
export const ALCHEMY_RPC = IS_MAINNET
	? `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`
	: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_KEY}`
export const POLYGON_MAINNET = {
	...chain.polygon,
	name: 'Polygon Mainnet',
	rpcUrls: { default: 'https://polygon-rpc.com' }
}
export const POLYGON_MUMBAI = {
	...chain.polygonMumbai,
	name: 'Polygon Mumbai',
	rpcUrls: { default: 'https://rpc-mumbai.maticvigil.com' }
}
export const CHAIN_ID = IS_MAINNET ? POLYGON_MAINNET.id : POLYGON_MUMBAI.id

// Addresses
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
