  import { Component, OnInit } from '@angular/core';
  import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  public type : any;
  public name : any;
  public lastname : any;
  public student : string = 'student'
  public teacher : string = 'teacher'
  public admin : string = 'admin'

  constructor(
    private serivces : ServicesService
  ) { }

    typeData(){
      this.type = this.serivces.getCookie('type')
      this.name = this.serivces.getCookie('name')
      this.lastname = this.serivces.getCookie('lastName')
    }

    clearCookie(){
      document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      document.cookie = "lastName=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      document.cookie = "type=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    }


  ngOnInit(): void {
    this.typeData()
  }

}
