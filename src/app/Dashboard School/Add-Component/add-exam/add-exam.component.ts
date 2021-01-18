import { Component, OnInit, ViewChild , NgZone} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddDataService } from 'src/app/Services/adddata.service';
import { BanksService } from 'src/app/Services/allData';
import { HeaderComponent } from 'src/app/Shared/header/header.component';
import { SideComponent } from 'src/app/Shared/side/side.component';
import { Class } from 'src/app/ViewModels/class';
import { Exams } from 'src/app/ViewModels/IExams';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit {
  @ViewChild(SideComponent) side: SideComponent;
  @ViewChild(HeaderComponent) head: HeaderComponent;
  branchList: any = [];
  exam: Exams[] = [];
  examList = [];
  private subscription: Subscription[] = [];
  examForm: FormGroup;
classList: any = [];
class: Class[] = [];

  constructor(private addService: AddDataService, private router: Router,
    private ngZone: NgZone, public fb: FormBuilder, private bankService: BanksService) { 
     // this.classes = this.getClasses();
    }

  ngOnInit(): void {
   this.addexam();

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
  }


 // AddExam
addexam(){
 this.examForm = this.fb.group({
   name: [''],
   class_id:[''],
   exam_timer: [''],
   number_of_attempts: [''],
    exam_validity: [''],

});
 }
// / tslint:disable-next-line:typedef
submitFormExam() {
   this.addService.addExams(this.examForm.value).subscribe(res => {
console.log('Issue added!');
 
  });
 }

}
