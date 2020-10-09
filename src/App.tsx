import * as React from 'react';
import './App.css';

import { RouterModel } from './Router/Router.model';
import { Router, useRouterModel } from './Router/Router';
import { Device } from './Components/Device';
import { IRouterPage } from './Router/Router.interface';
import { deviceButtons } from './Utils/DeviceButtons';
import { useEffect } from 'react';
import { TestPage } from './Components/TestPage';

const MainPage: IRouterPage = () => {
	const routerModel = useRouterModel();

	useEffect(() => {
		const listener = deviceButtons.on('menu', async () => {
			await routerModel.pushPage(TestPage);
		});
		return () => {
			listener.remove();
		};
	});

	return (
		<div className="App">
			<h1>Hello CodeSandbox</h1>
			<h2>Start editing to see some magic happen!</h2>
		</div>
	);
};

export default function App() {
	return (
		<Device>
			<Router>{routerReady}</Router>
		</Device>
	);

	function routerReady(routerModel: RouterModel) {
		routerModel.setRootPage(MainPage);
	}
}
