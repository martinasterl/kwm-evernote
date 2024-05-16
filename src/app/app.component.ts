import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ListListComponent } from './list-list/list-list.component';
import { ListDetailsComponent } from './list-details/list-details.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagDetailsComponent } from './tag-details/tag-details.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './shared/authentication.service';

@Component({
  selector: 'en-root',
  standalone: true,
  imports: [RouterOutlet, ListListComponent, ListDetailsComponent, TodoListComponent, TodoDetailsComponent, TagListComponent, TagDetailsComponent, LoginComponent, RouterLink, RouterLinkActive ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private authService: AuthenticationService){}

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getLoginLabel(){
    if(this.isLoggedIn()){
      return "Logout";
    }else{
      return "Login";
    }
  }
}
