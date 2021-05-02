import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/internal/operators/share';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  getPosts(): Observable<object> {
    return this.httpClient.get('https://jsonplaceholder.typicode.com/posts').pipe(share());;
  }

  getComments(): Observable<object> {
    return this.httpClient.get('https://jsonplaceholder.typicode.com/comments');
  }

  getUsers(): Observable<object> {
    return this.httpClient.get('https://jsonplaceholder.typicode.com/users');
  }


}
