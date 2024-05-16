import { Component, OnInit } from '@angular/core';
import { List } from '../shared/list';
import { ListListItemComponent } from '../list-list-item/list-list-item.component';
import { ListEvernoteService } from '../shared/list-evernote.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'en-list-list',
  standalone: true,
  imports: [ListListItemComponent, RouterLink],
  templateUrl: './list-list.component.html',
  styles: ``
})
export class ListListComponent implements OnInit{
  lists: List[] = [];

  constructor(private en:ListEvernoteService){}

  ngOnInit(){
    this.en.getAll().subscribe(res => this.lists = res);
  }

}
