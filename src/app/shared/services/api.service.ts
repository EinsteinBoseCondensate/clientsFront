import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppSettingsService } from './app-settings.service';
@Injectable({
    providedIn: 'root',
  })
  export class ApiService {
  
    constructor(
      private http: HttpClient) { }
  
    private setHeaders(): HttpHeaders {
      const headersConfig = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': 'no-store, no-cache'
      };
  
      
  
      return new HttpHeaders(headersConfig);
    }
  
    private formatErrors(response: HttpErrorResponse | any) {
      const applicationError = response.headers.get('Application-Error');
  
      if (applicationError) {
        return throwError(applicationError);
      }
  
      switch (response.status) {
        case 0:
          return new Error("Backend offline: "+JSON.stringify(response));
        case 400:
          return new Error("BadRequest: "+JSON.stringify(response));
        case 401:
          return new Error("Unathorized: "+JSON.stringify(response));
        case 403:
          return new Error("Forbiden: "+JSON.stringify(response));
        case 404:
          return new Error("NotFound: "+JSON.stringify(response));
        case 500:
          return new Error("InternalServerError: "+JSON.stringify(response));
        default:
          return new Error("UnknownError: "+JSON.stringify(response));
      }
    }
  
    get(path: string, params: any = new HttpParams()): Observable<any> {
      return this.http.get(`${AppSettingsService.settings.apiUrl}${path}`, { headers: this.setHeaders(), params: params })
        .pipe(          
          catchError(async (error: HttpErrorResponse) => this.formatErrors(error))
        );
    }
  
    getBlob(path: string, params: any = new HttpParams()): Observable<any> {
      return this.http.get(`${AppSettingsService.settings.apiUrl}${path}`, { observe: 'response', responseType: "blob" , params: params });
    }
  
    put(path: string, body: Object = {}): Observable<any> {
      return this.http.put(`${AppSettingsService.settings.apiUrl}${path}`, JSON.stringify(body), { headers: this.setHeaders() })
        .pipe(
          map((res: Object) => res),
          catchError(async (error: HttpErrorResponse) => this.formatErrors(error))
        );
    }
  
    post(path: string, body: Object = {}): Observable<any> {
      return this.http.post(`${AppSettingsService.settings.apiUrl}${path}`, JSON.stringify(body), { headers: this.setHeaders() })
        .pipe(
          map((res: Object) => res),
          catchError(async(error: HttpErrorResponse) => this.formatErrors(error))
        );
    }
  
    
    delete(path: string): Observable<any> {
      return this.http.delete(`${AppSettingsService.settings.apiUrl}${path}`, { headers: this.setHeaders() })
        .pipe(
          map((res: Object) => res),
          catchError(async (error: HttpErrorResponse) => this.formatErrors(error))
        );
    }
  }
  