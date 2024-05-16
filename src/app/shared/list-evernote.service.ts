import { Injectable } from '@angular/core';
import { List } from './list';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListEvernoteService {
  private api = 'http://kwm-evernote.s2110456028.student.kwmhgb.at/api';

  constructor(private http:HttpClient) {}

   getAll():Observable<Array<List>>{
    return this.http.get<Array<List>>(`${this.api}/lists`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler))
   }

   getSingle(id:number):Observable<List>{
    return this.http.get<List>(`${this.api}/lists/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler))
   }

   private errorHandler(error:Error | any): Observable<any>{
    return throwError(error);
   };

   remove(id:number):Observable<any>{
    return this.http.delete(`${this.api}/lists/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler))
   }

   removeNote(id:number):Observable<any>{
    return this.http.delete(`${this.api}/notes/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler))
   }

   removeTodo(id:number):Observable<any>{
    return this.http.delete(`${this.api}/todos/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler))
   }

   getAllSearch(searchTerm:string):Observable<Array<List>>{
    return this.http.get<Array<List>>(`${this.api}/lists/search/${searchTerm}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler))
   }

   create(list:List):Observable<any>{
    return this.http.post(`${this.api}/lists`, list)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler))
   }

   update(list:List):Observable<any>{
    return this.http.put(`${this.api}/lists/${list.id}`, list)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler))
   }
   
}
