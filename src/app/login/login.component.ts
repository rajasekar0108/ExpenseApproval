import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      // email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],

      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  
 
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  

onSubmit() {
  if (this.loginForm.valid) {
    const payload = {
      mobile: this.loginForm.value.mobile,
      password: this.loginForm.value.password,
    };

    this.api.getLoginDetails(payload).subscribe(
      (res: any) => {
        console.log("User details", res);

        if (res && res.data  && res.resultcode == '1') {
          localStorage.setItem("user", JSON.stringify(res.data));
          this.api.updateUser();
          this.router.navigate(['view']); // ✅ Move navigation inside success block
        } else {
          console.error("Login failed: No user data received");
          alert("Invalid login credentials");
        }
      },
      (error) => {
        console.error("Login error", error);
        alert("Login failed. Please check your credentials.");
      }
    );
  }
}

}
