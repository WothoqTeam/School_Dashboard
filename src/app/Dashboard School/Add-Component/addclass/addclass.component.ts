import { Component, OnInit, ViewChild ,NgZone} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddDataService } from 'src/app/Services/adddata.service';
import { BanksService } from 'src/app/Services/allData';
import { HeaderComponent } from 'src/app/Shared/header/header.component';
import { SideComponent } from 'src/app/Shared/side/side.component';
import { Class } from 'src/app/ViewModels/class';
import { Subjects } from 'src/app/ViewModels/subjects';
import { Teacher } from 'src/app/ViewModels/teacher';

@Component({
  selector: 'app-addclass',
  templateUrl: './addclass.component.html',
  styleUrls: ['./addclass.component.css']
})
export class AddclassComponent implements OnInit {
  @ViewChild(SideComponent) side: SideComponent;
  @ViewChild(HeaderComponent) head: HeaderComponent;
  private subscription: Subscription[] = [];
  ClassForm: FormGroup;
  subject: Subjects[] = [];
  subList = [];
  teacherList: any = [];
  teacher: Teacher[] = [];
  classList: any = [];
  class: Class[] = [];
  constructor(private addService: AddDataService,private router: Router, private bankService: BanksService,
              private ngZone: NgZone,public fb: FormBuilder) { }

  ngOnInit(): void {
    this.subscription.push(this.bankService.getAllSubject().subscribe(
      (response: any) => {
        this.subject = response;
        this.subList = response.subjects;
      },
      (err) => {
        console.log(err);
      }
    ));
 //Teachers
    this.subscription.push(this.bankService.getAllTeacher().subscribe(
  (response: any) => {
    this.teacher = response;
    this.teacherList = response.teachers;
    console.log(this.teacher);
  },
  (err) => {
    console.log(err);
  }
));

    this.subscription.push(this.bankService.getAllclass().subscribe(
  (response: any) => {
    this.class = response;
    this.classList = response.classes;
    console.log(this.classList);
  },
  (err) => {
    console.log(err);
  }
));
    this.addClass();
  }
  //Add Class
  // tslint:disable-next-line:typedef
  addClass() {
    this.ClassForm = this.fb.group({

      start_time: [''],
      end_time: [''],
      teacher_id: [''],
      subject_id: [''],
      semester: [''],
      class_id: []

    });
  }
  // tslint:disable-next-line:typedef
submitFormClass() {
    this.addService.addClasses(this.ClassForm.value).subscribe(res => {
      console.log('Issue added!');
      this.ngZone.run(() => this.router.navigateByUrl('/school/classes'));
    });
  }

}
