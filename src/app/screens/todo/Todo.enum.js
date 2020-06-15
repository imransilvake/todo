/**
 * Enum: CRUD Operations
 * @type {{TODO_ADD: string, TODO_NONE: string, TODO_UNDO: string, TODO_COMPLETE: string, TODO_DELETE: string}}
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
 * @type {{FILTER_PAST: string, FILTER_ALL: string, FILTER_COMPLETED: string, FILTER_TODAY: string}}
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
