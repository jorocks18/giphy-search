import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  constructor(private http: HttpClient) { }

  fetchGIF(searchedValue){
    searchedValue.replace(/ /g, '+');
    const apiKey = 'QoQgr0HfSUwCCzns6s0uu4GwOfPCEF1f';
    const url = `http://api.giphy.com/v1/gifs/search?q=${searchedValue}&api_key=${apiKey}&limit=15`;
    return this.http.get(url)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  defaultGIF(){
    const apiKey = 'QoQgr0HfSUwCCzns6s0uu4GwOfPCEF1f';
    const url = `http://api.giphy.com/v1/gifs/search?q=read&api_key=${apiKey}&limit=15`;
    return this.http.get(url)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    alert(errorMessage);
    return throwError(errorMessage);
  }
}
