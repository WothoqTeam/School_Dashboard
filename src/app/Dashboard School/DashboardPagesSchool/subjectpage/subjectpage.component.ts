import { Component, OnInit, ViewChild ,NgZone} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddDataService } from 'src/app/Services/adddata.service';
import { BanksService } from 'src/app/Services/allData';
import { HeaderComponent } from 'src/app/Shared/header/header.component';
import { SideComponent } from 'src/app/Shared/side/side.component';
import { Subjects } from 'src/app/ViewModels/subjects';
import Swal from 'sweetalert2';
import { EditSubjectComponent } from '../../EditComponent/edit-subject/edit-subject.component';

@Component({
  selector: 'app-subjectpage',
  templateUrl: './subjectpage.component.html',
  styleUrls: ['./subjectpage.component.css']
})
export class SubjectpageComponent implements OnInit {
  @ViewChild(SideComponent) side: SideComponent;
  @ViewChild(HeaderComponent) head: HeaderComponent;
  private subscription: Subscription[] = [];
  ClassForm: FormGroup;
  subject: Subjects[] = [];
  subList = [];
  constructor(private router: Router, private bankService: BanksService,
              private addService: AddDataService, private modalService: NgbModal,
              public fb: FormBuilder, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.subscription.push(this.bankService.getAllSubject().subscribe(
      (response: any) => {
        this.subject = response;
        this.subList = response.subjects;
      },
      (err) => {
        console.log(err);
      }
    ));
  }


DeleteSubj(id){
  Swal.fire({
    title:'هل انت متاكد ؟',
    icon :'warning',
    showCancelButton:true,
    cancelButtonText:'الغاء',
    confirmButtonColor:'red',
    cancelButtonColor:'blue',
    confirmButtonText:'موافق',
  }).then((result)=>{
  this.router.navigate(['/school/subjects']);
  if(result.value){
    this.addService.DeleteSubject(id).subscribe((res)=>{
      console.log(res);
    });
    this.ngOnInit();
    Swal.fire('تم الحذف');
    this.router.navigateByUrl('/school/subjects');
  }});
}
editItem(userModel: Subjects) {
  const ref = this.modalService.open(EditSubjectComponent, { centered: true });
  ref.componentInstance.selectedapp = userModel;

  ref.result.then((yes) => {
    console.log('Yes Click');
    this.ngOnInit();
  },
    (cancel) => {
      console.log('Cancel Click');

    })
}
}