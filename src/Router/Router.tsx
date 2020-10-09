import * as React from 'react';

import { RouterModel } from './Router.model';

export const routerModel = new RouterModel();

export const RouterContext = React.createContext(routerModel);

export const useRouterModel = () => {
	return React.useContext(RouterContext);
};

export const Router: React.FC<{
	children: (router: RouterModel) => void;
}> = ({ children }) => {
	const [model] = React.useState(routerModel);
	const [pages, setPages] = React.useState(model.allPages);

	React.useEffect(() => {
		const listener = model.on('changed', () => {
			setPages(model.allPages);
		});

		if (typeof children === 'function') {
			children(model);
		}

		return () => {
			listener.remove();
		};
	}, []);

	console.log('pages', pages);

	return React.useMemo(() => {
		console.log('renderrouter');
		const $pages = pages.map((page) => {
			const Component = page.Component;
			const routeData = page.routeData;
			const id = page.id;

			return <Component key={id} routeData={routeData} />;
		});

		return (
			<RouterContext.Provider value={model}>
				{$pages}
				</RouterContext.Provider>
		);
	}, [model, pages]);
};
