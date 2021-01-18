import { Component, OnInit, ViewChild , NgZone} from '@angular/core';
import { SideComponent } from 'src/app/Shared/side/side.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LooginService } from 'src/app/Services/loogin.service';
import { HttpClient } from '@angular/common/http';
import { BanksService } from 'src/app/Services/allData';
import { AddDataService } from 'src/app/Services/adddata.service';
import { FormBuilder } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Users } from 'src/app/ViewModels/iusers';
import { HeaderComponent } from 'src/app/Shared/header/header.component';
import { Exams } from 'src/app/ViewModels/IExams';
import { Applications } from 'src/app/ViewModels/iapplications';
import { ViewUserComponent } from '../view-user/view-user.component';

declare var $: any;
@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {
  @ViewChild(SideComponent) side: SideComponent;
  @ViewChild(HeaderComponent) head: HeaderComponent;
  private subscription: Subscription[] = [];
  userList: any = [];
  Users: Users[] = [];
  public user_id: any;
  public userone: Users;
  //public userapp:Users;
 // showModal = false;
  appList: any = [];
  application: Applications[] = [];
  public app: Applications;
  closeResult: string;
 modalOptions: NgbModalOptions;
  constructor(private router: Router, private Service: LooginService, private http: HttpClient,
              private bankService: BanksService, 
              private addService: AddDataService, private activeRoute: ActivatedRoute,
              public fb: FormBuilder, private ngZone: NgZone, private modalService: NgbModal) {
     this.userone = {
       id: 0, name: '', email: '', mobile: '', national_id: '', application: [{
         id: 0, study_year: '', father_full_name: '', nationality: '', father_national_id: '',
        mobile: '', email: '', student_name: '', gender: '', student_national_id: '',
         date_of_birth: '', place_of_birth: '', health_status: '', study_type: '',
         bus: '', civil_status_book: '', certificate_of_vaccination: '',
         certificate_of_birth: '', student_national_id_photo: '', father_national_id_photo: '',
        cost: 0, tax: 0, total_cost: 0, status: 0, class_id: 0, user_id: 0, exam_id: 0,
         created_at: '', updated_at: ''
       }]
     };
     this.appList = {id:0,
      study_year: '', father_full_name: '', nationality: '', father_national_id: '',
      'mobile': '', 'email': '', 'student_name': '', 'gender': '', 'student_national_id': '',
      'date_of_birth': '', 'place_of_birth': '', 'health_status': '', 'study_type': '',
      bus: '', 'civil_status_book': '', 'certificate_of_vaccination': '', certificate_of_birth: '',
      'student_national_id_photo': '', 'father_national_id_photo': '', 'cost': 0,
      'tax':  0, 'total_cost':  0, class_id:  0, 'user_id':  0, 'status': '',
      'exam_id':  0};

     this.modalOptions = {
        backdrop:'static',
        backdropClass:'customBackdrop'
      }
  }

  ngOnInit(): void {
     // Users
    this.subscription.push(this.bankService.getAllUsers().subscribe(
      (response: any) => {
        this.Users = response;
        this.userList = response.users;
        console.log(this.userList);
      },
      (err) => {
        console.log(err);
      }
    ));

    //applications
    this.subscription.push(this.bankService.getAllapplicatios().subscribe(
      (response: any) => {
        this.application = response;
        this.appList = response.applications.data;
      },
      (err) => {
        console.log(err);
      }
    ));

  }
  public filterBranch(event: any) {

    console.log(event.target.value);
    const searshableString = event.target.value;
    this.addService.searchapp(searshableString).subscribe((data: any) => {
      console.log(data);
      this.userList = data.users;
      // this.ngZone.run(() => this.router.navigateByUrl('/school/branch'));
    }, (error: any) => {
      console.log(error);
    });

  }  
editItem(userModel: Users) {
  const ref = this.modalService.open(ViewUserComponent, { centered: true });
  ref.componentInstance.Justuser = userModel;

  ref.result.then((yes) => {
    console.log('Yes Click');
    this.ngOnInit();
  },
    (cancel) => {
      console.log('Cancel Click');

    })
}
}
