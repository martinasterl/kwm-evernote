import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface Token{
  exp: number;
  user: {
    id: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private api = 'http://kwm-evernote.s2110456028.student.kwmhgb.at/api/auth';

  constructor(private http: HttpClient) {}

  login(username:string, password:string){
    return this.http.post(`${this.api}/login`, {
      username: username,
      password: password
    });
  }

  public setSessionStorage(token:string){
    const decodedToken = jwtDecode(token) as Token;
    
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", decodedToken.user.id);
  }

  public getCurrentUserId(){
    return Number.parseInt(<string>sessionStorage.getItem("userId"));
  }

  isLoggedIn(){
    if(sessionStorage.getItem("token")){
      let token:string = <string>sessionStorage.getItem("token");
      const decodedToken = jwtDecode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      
      if(expirationDate < new Date()){
        console.log("token expired");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");
        return false;
      }

      return true;
    }else{
      return false;
    }
  }

  logout(){
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    console.log("logout out");
  }

  isLoggedOut(){
    return !this.isLoggedIn();
  }
}
