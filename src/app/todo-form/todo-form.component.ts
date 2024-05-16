import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { TodoFactory } from '../shared/todo-factory';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoEvernoteService } from '../shared/todo-evernote.service';
import { User } from '../shared/user';
import { HttpClient } from '@angular/common/http';
import { Note } from '../shared/note';
import { Tag } from '../shared/tag';


@Component({
  selector: 'en-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styles: ``
})
export class TodoFormComponent implements OnInit{
  todoForm:FormGroup;
  todo = TodoFactory.empty();
  isUpdatingTodo:boolean=false;
  users: User[] = [];
  selectedUser: FormControl = new FormControl();
  notes: Note[] = [];
  selectedNotes: FormControl = new FormControl();
  tags: Tag[] = [];
  selectedTags: FormControl = new FormControl();
  
  constructor(
    private fb:FormBuilder,
    private en:TodoEvernoteService,
    private route:ActivatedRoute,
    private router:Router,
    private http:HttpClient
  ){
    this.todoForm = this.fb.group({});
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if(id){
      this.isUpdatingTodo = true;
      this.en.getSingle(id).subscribe(todo => {
        this.todo = todo;
        this.initTodo();
      });
    }
    this.initTodo();

    // Benutzerdaten von der API abrufen
    this.http.get<any[]>('http://kwm-evernote.s2110456028.student.kwmhgb.at/api/users')
    .subscribe(users => {
      this.users = users;
    });

    // Notizdaten von der API abrufen
    this.http.get<any[]>('http://kwm-evernote.s2110456028.student.kwmhgb.at/api/notes')
    .subscribe(notes => {
      this.notes = notes;
    });

    // Tagdaten von der API abrufen
    this.http.get<any[]>('http://kwm-evernote.s2110456028.student.kwmhgb.at/api/tags')
    .subscribe(tags => {
      this.tags = tags;
    });
  }

  initTodo(): void{
    this.todo.isPublic = Boolean(this.todo.isPublic);
    console.log('Converted isPublic:', this.todo.isPublic);
    console.log('Todo: ', this.todo);

    this.todoForm = this.fb.group({
      id: this.todo.id,
      title: [this.todo.title, Validators.required],
      description: [this.todo.description],
      dueDate: [this.todo.dueDate, Validators.required],
      isPublic: [this.todo.isPublic],
      image: [this.todo.image],
      note_id: [this.todo.note_id],
      user_id: [this.todo.user_id],
      tags: [this.todo.tags]
    });
  }

  submitForm(){
    const todo = TodoFactory.fromObject(this.todoForm.value);

    if(this.isUpdatingTodo){
      this.en.update(todo).subscribe(()=>{
        this.router.navigate(['../../todos', todo.id], {relativeTo:this.route});
      });
    }else{
      console.log(todo);
      this.en.create(todo).subscribe(()=>{
        this.todo = TodoFactory.empty();
        this.todoForm.reset(TodoFactory.empty());
        this.router.navigate(['../todos'], {relativeTo:this.route});
      });
    }
  }
}
