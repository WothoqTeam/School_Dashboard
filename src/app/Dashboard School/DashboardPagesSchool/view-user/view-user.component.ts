import { ActivatedRoute, Router } from '@angular/router';
import { LooginService } from 'src/app/Services/loogin.service';
import { HttpClient } from '@angular/common/http';
import { BanksService } from 'src/app/Services/allData';
import { AddDataService } from 'src/app/Services/adddata.service';
import { FormBuilder } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Applications } from 'src/app/ViewModels/iapplications';
import { Subscription } from 'rxjs';
import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { Users } from 'src/app/ViewModels/iusers';
import { Location } from '@angular/common';


@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  application: Applications[] = [];
  public appList: Applications;
  userList: any = [];
  Users: Users[] = [];
  Justuser:Users;
  public PID: number;
  private subscription: Subscription[] = [];
  constructor(private bankService: BanksService,public fb: FormBuilder,private location: Location) {}
      
  ngOnInit(): void {
 
  }


  private getonePrd(prdid: number) {
    this.bankService.getuserById(this.PID).subscribe(
      (res: any) => {
      this.Justuser = res.user;
      console.log(this.Justuser);
      },
      err => console.log(err)
    );
  }
 
}
