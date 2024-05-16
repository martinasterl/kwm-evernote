import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TagFactory } from '../shared/tag-factory';
import { ActivatedRoute, Router } from '@angular/router';
import { TagEvernoteService } from '../shared/tag-evernote.service';

@Component({
  selector: 'en-tag-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tag-form.component.html',
  styles: ``
})
export class TagFormComponent implements OnInit{
  tagForm:FormGroup;
  tag = TagFactory.empty();
  isUpdatingTag:boolean=false;
  
  constructor(
    private fb:FormBuilder,
    private en:TagEvernoteService,
    private route:ActivatedRoute,
    private router:Router
  ){
    this.tagForm = this.fb.group({});
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if(id){
      this.isUpdatingTag = true;
      this.en.getSingle(id).subscribe(tag => {
        this.tag = tag;
        this.initTag();
      });
    }
    this.initTag();
  }

  initTag(): void{
    this.tagForm = this.fb.group({
      id: this.tag.id,
      name: [this.tag.name, Validators.required]
    });
  }

  submitForm(){
    const tag = TagFactory.fromObject(this.tagForm.value);

    if(this.isUpdatingTag){
      this.en.update(tag).subscribe(()=>{
        this.router.navigate(['../../tags', tag.id], {relativeTo:this.route});
      });
    }else{
      console.log(tag);
      this.en.create(tag).subscribe(()=>{
        this.tag = TagFactory.empty();
        this.tagForm.reset(TagFactory.empty());
        this.router.navigate(['../tags'], {relativeTo:this.route});
      })
    }
  }
}
