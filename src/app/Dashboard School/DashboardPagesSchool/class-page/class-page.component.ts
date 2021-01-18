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
import { Classes } from 'src/app/ViewModels/classes';
import { HeaderComponent } from 'src/app/Shared/header/header.component';
import Swal from 'sweetalert2';
import { EditclassComponent } from '../../EditComponent/editclass/editclass.component';

@Component({
  selector: 'app-class-page',
  templateUrl: './class-page.component.html',
  styleUrls: ['./class-page.component.css']
})
export class ClassPageComponent implements OnInit {
  @ViewChild(SideComponent) side: SideComponent;
  @ViewChild(HeaderComponent) head: HeaderComponent;
  private subscription: Subscription[] = [];
  class: Classes[]=[];
  classList: any = [];
  
  constructor(private router: Router,private bankService: BanksService, private modalService: NgbModal,
              private addService: AddDataService, public fb: FormBuilder) { }

  ngOnInit(): void {
        //Classes
        this.subscription.push(this.bankService.getAllClasses().subscribe(
          (response: any) => {
            this.class = response;
            this.classList = response.video_classes;
            console.log(this.class);
          },
          (err) => {
            console.log(err);
          }
        ));
  }

  // tslint:disable-next-line:typedef
  Deleteclass(id){
    Swal.fire({
      title:'هل انت متاكد ؟',
      icon :'warning',
      showCancelButton:true,
      cancelButtonText:'الغاء',
      confirmButtonColor:'red',
      cancelButtonColor:'blue',
      confirmButtonText:'موافق',
    }).then((result)=>{
    this.router.navigate(['/school/classes']);
    if(result.value){
      this.addService.DeleteClasses(id).subscribe((res) => {
        console.log(res);
      });
      this.ngOnInit();
      Swal.fire('تم الحذف');
      this.router.navigateByUrl('/school/classes');
    }});
  }
  editItem(userModel: Classes) {
    const ref = this.modalService.open(EditclassComponent, { centered: true });
    ref.componentInstance.selectedbranch = userModel;

    ref.result.then((yes) => {
      console.log('Yes Click');
      this.ngOnInit();
    },
      (cancel) => {
        console.log('Cancel Click');

      })
  }
}
