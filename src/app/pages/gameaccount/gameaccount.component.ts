import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';
import { StorageService } from '../../services/storage.service';
import { finalize } from 'rxjs';
import { AccountInfoResponse } from '../../interfaces/api-responses';
import { DatePipe } from '@angular/common';
import { LocalizedTextPipe } from '../../pipes/localized-text.pipe';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-gameaccount',
  imports: [DatePipe, LocalizedTextPipe],
  standalone: true,
  templateUrl: './gameaccount.component.html',
  styleUrl: './gameaccount.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class GameaccountComponent implements OnInit {
  //- Injects
  private readonly restApiService = inject(RestApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly storageService = inject(StorageService);

  //- Properties
  public isLoading = false;
  public accountData!: AccountInfoResponse;

  /**
   * On Init event
   */
  public ngOnInit(): void {
    console.debug('GameaccountComponent initialized');
    const apiKey = this.storageService.apiKey();

    // Got the apikey? Ok, lets call the backend service
    this.getAccountInfo(apiKey);
  }

  private getAccountInfo(apiKey: string | undefined): void {
    // Add a loading check just to avoid machine gun like calls
    if (apiKey && !this.isLoading) {
      this.isLoading = true;
      this.restApiService
        .accountInfo(apiKey)
        .pipe(
          finalize(() => {
            this.isLoading = false;
            this.cdr.detectChanges();
          })
        )
        .subscribe({
          next: (response) => {
            this.accountData = response;
            console.debug(response);
          },
          error: (err) => {
            console.debug(err);
          },
        });
    }
  }
}
