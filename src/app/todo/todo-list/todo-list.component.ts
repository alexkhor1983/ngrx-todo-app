import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Todo, TodoState } from '../../state-management/todo.state';
import { addTodo, toggleTodo } from '../../state-management/todo.actions';
import { CommonModule } from '@angular/common';
import { todoSelector } from '../../state-management/todo.reducers';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})

export class TodoListComponent {
  constructor(private store: Store<TodoState>) {}
  
  todos$ = this.store.select(todoSelector);
  newTodoText: string = '';

  addTodo() {
    console.log(this.newTodoText);
    if (this.newTodoText.trim().length > 0) {
      this.store.dispatch(addTodo({ text: this.newTodoText }));
      this.newTodoText = '';
    }
  }

  toggleTodo(todo: Todo) {
    this.store.dispatch(toggleTodo({ id: todo.id }));
  }
}