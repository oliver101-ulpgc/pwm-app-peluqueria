import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {toast} from 'ngx-sonner';
import {Router, RouterLink} from '@angular/router';

interface FormSingUp {
  username: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  telephone: FormControl<string | null>;
}

@Component({
  selector: 'app-sing-up',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  standalone: true,
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.css'
})
export class SingUpComponent {

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  constructor(private router: Router) {
  }

  form = this.formBuilder.group<FormSingUp>({
    username: this.formBuilder.control('', [Validators.required]),
    email: this.formBuilder.control('', Validators.required),
    password: this.formBuilder.control('', Validators.required),
    telephone: this.formBuilder.control('', Validators.required),
  })

  async submit() {
    if (this.form.invalid) {
      return
    }

    try {
      const username = this.form.get('username')?.value;
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      const telephone = this.form.get('telephone')?.value;

      if (!email || !password || !telephone || !username) {
        return;
      }

      await this.authService.signUp({username, email, password, telephone})
      toast.success('Sing up successfully.');
      await this.router.navigate(['']);
    } catch (error) {
      toast.error('Sing up failed');
    }
  };

}
