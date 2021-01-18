import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit, ViewChild} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddDataService } from 'src/app/Services/adddata.service';
import { BanksService } from 'src/app/Services/allData';
import { LooginService } from 'src/app/Services/loogin.service';
import { SideComponent } from 'src/app/Shared/side/side.component';
import { HeaderComponent } from 'src/app/Shared/header/header.component';
import { banks } from 'src/app/ViewModels/ibanks';
import { EditBankComponent } from '../../EditComponent/edit-bank/edit-bank.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bank-page',
  templateUrl: './bank-page.component.html',
  styleUrls: ['./bank-page.component.css']
})
export class BankPageComponent implements OnInit {
  @ViewChild(SideComponent) side: SideComponent;
  @ViewChild(HeaderComponent) head: HeaderComponent;
  bankList: any = [];
  baank: banks[] = [];
  private subscription: Subscription[] = [];
  
  constructor(private router: Router, private http: HttpClient,
              private bankService: BanksService, private addService: AddDataService, private activeRoute: ActivatedRoute,
              public fb: FormBuilder, private ngZone: NgZone, private modalService: NgbModal) { }

  ngOnInit(): void {
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
  // DeleteBank
// tslint:disable-next-line:typedef

  Deletebank(id){
    Swal.fire({
      title:'هل انت متاكد ؟',
      icon :'warning',
      showCancelButton:true,
      cancelButtonText:'الغاء',
      confirmButtonColor:'red',
      cancelButtonColor:'blue',
      confirmButtonText:'موافق',
    }).then((result)=>{
    this.router.navigate(['/school/bank']);
    if(result.value){
      this.addService.DeleteBank(id).subscribe((res)=>{
        console.log(res);
      });
      this.ngOnInit();
      Swal.fire('تم الحذف');
      this.router.navigateByUrl('/school/bank');
    }})
  }

  editItem(userModel: banks) {
    const ref = this.modalService.open(EditBankComponent, { centered: true });
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
