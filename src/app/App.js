// react
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// app
import AppRouter from './AppRouter';

const App = () => {
	return (
		<React.Suspense fallback={<div><h1>Loading...</h1></div>}>
			<BrowserRouter>
				{/* Header */}

				<AppRouter />

				{/* Footer */}
			</BrowserRouter>
		</React.Suspense>
	);
};
export default App;
