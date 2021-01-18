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
import { Schedule } from 'src/app/ViewModels/schedule';
import { HeaderComponent } from 'src/app/Shared/header/header.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-scedule-page',
  templateUrl: './scedule-page.component.html',
  styleUrls: ['./scedule-page.component.css']
})
export class ScedulePageComponent implements OnInit {
  @ViewChild(SideComponent) side: SideComponent;
  @ViewChild(HeaderComponent) head: HeaderComponent;
  private subscription: Subscription[] = [];
  schedule: Schedule[] = [];
  schedList: any = [];
  
  constructor(private router: Router, private Service: LooginService, private http: HttpClient,
    private bankService: BanksService, private addService: AddDataService, private activeRoute: ActivatedRoute,
    public fb: FormBuilder, private ngZone: NgZone, private modalService: NgbModal) { }

  ngOnInit(): void {
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

  }
  DeleteSchedule(id){
    Swal.fire({
      title:'هل انت متاكد ؟',
      icon :'warning',
      showCancelButton:true,
      cancelButtonText:'الغاء',
      confirmButtonColor:'red',
      cancelButtonColor:'blue',
      confirmButtonText:'موافق',
    }).then((result)=>{
    this.router.navigate(['/school/schedule']);
    if(result.value){
      this.addService.DeleteSchedule(id).subscribe((res)=>{
        console.log(res);
      });
      this.ngOnInit();
      Swal.fire('تم الحذف');
      this.router.navigateByUrl('/school/schedule');
    }});
  }

}
