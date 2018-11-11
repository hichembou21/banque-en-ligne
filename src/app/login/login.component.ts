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
        this.authService.setIsLogged(true);
        this.authService.setUsername(user.username);
        this.authService.setUsernameForHeader(user.username);
        this.router.navigateByUrl("/account");
    }, error => {
        this.mode = 1;
    });
  }

}
