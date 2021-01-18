import { Component, OnInit, ViewChild, NgZone, TemplateRef } from '@angular/core';
import { SideComponent } from 'src/app/Shared/side/side.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BanksService } from 'src/app/Services/allData';
import { AddDataService } from 'src/app/Services/adddata.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Applications } from 'src/app/ViewModels/iapplications';
import { HeaderComponent } from 'src/app/Shared/header/header.component';
import * as XLSX from 'xlsx';
import { Exams } from 'src/app/ViewModels/IExams';
import Swal from 'sweetalert2';
import { EditExamAppComponent } from '../../EditComponent/edit-exam-app/edit-exam-app.component';
import { EditrecordComponent } from '../../EditComponent/editrecord/editrecord.component';
import { HttpClient } from '@angular/common/http';
import { ClassType } from 'src/app/ViewModels/class-type';

declare var $: any;
@Component({
  selector: 'app-record-page',
  templateUrl: './record-page.component.html',
  styleUrls: ['./record-page.component.css']
})
export class RecordPageComponent implements OnInit {
  constructor(private router: Router,private httpClient: HttpClient,
              private bankService: BanksService, private addService: AddDataService,
              private activeRoute: ActivatedRoute,private modalService: NgbModal,
              public fb: FormBuilder, private ngZone: NgZone) { }
  @ViewChild(SideComponent) side: SideComponent;
  @ViewChild(HeaderComponent) head: HeaderComponent;
  private subscription: Subscription[] = [];
  application: Applications[] = [];
  appList: any = [];
  exam: Exams[] = [];
  examList = [];
  issueForm: FormGroup;
  examForm: FormGroup;
  classtypeForm: FormGroup;
  //closeResult = '';
  fileName = 'ExcelSheet.xlsx';
  closeResult: string;

  classtypeList: any = [];
  classtype: ClassType[] = [];
  ngOnInit(): void {
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
    this.subscription.push(this.bankService.getAllExams().subscribe(
        (response: any) => {
          this.exam = response;
          this.examList = response.exams;
        },
        (err) => {
          console.log(err);
        }
      ));
    this.subscription.push(this.bankService.getAllClassType().subscribe(
        (response: any) => {
          this.classtype = response;
          this.classtypeList = response.classes;
          console.log(this.classtype);
        },
        (err) => {
          console.log(err);
        }
      ));
      this.addInterview();
      this.addExam();
      this.addclasstype();
    }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
  }

// tslint:disable-next-line:typedef
addInterview() {
    this.issueForm = this.fb.group({
      application_id: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      link: ['', Validators.required],
    });
  }
  // tslint:disable-next-line:typedef
  onSubmit() {
    this.addService.addInterview(this.issueForm.value).subscribe(res => {
      console.log('Issue added!');
      // this.ngZone.run(() => this.router.navigateByUrl('/school/'));
    });
    this.modalService.dismissAll(); //dismiss the modal
  }

  // tslint:disable-next-line:typedef
addExam() {
  this.examForm = this.fb.group({
    id: ['', Validators.required],
    exam_id: ['', Validators.required],
  });
}
// tslint:disable-next-line:typedef
onSubmit1() {
  this.addService.addExams(this.examForm.value).subscribe(res => {
    console.log('Issue added!');
    // this.ngZone.run(() => this.router.navigateByUrl('/school/'));
  });
  this.modalService.dismissAll(); //dismiss the modal
}

  // tslint:disable-next-line:typedef
  addclasstype() {
    this.classtypeForm = this.fb.group({
      id: ['', Validators.required],
      class_type_id: ['', Validators.required],
    });
  }
  // tslint:disable-next-line:typedef
  onSubmit2() {
    this.addService.addclasstyperec(this.classtypeForm.value).subscribe(res => {
      console.log('Issue added!');
      // this.ngZone.run(() => this.router.navigateByUrl('/school/'));
    });
    this.modalService.dismissAll(); //dismiss the modal
  }
  // tslint:disable-next-line:no-unused-expression
  exportexcel(): void {
    const element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'),

      XLSX.writeFile(wb, this.fileName);
  }
  // Delete Applications

  // tslint:disable-next-line:typedef
  DeleteApp(id){
    Swal.fire({
      title: 'هل انت متاكد ؟',
      icon : 'warning',
      showCancelButton: true,
      cancelButtonText: 'الغاء',
      confirmButtonColor: 'red',
      cancelButtonColor: 'blue',
      confirmButtonText: 'موافق',
    }).then((result) => {
    this.router.navigate(['/school/record']);
    if(result.value){
      this.addService.DeleteApp(id).subscribe((res)=>{
        console.log(res);
      });
      this.ngOnInit();
      Swal.fire('تم الحذف');
      this.router.navigateByUrl('/school/record');
    }});

  }
  editItem2(userModel: Applications) {
    const ref = this.modalService.open(EditrecordComponent, { centered: true });
    ref.componentInstance.selectedrecord = userModel;

    ref.result.then((yes) => {
      console.log('Yes Click');
      this.ngOnInit();
    }
     ,
      (cancel) => {
        console.log('Cancel Click');

      })
  }

}
