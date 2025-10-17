
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RestApiService } from './rest-api.service';
import { environment } from './../../environments/environment';
import { TokeninfoResponse } from '../interfaces/api-responses';

describe('RestApiService', () => {
  let service: RestApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestApiService],
    });
    service = TestBed.inject(RestApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Make sure that there are no outstanding requests.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('tokeninfo', () => {
    it('should call the tokeninfo endpoint with the correct headers', () => {
      const dummyApiKey = 'test-api-key';
      const dummyResponse: TokeninfoResponse = {
        id: 'test-id',
        name: 'Test Key',
        permissions: ['account', 'characters'],
      };

      service.tokeninfo(dummyApiKey).subscribe((response) => {
        expect(response).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/api/v1/common/tokeninfo`);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe(`Bearer ${dummyApiKey}`);

      req.flush(dummyResponse);
    });
  });
});
