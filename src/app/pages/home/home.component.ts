import { Component, inject, OnInit } from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent implements OnInit {

  public restApiService = inject(RestApiService)
  
  // Variable para almacenar la clave de API introducida por el usuario
  public apiKey: string = '';


  public ngOnInit(): void {
    // Lógica de inicialización, como comprobar si ya hay una API key almacenada
  }

  public submitApiKey(): void {

    if (this.apiKey.length > 10 ) {
      console.debug('ApiKey:', this.apiKey);

      this.restApiService.tokeninfo(this.apiKey).subscribe({
        next: json => {
          console.debug('ApiKey is Ok!');
          console.debug('Apikey=' + json.api_key);
          console.debug('permissions=' + json.permissions);
        },
        error: err => {
          console.error(err);
        }  
      })

      

      // Lógica real:
      // 1. Llamar a un servicio (ej. accountService.validateAndSave(this.apiKey)).
      // 2. Navegar a la página de "Account" o "Characters".

      // Ejemplo de redirección (requiere Router):
      // this.router.navigate(['/account']); 

    } else {
      alert('Por favor, introduce una clave de API válida de Guild Wars 2.');
    }
  }

}