import { Component, OnInit, NgZone } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDataService } from 'src/app/Services/adddata.service';
import { Applications } from 'src/app/ViewModels/iapplications';
import { Subscription } from 'rxjs';
import { BanksService } from 'src/app/Services/allData';
import { Exams } from 'src/app/ViewModels/IExams';

@Component({
  selector: 'app-edit-exam-app',
  templateUrl: './edit-exam-app.component.html',
  styleUrls: ['./edit-exam-app.component.css']
})
export class EditExamAppComponent implements OnInit {
  selectedapp: Applications;
  editForm: FormGroup;
  isLoading = false;
  application: Applications[] = [];
  appList: any = [];
  exam: Exams[] = [];
  examList = [];
  private subscription: Subscription[] = [];
  constructor(public modal: NgbActiveModal, private route: ActivatedRoute,private bankService: BanksService,
              private usersService: AddDataService, private ngZone: NgZone,
              private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.subscription.push(this.bankService.getAllapplicatios().subscribe(
      (response: any) => {
        this.application = response;
        this.appList = response.applications.data;
      },
      (err) => {
        console.log(err);
      }
  ));
    this.subscription.push(this.bankService.getAllExams().subscribe(
    (response: any) => {
      this.exam = response;
      this.examList = response.exams;
    },
    (err) => {
      console.log(err);
    }
  ));
    this.setForm();
  }
  // tslint:disable-next-line:typedef
  onSubmit() {
    if (this.editForm.invalid || this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.usersService.updateApp(this.editForm.value).subscribe(x => {
      this.isLoading = false;
      this.modal.close('Yes');

    },
      error => {
        this.isLoading = false;
      });
  }
  // tslint:disable-next-line:typedef
  get editFormData() { return this.editForm.controls; }
  // tslint:disable-next-line:typedef
  private setForm() {
    console.log(this.selectedapp);

    this.editForm = this.formBuilder.group({
      id: [this.selectedapp.id, Validators.required],
      exam_id: [this.selectedapp.exam_id, Validators.required],
    });

  }
}
