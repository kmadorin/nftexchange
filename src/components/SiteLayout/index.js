import {Layout, Row, Col, Button, Space,} from 'antd';
import clsx from 'clsx';
import Router from 'next/router';
import {useEffect, useState} from "react";
import {Toaster} from 'react-hot-toast';
import Link from 'next/link';

import {useAccount, useConnect, useDisconnect} from 'wagmi';
const {Header, Content, Footer} = Layout;
import Login from '../Login';
import Address from '../Address';
import Logo from '../Logo';
import layoutStyles from './layout.module.scss';

import consoleLog from '../../lib/consoleLog';

function SiteLayout({children}) {
	const [mounted, setMounted] = useState(false);
	const {data: accountData} = useAccount();
	const {disconnect} = useDisconnect();
	const {activeConnector} = useConnect();
	const accountAddress = accountData && accountData.address;

	useEffect(() => {
		setMounted(true);

		if (!activeConnector) {
			disconnect()
		}

		activeConnector?.on('change', () => {
			disconnect()
		})
	}, [activeConnector, disconnect])

	const toastOptions = {
		style: {
			background: '',
			color: ''
		},
		success: {
			className: 'border border-green-500',
			iconTheme: {
				primary: '#10B981',
				secondary: 'white'
			}
		},
		error: {
			className: 'border border-red-500',
			iconTheme: {
				primary: '#EF4444',
				secondary: 'white'
			}
		},
		loading: {className: 'border border-gray-300'}
	}

	return (
		<div>
			<Toaster position="bottom-right" toastOptions={toastOptions}/>
			<Layout style={{minHeight: '100vh'}} className={layoutStyles.layout}>
				<Header className={layoutStyles.header}>
					<Row justify="stretch" align="middle" className={layoutStyles.row}>
						<Col className={layoutStyles.logocol}>
							<Logo/>
						</Col>
						<Col className={layoutStyles.rightcol}>
							<Login />
						</Col>
					</Row>
				</Header>
				<Content>
					{children}
				</Content>
				{/*<Footer>Footer</Footer>*/}
			</Layout>
		</div>
	)
}

export default SiteLayout
