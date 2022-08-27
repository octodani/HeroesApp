import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable, tap, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL: string = environment.baseUrl;
  private _auth: Auth | undefined;

  constructor(private http: HttpClient) { }

  verificarAutenticacion(): Observable<boolean> {
    if(!localStorage.getItem('token')) {
      return of(false);
    }
    return this.http.get<Auth>(`${this.baseURL}/usuarios/1`)
      .pipe(
        map(auth => {
          this._auth = auth;
          return true;
        })
      )
  }

  get auth(): Auth {
    return {...this._auth!};
  }

  login() {
    return this.http.get<Auth>(`${this.baseURL}/usuarios/1`)
    .pipe(
      tap(auth => this._auth = auth),
      tap(auth => localStorage.setItem('token', auth.id))
    );
  }
}
