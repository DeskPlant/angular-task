import { Component, NgModuleRef, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { HttpClient } from "@angular/common/http";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { KurseModel } from './Kurse.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';


@Component({
	selector: 'app-krijo-kurse',
	templateUrl: './krijo-kurse.component.html',
	styleUrls: ['./krijo-kurse.component.scss']
})

export class KrijoKurseComponent implements OnInit {

	closeResult: string = '';
	public data: any = [];
	public data2: any = [];

  public push : any=[];

	public teachers: any = [];
  public adminData : any=[];
  public value: any;


	public tipi: any;
	public placehold : any;


	public teacher: string = 'teacher';
	public admin: string = 'admin';

	formValue!: FormGroup;
	courseModelObj: KurseModel = new KurseModel();
	constructor(private http: HttpClient,
		private modalService: NgbModal,
		private formbuilder: FormBuilder,
		private serivces: ServicesService
	) { }


	displayStyle = "none";

	openPopup() {
		this.displayStyle = "block";
	}
	closePopup() {
		this.displayStyle = "none";
	}


	onSubmit(userdata: any) {
    console.log(userdata)
	this.courseModelObj = userdata
	
        this.courseModelObj.teacherid = this.placehold
		console.log(this.courseModelObj)
		this.http.post("http://localhost:3000/courses", this.courseModelObj)
			.subscribe((result) => {
				console.log(result)
				this.getData();
				this.getAdminData();
				this.getLectorName();
			});
	}

	onSubmitAdmin(userdata:any){
		this.http.post("http://localhost:3000/courses", userdata)
			.subscribe((result) => {
				console.log(result)
				this.getData();
				this.getAdminData();
				this.getLectorName();
			});
	}

	getLectorName() {
		const courseurl = 'http://localhost:3000/courses';
		const userurl = 'http://localhost:3000/users?id=';

		this.http.get<any>(courseurl).subscribe(courses => {
			for (let i = 0; i < courses.length; i++) {
				this.http.get<any>(userurl + courses[i].teacherid).subscribe(users => {
					this.teachers[courses[i].id] = users[0].name
				})
			}
		})
	}

	getUserType() {
		this.tipi = this.serivces.getCookie('type')
    
        this.placehold = this.serivces.getCookie('id')
		this.value = JSON.stringify(this.serivces.getCookie('id'))

	}

	getData() {
		var teacherId = this.serivces.getCookie('id')
		const url = 'http://localhost:3000/courses?teacherid='
		this.http.get(url + teacherId).subscribe((res) => {
			this.data = res
		})
	}

	getAdminData() {
		const url = 'http://localhost:3000/courses'
		this.http.get(url).subscribe((res => {
			this.adminData = res
		}))
	}

	deleteCourse(thedata: any) {
		const url = 'http://localhost:3000/courses/'
		this.http.delete<any>(url + thedata.id)
			.subscribe(res => {
				alert("Course Deleted")
				this.getData()
				this.getAdminData()
			})
	}

	editCourse(thedata: any) {
		this.courseModelObj.id = thedata.id
        this.courseModelObj.teacherid = thedata.teacherid
		console.log(this.courseModelObj.teacherid)
		this.formValue.controls['code'].setValue(thedata.code)
		this.formValue.controls['id'].setValue(thedata.id)
		this.formValue.controls['name'].setValue(thedata.name)
		this.formValue.controls['credits'].setValue(thedata.credits)
	}

	updatecourse() {
        var teacherid = this.serivces.getCookie('id')
		this.courseModelObj.code = this.formValue.value.code;
		this.courseModelObj.credits = this.formValue.value.credits;
		this.courseModelObj.name = this.formValue.value.name;
		this.courseModelObj.teacherid = teacherid;
		this.serivces.updateCourse(this.courseModelObj, this.courseModelObj.id)
			.subscribe(res => {
				alert("Kursi u modifikua")
				this.getData()
				this.getAdminData()
				this.getLectorName()
			})
	}

	updatecourseAdmin(){
		var teacherid = this.formValue.value.teacherid
		this.courseModelObj.code = this.formValue.value.code;
		this.courseModelObj.credits = this.formValue.value.credits;
		this.courseModelObj.name = this.formValue.value.name;
		this.courseModelObj.teacherid = teacherid;
		this.serivces.updateCourse(this.courseModelObj, this.courseModelObj.id)
			.subscribe(res => {
				alert("Kursi u modifikua")
				this.getData()
				this.getAdminData()
				this.getLectorName()
			})
	}

	ngOnInit() {

		this.getData();
        this.getAdminData();
        this.getUserType();
		this.getLectorName();
		this.formValue = this.formbuilder.group({
			id: [''],
			code: [''],
			name: [''],
			credits: [''],
			teacherid: ['']
		})

	}

	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
	}

	openEdit(content: any, thedata: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});

	}
	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	};



}
