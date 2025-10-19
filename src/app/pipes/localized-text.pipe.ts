import { inject, Pipe, PipeTransform } from '@angular/core';
import { LocalizedTextResponse } from '../interfaces/api-responses';
import { TranslocoService } from '@jsverse/transloco';

/**
 * Pipe to be used with LocalizedText objects
 */
@Pipe({
  name: 'localizedText',
  standalone: true,
})
export class LocalizedTextPipe implements PipeTransform {

  private readonly translocoService = inject(TranslocoService);

  public transform(value: LocalizedTextResponse): string {
    if (!value) {
      return '';
    }

    const activeLang = this.translocoService.getActiveLang() as keyof LocalizedTextResponse;

    if (Object.prototype.hasOwnProperty.call(value, activeLang)) {
      return value[activeLang];
    }

    // Not found? Well... return the first one found and if not, just an empty string
    return value.en || value.es || value.fr || value.de || '';
  }

}
