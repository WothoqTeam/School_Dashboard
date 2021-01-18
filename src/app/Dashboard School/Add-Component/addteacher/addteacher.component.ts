import { Component, OnInit, ViewChild ,NgZone} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddDataService } from 'src/app/Services/adddata.service';
import { HeaderComponent } from 'src/app/Shared/header/header.component';
import { SideComponent } from 'src/app/Shared/side/side.component';

@Component({
  selector: 'app-addteacher',
  templateUrl: './addteacher.component.html',
  styleUrls: ['./addteacher.component.css']
})
export class AddteacherComponent implements OnInit {
  @ViewChild(SideComponent) side: SideComponent;
  @ViewChild(HeaderComponent) head: HeaderComponent;
  private subscription: Subscription[] = [];
  teacherForm: FormGroup;

  constructor(private addService: AddDataService,private router: Router,
              private ngZone: NgZone,public fb: FormBuilder) { }

  ngOnInit(): void {
    this.addTeacher();
  }
  addTeacher() {
    this.teacherForm = this.fb.group({
      name:[''],
      email:[''],
      mobile:[''],
    });
  }
  // tslint:disable-next-line:typedef
  submitFormTeacher() {
    this.addService.addTeacher(this.teacherForm.value).subscribe(res => {
      console.log('Issue added!');
      console.log(this.teacherForm.value);
      this.ngZone.run(() => this.router.navigateByUrl('/school/teacher'));
    });
  }

}
