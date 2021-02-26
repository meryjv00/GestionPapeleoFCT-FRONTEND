import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GestionPapeleoFCT-Front';
  theme: string | null = localStorage.getItem('theme');

  ngOnInit(): void {
  }

  // Modifica el tema
  setTheme(theme: any){
    localStorage.setItem('theme', theme);
    this.theme = localStorage.getItem('theme');
  }
}
