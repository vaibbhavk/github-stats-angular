import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { Repo } from 'src/interfaces/repo';
import { Profile } from 'src/interfaces/profile';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor( private http: HttpClient) { }

  private ROOT_URL = 'https://gc8591.deta.dev/api/v1/github';

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getProfile(): Observable<any> {
    return this.http.get(this.ROOT_URL + "/user/?username=vaibbhavk")
    .pipe(
      catchError(this.handleError<any>('getProfile', {}))    
      )
  }

  getRepos(): Observable<Repo[]> {
    return this.http.get<Repo[]>(this.ROOT_URL + "/repos/?username=vaibbhavk")
    .pipe(
      catchError(this.handleError<Repo[]>('getRepos', []))
    )
  }
}


