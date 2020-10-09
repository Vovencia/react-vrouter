import { EventEmitter } from './EventEmitter';

export type IDeviceButtonsEvents = 'back' | 'home' | 'menu' | '' | '*';

class DeviceButtons extends EventEmitter<IDeviceButtonsEvents> {}

export const deviceButtons = new DeviceButtons();
