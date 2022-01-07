import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, JsonpClientBackend } from "@angular/common/http"
import { ServicesService } from '../services/services.service';
import { createEmitAndSemanticDiagnosticsBuilderProgram } from 'typescript';
import { analyzeNgModules } from '@angular/compiler';
import { Enroll } from './enroll';


@Component({
	selector: 'app-zgjidh-kurse',
	templateUrl: './zgjidh-kurse.component.html',
	styleUrls: ['./zgjidh-kurse.component.scss']
})
export class ZgjidhKurseComponent implements OnInit {

	closeResult: string = '';
	public data: any = [];
	body: Enroll = new Enroll();

	public enrolledData: any = [];
	public result: any = [];
	public type:any;
	public student : string = 'student'
	public admin : string = 'admin'

	public test1: any = [];
	public test2: any = [];
	public teachers: any = [];

	public daid: any;

	public list: any = [];
	public credits: number = 0;
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

	enrollStudent(courseIdlogin: any) {

		this.daid = courseIdlogin;
		console.log(this.daid)
		var studentId = JSON.parse(this.serivces.getCookie('id'))

		this.body = ({
			studentId: studentId,
			courseId: this.daid
		})

		console.log(this.body)

		var bod = JSON.stringify(this.body)

		const url = 'http://localhost:3000/enrollment'
		this.http.post<any>(url, this.body).subscribe((res) => {

			console.log(res)
			alert("enrolled")
			this.getMissingCourses();
		});
	}


	getData() {
		const url = 'http://localhost:3000/courses'
		this.http.get(url).subscribe((res) => {
			this.data = res
		})
	}

	getMissingCourses() {
		const url = 'http://localhost:3000/courses'
		this.http.get(url).subscribe((courses) => {
			this.data = courses
		})

		const enrollmentUrl = 'http://localhost:3000/enrollment';
		var courseUrl = 'http://localhost:3000/courses?';

		this.http.get<any>(enrollmentUrl + "?studentId=" + this.serivces.getCookie('id')).subscribe((enrollment) => {
			for (let index = 0; index < enrollment.length; index++) {
				if (index != 0) {
					courseUrl = courseUrl + '&'
				}
				courseUrl += 'id=' + enrollment[index].courseId
			}

			this.http.get<any>(courseUrl).subscribe((courses) => {
				this.enrolledData = courses;
				this.result = [];

				for (let i = 0; i < this.data.length; i++) {
					var notFound = true;
					for (let j = 0; j < this.enrolledData.length; j++) {
						if (this.data[i].id === this.enrolledData[j].id) {
							notFound = false;
						}
					}
					if (notFound) {
						this.result.push(this.data[i]);
					}
				}
			})
		})
	}

	gettype(){
		this.type = this.serivces.getCookie('type')
		console.log(this.type)
	}


	ngOnInit() {
		this.gettype()
		this.getMissingCourses()
		this.getData();
		this.getTotalOfStudents()
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
