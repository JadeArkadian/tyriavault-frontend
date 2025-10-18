import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gameaccount',
  imports: [],
  standalone: true,
  templateUrl: './gameaccount.component.html',
  styleUrl: './gameaccount.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameaccountComponent implements OnInit {

  
  ngOnInit(): void {
    console.log('GameaccountComponent initialized');
  }

}
