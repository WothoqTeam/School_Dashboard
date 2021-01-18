import { Component, OnInit,ViewChild , NgZone} from '@angular/core';
import { SideComponent } from 'src/app/Shared/side/side.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LooginService } from 'src/app/Services/loogin.service';
import { HttpClient } from '@angular/common/http';
import { BanksService } from 'src/app/Services/allData';
import { AddDataService } from 'src/app/Services/adddata.service';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Teacher } from 'src/app/ViewModels/teacher';
import { HeaderComponent } from 'src/app/Shared/header/header.component';
import { EditteacherComponent } from '../../EditComponent/editteacher/editteacher.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.component.html',
  styleUrls: ['./teacher-page.component.css']
})
export class TeacherPageComponent implements OnInit {
  @ViewChild(SideComponent) side: SideComponent;
  @ViewChild(HeaderComponent) head: HeaderComponent;
  private subscription: Subscription[] = [];
  teacherList: any = [];
  teacher: Teacher[] = [];
  constructor(private router: Router, private Service: LooginService, private http: HttpClient,
              private bankService: BanksService, private addService: AddDataService, private activeRoute: ActivatedRoute,
              public fb: FormBuilder, private ngZone: NgZone, private modalService: NgbModal) { }

  ngOnInit(): void {
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
  }
   // DeleteTeacher 
  // tslint:disable-next-line:typedef
  DeleteTeacher(id){
    Swal.fire({
      title:'هل انت متاكد ؟',
      icon :'warning',
      showCancelButton:true,
      cancelButtonText:'الغاء',
      confirmButtonColor:'red',
      cancelButtonColor:'blue',
      confirmButtonText:'موافق',
    }).then((result)=>{
    this.router.navigate(['/school/teacher']);
    if(result.value){
      this.addService.DeleteTeacher(id).subscribe((res)=>{
        console.log(res);
      });
      this.ngOnInit();
      Swal.fire('تم الحذف');
      this.router.navigateByUrl('/school/teacher');
    }})
  }
  
  public filterBranch(event: any) {

    console.log(event.target.value);
    const searshableString = event.target.value;
    this.addService.searchTeach(searshableString).subscribe((data: any) => {
      console.log(data);
      this.teacherList = data.teachers;
      // this.ngZone.run(() => this.router.navigateByUrl('/school/branch'));
    }, (error: any) => {
      console.log(error);
    });

  }
  editItem(userModel: Teacher) {
    const ref = this.modalService.open(EditteacherComponent, { centered: true });
    ref.componentInstance.selectedteach = userModel;

    ref.result.then((yes) => {
      console.log('Yes Click');
      this.ngOnInit();
    },
      (cancel) => {
        console.log('Cancel Click');

      })
  }

}
