import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { SideComponent } from 'src/app/Shared/side/side.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LooginService } from 'src/app/Services/loogin.service';
import { HttpClient } from '@angular/common/http';
import { BanksService } from 'src/app/Services/allData';
import { AddDataService } from 'src/app/Services/adddata.service';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { costs } from 'src/app/ViewModels/icosts';
import { HeaderComponent } from 'src/app/Shared/header/header.component';
import { EditcostComponent } from '../../EditComponent/editcost/editcost.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.css']
})
export class CostsComponent implements OnInit {
  @ViewChild(SideComponent) side: SideComponent;
  @ViewChild(HeaderComponent) head: HeaderComponent;
  private subscription: Subscription[] = [];
  Cost: costs[] = [];
  CostList: any = [];
  constructor(private router: Router, private Service: LooginService, private http: HttpClient,
              private bankService: BanksService, private addService: AddDataService, private activeRoute: ActivatedRoute,
              public fb: FormBuilder, private ngZone: NgZone, private modalService: NgbModal) { }

  ngOnInit(): void {
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
  }
  //DeleteCost
  DeleteCost(id){
    Swal.fire({
      title:'هل انت متاكد ؟',
      icon :'warning',
      showCancelButton:true,
      cancelButtonText:'الغاء',
      confirmButtonColor:'red',
      cancelButtonColor:'blue',
      confirmButtonText:'موافق',
    }).then((result)=>{
    this.router.navigate(['/school/cost']);
    if(result.value){
      this.addService.DeleteCost(id).subscribe((res)=>{
        console.log(res);
      });
      this.ngOnInit();
      Swal.fire('تم الحذف');
      this.router.navigateByUrl('/school/cost');
    }})
  }
editItem(userModel: costs) {
    const ref = this.modalService.open(EditcostComponent, { centered: true });
    ref.componentInstance.selectedcost = userModel;

    ref.result.then((yes) => {
      console.log('Yes Click');
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
    },
      (cancel) => {
        console.log('Cancel Click');

      });
  }
}
