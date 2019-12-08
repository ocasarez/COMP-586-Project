import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Blog } from '../models/blog';
import apiRoutes from '../APIs/api.routes';
import { OktaAuthService } from '@okta/okta-angular';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService{
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

  getBlogPosts(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.myAppUrl + this.apiBase + apiRoutes.getAllBlogs)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getBlogPost(id: number): Observable<Blog> {
    return this.http.get<Blog>(this.myAppUrl + this.apiBase + apiRoutes.getBlog + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveBlogPost(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.myAppUrl + this.apiBase + apiRoutes.createBlog, JSON.stringify(blog), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
  
  deletePost(id: number): Observable<Blog> {
    return this.http.delete<Blog>(this.myAppUrl + this.apiBase + apiRoutes.deleteBlog + id, this.httpOptions)
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
