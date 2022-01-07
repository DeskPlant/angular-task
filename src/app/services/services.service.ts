import { compileNgModuleDeclarationExpression } from '@angular/compiler/src/render3/r3_module_compiler';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

    public data : any =[]

    public currentStudentId = null;
    public currentUserType = null;
    public currentUserName = null;
    public currentUserLastName = null;

    public cookieId = null;
    public cookieType = null;
    public cookieName = null;
    public cookieLastName = null;


    constructor(private http: HttpClient) { }


    getCookie(cname: string) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    getCourses(){
      const url ='http://localhost:3000/courses'
      this.http.get(url).subscribe((res)=>{
        this.data = res
      })
    }

    getUsers(){
      const url ='http://localhost:3000/users'
      this.http.get(url).subscribe((res)=>{
        this.data = res
      })
    }

    getEnrollment(){
      const url ='http://localhost:3000/enrollment'
      this.http.get(url).subscribe((res)=>{
        this.data = res
      })
    }

    updateCourse(data : any, id : number){
      return this.http.put<any>('http://localhost:3000/courses/'+id,data)
      .pipe(map((res:any)=>{
        return res
      }))
    }

}

