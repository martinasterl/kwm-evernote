import { Component, OnInit } from '@angular/core';
import { ListEvernoteService } from '../shared/list-evernote.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { List, User } from '../shared/list';
import { ListFactory } from '../shared/list-factory';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Note, Todo } from '../shared/tag';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'en-list-details',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './list-details.component.html',
  styles: ``
})
export class ListDetailsComponent implements OnInit{
  list:List = ListFactory.empty();
  todos: Todo[] = [];
  users: User[] = [];
  notes: Note[] = [];

  constructor(
    private en:ListEvernoteService, 
    private route:ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private http:HttpClient,
    public authService: AuthenticationService
  ){}

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.en.getSingle(Number(params['id'])).subscribe((l:List) => this.list=l);

    // Tododaten von der API abrufen
    this.http.get<any[]>('http://kwm-evernote.s2110456028.student.kwmhgb.at/api/todos')
    .subscribe(todos => {
      this.todos = todos;
    });

    // Userdaten von der API abrufen
    this.http.get<any[]>('http://kwm-evernote.s2110456028.student.kwmhgb.at/api/users')
    .subscribe(users => {
      this.users = users;
    });

    // Notizdaten von der API abrufen
    this.http.get<any[]>('http://kwm-evernote.s2110456028.student.kwmhgb.at/api/notes')
    .subscribe(notes => {
      this.notes = notes;
    });
  }

  removeList(){
    if(confirm("Liste wirklich löschen?")){
      this.en.remove(this.list.id).subscribe(
          ()=> {
            this.router.navigate(['../'], {relativeTo:this.route});
            this.toastr.success('Liste gelöscht!', 'KWM-Evernote');
          }
      );
    }
  }

  deleteNote(noteId: number){
    if(confirm("Notiz wirklich löschen?")){
      this.en.removeNote(noteId).subscribe(
        ()=> {
          this.router.navigate(['../'], {relativeTo:this.route});
          this.toastr.success('Notiz gelöscht!', 'KWM-Evernote');
        }
      );
    }
  }

  deleteTodo(todoId: number){
    if(confirm("Todo wirklich löschen?")){
      this.en.removeTodo(todoId).subscribe(
        ()=> {
          this.router.navigate(['../'], {relativeTo:this.route});
          this.toastr.success('Todo gelöscht!', 'KWM-Evernote');
        }
      );
    }
  }
}
