import { NgClass } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { Tag } from '../shared/tag';
import { TagEvernoteService } from '../shared/tag-evernote.service';

@Component({
  selector: 'en-search-tags',
  standalone: true,
  imports: [NgClass],
  templateUrl: './search-tags.component.html',
  styles: ``
})
export class SearchTagsComponent {
  keyup = new EventEmitter <string>();
  foundTags: Tag[] = []; 
  isLoading:boolean = false;
  @Output() tagSelected:EventEmitter<Tag> = new EventEmitter<Tag>();

  constructor(private en: TagEvernoteService){

  }

  ngOnInit(): void {
    this.keyup
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(tap(() => this.isLoading = true))
      .pipe(switchMap(searchTerm => this.en.getAllSearch(searchTerm)))
      .pipe(tap(() => this.isLoading = false))
      .subscribe((tags) => {
        this.foundTags = tags;
        console.log(tags);
      });
  }


}
