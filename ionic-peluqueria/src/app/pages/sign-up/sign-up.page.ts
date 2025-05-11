import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
//import {AuthService} from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
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
} from "@ionic/angular/standalone";

interface FormSingUp {
  username: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  telephone: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrl: './sign-up.page.scss',
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, ReactiveFormsModule, IonText, IonItem, IonLabel, IonInput, IonButton],
  standalone: true
})
export class SignUpPage {

  private formBuilder = inject(FormBuilder);
  //private authService = inject(AuthService);
  private router = inject(Router);

  form = this.formBuilder.group<FormSingUp>({
    username: this.formBuilder.control('', [Validators.required]),
    email: this.formBuilder.control('', Validators.required),
    password: this.formBuilder.control('', Validators.required),
    telephone: this.formBuilder.control('', Validators.required),
  })

  async submit() {
    if (this.form.invalid) {
      return;
    }

    try {
      const username = this.form.get('username')?.value;
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      const telephone = this.form.get('telephone')?.value;

      if (!email || !password || !telephone || !username) {
        return;
      }

      //await this.authService.signUp({username, email, password, telephone})
      alert('Sign up successfully.');
      await this.router.navigate(['']);
    } catch (error) {
      alert('Sign up failed');
    }
  };

}
