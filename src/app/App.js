// react
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// app
import AppRouter from './AppRouter';
import LinearProgress from '@material-ui/core/LinearProgress';

const App = () => {
	return (
		<React.Suspense fallback={<LinearProgress />}>
			<BrowserRouter>
				{/* Header */}

				<AppRouter />

				{/* Footer */}
			</BrowserRouter>
		</React.Suspense>
	);
};
export default App;
