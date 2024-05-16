import { Component, Input } from '@angular/core';
import { Todo } from '../shared/todo';

@Component({
  selector: 'a.en-todo-list-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-list-item.component.html',
  styles: ``
})
export class TodoListItemComponent {
  @Input() todo:Todo | undefined;
}
