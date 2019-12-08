import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import apiRoutes from '../APIs/api.routes';
import { OktaAuthService } from '@okta/okta-angular';
import { Author } from '../models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  myAppUrl: string;
  apiBase = apiRoutes.root + apiRoutes.version;
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient, public oktaAuth: OktaAuthService) {
    this.myAppUrl = environment.appUrl;
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.myAppUrl + this.apiBase + apiRoutes.getAllAuthors)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
  }
  
  createAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(this.myAppUrl + this.apiBase + apiRoutes.createAuthor, JSON.stringify(author), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteAuthor(username: string): Observable<Author>{
    return this.http.delete<Author>(this.myAppUrl + this.apiBase + apiRoutes.deleteAuthors + username, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
