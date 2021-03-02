import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss']
})
export class SecureComponent implements OnInit {

  
  user:any;
  
  constructor(private http: HttpClient, 
    private router: Router) { 

    }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    
    this.http.get('http://larasixcore.test/user', {headers: headers}).subscribe(
      (result:any) => {
        if(result.error == 'Unauthenticated.')
        {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);  
        }else
        {
          this.user = result
        }
      },
      error => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    )
  }

}
