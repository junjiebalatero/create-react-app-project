// import React from "react";
// import { useEffect, useState } from "react";
// import "./App.css";

// function App() {
//   const [date, setDate] = useState(null);
//   useEffect(() => {
//     async function getDate() {
//       const res = await fetch("/api/date");
//       const newDate = await res.text();
//       setDate(newDate);
//     }
//     getDate();
//   }, []);
//   return (
//     <main>
//        <h2> First modifiy the app. from junjie</h2>
//     </main>
//   );
// }

// export default App;

import React from "react";
import { useState, useEffect } from 'react';
import "./App.css";

import { ethers } from 'ethers';
import logo from './logo.svg';

function App() {
	const [haveMetamask, sethaveMetamask] = useState(true);

	const [accountAddress, setAccountAddress] = useState('');
	const [accountBalance, setAccountBalance] = useState('');

	const [isConnected, setIsConnected] = useState(false);

	const { ethereum } = window;

	const provider = new ethers.providers.Web3Provider(window.ethereum);

	useEffect(() => {
		const { ethereum } = window;
		const checkMetamaskAvailability = async () => {
			if (!ethereum) {
				sethaveMetamask(false);
			}
			sethaveMetamask(true);
		};
		checkMetamaskAvailability();
	}, []);

	const connectWallet = async () => {
		try {
			if (!ethereum) {
				sethaveMetamask(false);
			}

			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});

			let balance = await provider.getBalance(accounts[0]);
			let bal = ethers.utils.formatEther(balance);

			setAccountAddress(accounts[0]);
			setAccountBalance(bal);
			setIsConnected(true);
		} catch (error) {
			setIsConnected(false);
		}
	};

	return (
		<div className="App">
			<header className="App-header">
				{haveMetamask ? (
					<div className="App-header">
						{isConnected ? (
							<div className="card">
								<div className="card-row">
									<h3>Wallet Address:</h3>
									<p>
										{accountAddress.slice(0, 4)}...
										{accountAddress.slice(38, 42)}
									</p>
								</div>
								<div className="card-row">
									<h3>Wallet Balance:</h3>
									<p>{accountBalance}</p>
								</div>
							</div>
						) : (
							<img src={logo} className="App-logo" alt="logo" />
						)}

						{isConnected ? (
							<p className="info">🎉 Connected Successfully</p>
						) : (
							<button className="btn" onClick={connectWallet}>
								Connect
							</button>
						)}
					</div>
				) : (
					<p>Please Install MataMask</p>
				)}
			</header>
		</div>
	);
}

export default App;
