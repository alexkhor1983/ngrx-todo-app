export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
}

export const initialState: TodoState = {
  todos: [{id: '1', text: 'Learn Angular', completed: false}],
};