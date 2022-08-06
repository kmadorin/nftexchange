import {useAccount, useNetwork, useConnect} from 'wagmi';
import {Button} from 'antd';
import {useContext} from 'react';
import Router from 'next/router';
import AppContext from '../utils/AppContext';
import walletSelectorStyles from './wselector.module.scss';
import Image from 'next/image';
import getWalletLogo from '../../lib/getWalletLogo';
import {CHAIN_ID, ERROR_MESSAGE} from '../../constants';
import consoleLog from "../../lib/consoleLog";
import {PUBLIC_URL} from "../../constants";

function WalletSelector({onConnected}) {
	const {data: accountData} = useAccount();
	const {connect, connectors, error, isConnecting, pendingConnector} =
		useConnect();

	const {activeChain} = useNetwork();

	function onConnect(connector) {
		return function(e) {
			connect(connector);
			onConnected();
		}
	}

	return (<div className={walletSelectorStyles.wselector}>
		{connectors.map((connector) => (
			<Button
				disabled={!connector.ready}
				key={connector.id}
				onClick={onConnect(connector)}
				loading={isConnecting &&
				connector.id === pendingConnector?.id}
				className={walletSelectorStyles.wbtn}
			>
				<span
					className={walletSelectorStyles.wicon}
				>
					<Image
						src={getWalletLogo(connector.name)}
						height={40}
						width={40}
						alt={connector.id}
					/>
				</span>
				<span>
					{connector.id === 'injected'
						? 'Browser Wallet'
						: connector.name}
					{!connector.ready && ' (unsupported)'}
				</span>
			</Button>
		))}
	</div>)
}

export default WalletSelector
