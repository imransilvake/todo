// react
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// app
import AppRouter from './AppRouter';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				{/* Header */}

				<AppRouter/>

				{/* Footer */}
			</BrowserRouter>
		);
	}
}

export default withTranslation()(App);
