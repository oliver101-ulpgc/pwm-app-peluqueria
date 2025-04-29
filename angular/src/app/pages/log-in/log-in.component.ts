import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {toast} from 'ngx-sonner';

interface FormSingIn {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-log-in',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  standalone: true,
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  constructor(private router: Router) {
  }

  form = this.formBuilder.group<FormSingIn>({
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

      await this.authService.logIn({email, password})
      toast.success('Hello again');
      await this.router.navigate(['']);
    } catch (error) {
      toast.error('Log in failed');
    }
  };
}
