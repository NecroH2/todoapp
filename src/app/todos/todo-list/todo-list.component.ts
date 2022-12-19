import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos:Todo[] = [];
  filtroActual:any;

  constructor (private store:Store<AppState>) {

  }

  ngOnInit(): void {

    this.store.subscribe(state => {
      this.todos = state.todos;
      this.filtroActual = state.filtro;
    })

  }

}
