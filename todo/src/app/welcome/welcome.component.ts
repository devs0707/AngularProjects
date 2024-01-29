import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ActivatedRoute } from '@angular/router';

// @ComponentScan( value = "com.streebo.web")
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit{

  // String message = "Welcome Message"
  message = 'Welcome Message'
  name = ''

  // public WelcomeComponent(){}
  constructor(private route: ActivatedRoute){

  }

  ngOnInit () {
    console.log(this.message)
    console.log(this.route.snapshot.params['name'])
    this.name = this.route.snapshot.params['name']
  }
  // void testMethod(){}
  testMethod() : void {
    // COMPILATION ERROR:: this.message = 5
    console.log(this.message)
    console.log(this.route.snapshot.params['name'])
  }
}
