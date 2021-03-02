import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor( private fb: FormBuilder, 
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: '',
      password: '',
    })
  }

  submit() {
    const formData = this.form.getRawValue();

    const data = {
      username: formData.email,
      password: formData.password,
      grant_type: 'password',
      client_id: 2,
      client_secret: 'YBWMsPjUI8g6suVdrj8EkLBwKUpxCGYPn8dKs8h7',
      scope: '*'
    }

    this.http.post('http://larasixcore.test/oauth/token', data).subscribe(
      (result: any) => {
        localStorage.setItem('token', result.access_token);
        this.router.navigate(['/secure']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
