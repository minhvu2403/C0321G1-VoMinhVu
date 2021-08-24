import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  countries: string[] = ['Vietnam', 'Korea', 'Japan', 'China', 'United states', 'United Kingdom'];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]], confirmPassword: ''
      }, {validator: comparePassword}),
      country: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(19)]],
      gender: ['0', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^\\+84\\d{9,10}$')]]
    });
  }

  submit() {
    if (this.registerForm.valid) {
      alert('Registered successfully!');
      console.log(this.registerForm.value);
    }
  }
}

function comparePassword(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  return (value.password === value.confirmPassword) ? null : {
    passwordMatch: false
  };
}
