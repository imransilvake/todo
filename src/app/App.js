// react
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// app
import AppRouter from './AppRouter';

// redux store
const store = createStore(() => {}, composeWithDevTools());

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<React.Fragment>
						{/* Header */}

						<AppRouter/>

						{/* Footer */}
					</React.Fragment>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default withTranslation()(App);
