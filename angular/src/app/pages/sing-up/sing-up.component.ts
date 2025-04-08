import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-sing-up',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.css'
})
export class SingUpComponent {
  /*
  inputListener(input: any) {
    return function () {
      if (!input.validity.valid) {
        input.reportValidity();
      }
    };
  }

  private nameInput = document.getElementById("name");
  private emailInput = document.getElementById("email");
  private passwordInput = document.getElementById("password");
  private phoneInput = document.getElementById("phone");

  nameInput.addEventListener('change', inputListener(nameInput));
  emailInput.addEventListener('change', inputListener(emailInput));
  passwordInput.addEventListener('change', inputListener( passwordInput));
  phoneInput.addEventListener('change', inputListener(phoneInput));

  document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    localStorage.setItem('isLogged', 'true');
    window.location.href = '../home/index.html';
  });
  */
}
