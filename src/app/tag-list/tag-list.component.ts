import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TagListItemComponent } from '../tag-list-item/tag-list-item.component';
import { Tag } from '../shared/tag';
import { TagEvernoteService } from '../shared/tag-evernote.service';

@Component({
  selector: 'en-tag-list',
  standalone: true,
  imports: [TagListItemComponent, RouterLink],
  templateUrl: './tag-list.component.html',
  styles: ``
})
export class TagListComponent implements OnInit {
  tags: Tag[] = [];

  constructor(private en: TagEvernoteService){}

  ngOnInit(): void {
    this.en.getAll().subscribe(res => this.tags = res); 
  }

}
