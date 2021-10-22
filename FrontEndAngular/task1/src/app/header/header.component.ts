import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  signOut()
  {
    // GlobalServices.setUserName(null);  
    // this.global.setUserId("0");  
    // this.router.navigate(['']);
    // this.global.setLogin(false);
  }

}
