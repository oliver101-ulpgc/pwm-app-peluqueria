import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Router, RouterLink} from "@angular/router";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, ReactiveFormsModule, IonText, IonItem, IonLabel, IonInput, IonButton]
})
export class LogInPage{

  private formBuilder = inject(FormBuilder);

  constructor(private router: Router) {}

  form = this.formBuilder.group({
    email: this.formBuilder.control('', Validators.required),
    password: this.formBuilder.control('', Validators.required),
  })

  async submit() {
    if (this.form.invalid) {
      return
    }

    try {
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;

      if (!email || !password) {
        return;
      }

      await this.router.navigate(['']);
    } catch (error) {
    }
  };
}
