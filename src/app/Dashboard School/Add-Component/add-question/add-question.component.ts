import { Component, OnInit, ViewChild , NgZone} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddDataService } from 'src/app/Services/adddata.service';
import { BanksService } from 'src/app/Services/allData';
import { HeaderComponent } from 'src/app/Shared/header/header.component';
import { SideComponent } from 'src/app/Shared/side/side.component';
import { Questions } from 'src/app/ViewModels/questions';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  @ViewChild(SideComponent) side: SideComponent;
  @ViewChild(HeaderComponent) head: HeaderComponent;
  ques: Questions[] = [];
  ques1: Questions[] = [];
  quesList = [];
  private subscription: Subscription[] = [];
  quesForm: FormGroup;

  constructor(private addService: AddDataService, private router: Router,
              private ngZone: NgZone, public fb: FormBuilder, private bankService: BanksService) { }

  ngOnInit(): void {
    this.subscription.push(this.bankService.getAllQues().subscribe(
      (response: any) => {
        this.ques = response;
        this.quesList = response.questions;
        console.log(this.quesList);
      },
      (err) => {
        console.log(err);
      }
    ));
    this.addquestion();
    }
  addquestion(){
    this.quesForm = this.fb.group({
      question: [''],
      type: [''],
      answers: [{
      answer:[''],
      is_correct:['']
      }],
   });
    }
   // / tslint:disable-next-line:typedef
   submitFormQues() {
      this.addService.addquestion(this.quesForm.value).subscribe(res => {
   console.log('Issue added!');
     this.ngZone.run(() => this.router.navigateByUrl('/school/exam'));
     });
    }

    Delete(id: number) {
      this.subscription.push(this.addService.DeleteQues(id).subscribe(
        (response: any) => {
          this.quesList.splice(id, 1);
          // this.branch = response;
          console.log(this.quesList);
        },
        (err) => {
          console.log(err);
        }
      ));
    }
  // tslint:disable-next-line:typedef
  onChange(deviceValue:string) {
    console.log(deviceValue);
}
}
