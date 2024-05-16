import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { List } from '../shared/list';
import { SearchTagsComponent } from '../search-tags/search-tags.component';
import { Tag } from '../shared/tag';


@Component({
  selector: 'en-home',
  standalone: true,
  imports: [ RouterLink, SearchComponent, SearchTagsComponent ],
  templateUrl: './home.component.html',
  styles: ``
})

export class HomeComponent {

  constructor(private router: Router, private route: ActivatedRoute){}

  listSelected(list: List){
    this.router.navigate(['../lists', list.id], {relativeTo: this.route})
  }

  tagSelected(tag: Tag){
    this.router.navigate(['../tags', tag.id], {relativeTo: this.route})
  }
}
