import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit, ViewChild} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddDataService } from 'src/app/Services/adddata.service';
import { BanksService } from 'src/app/Services/allData';
import { HeaderComponent } from 'src/app/Shared/header/header.component';
import { SideComponent } from 'src/app/Shared/side/side.component';
import { ClassType } from 'src/app/ViewModels/class-type';
import Swal from 'sweetalert2';
import { EditclasstypeComponent } from '../../EditComponent/editclasstype/editclasstype.component';


@Component({
  selector: 'app-addclasses',
  templateUrl: './addclasses.component.html',
  styleUrls: ['./addclasses.component.css']
})
export class AddclassesComponent implements OnInit {
  @ViewChild(SideComponent) side: SideComponent;
  @ViewChild(HeaderComponent) head: HeaderComponent;
  classtypeList: any = [];
  classtype: ClassType[] = [];
  private subscription: Subscription[] = [];
  constructor(private router: Router, private http: HttpClient,
              private bankService: BanksService, private addService: AddDataService,
              private activeRoute: ActivatedRoute,public fb: FormBuilder, private ngZone: NgZone,
              private modalService: NgbModal) { }

  ngOnInit(): void {
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
  }
 Deletebank(class_type_id){
    Swal.fire({
      title:'هل انت متاكد ؟',
      icon :'warning',
      showCancelButton:true,
      cancelButtonText:'الغاء',
      confirmButtonColor:'red',
      cancelButtonColor:'blue',
      confirmButtonText:'موافق',
    }).then((result)=>{
    this.router.navigate(['/school/Addclasses']);
    if(result.value){
      this.addService.DeleteType(class_type_id).subscribe((res)=>{
        console.log(res);
      });
      this.ngOnInit();
      Swal.fire('تم الحذف');
      this.router.navigateByUrl('/school/Addclasses');
    }})
  }
  editItem(userModel: ClassType) {
    const ref = this.modalService.open(EditclasstypeComponent, { centered: true });
    ref.componentInstance.selectedbank = userModel;

    ref.result.then((yes) => {
      console.log('Yes Click');
      this.ngOnInit();
    },
      (cancel) => {
        console.log('Cancel Click');

      })
  }
}
