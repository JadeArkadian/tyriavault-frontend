import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from './../../environments/environment'
import { AccountInfoResponse, TokenInfoResponse } from '../interfaces/api-responses';

/**
 * The Rest API Service. Its a WS client used to perform the calls to the backend part of the app
 */
@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private readonly apiURL = environment.apiUrl;
  private readonly httpClient = inject(HttpClient);

  /**
   * Call to the tokeninfo service
   * @param apiKey A valid apiKey
   * @returns
   */
  public tokeninfo(apiKey:string): Observable<TokenInfoResponse> {
    const headers = this.buildHeaders(apiKey);
    return this.httpClient.get<TokenInfoResponse>(`${this.apiURL}/api/v1/common/tokeninfo`, { headers });
  }

  /**
   * Call to the account service. Must have
   * @param apiKey 
   * @returns 
   */
  public accountInfo(apiKey:string): Observable<AccountInfoResponse> {
    const headers = this.buildHeaders(apiKey);
    return this.httpClient.get<AccountInfoResponse>(`${this.apiURL}/api/v1/account`, { headers });
  }

  private buildHeaders(apiKey:string) : HttpHeaders {
    return new HttpHeaders({'Authorization': `Bearer ${apiKey}`});
  }

}
