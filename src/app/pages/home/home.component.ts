import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent implements OnInit {
  
  // Variable para almacenar la clave de API introducida por el usuario
  apiKey: string = '';


  public ngOnInit(): void {
    // Lógica de inicialización, como comprobar si ya hay una API key almacenada
  }

  /**
   * Envía la clave de API para validación y almacenamiento.
   */
  public submitApiKey(): void {
    if (this.apiKey.length > 10 && this.apiKey.startsWith('A')) { // Validación simple inicial
      console.log('Clave de API enviada:', this.apiKey);
      // Lógica real:
      // 1. Llamar a un servicio (ej. accountService.validateAndSave(this.apiKey)).
      // 2. Navegar a la página de "Account" o "Characters".
      alert('Clave de API recibida. ¡Navegando a la Bóveda!');

      // Ejemplo de redirección (requiere Router):
      // this.router.navigate(['/account']); 

    } else {
      alert('Por favor, introduce una clave de API válida de Guild Wars 2.');
    }
  }

}