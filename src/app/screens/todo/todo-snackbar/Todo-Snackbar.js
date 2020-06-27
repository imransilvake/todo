// react
import React from 'react';

// app
import { Button, IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

/**
 * snackbar for todoItem
 * @param openSnackbar
 * @param todoCloseSnackbar
 * @returns {*}
 * @constructor
 */
const TodoSnackbar = ({ openSnackbar, todoCloseSnackbar }) => {
	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left'
			}}
			open={openSnackbar}
			autoHideDuration={5000}
			onClose={todoCloseSnackbar}
			message="New Todo is added successfully."
			action={(
				<>
					<Button color="secondary" id="undo" onClick={todoCloseSnackbar}>
						UNDO
					</Button>
					<IconButton aria-label="close" color="inherit" onClick={todoCloseSnackbar}>
						<CloseIcon fontSize="small" />
					</IconButton>
				</>
			)} />
	);
};
export default TodoSnackbar;
