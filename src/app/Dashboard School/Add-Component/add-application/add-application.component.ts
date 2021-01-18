import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild ,NgZone} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddDataService } from 'src/app/Services/adddata.service';
import { BanksService } from 'src/app/Services/allData';
import { HeaderComponent } from 'src/app/Shared/header/header.component';
import { SideComponent } from 'src/app/Shared/side/side.component';
import { Class } from 'src/app/ViewModels/class';
import { UserService } from 'src/app/Services/user.service';
import Axios from 'axios';
const API_URL = 'http://school.wothoq.co/api/admin/applications/store';
@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.css']
})
export class AddApplicationComponent implements OnInit {
  @ViewChild(SideComponent) side: SideComponent;
  @ViewChild(HeaderComponent) head: HeaderComponent;
  private subscription: Subscription[] = [];
  issueForm: FormGroup;
  classList: any = [];
  class: Class[] = [];
  filterdArray: any[];
  showModal: boolean = false;
  cost : Number;
  tax : Number;
  total_cost : Number;
  constructor( private userStorage: UserService, private addService: AddDataService,private router: Router, private http: HttpClient,
              private ngZone: NgZone, public fb: FormBuilder, private bankService: BanksService) { }

  ngOnInit(): void {
    this.subscription.push(this.bankService.getAllclass().subscribe(
      (response: any) => {
        this.class = response;
        this.classList = response.classes;
        console.log(this.classList);
      },
      (err) => {
        console.log(err);
      }
    ));
    // 
    this.issueForm = this.fb.group({
      id: ['test'],
      study_year: ['1440'],
      father_full_name: ['testing fater name'],
      father_national_id: ['344324324324324'],
      mobile: ['01024536514'],
      email: ['te@test.com'],
      student_name: ['test'],
      student_national_id: ['344324324324324'],
      date_of_birth: ['2020-02-01'],
      place_of_birth: ['test'],
      class_id: ['1'],
      gender: ['بنين'],
      nationality: ['test'],
      study_type: ['عام كامل'],
      bus: ['بمواصلات'],
      trip: ['ذهاب وعودة'],
      health_status: ['جيد'],
      civil_status_book: [''],
      certificate_of_vaccination: [''],
      certificate_of_birth: [''],
      student_national_id_photo: [''],
      father_national_id_photo: [''],

    });
  }
  onChange(event){
    let x = event.target.value;
    this.filterFunction(x);
    console.log("Assss",x);
    }
public filterFunction(x: any)
{
  this.filterdArray=this.classList.filter(v=>v.type.includes(x))
}
onFamilySelect(event) {
  if (event.target.files.length > 0) {
    const civil_status_book = event.target.files[0];
    this.issueForm.get('civil_status_book').setValue(civil_status_book);
  }
}

onGraftSelect(event) {
  if (event.target.files.length > 0) {
    const certificate_of_vaccination = event.target.files[0];
    this.issueForm.get('certificate_of_vaccination').setValue(certificate_of_vaccination);
  }
}

onBirthPaperSelect(event) {
  if (event.target.files.length > 0) {
    const certificate_of_birth = event.target.files[0];
    this.issueForm.get('certificate_of_birth').setValue(certificate_of_birth);
  }
}

onStudentPicSelect(event) {
  if (event.target.files.length > 0) {
    const student_national_id_photo = event.target.files[0];
    this.issueForm.get('student_national_id_photo').setValue(student_national_id_photo);
  }
}

onParentPicSelect(event) {
  if (event.target.files.length > 0) {
    const father_national_id_photo = event.target.files[0];
    this.issueForm.get('father_national_id_photo').setValue(father_national_id_photo);
  }
}
  // AddApplication

  submitForm() {
    const tooken = localStorage.getItem('usertoken');
    const user_id = this.userStorage.getUserId();
    // 
    let addFormData = new FormData();
    addFormData.append("user_id", user_id);
    addFormData.append("study_year", this.issueForm.get('study_year').value);
    addFormData.append("father_full_name", this.issueForm.get('father_full_name').value);
    addFormData.append("nationality", this.issueForm.get('nationality').value);
    addFormData.append("father_national_id", this.issueForm.get('father_national_id').value);
    addFormData.append("student_national_id", this.issueForm.get('student_national_id').value);
    addFormData.append("mobile", this.issueForm.get('mobile').value);
    addFormData.append("student_name", this.issueForm.get('student_name').value);
    addFormData.append("email", this.issueForm.get('email').value);
    addFormData.append("gender", this.issueForm.get('gender').value);
    addFormData.append("date_of_birth", this.issueForm.get('date_of_birth').value);
    addFormData.append("place_of_birth", this.issueForm.get('place_of_birth').value);
    addFormData.append("health_status", this.issueForm.get('health_status').value);
    addFormData.append("bus", this.issueForm.get('bus').value);
    addFormData.append("trip", this.issueForm.get('trip').value);
    addFormData.append("study_type", this.issueForm.get('study_type').value);
    addFormData.append("class_id", this.issueForm.get('class_id').value);
    addFormData.append("civil_status_book", this.issueForm.get('civil_status_book').value);
    addFormData.append("certificate_of_vaccination", this.issueForm.get('certificate_of_vaccination').value);
    addFormData.append("certificate_of_birth", this.issueForm.get('certificate_of_birth').value);
    addFormData.append("student_national_id_photo", this.issueForm.get('student_national_id_photo').value);
    addFormData.append("father_national_id_photo", this.issueForm.get('father_national_id_photo').value);

    // 
    Axios.post( API_URL, addFormData, 
          {
            headers: {
              "Accept": "*/*",
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${tooken}`,
            }
          }
      )
      .then((res: any) =>{
        console.log(res);
        this.showModal = true;
        this.cost = res.data.application.cost;
        this.tax = res.data.application.tax;
        this.total_cost = res.data.application.total_cost;
        console.log(this.cost);
        console.log(this.tax);
        console.log(this.total_cost);
      })
      .catch((err) => console.log(err));
    // 
   
  }
  // 
  closeModal(){
    this.showModal = false;
  }
}
