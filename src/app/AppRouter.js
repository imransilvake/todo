// react
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

// app
import ENV from '../environment/index';
import Todo from './system/frame/todo/Todo';
import Component404 from './system/frame/404/Component404';

class AppRouter extends Component {
	render() {
		return (
			<Switch>
				<Route exact path={ENV.ROUTING.TODO} component={Todo}/>
				<Route exact from="*" component={Component404}/>
			</Switch>
		);
	}
}
export default withRouter(AppRouter);
