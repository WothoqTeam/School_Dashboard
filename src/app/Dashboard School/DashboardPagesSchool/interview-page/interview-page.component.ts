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
import { Interviews } from 'src/app/ViewModels/interviews';
import { HeaderComponent } from 'src/app/Shared/header/header.component';

@Component({
  selector: 'app-interview-page',
  templateUrl: './interview-page.component.html',
  styleUrls: ['./interview-page.component.css']
})
export class InterviewPageComponent implements OnInit {
  @ViewChild(SideComponent) side: SideComponent;
  @ViewChild(HeaderComponent) head: HeaderComponent;
  private subscription: Subscription[] = [];
  interviewList: any = [];
  interview: Interviews[] = [];
  
  constructor(private router: Router, private Service: LooginService, private http: HttpClient,
    private bankService: BanksService, private addService: AddDataService, private activeRoute: ActivatedRoute,
    public fb: FormBuilder, private ngZone: NgZone, private modalService: NgbModal) { }

  ngOnInit(): void {
     //interviews
     this.subscription.push(this.bankService.getAllinterviews().subscribe(
      (response: any) => {
        this.interview = response;
        this.interviewList = response.interviews;
        console.log(this.interview);
      },
      (err) => {
        console.log(err);
      }
    ));

  }

}
