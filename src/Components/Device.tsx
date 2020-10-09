import * as React from 'react';
import styled from 'styled-components';

import { deviceButtons, IDeviceButtonsEvents } from '../Utils/DeviceButtons';

export const Device: React.FC = ({children}) => {
	return (
		<DeviceElement>
			<DeviceState />
			<DeviceContent>
				{ children }
			</DeviceContent>
			<DeviceButtons>
				<DeviceButtonBack onClick={ onClick('back') } type="button">&#9665;</DeviceButtonBack>
				<DeviceButtonHome onClick={ onClick('home') } type="button"/>
				<DeviceButtonMenu onClick={ onClick('menu') } type="button"/>
			</DeviceButtons>
		</DeviceElement>
	);

	function onClick(type: IDeviceButtonsEvents) {
		return function(event: React.MouseEvent) {
			event.preventDefault();
			deviceButtons.emit(type);
		}
	}
}

export const DeviceState: React.FC = () => {
	const [eventType, setEventType] = React.useState('.');

	React.useEffect(() => {
		const listener = deviceButtons.on('*', (_event) => {
			setEventType(`${_event}: ${Date.now()}`);
		});

		return () => {
			listener.remove();
		}
	});

	return (
		<DeviceStateElement>
			{ eventType }
		</DeviceStateElement>
	);
}

export const DeviceElement = styled.div`
	width: 318px;
	margin: auto;
	background: #fff;
	border-radius: 5px;
`;
export const DeviceStateElement = styled.div`
	text-align: right;
	padding: 3px 3px;
	font-size: 10px;
	position: absolute;
	top: 0;
	right: 0;
	z-index: 1;
	background: rgba(0, 0, 0, 0.5);
	color: #fff;
`;
export const DeviceContent = styled.div`
	width: 100%;
	height: 480px;
	overflow: hidden;
	display: flex;
	z-index: 0;
	> * {
		flex-grow: 1;
		flex-shrink: 1;
	}
`;
export const DeviceButtons = styled.div`
	width: 100%;
	display: flex;
	background: rgba(0, 0, 0, 0.1);
`;
export const DeviceButton = styled.button`
	display: flex;
	height: 40px;
	flex-grow: 1;
	flex-shrink: 1;
	align-items: center;
	justify-content: center;
	background: transparent;
	border: 0;
	cursor: pointer;
	outline: none;
	transition: background 0.2s;
	width: 1px;
	&:hover {
		background: rgba(0,0,0,0.1);
	}
	&:active {
		background: rgba(0,0,0,0.3);
	}
`;
export const DeviceButtonBack = styled(DeviceButton)`
	font-size: 20px;
`;
export const DeviceButtonHome = styled(DeviceButton)`
	&:before {
		content: '';
		display: block;
		width: 16px;
		height: 16px;
		border: 1px solid currentColor;
		border-radius: 50%;
	}
`;
export const DeviceButtonMenu = styled(DeviceButton)`
	&:before {
		content: '';
		display: block;
		width: 14px;
		height: 14px;
		border: 1px solid currentColor;
	}
`;
