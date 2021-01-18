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
import { Exams } from 'src/app/ViewModels/IExams';
import { HeaderComponent } from 'src/app/Shared/header/header.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exam-page',
  templateUrl: './exam-page.component.html',
  styleUrls: ['./exam-page.component.css']
})
export class ExamPageComponent implements OnInit {
  @ViewChild(SideComponent) side: SideComponent;
  @ViewChild(HeaderComponent) head: HeaderComponent;
  private subscription: Subscription[] = [];
  exam: Exams[] = [];
  examList = [];
  
  constructor(private router: Router, private Service: LooginService, private http: HttpClient,
              private bankService: BanksService, private addService: AddDataService, 
              private activeRoute: ActivatedRoute,
              public fb: FormBuilder, private ngZone: NgZone, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.subscription.push(this.bankService.getAllExams().subscribe(
      (response: any) => {
        this.exam = response;
        this.examList = response.exams;
      },
      (err) => {
        console.log(err);
      }
    ));
  }
 
  DeleteExam(id){
    Swal.fire({
      title:'هل انت متاكد ؟',
      icon :'warning',
      showCancelButton:true,
      cancelButtonText:'الغاء',
      confirmButtonColor:'red',
      cancelButtonColor:'blue',
      confirmButtonText:'موافق',
    }).then((result)=>{
    this.router.navigate(['/school/record']);
    if(result.value){
      this.addService.DeleteExam(id).subscribe((res)=>{
        console.log(res);
      });
      this.ngOnInit();
      Swal.fire('Deleted','your file has been deleted', 'success');
      this.router.navigateByUrl('/school/record');
    }})
  }


}
