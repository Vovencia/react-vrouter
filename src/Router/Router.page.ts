import { RouterModel } from './Router.model';
import { IRouterPage } from './Router.interface';

export class RouterPage<TRouteData = any> {
	public static lastPageId = 0;
	public static get nextPageId(): string {
		return `routerPage-${++this.lastPageId}`;
	}

	public id = RouterPage.nextPageId;

	public routerModel?: RouterModel;

	constructor(
		public Component: IRouterPage<TRouteData>,
		public routeData?: TRouteData
	) {}

	public close() {
		if (!this.routerModel) return;
		this.routerModel.removePage(this);
	}
}
