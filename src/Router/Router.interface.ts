import * as React from 'react';

export type IRouterPage<TRouteData = any, TType = {}> = React.FC<{
	routeData: TRouteData;
} & TType>;
