import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mode:number = 0;

  constructor(private authService : AuthenticationService, private router : Router) { }

  ngOnInit() {
  }

  onLogin(user){
    this.authService.login(user).subscribe(response =>{
        let jwtToken = response.headers.get('Authorization');
        this.authService.saveToken(jwtToken);
        this.router.navigateByUrl("/account");
        this.authService.setUser(user);
    }, error => {
        this.mode = 1;
    });
  }

}
