import { EventEmitter } from '../Utils/EventEmitter';
import { IRouterPage } from './Router.interface';
import { RouterPage } from './Router.page';

type IEvents = 'changed' | '' | '*';

export interface IRouterModelData {
	rootPage?: RouterPage;
	pages: RouterPage[];
}

export class RouterModel extends EventEmitter<IEvents> {
	public static lastPageId = 0;
	public static nextPageId(): string {
		return `routerPage-${++this.lastPageId}`;
	}

	public get nextPageId() {
		return RouterModel.nextPageId;
	}

	public data: IRouterModelData = {
		pages: []
	};

	public get rootPage(): RouterPage | undefined {
		return this.data.rootPage;
	}
	public get pages() {
		return this.data.pages || [];
	}
	protected _lastRootPage: RouterPage | undefined;
	protected _lastPages: RouterPage[] | undefined;
	protected _lastAllPages: RouterPage[] | undefined;

	public get allPages() {
		const rootPage = this.rootPage;
		const pages = this.pages;
		if (
			rootPage === this._lastRootPage &&
			pages === this._lastPages &&
			this._lastAllPages
		) {
			return this._lastAllPages;
		}
		this._lastRootPage = rootPage;
		this._lastPages = pages;

		const allPages = rootPage ? [rootPage, ...pages] : pages;

		this._lastAllPages = allPages;

		return allPages;
	}

	public updateData(data: Partial<IRouterModelData>) {
		this.data = {
			...this.data,
			...data
		};
		this.emit('changed');
	}

	public async createPage<TRouteData>(
		component: IRouterPage<TRouteData>,
		routeData?: TRouteData
	): Promise<RouterPage> {
		return new RouterPage(component, routeData);
	}

	public async setRootPage<TRouteData>(
		componentOrPage: IRouterPage<TRouteData> | RouterPage,
		routeData?: TRouteData
	): Promise<RouterPage> {
		if (!(componentOrPage instanceof RouterPage)) {
			componentOrPage = await this.createPage(componentOrPage, routeData);
		}
		const rootPage = componentOrPage;
		if (rootPage === this.rootPage) return rootPage;
		rootPage.routerModel = this;
		this.updateData({
			rootPage
		});
		return rootPage;
	}

	public async pushPage<TRouteData>(
		componentOrPage: IRouterPage<TRouteData> | RouterPage,
		routeData?: TRouteData
	): Promise<RouterPage> {
		if (!(componentOrPage instanceof RouterPage)) {
			componentOrPage = await this.createPage(componentOrPage, routeData);
		}
		const page = componentOrPage;
		page.routerModel = this;
		this.updateData({
			pages: [...this.pages, page]
		});
		return page;
	}

	public async removePage(page: RouterPage) {
		this.updateData({
			pages: this.pages.filter((_page) => _page !== page)
		});
	}

	public async popPage() {
		const pages = [...this.pages];
		pages.pop();
		this.updateData({
			pages
		});
	}

	public async popToRoot() {
		this.updateData({
			pages: [],
		});
	}

	public isPageExists(page: RouterPage) {
		return !!this.pages.find((_page) => _page === page);
	}
}
