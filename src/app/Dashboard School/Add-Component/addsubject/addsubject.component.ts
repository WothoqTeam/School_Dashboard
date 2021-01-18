import { Component, OnInit, ViewChild ,NgZone} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddDataService } from 'src/app/Services/adddata.service';
import { BanksService } from 'src/app/Services/allData';
import { HeaderComponent } from 'src/app/Shared/header/header.component';
import { SideComponent } from 'src/app/Shared/side/side.component';

@Component({
  selector: 'app-addsubject',
  templateUrl: './addsubject.component.html',
  styleUrls: ['./addsubject.component.css']
})
export class AddsubjectComponent implements OnInit {
  @ViewChild(SideComponent) side: SideComponent;
  @ViewChild(HeaderComponent) head: HeaderComponent;
  private subscription: Subscription[] = [];
  subForm: FormGroup;
  
  constructor(private addService: AddDataService,private router: Router,
              private ngZone: NgZone, public fb: FormBuilder , private bankService: BanksService) { }

  ngOnInit(): void {
this.addSub();
  }
  addSub() {
    this.subForm = this.fb.group({
      name: [''],
      semester: ['']

    });
  }
  // tslint:disable-next-line:typedef
  submitFormCost() {
    this.addService.addSubject(this.subForm.value).subscribe(res => {
      console.log('Issue added!');
      console.log(this.subForm.value);
      this.ngZone.run(() => this.router.navigateByUrl('/school/subjects'));
    });
  }
}
