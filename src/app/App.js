// react
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// app
import AppRouter from './AppRouter';

function App() {
	return (
		<BrowserRouter>
			{/* Header */}

			<AppRouter/>

			{/* Footer */}
		</BrowserRouter>
	);
}
export default App;
