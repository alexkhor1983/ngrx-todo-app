import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo, TodoState } from '../../state-management/todo.state';
import { addTodo, toggleTodo } from '../../state-management/todo.actions';
import { CommonModule } from '@angular/common';
import { getTodoList } from '../../state-management/todo.reducers';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})

export class TodoListComponent implements OnInit {
  constructor(private store: Store) {}
  todos!: Observable<Todo[]> | undefined;

  ngOnInit() : void{
    this.todos = this.store.select(getTodoList);
  }
  
  newTodoText: string = '';

  performAddTodo() {
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