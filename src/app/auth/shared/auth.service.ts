import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

import 'rxjs/Rx';

class DecodedToken {
  exp: number= 0;
  userName: string = '';
}
@Injectable()
export class AuthService {
  private decodedToken;

  constructor(private http: HttpClient) {
    this.decodedToken = JSON.parse(localStorage.getItem('bwm_meta')) || new DecodedToken();
}

  private saveToke(token): string {
    this.decodedToken = jwt.decode(token);
    localStorage.setItem('bwm_auth', token);
    localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken));
    return token;
  }

  public getAuthToken(): string {
    return localStorage.getItem('bwm_auth');
  }

  public register(datauser: any): Observable<any> {
    return this.http.post('api/v1/users/register', datauser);
  }

  public login(datauser: any): Observable<any> {
    return this.http.post('api/v1/users/auth', datauser).map(
      (token) => {
        return this.saveToke(token);
      }
    );
  }

  public isAuthenticated (): boolean {
    return moment().isBefore(moment.unix(this.decodedToken.exp));
  }

  public logout() {
    localStorage.removeItem('bwm_auth');
    localStorage.removeItem('bwm_meta');
    this.decodedToken = new DecodedToken();
  }

  public getUsername(): string {
    return this.decodedToken.userName;
  }

}
