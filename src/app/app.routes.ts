import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListListComponent } from './list-list/list-list.component';
import { ListDetailsComponent } from './list-details/list-details.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { ListFormComponent } from './list-form/list-form.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagDetailsComponent } from './tag-details/tag-details.component';
import { TagFormComponent } from './tag-form/tag-form.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { LoginComponent } from './login/login.component';
import { canNavigateToUserGuard } from './can-navigate-to-user.guard';

export const routes: Routes = [
    {path:'', redirectTo:'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'lists', component: ListListComponent},
    {path: 'lists/:id', component: ListDetailsComponent},
    {path: 'admin', component: ListFormComponent, canActivate:[canNavigateToUserGuard]},
    {path: 'admin/:id', component: ListFormComponent, canActivate:[canNavigateToUserGuard]},

    {path: 'todos', component: TodoListComponent},
    {path: 'todos/:id', component: TodoDetailsComponent},
    {path: 'todosform', component: TodoFormComponent, canActivate:[canNavigateToUserGuard]},
    {path: 'todosform/:id', component: TodoFormComponent, canActivate:[canNavigateToUserGuard]},

    {path: 'tags', component: TagListComponent},
    {path: 'tags/:id', component: TagDetailsComponent},
    {path: 'tagform', component: TagFormComponent, canActivate:[canNavigateToUserGuard]},
    {path: 'tagform/:id', component: TagFormComponent, canActivate:[canNavigateToUserGuard]},

    {path: 'login', component: LoginComponent}
           
];
