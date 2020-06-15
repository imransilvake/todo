// react
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// app
import ENV from '../environment/index';
import Error404 from './screens/404/Error404';
import Todo from './screens/todo/Todo';

const AppRouter = () => {
	return (
		<Switch>
			<Route exact path={ENV().ROUTING.TODO} component={Todo}/>
			<Route exact from="*" component={Error404}/>
		</Switch>
	);
};
export default AppRouter;
