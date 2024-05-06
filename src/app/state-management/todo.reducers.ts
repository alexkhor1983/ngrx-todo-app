import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { initialState, Todo, TodoState } from './todo.state';
import { addTodo, toggleTodo } from './todo.actions';

const _todoReducer = createReducer(
  initialState,
  on(addTodo, (state, { text }) => {
    console.log('Adding todo with text:', text);
    return {
      ...state,
      todos: [...state.todos, { id: Date.now().toString(), text, completed: false }]
    };
  }),
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

const getTodoState = createFeatureSelector<TodoState>('todo');

export const getTodoList = createSelector(getTodoState,
  (state : TodoState) => state.todos,
);