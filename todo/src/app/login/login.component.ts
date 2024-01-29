import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userName = 'dev'
  password = ''
  errorMessage='Invalid Credentials'
  invalidLogin = false;

  constructor (private router: Router, 
    public hardcodedAuthenticationService: HardcodedAuthenticationService) {}

  handleLogin() {
    
    // console.log(this.userName)
    // console.log(this.password)
    
    // if(this.userName==='dev' && this.password==='dummy'){
    if(this.hardcodedAuthenticationService.authenticate(this.userName, this.password)){
      this.router.navigate(['welcome', this.userName])
      this.invalidLogin=false
    } else {
      this.invalidLogin=true
    }
  }
}
