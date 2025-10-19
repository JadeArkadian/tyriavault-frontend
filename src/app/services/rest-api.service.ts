import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from './../../environments/environment'
import { AccountInfoResponse, TokenInfoResponse } from '../interfaces/api-responses';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private readonly apiURL = environment.apiUrl;
  private readonly httpClient = inject(HttpClient);

  public tokeninfo(apiKey:string): Observable<TokenInfoResponse> {
    const headers = this.buildHeaders(apiKey);
    return this.httpClient.get<TokenInfoResponse>(`${this.apiURL}/api/v1/common/tokeninfo`, { headers });
  }

  public accountInfo(apiKey:string): Observable<AccountInfoResponse> {
    const headers = this.buildHeaders(apiKey);
    return this.httpClient.get<AccountInfoResponse>(`${this.apiURL}/api/v1/account`, { headers });
  }

  private buildHeaders(apiKey:string) : HttpHeaders {
    return new HttpHeaders({'Authorization': `Bearer ${apiKey}`});
  }

}
