import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss']
})
export class SecureComponent implements OnInit {

  
  user:any;
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    this.http.get('http://larasixcore.test/user', {headers: headers}).subscribe(
      result => {
        this.user = result
      },
      error => {
        console.log(error);
      }
    )
  }

}
