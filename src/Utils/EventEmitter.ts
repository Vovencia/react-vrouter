interface IListener<TEvents extends string> {
	isOne?: boolean;
	eventName: TEvents;
	callback: (event: TEvents) => any;
	remove: () => void;
}

export class EventEmitter<TEvents extends string> {
	protected _listeners: IListener<TEvents>[] = [];

	public on(eventName: TEvents, callback: (event: TEvents) => any, isOne = false) {
		const listener: IListener<TEvents> = {
			eventName,
			callback: (event) => {
				if (listener.isOne) {
					listener.remove();
				}
				callback(event);
			},
			isOne,
			remove: () => {
				this.off(listener);
			},
		}
		this._listeners.push(listener);
		return listener;
	}

	public off(listener: IListener<TEvents>) {
		this._listeners = this._listeners.filter(_listener => _listener !== listener);
	}

	public emit(eventName: TEvents) {
		for(const listener of this._listeners) {
			if (listener.eventName && listener.eventName !== '*' ) {
				if (listener.eventName !== eventName) continue;
			}
			listener.callback(eventName);
		}
	}
}
