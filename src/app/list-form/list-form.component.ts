import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListFactory } from '../shared/list-factory';
import { ListEvernoteService } from '../shared/list-evernote.service';
import { ActivatedRoute, Router } from '@angular/router';
import { List } from '../shared/list';
import { ListFormErrorMessages } from './list-form-error-messages';
import { Todo } from '../shared/todo';
import { Tag } from '../shared/tag';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'en-list-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './list-form.component.html',
  styles: ``
})

export class ListFormComponent implements OnInit{
  listForm : FormGroup;
  list = ListFactory.empty();
  isUpdatingList:boolean = false;
  notes: FormArray;
  errors: {[key:string]:string} = {};
  todos: Todo[] = [];
  selectedTodos: FormControl = new FormControl();
  tags: Tag[] = [];
  selectedTags: FormControl = new FormControl();
  

  constructor(
    private fb:FormBuilder,
    private en:ListEvernoteService,
    private route:ActivatedRoute,
    private router:Router,
    private http:HttpClient
  ){
    this.listForm = this.fb.group({});
    this.notes = this.fb.array([]);

      // Tododaten von der API abrufen
      this.http.get<any[]>('http://kwm-evernote.s2110456028.student.kwmhgb.at/api/todos')
      .subscribe(todos => {
        this.todos = todos;
      });
  
      // Tagdaten von der API abrufen
      this.http.get<any[]>('http://kwm-evernote.s2110456028.student.kwmhgb.at/api/tags')
      .subscribe(tags => {
        this.tags = tags;
      });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if(id){
      //updating existing list
      this.isUpdatingList = true;
      this.en.getSingle(id).subscribe(list => {
        this.list = list;
        this.initList(); // Initialisiert das Formular mit Listeninformationen
      });
    } 
    this.initList(); // Initialisiert das Formular ohne spezifische Listeninformationen
  }

  
  initList(): void{
      this.buildNotesArray();
      this.listForm = this.fb.group({
        id: this.list.id,
        name: [this.list.name, Validators.required],
        isPublic: this.list.isPublic,
        notes: this.notes
      });

      // Abonnieren von Statusänderungen im Formular, um Fehlermeldungen zu aktualisieren
      this.listForm.statusChanges.subscribe(()=> this.updateErrorMessages());
  }

  private buildNotesArray(){
      if(this.list.notes){
        this.notes = this.fb.array([]);

        for(let note of this.list.notes){
          let fg = this.fb.group({
            note_id: this.fb.control(note.id),
            title: this.fb.control(note.title),
            description: this.fb.control(note.description),
            image: this.fb.control(note?.image),
            tags: this.fb.control(note.tags),
            todos: this.fb.control(note.todos),
            list_id: this.fb.control(note.list_id)
          });
          this.notes.push(fg);
        }
        if(this.list.notes.length == 0){
          this.addNotesControl();
        }
      }else{
        this.addNotesControl();
      }
  }

  addNotesControl(){
    this.notes.push(
      this.fb.group({
        note_id: 0,
        title: null,
        description: null, 
        image: null,  
        tags: [],
        todos: [],
        list_id: this.list.id   
      })
    );
  }

  private updateErrorMessages(){
    this.errors = {};
    for(const message of ListFormErrorMessages){
      const control = this.listForm.get(message.forControl);
      if(control && control.dirty && control.invalid && control.errors && control.errors[message.forValidator] && !this.errors[message.forControl]){
        this.errors[message.forControl] = message.text;
      }
    }
  }

  submitForm(){
    this.listForm.value.notes = this.listForm.value.notes.filter((notes:{title:string}) => notes.title);

    const list = ListFactory.fromObject(this.listForm.value);

    if(this.isUpdatingList){
      console.log(list);
      this.en.update(list).subscribe(()=>{
        this.router.navigate(['../../lists', list.id], {relativeTo:this.route});
      });
    }else{
      console.log(list);
      this.en.create(list).subscribe(()=>{
        this.list = ListFactory.empty();
        this.listForm.reset(ListFactory.empty());
        this.router.navigate(['../lists'], {relativeTo:this.route});
      });
    }
  }


}
