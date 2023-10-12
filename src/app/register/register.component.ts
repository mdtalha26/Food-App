import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  id=null;
  registerForm: FormGroup;

  constructor(private userService: UserService,
    private route:ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog:MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id=params['id'];
      console.log(this.id+" this is id");
    });

    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required,Validators.pattern(/^[a-z0-9._]+$/)]], // Add required validator
      userFirstName: ['', Validators.required], // Add required validator
      userLastName: ['', Validators.required], // Add required validator
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Example: 10-digit phone number
      emailId: ['', [Validators.required, Validators.email]], // Add required and email validators
      userAddress:['',(this.id===undefined) ? [Validators.required] : []],
      userPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^[^\s]+$/)]] // Add required and minimum length validators
    },{ updateOn: 'change' });
    // Object.values(this.registerForm.controls).forEach(control => {
    //   control.markAsTouched();
    // });
  }

  markControlAsTouched(controlName: string) {
    const control = this.registerForm.get(controlName);
    if (control) {
      control.markAsTouched();
    }
  }

  register() {
    console.log("Form validity:", this.registerForm.valid);
    if(this.registerForm.valid){
      console.log("Form values:", this.registerForm.value);
    // console.log(registerForm.value);
    if (this.id) {
      console.log(this.id);
      this.userService.registerAsRestaurant(this.registerForm.value).subscribe(
        (resp) => {
          this.openErrorDialog('Registration Successful', 'Please Log in to set up your Restaurant' );
          // alert("Restaurant Registered Successfully");
          this.router.navigate(['/login']);
        },
        (error) => {
          this.openErrorDialog('Error', 'An error occurred: '+error.error );
          console.log(error);
          // alert(error.error);
        }
      )
    } else {
      console.log(this.id);
      console.log("this is working");
      this.registerForm.get('userAddress').setValidators([Validators.required]);
      this.registerForm.get('userAddress').updateValueAndValidity();
      this.userService.register(this.registerForm.value).subscribe(
        (response) => {
          console.log(response);
          this.openErrorDialog('Registration Successful', 'Please Log in to your account' );
          // alert("User Registered Successfully");
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log("error is working");
          this.openErrorDialog('Error', 'An error occurred: '+error.error );
          // alert(error.error);
          console.log(error);
        }
      );
    }
  }else{
    this.openErrorDialog('Form Invalid', 'Please fill all the fields' );
    // alert("Form is invalid, Please check all the fields");
}
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
