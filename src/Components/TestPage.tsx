import * as React from 'react';
import styled from 'styled-components';
import {IRouterPage} from "../Router/Router.interface";

export const TestPage: IRouterPage = () => {
	return (
		<TextPageElement>
			Test page
		</TextPageElement>
	);
}

export const TextPageElement = styled.div``;
