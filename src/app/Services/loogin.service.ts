import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LooginService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  // readonly BaseURI = ' http://school.wothoq.co/api';

  // tslint:disable-next-line:typedef
  userAuth(email: string, password: number) {

    var data = { email: email, password: password };

    return this.http.post('https://school.wothoq.co/api/admin/login', data);
  }
  // tslint:disable-next-line:typedef
  


  login(token) {
    localStorage.setItem('usertoken', token);
    console.log(token);
  }
  // tslint:disable-next-line:typedef
  logout() {
    localStorage.removeItem('usertoken');
    localStorage.removeItem('username');
  }
}
