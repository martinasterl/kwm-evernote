import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Tag } from '../shared/tag';
import { TagFactory } from '../shared/tag-factory';
import { TagEvernoteService } from '../shared/tag-evernote.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'en-tag-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tag-details.component.html',
  styles: ``
})
export class TagDetailsComponent implements OnInit{
  tag:Tag = TagFactory.empty();

  constructor(
    private en:TagEvernoteService,
    private route:ActivatedRoute,
    private router:Router,
    private toastr: ToastrService,
    public authService: AuthenticationService
  ){}

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.en.getSingle(Number(params['id'])).subscribe((t:Tag) => this. tag=t);
  }

  removeTag(){
    if(confirm("Tag wirklich löschen?")){
      this.en.remove(this.tag.id).subscribe(
        ()=>{
          this.router.navigate(['../'], {relativeTo:this.route});
          this.toastr.success('Tag gelöscht!', 'KWM-Evernote');
        }
      )
    }
  }
}
