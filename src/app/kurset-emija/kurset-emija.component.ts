import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from "@angular/common/http"
import { ServicesService } from '../services/services.service';


@Component({
	selector: 'app-kurset-emija',
	templateUrl: './kurset-emija.component.html',
	styleUrls: ['./kurset-emija.component.scss']
})
export class KursetEMijaComponent implements OnInit {

	closeResult: string = '';
	public data: any = [];
	public coursedata: any = [];
	public enrolldata: any = [];
	public number: string = '';
	public studentNumber: any = [];
	public courseId: any = [];
	public name: any;
	public teachers: any=[];
	public credits: number = 0;

	public type: any;
	public student : string = 'student'

	//public list: Map<number, number> = new Map<number, number>();
	public list: any = [];
	constructor(private http: HttpClient,
		private modalService: NgbModal,
		private serivces: ServicesService) { }


	displayStyle = "none";

	openPopup() {
		this.displayStyle = "block";
	}
	closePopup() {
		this.displayStyle = "none";
	}

	onSubmit(userdata: any) {
		this.http.post("http://localhost:3000/courses", userdata)
			.subscribe((result) => {
				console.warn(result)
			})
		console.warn(userdata)
	}

	getUserData() {
		const url = 'http://localhost:3000/users'
		this.http.get(url + "?id=" + this.serivces.getCookie('id')).subscribe((res) => {
			this.data = res
			console.log(this.data)
		})
	}


	getEnrollmentData() {
		const enrollmentUrl = 'http://localhost:3000/enrollment';
		var courseurl = 'http://localhost:3000/courses?'
		
		this.http.get<any>(enrollmentUrl + "?studentId=" + this.serivces.getCookie('id')).subscribe((res) => {
			for (let index = 0; index < res.length; index++) {
				const element = res[index];
				if (index != 0) {
					courseurl = courseurl + '&'
				}
				courseurl += 'id=' + element.courseId
			}
			this.http.get(courseurl).subscribe((res) => {
				this.data = res;
			})
		})
	}

	getTotalOfStudents() {
		const coursesUrl = 'http://localhost:3000/courses';
		this.http.get<any>(coursesUrl).subscribe(courses => {
			for (let i = 0; i < courses.length; i++) {
				const enrollmentUrl = 'http://localhost:3000/enrollment';
				this.http.get<any>(enrollmentUrl + '?courseId=' + courses[i].id).subscribe(enrollments => {
					this.list[courses[i].id] = enrollments.length
				})
			}
		})
	}

	getLectorName() {
		const courseurl = 'http://localhost:3000/courses';
		const userurl = 'http://localhost:3000/users?id=';

		this.http.get<any>(courseurl).subscribe(courses => {
			for (let i = 0; i < courses.length; i++) {
				this.http.get<any>(userurl + courses[i].teacherid).subscribe(users => {
					this.teachers[courses[i].id] = users[0]
				})
			}
		})
	}

	getTotalCredits() {
		const enrollmentUrl = 'http://localhost:3000/enrollment';
		const studentId = this.serivces.getCookie('id')
		var credits = 0;

		this.http.get<any>(enrollmentUrl + '?studentId=' + studentId).subscribe(enrollments => {
			var coursesUrl = 'http://localhost:3000/courses';

			for (let i = 0; i < enrollments.length; i++) {
				if (i === 0)
					coursesUrl += "?";
				else
					coursesUrl += "&";
				coursesUrl += "id=" + enrollments[i].courseId;
			}

			this.http.get<any>(coursesUrl).subscribe(courses => {
				for (let i = 0; i < courses.length; i++) {
					credits += courses[i].credits
				}

				this.credits = credits
			})
		})
	}

	getType(){
		this.type = this.serivces.getCookie('type')
	}
	

	getUserName() {
		this.name = this.serivces.getCookie('name')
		console.log(this.name)
	}


	ngOnInit() {
		this.getType()
		this.getEnrollmentData()
		this.getTotalOfStudents()
		this.getTotalCredits()
		this.getUserName()
		this.getLectorName()
	}

	open(content: any) {
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
