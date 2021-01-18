import { Component, OnInit, ViewChild ,NgZone} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddDataService } from 'src/app/Services/adddata.service';
import { BanksService } from 'src/app/Services/allData';
import { HeaderComponent } from 'src/app/Shared/header/header.component';
import { SideComponent } from 'src/app/Shared/side/side.component';
import { Class } from 'src/app/ViewModels/class';
import { ClassType } from 'src/app/ViewModels/class-type';
import { Classes } from 'src/app/ViewModels/classes';
import { Schedule } from 'src/app/ViewModels/schedule';



@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {
  @ViewChild(SideComponent) side: SideComponent;
  @ViewChild(HeaderComponent) head: HeaderComponent;
  private subscription: Subscription[] = [];
  issueForm: FormGroup;

  schedList: any = [];
  schedule: Schedule[] = [];

  class: Classes[] = [];
  classList: any = [];

  classLists: any = [];
  classs: Class[] = [];

  classtypeList: any = [];
  classtype: ClassType[] = [];

  constructor(private addService: AddDataService,private router: Router, private bankService: BanksService,
              private ngZone: NgZone, public fb: FormBuilder) {}

  ngOnInit(): void {
    this.addschedule();
    this.addsunration();
    this.addmonration();
    this.addtueration();
    this.addwenration();
    this.addthrration();
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
     //Classes
    this.subscription.push(this.bankService.getAllClasses().subscribe(
      (response: any) => {
        this.class = response;
        this.classList =response.video_classes;
        console.log(this.class);
      },
      (err) => {
        console.log(err);
      }
    ));
    this.subscription.push(this.bankService.getAllclass().subscribe(
      (response: any) => {
        this.classs = response;
        this.classLists = response.classes;
        console.log(this.classList);
      },
      (err) => {
        console.log(err);
      }
    ));
//class_type
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
//Addschedule
// tslint:disable-next-line:typedef
addschedule() {
  this.issueForm = this.fb.group({
   
    name: [''],
    study_year: [''],
    SunRations: this.fb.array([]),
    MonRations: this.fb.array([]),
    TueRations: this.fb.array([]),
    WenRations: this.fb.array([]),
    ThrRations: this.fb.array([]),
    class_id: [''],
    class_type_id: [''],

  });
}
get SunRations(): FormArray {
  return this.issueForm.get('SunRations') as FormArray
}
get MonRations(): FormArray {
  return this.issueForm.get('MonRations') as FormArray
}
get TueRations(): FormArray {
  return this.issueForm.get('TueRations') as FormArray
}
get WenRations(): FormArray {
  return this.issueForm.get('WenRations') as FormArray
}
get ThrRations(): FormArray {
  return this.issueForm.get('ThrRations') as FormArray
}

newsunration(): FormGroup {
  return this.fb.group({
    id: ['', Validators.maxLength(10)],
  });
}
newmonration(): FormGroup {
  return this.fb.group({
    id:['',Validators.maxLength(10)],
  });
}
newtueration(): FormGroup {
  return this.fb.group({
    id:['',Validators.maxLength(10)],
  });
}
newwenration(): FormGroup {
  return this.fb.group({
    id:['',Validators.maxLength(10)],
  });
}
newthrration(): FormGroup {
  return this.fb.group({
    id:['',Validators.maxLength(10)],
  });
}

addsunration() {
   this.SunRations.push(this.newsunration());
   this.SunRations.push(this.newsunration());
   this.SunRations.push(this.newsunration());
   this.SunRations.push(this.newsunration());
   this.SunRations.push(this.newsunration());
   this.SunRations.push(this.newsunration());
   this.SunRations.push(this.newsunration());

  }
addmonration() {
   this.MonRations.push(this.newmonration());
   this.MonRations.push(this.newmonration());
   this.MonRations.push(this.newmonration());
   this.MonRations.push(this.newmonration());
   this.MonRations.push(this.newmonration());
   this.MonRations.push(this.newmonration());
   this.MonRations.push(this.newmonration());

  }
addtueration() {
   this.TueRations.push(this.newtueration());
   this.TueRations.push(this.newtueration());
   this.TueRations.push(this.newtueration());
   this.TueRations.push(this.newtueration());
   this.TueRations.push(this.newtueration());
   this.TueRations.push(this.newtueration());
   this.TueRations.push(this.newtueration());

  }
addwenration() {
   this.WenRations.push(this.newwenration());
   this.WenRations.push(this.newwenration());
   this.WenRations.push(this.newwenration());
   this.WenRations.push(this.newwenration());
   this.WenRations.push(this.newwenration());
   this.WenRations.push(this.newwenration());
   this.WenRations.push(this.newwenration());

  }
addthrration() {
   this.ThrRations.push(this.newthrration());
   this.ThrRations.push(this.newthrration());
   this.ThrRations.push(this.newthrration());
   this.ThrRations.push(this.newthrration());
   this.ThrRations.push(this.newthrration());
   this.ThrRations.push(this.newthrration());
   this.ThrRations.push(this.newthrration());

  }
// tslint:disable-next-line:typedef
submitForm() {
  this.addService.addSchedule(this.issueForm.value).subscribe(res => {
    console.log('Issue added!');
    //console.log(this.issueForm.value);
    this.ngZone.run(() => this.router.navigateByUrl('/school/schedule'));
  });
}
}
