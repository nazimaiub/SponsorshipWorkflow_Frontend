import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: [''],
    password: ['']
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
     private router: Router
  ) {}

  ngOnInit(): void {
  }

  onLogin() {

  if (this.loginForm.invalid) {
    return;
  }

  this.authService
    .login(this.loginForm.value)
    .subscribe({

      next: (response: any) => {

        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);

        console.log('Login Success');

        const role = response.role;

        switch (role) {

          case 'admin':
            this.router.navigate(['/admin']);
            break;

          case 'Manager':
            this.router.navigate(['/manager']);
            break;

          case 'FinanceAdmin':
            this.router.navigate(['/finance']);
            break;

          default:
            this.router.navigate(['/requestor']);
            break;
        }
      },

      error: (error) => {
        console.log('Login Failed', error);
      }
    });
}
}