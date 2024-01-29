import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

  authenticate (userName : string, password: string){
    // console.log('before: ', this.isUserLoggedIn())
    if(userName==='dev' && password==='dummy'){
      sessionStorage.setItem('authenticatedUser', userName)
      // console.log('after: ', this.isUserLoggedIn())
      return true
    } else {
      return false
    }
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem('authenticatedUser')
    return user != null
  }
  
  logout () {
    sessionStorage.removeItem('authenticatedUser');
  }

}
