import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-loginhome',
  templateUrl: './loginhome.component.html',
  styleUrls: ['./loginhome.component.scss']
})
export class LoginhomeComponent implements OnInit {

  public username : any;

  constructor(
    private serivces : ServicesService
    
    ) { }
    
     userdata(){
      this.username = this.serivces.getCookie('name')
     }

  ngOnInit(): void {
    this.userdata()
  }

}
