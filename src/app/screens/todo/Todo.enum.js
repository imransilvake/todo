/**
 * Enum: CRUD Operations
 */
const TodoCrudEnum = {
	TODO_ADD: 'ADD',
	TODO_COMPLETE: 'COMPLETE',
	TODO_UNDO: 'UNDO',
	TODO_DELETE: 'DELETE',
	TODO_NONE: 'NONE'
};

/**
 * Enum: Filters
 */
const TodoFilterEnum = {
	FILTER_ALL: 'ALL',
	FILTER_TODAY: 'TODAY',
	FILTER_PAST: 'PAST',
	FILTER_COMPLETED: 'COMPLETED'
};

export {
	TodoCrudEnum,
	TodoFilterEnum
};
