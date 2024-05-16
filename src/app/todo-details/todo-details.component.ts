import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todo';
import { TodoEvernoteService } from '../shared/todo-evernote.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TodoFactory } from '../shared/todo-factory';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/user';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'en-todo-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './todo-details.component.html',
  styles: ``
})

export class TodoDetailsComponent implements OnInit{
  todo:Todo = TodoFactory.empty();
  users: User[] = [];
  
  constructor(
    private en:TodoEvernoteService, 
    private route:ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private http:HttpClient,
    public authService: AuthenticationService
  ){}

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.en.getSingle(Number(params['id'])).subscribe((t:Todo) => this.todo=t);

    // Userdaten von der API abrufen
    this.http.get<any[]>('http://kwm-evernote.s2110456028.student.kwmhgb.at/api/users')
    .subscribe(users => {
      this.users = users;
    });
  }

  removeTodo(){
    if(confirm("Todo wirklich löschen?")){
      this.en.remove(this.todo.id).subscribe(
          ()=> {
            this.router.navigate(['../'], {relativeTo:this.route});
            this.toastr.success('Todo gelöscht!', 'KWM-Evernote');
          }
      );
    }
  }
}
