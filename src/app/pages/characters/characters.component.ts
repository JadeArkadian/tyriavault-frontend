import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-characters',
  imports: [],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersComponent { }
