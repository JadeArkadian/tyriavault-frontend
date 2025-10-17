import { ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';
import { NgClass } from '@angular/common';
import { finalize } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [NgClass, ReactiveFormsModule],
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  //- Injects
  private readonly restApiService = inject(RestApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly formBuilder = inject(FormBuilder);
  private readonly storageService = inject(StorageService);

  //- Properties
  public isLoading = false;
  public apiKeyValid = false;
  public apiKeySaved = '';
  public errorMessage = '';

  // Format validator
  public apiKeyForm = this.formBuilder.group({
    apiKey: ['', [Validators.required, Validators.minLength(72), Validators.maxLength(72)]],
  });

  constructor() {
    effect(() => {
      const apiKey = this.storageService.apiKey();
      if (apiKey) {
        this.apiKeyValid = true;
        this.apiKeySaved = this.maskApiKey(apiKey);
      } else {
        this.apiKeyValid = false;
        this.apiKeySaved = '';
      }
      this.cdr.detectChanges();
    });
  }

  /**
   * Method called when the submit button is clicked
   * @returns
   */
  public submitApiKey(): void {
    if (this.apiKeyForm.invalid) {
      this.errorMessage = 'La clave API debe tener 72 caracteres.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    const apiKey = this.apiKeyForm.value.apiKey!;

    this.restApiService
      .tokeninfo(apiKey)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: () => {
          this.storageService.setApiKey(apiKey);
          this.apiKeyForm.reset();
        },
        error: (err: HttpErrorResponse) => {
          this.storageService.clearApiKey();
          if (err.status === 401 || err.status === 403) {
            this.errorMessage = 'La clave API es inválida o no tiene los permisos requeridos.';
          } else if (err.error?.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.';
          }
        },
      });
  }

  /**
   * Method called if the user clicks the "change button"
   */
  public changeApiKey(): void {
    this.errorMessage = '';
    this.storageService.clearApiKey();
  }

  private maskApiKey(apiKey: string): string {
    if (apiKey.length > 8) {
      return `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}`;
    }
    return apiKey;
  }
}
