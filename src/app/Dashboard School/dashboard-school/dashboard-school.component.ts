import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LooginService } from 'src/app/Services/loogin.service';
import { BanksService } from 'src/app/Services/allData';
import { banks } from 'src/app/ViewModels/ibanks';
import { Observable, Subscription } from 'rxjs';
import { Applications } from 'src/app/ViewModels/iapplications';
import { Branch } from 'src/app/ViewModels/ibranches';
import { costs } from 'src/app/ViewModels/icosts';
import { Users } from 'src/app/ViewModels/iusers';
import { Exams } from 'src/app/ViewModels/IExams';
import { Interviews } from 'src/app/ViewModels/interviews';
import { AddDataService } from 'src/app/Services/adddata.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Teacher } from 'src/app/ViewModels/teacher';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Profile } from 'src/app/ViewModels/profile';
import { Classes } from 'src/app/ViewModels/classes';
import { Schedule } from 'src/app/ViewModels/schedule';

declare var $: any;

@Component({
  selector: 'app-dashboard-school',
  templateUrl: './dashboard-school.component.html',
  styleUrls: ['./dashboard-school.component.css']
})
export class DashboardSchoolComponent implements OnInit {
  itemDetails;
  IssuesList: any = [];
  private subscription: Subscription[] = [];
  bankList: any = [];
  baank: banks[] = [];
  application: Applications[] = [];
  appList: any = [];
  Cost: costs[] = [];
  CostList: any = [];
  profile: Profile;
  branchList: any = [];
  branch: Branch[] = [];
  interviewList: any = [];
  interview: Interviews[] = [];
  // userListuse: any = [];
  userList: any = [];
  Users: Users[] = [];
  User: Users;
  class: Classes[]=[];
  classList:any=[];
  teacherList: any = [];
  teacher: Teacher[] = [];
  exam: Exams[] = [];
  examList = [];
  schedule: Schedule[] = [];
  schedList: any = [];

  editProfileForm: FormGroup;

  constructor(private router: Router, private Service: LooginService, private http: HttpClient,
    private bankService: BanksService, private addService: AddDataService,private activeRoute: ActivatedRoute,
    public fb: FormBuilder, private ngZone: NgZone, private modalService: NgbModal) {
     
     }
     ClassForm: FormGroup;
  issueForm: FormGroup;
  bankForm: FormGroup;
  costForm: FormGroup;
  teacherForm: FormGroup;
  searchB: FormGroup;
  editForm: FormGroup;
  public PID: number;
   updateIssueForm: FormGroup;
  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.addbranch();
    this.addbank();
    this.addCost();
    this.addTeacher();
    this.addClass();
    //this.searchBranch();
    
    this.editProfileForm = this.fb.group({
      id: [],
      name: [''],
      city: [''],
      district: [''],

    });
    this.editForm = this.fb.group({
      id: [],
      name: [''],
      logo: [''],
      address: [''],
      city: [''],
      district: [''],
      about: [''],
      mobile: [''],
    });
    
    this.activeRoute.paramMap.subscribe(params => {
      this.PID = Number(params.get('id'));
      this.getonePrd(this.PID);
    });
    // Banks
    this.subscription.push(this.bankService.getAllBanks().subscribe(
      (response: any) => {
        this.baank = response;
        this.bankList = response.banks;
        console.log(this.baank);
      },
      (err) => {
        console.log(err);
      }
    ));

    // Applications
    this.subscription.push(this.bankService.getAllapplicatios().subscribe(
      (response: any) => {
        this.application = response;
        this.appList = response.applications.data;
      },
      (err) => {
        console.log(err);
      }
    ));

    // Branches
    this.subscription.push(this.bankService.getAllbranches().subscribe(
      (response: any) => {
        this.branch = response;
        this.branchList = response.branches;
        console.log(this.branch);
      },
      (err) => {
        console.log(err);
      }
    ));

    // Exams
    this.subscription.push(this.bankService.getAllExams().subscribe(
      (response: any) => {
        this.exam = response;
        this.examList = response.exams;
      },
      (err) => {
        console.log(err);
      }
    ));


    // Costs
    this.subscription.push(this.bankService.getAllCosts().subscribe(
      (response: any) => {
        this.Cost = response;
        this.CostList = response.costs.data;
        console.log(this.Cost);
      },
      (err) => {
        console.log(err);
      }
    ));

    // Users
    this.subscription.push(this.bankService.getAllUsers().subscribe(
      (response: any) => {
        this.Users = response;
        // this.userListuse = response.users[0];
        this.userList = response.users;
        // console.log(this.Users);
        // console.log(  this.userListuse);
        console.log(this.userList);

      },
      (err) => {
        console.log(err);
      }
    ));


    //interviews
    this.subscription.push(this.bankService.getAllinterviews().subscribe(
      (response: any) => {
        this.interview = response;
        this.interviewList = response.interviews;
        console.log(this.interview);
      },
      (err) => {
        console.log(err);
      }
    ));

    //Teachers
    this.subscription.push(this.bankService.getAllTeacher().subscribe(
      (response: any) => {
        this.teacher = response;
        this.teacherList = response.teachers;
        console.log(this.teacher);
      },
      (err) => {
        console.log(err);
      }
    ));

     //Classes
    this.subscription.push(this.bankService.getAllClasses().subscribe(
      (response: any) => {
        this.class = response;
        this.classList =response.video_classes;
        console.log(this.class);
      },
      (err) => {
        console.log(err);
      }
    ));
//Schedule
    this.subscription.push(this.bankService.getAllSchedule().subscribe(
      (response: any) => {
        this.schedule = response;
        this.schedList = response.schedule;
        console.log(this.schedule);
      },
      (err) => {
        console.log(err);
      }
    ));

    $('.btn-toggle').click(function () {
      $(this).find('.btn').toggleClass('active');

      if ($(this).find('.btn-dark').length > 0) {
        $(this).find('.btn').toggleClass('btn-default');
      }


      $(this).find('.btn').toggleClass('btn-dark ');

    });
    $('form').submit(function () {
      const radioValue = $('input[name=\'options\']:checked').val();
      if (radioValue) {
        alert(' You selected - ' + radioValue);
      }
      return false;
    });
    $(document).ready(function () {
      const readURL = function (input) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
            $('.profile-pic').attr('src', e.target.result);
          }
          reader.readAsDataURL(input.files[0]);
        }
      }
      $('.file-upload').on('change', function () {
        readURL(this);
      });
      $('.upload-button').on('click', function () {
        $('.file-upload').click();
      });
    });

  }
  OnLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
  //AddBranch
  addbranch() {
    this.issueForm = this.fb.group({

      name: [''],
      city: [''],
      district: ['']
    })
  }
  searchBranch() {
    this.searchB = this.fb.group({
      name: [''],

    })
  }
  submitForm() {
    this.addService.addBranch(this.issueForm.value).subscribe(res => {
      console.log('Issue added!');
      this.ngZone.run(() => this.router.navigateByUrl('/DashboardSchool'));
    });
  }

  // DeleteBranch 
  Delete(id: number) {
    this.subscription.push(this.addService.DeleteBranch(id).subscribe(
      (response: any) => {
        this.branchList.splice(id, 1);
        // this.branch = response;
        console.log(this.branch);
      },
      (err) => {
        console.log(err);
      }
    ));
  }
  //Delete Class
  DeleteClas(id: number) {
    this.subscription.push(this.addService.DeleteClasses(id).subscribe(
      (response: any) => {
        this.classList.splice(id, 1);
        // this.branch = response;
        console.log(this.class);
      },
      (err) => {
        console.log(err);
      }
    ));
  }
  // UpdateBranch
  //SearchBranch
  searchBranchs(name) {
    this.subscription.push(this.addService.searchBranches(name).subscribe(
      (response: any) => {
        this.branch = response;
        this.branchList = response.branches;
        console.log(this.branch);
      },
      (err) => {
        console.log(err);
      }
    ));
    // this.addService.searchBranches(this.searchB.value).subscribe(res => {
    //   console.log(this.searchB.value);
    //   this.ngZone.run(() => this.router.navigateByUrl('/DashboardSchool'));
    // });
  }
  // AddBank
  // tslint:disable-next-line:typedef
  addbank() {
    this.bankForm = this.fb.group({
      name: [''],
      iban: ['']
    });
  }
  // tslint:disable-next-line:typedef
  submitFormBank() {
    this.addService.addNewBank(this.bankForm.value).subscribe(res => {
      console.log('Issue added!');
      this.ngZone.run(() => this.router.navigateByUrl('/DashboardSchool'));
    });
  }

  // DeleteBank
  Deletebank(id: number) {

    this.subscription.push(this.addService.DeleteBank(id).subscribe(
      (response: any) => {
        this.branchList.splice(id, 1);
        // this.branch = response;
        console.log(this.branch);
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  //Add Class
  addClass() {
    this.ClassForm = this.fb.group({
      start_time: [''],
      end_time: [''],
      teacher:[''],
      subject:[''],
      semester: [''],

    });
  }
  // tslint:disable-next-line:typedef
submitFormClass() {
    this.addService.addClasses(this.ClassForm.value).subscribe(res => {
      console.log('Issue added!');
      this.ngZone.run(() => this.router.navigateByUrl('/DashboardSchool'));
    });
  }

  // AddCost
  // tslint:disable-next-line:typedef
  addCost() {
    this.costForm = this.fb.group({
      year: [''],
      type: [''],
      class_id: [],
      study_type: [''],
      transportation: [''],
      trip: [''],
      cost: ['']

    });
  }
  // tslint:disable-next-line:typedef
  submitFormCost() {
    this.addService.addCost(this.costForm.value).subscribe(res => {
      console.log('Issue added!');
      this.ngZone.run(() => this.router.navigateByUrl('/DashboardSchool'));
    });
  }
  //DeleteCost
  // tslint:disable-next-line:adjacent-overload-signatures
  DeleteCost(id: number) {

    this.subscription.push(this.addService.DeleteCost(id).subscribe(
      (response: any) => {
        this.branchList.splice(id, 1);
        // this.branch = response;
        console.log(this.Cost);
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  // AddTeacher
  // tslint:disable-next-line:typedef
  addTeacher() {
    this.teacherForm = this.fb.group({
      name:[''],
      email:[''],
      mobile:[''],
      

    });
  }
  // tslint:disable-next-line:typedef
  submitFormTeacher() {
    this.addService.addTeacher(this.teacherForm.value).subscribe(res => {
      console.log('Issue added!');
      console.log(this.teacherForm.value);
      this.ngZone.run(() => this.router.navigateByUrl('/DashboardSchool'));
    });
  }
  // DeleteTeacher 
  // tslint:disable-next-line:typedef
  DeleteTeacher(id: number) {
    this.subscription.push(this.addService.DeleteTeacher(id).subscribe(
      (response: any) => {
        this.branchList.splice(id, 1);
        // this.branch = response;
        console.log(this.teacher);
      },
      (err) => {
        console.log(err);
      }
    ));
  }
  openModal(targetModal) {
    console.log("modal opened");
  }
private getonePrd(prdid: number) {
  this.bankService.getuserById(this.PID).subscribe(
    (res:any) => {
    this.User = res.users[0];
    console.log("HH",this.User.name);
    },
    err => console.log(err)
  );
}
  public filterBranch(event: any) {

    console.log(event.target.value);
    let searshableString = event.target.value;
    this.addService.searchBranches(searshableString).subscribe((data: any) => {
      console.log(data);
      this.branchList = data.branches; 
    }, (error: any) => {
      console.log(error);
    });

  }

  filterBank(event: any) {
    console.log(event.target.value);
    let searshableString = event.target.value;
    this.addService.searchBanks(searshableString).subscribe((data: any) => {
      console.log(data);
      this.bankList = data.banks; 
    }, (error: any) => {
      console.log(error);
    });

  }

}
