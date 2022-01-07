import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm! : FormGroup
  constructor(private formBuilder : FormBuilder,
     private http:HttpClient, 
     private router: Router,
     private serivces : ServicesService) { }

  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    })

  }

  login(){
    this.http.get<any>("http://localhost:3000/users?email="+this.loginForm.value.email+"&password="+this.loginForm.value.password)
    .subscribe(res=>{
      const user = res[0];
      if(user){

        //this.serivces.currentStudentId = user.id;
        //this.serivces.currentUserType = user.type;
        this.serivces.currentUserName = user.name;
        //this.serivces.currentUserLastName = user.lastname;

        document.cookie = "id ="+user.id+"; expires=Thu, 18 Dec 2022 12:00:00 UTC;"
        document.cookie = "type ="+user.type+"; expires=Thu, 18 Dec 2022 12:00:00 UTC;"
        document.cookie = "name ="+user.name+"; expires=Thu, 18 Dec 2022 12:00:00 UTC;"
        document.cookie = "lastName ="+user.lastname+"; expires=Thu, 18 Dec 2022 12:00:00 UTC;"

        alert("login success");
        this.loginForm.reset();
        this.router.navigate(['loginhome'])
      }
      else
      {
        alert("user not found");
      }
    })
  }

}
