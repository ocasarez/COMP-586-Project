import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import apiRoutes from '../APIs/api.routes';
import { OktaAuthService } from '@okta/okta-angular';

@Injectable({
  providedIn: 'root'
})
export class OktaApiService {
  myAppUrl: string;
  apiBase = apiRoutes.root + apiRoutes.version;


  constructor(private http: HttpClient, public oktaAuth: OktaAuthService) { 
    this.myAppUrl = environment.appUrl;
  }

  getUsersFromViewersGroup(): Observable<any[]>{
    return this.http.get<any[]>(this.myAppUrl + this.apiBase + apiRoutes.ViewersGroup)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getUsersFromAuthorsGroup(): Observable<any[]>{
    return this.http.get<any[]>(this.myAppUrl + this.apiBase + apiRoutes.AuthorsGroup)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );

  }

  grantAuthorAccess(id: string) {
    return this.http.put(this.myAppUrl + this.apiBase + apiRoutes.AuthorAccess + id, null)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  removeAuthorAccess(id: string) {
    return this.http.delete(this.myAppUrl + this.apiBase + apiRoutes.RevokeAccess + id)
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
