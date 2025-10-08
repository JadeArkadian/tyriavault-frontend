import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment'
import { TokeninfoResponse } from '../interfaces/api-responses';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private readonly apiURL = environment.apiUrl;
  private readonly httpClient = inject(HttpClient);

  public tokeninfo(apiKey:string): Observable<TokeninfoResponse> {
    const headers = this.buildHeaders(apiKey);
    return this.httpClient.get<TokeninfoResponse>(`${this.apiURL}/api/v1/common/tokeninfo`, { headers });
  }

  private buildHeaders(apiKey:string) : HttpHeaders {
    return new HttpHeaders({'Authorization': `Bearer ${apiKey}`});
  }

}
