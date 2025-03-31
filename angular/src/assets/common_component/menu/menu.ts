import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

@Component({
    selector: 'menu-component',
    styleUrl: '../../common_style/common.css',
    templateUrl: './menu.html',
    standalone: true,
    imports: [CommonModule]
})

export class MenuComponent {

  constructor(private router:Router) {
  }

  toggleMenu() {
    const menu = document.getElementById("menuContainer");
    const overlay = document.getElementById("overlay");

// Usando encadenamiento opcional para manejar los casos en que los elementos no existan
    menu?.classList.toggle("active");
    overlay?.classList.toggle("active", menu?.classList.contains("active"));
  }

  logout() {
    localStorage.setItem("isLogged", "false"); // Marcar como desconectado
    this.router.navigate(['']);
  }
}
