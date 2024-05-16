import { Component, Input } from '@angular/core';
import { Tag } from '../shared/tag';

@Component({
  selector: 'a.en-tag-list-item',
  standalone: true,
  imports: [],
  templateUrl: './tag-list-item.component.html',
  styles: ``
})
export class TagListItemComponent {
  @Input() tag:Tag | undefined;
}
