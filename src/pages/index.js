import Head from 'next/head';
import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';
import {useAccount} from 'wagmi';

export default function Home() {
	const {data: accountData} = useAccount();

	return (
		<div className={styles.container}>
			<Head>
				<title>NFTExchange</title>
				<meta name="description" content="A P2P NFT exchange service"/>
				<link rel="icon" href="/favicon.ico"/>
			</Head>
			<div>
				{accountData.address}
			</div>
		</div>
	)
}
