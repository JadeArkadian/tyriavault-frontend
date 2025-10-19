import { inject, Pipe, PipeTransform } from '@angular/core';
import { LocalizedText } from '../interfaces/api-responses';
import { TranslocoService } from '@jsverse/transloco';

/**
 * Pipe to be used with LocalizedText objects
 * Since the input data stays the same (A Json with a member for each language), we need to make this
 * pipe impure
 */
@Pipe({
  name: 'localizedText',
  standalone: true,
  pure: false,
})
export class LocalizedTextPipe implements PipeTransform {

  private readonly translocoService = inject(TranslocoService);

  /**
   * The transform method.
   * Prints the language dictated by the TranslocoService
   * @param value A valid LocalizedText object
   * @returns 
   */
  public transform(value: LocalizedText): string {   
    if (!value) {
      return '';
    }

    const activeLang = this.translocoService.getActiveLang() as keyof LocalizedText;

    if (Object.hasOwn(value, activeLang)) {
      return value[activeLang];
    }

    // Not found? Well... return the first one found and if not, just an empty string
    return value.en || value.es || value.fr || value.de || '';
  }
}
