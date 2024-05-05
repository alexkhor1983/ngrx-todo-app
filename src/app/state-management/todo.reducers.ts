import { createReducer, createSelector, on } from '@ngrx/store';
import { initialState, Todo, TodoState } from './todo.state';
import { addTodo, toggleTodo } from './todo.actions';

const _todoReducer = createReducer(
  initialState,
  on(addTodo, (state, { text }) => ({
    ...state,
    todos: [...state.todos, { id: Date.now().toString(), text, completed: false }]
  })),
  on(toggleTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  }))
);

export function todoReducer(state: TodoState | undefined, action: any): TodoState {
  return _todoReducer(state || initialState, action);
}

export const todoSelector = createSelector(
  (state: TodoState) => state.todos,
  (todos : Todo[]) => todos
);