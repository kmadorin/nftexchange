import WalletSelector from "./WalletSelector";
import {useState, useContext, useEffect} from "react";
import {Typography, Modal, Button} from 'antd';

const {Title, Text} = Typography;

import loginStyles from './login.module.scss';
import AppContext from "../utils/AppContext";
import {useAccount, useConnect, useDisconnect} from "wagmi";
import Address from "../Address";
import layoutStyles from "../SiteLayout/layout.module.scss";
import Link from "next/link";
import Router from "next/router";

export default function Login() {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const {disconnect} = useDisconnect();
	const {data: accountData} = useAccount();
	const accountAddress = accountData && accountData.address;
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true)
	}, []);

	function onLogin() {
		setIsModalVisible(true);
	}

	function onLogout() {
		disconnect()
	}

	function onConnected() {
		setIsModalVisible(false);
	}

	function handleCancel() {
		setIsModalVisible(false);
	}

	return (
		<div>
			{mounted && accountAddress ? (
				<div>
					<Address size="short" value={accountAddress}/>
					<Button type="primary" onClick={onLogout} className={loginStyles.logout}>Log
						out</Button>
				</div>
			) : <Button type="primary" onClick={onLogin}>Log in</Button>}
			<Modal
				visible={isModalVisible} footer={null} closable={false}
				onCancel={handleCancel}
				width={600}
			>
				<WalletSelector onConnected={onConnected}/>
			</Modal>
		</div>
	)
}
