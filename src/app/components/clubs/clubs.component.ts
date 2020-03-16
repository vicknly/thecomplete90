import { Component, OnInit } from '@angular/core';
import { AuthenticationService, DataService } from '../../services';
import { Router } from '@angular/router';
declare var require: any;

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {
  model: any = {};
  emailSent = false;
  error: string = '';
  club;
  allClubs;
  //this.model.from = "";

 constructor(
   private authenticationService: AuthenticationService,
    private router: Router,  private dataService: DataService) { 
  
  }

  ngOnInit() {
    this.getClubs();
    
  }


  getClubs() {
    this.dataService.getClubs().subscribe(result => {
      if (!result.success) {
        this.error = 'No clubs found!';
      } else {
        this.error = '';
        this.allClubs = Object.values(result['clubs']);
        console.log("Clubs", this.allClubs);
      }
    });
  }


    
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  clubSignup() {
    //this.model.name = "qaiser.saeed25@gmail.com"
    //this.model.form = "qaiser.saeed25@gmail.com"
    //this.model.message = "qaiser.saeed25@gmail.com"

    console.log(this.model.club);
    if (!this.validateEmail(this.model.club['email'])) {
      this.error = 'Please enter a valid email' + this.model.club['email'];
      return;
    }
    this.authenticationService.clubSignup(this.model).subscribe(result => {
      if (!result.success) {
        this.error = 'An error occured while sending your request. Please try again soon or contact us directly at support@thecomplete90.com';
      } else {
        this.error = '';
        this.emailSent = true;
      }
    });
  }




}
