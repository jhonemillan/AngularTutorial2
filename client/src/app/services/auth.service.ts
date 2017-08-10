import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
 
  domain = "http://localhost:3000"

  constructor(private http: Http) { }


   // Function to register user accounts
  registerUser(user) {
    // var headers =   new Headers();
    // headers.append('Content-Type', 'application/json');
    return this.http.post(this.domain + '/authentication/register', user)
              .map(res => res.json());
  }

}
