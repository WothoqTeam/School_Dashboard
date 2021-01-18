import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { SideComponent } from 'src/app/Shared/side/side.component';
import { Branch } from 'src/app/ViewModels/ibranches';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LooginService } from 'src/app/Services/loogin.service';
import { HttpClient } from '@angular/common/http';
import { BanksService } from 'src/app/Services/allData';
import { AddDataService } from 'src/app/Services/adddata.service';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from 'src/app/Shared/header/header.component';
import { EditBranchComponent } from '../../EditComponent/edit-branch/edit-branch.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-branch-page',
  templateUrl: './branch-page.component.html',
  styleUrls: ['./branch-page.component.css']
})
export class BranchPageComponent implements OnInit {
  @ViewChild(SideComponent) side: SideComponent;
  @ViewChild(HeaderComponent) head: HeaderComponent;
  branchList: any = [];
  branch: Branch[] = [];
  private subscription: Subscription[] = [];

  constructor(private router: Router, private Service: LooginService, private http: HttpClient,
              private bankService: BanksService, private addService: AddDataService,
              private activeRoute: ActivatedRoute,public fb: FormBuilder,
              private ngZone: NgZone, private modalService: NgbModal) { }

  ngOnInit(): void {
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

  }
  //SearchBranch
  // tslint:disable-next-line:typedef
  public filterBranch(event: any) {
    
    console.log(event.target.value);
    const searshableString = event.target.value;
    this.addService.searchBranches(searshableString).subscribe(
      (data: any) => {
      console.log(data);
      this.branchList = data.branches;
     // this.ngOnInit();
      // this.ngZone.run(() => this.router.navigateByUrl('/school/branch'));
    }, (error: any) => {
      console.log(error);
    });
  }

  Delete(id){
    Swal.fire({
      title:'هل انت متاكد ؟',
      icon :'warning',
      showCancelButton:true,
      cancelButtonText:'الغاء',
      confirmButtonColor:'red',
      cancelButtonColor:'blue',
      confirmButtonText:'موافق',
    }).then((result)=>{
    this.router.navigate(['/school/branch']);
    if(result.value){
      this.addService.DeleteBranch(id).subscribe((res)=>{
        console.log(res);
      });
      this.ngOnInit();
      Swal.fire('تم الحذف');
      this.router.navigateByUrl('/school/branch');
    }})
  }
  // tslint:disable-n ext-line:typedef
  // tslint:disable-next-line:typedef
  editItem(userModel: Branch) {
    const ref = this.modalService.open(EditBranchComponent, { centered: true });
    ref.componentInstance.selectedbranch = userModel;
    ref.result.then((yes) => {
      console.log('Yes Click');
      this.ngOnInit();
    }
     ,
      (cancel) => {
        console.log('Cancel Click');

      });
  }
}
