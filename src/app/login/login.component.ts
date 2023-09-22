import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog:MatDialog
  ) {}

  isRest =false;
  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required,Validators.pattern(/^[a-z0-9._]+$/)]], // Add required validator
      userPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^[^\s]+$/)]] // Add required and minimum length validators
    },{ updateOn: 'change' });
  }

  markControlAsTouched(controlName: string) {
    const control = this.loginForm.get(controlName);
    if (control) {
      control.markAsTouched();
    }
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);

        const role = response.user.role[0].roleName;
        if (role === 'Admin') {
          this.router.navigate(['/admin']);
        } else if (role==='Restaurant'){
          this.router.navigate(['/restaurant']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      (error) => {
        if (error.status === 401) {
          this.openErrorDialog('Error', 'An error occurred: Please check your credentials' );
          // Unauthorized error, show an alert or perform some action
          // alert('Authentication error: Please check your credentials.');
        } else if (error.status === 403) {
          this.openErrorDialog('Access Denied', 'You do not have permission to access this resource.' );
          // Forbidden error, handle it differently if needed
          // alert('Access denied: You do not have permission to access this resource.');
        } else {
          // Handle other error statuses or display a generic error message
          this.openErrorDialog('Error', 'An error occurred: ' + error.message);
          console.error('An error occurred:', error);
          // alert('An error occurred. Please try again later.');
        }
        console.log(error);
      }
    );
  }

  registerUser() {
    this.router.navigate(['/register']);
  }

  registerAsRestaurant(){
    const id=this.isRest=true;
    console.log(this.isRest);
    this.router.navigate(['/register',{id}]);
  }

  openErrorDialog(title: string, message: string) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: {
        title: title,
        message: message,
      },
    });
  }
}
