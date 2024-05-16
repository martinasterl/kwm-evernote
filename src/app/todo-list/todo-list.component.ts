import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todo';
import { TodoEvernoteService } from '../shared/todo-evernote.service';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'en-todo-list',
  standalone: true,
  imports: [TodoListItemComponent, RouterLink],
  templateUrl: './todo-list.component.html',
  styles: ``
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private en:TodoEvernoteService){}

  ngOnInit(): void {
    this.en.getAll().subscribe(res => this.todos = res);
  }
}
