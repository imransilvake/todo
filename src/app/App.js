// react
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// app
import AppRouter from './AppRouter';
import LinearProgress from '@material-ui/core/LinearProgress';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

// theme setting
const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#6fb98f',
			contrastText: '#ffffff'
		},
		error: {
			main: '#e74c3c'
		}
	}
});

const App = () => {
	return (
		<MuiThemeProvider theme={theme}>
			<React.Suspense fallback={<LinearProgress />}>
				<BrowserRouter>
					{/* Header */}

					<AppRouter />

					{/* Footer */}
				</BrowserRouter>
			</React.Suspense>
		</MuiThemeProvider>
	);
};
export default App;
