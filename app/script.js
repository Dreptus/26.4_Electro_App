/** @format */

import React from 'react';
import { render } from 'react-dom';
import { useState, useEffect } from 'react';

const Description = () => {
	return (
		<div>
			<p>
				{' '}
				According to optometrists in order to save your eyes, you should follow
				the 20/20/20. It means you should to rest your eyes every 20 minutes for
				20 seconds by looking more than 20 feet away.
			</p>
			<p>
				This app will help you track your time and inform you when it's time to
				rest.
			</p>
		</div>
	);
};

const Timer = ({ time }) => {
	let seconds = String(time % 60).padStart(2, '0');
	let minutes = String(Math.floor(time / 60)).padStart(2, '0');

	return (
		<div>
			{minutes}:{seconds}
		</div>
	);
};

const App = () => {
	const [status, setStatus] = useState('off');
	const [time, setTime] = useState(5);
	const [running, setRunning] = useState(null);

	useEffect(() => {
		let timer;
		if (running) {
			timer = setInterval(() => {
				setTime(prevTime => prevTime - 1);
			}, 1000);
		}
		return () => clearInterval(timer);
	}, [running]);

	const startTimer = () => {
		setRunning(true);
		setStatus('work');
		setTime(30);
	};

	const stopTimer = () => {
		setRunning(false);
		setStatus('off');
		setTime(0);
	};

	const playBell = () => {
		const bell = new Audio('./sounds/bell.wav');
		bell.play();
	};

	if (time === 0 && status === 'work') {
		setStatus('rest');
		setTime(20);
		playBell();
	} else if (time === 0 && status === 'rest') {
		setStatus('work');
		setTime(60);
	}

	const closeApp = () => {
		window.close();
	};

	return (
		<div>
			<h1>Protect your eyes</h1>
			{status === 'off' && <Description />}
			{status === 'work' && <img src='./images/work.png' />}
			{status === 'rest' && <img src='./images/rest.png' />}
			{status !== 'off' && (
				<div className='timer'>
					<Timer time={time} />
				</div>
			)}
			{status === 'off' && (
				<button onClick={() => startTimer()} className='btn'>
					Start
				</button>
			)}
			{status !== 'off' && (
				<button onClick={() => stopTimer()} className='btn'>
					Stop
				</button>
			)}
			<button onClick={() => closeApp()} className='btn btn-close'>
				X
			</button>
		</div>
	);
};

render(<App />, document.querySelector('#app'));
