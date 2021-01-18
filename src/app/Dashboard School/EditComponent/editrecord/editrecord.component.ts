import { Component, OnInit } from '@angular/core';
import { banks } from 'src/app/ViewModels/ibanks';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDataService } from 'src/app/Services/adddata.service';
import { Applications } from 'src/app/ViewModels/iapplications';

@Component({
  selector: 'app-editrecord',
  templateUrl: './editrecord.component.html',
  styleUrls: ['./editrecord.component.css']
})
export class EditrecordComponent implements OnInit {
  selectedrecord: Applications;
  editForm: FormGroup;
  isLoading = false;
  constructor(public modal: NgbActiveModal, private route: ActivatedRoute,
              private usersService: AddDataService,
              private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.setForm();
  }
  onSubmit() {
    if (this.editForm.invalid || this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.usersService.updateStatus(this.editForm.value).subscribe(x => {
      this.isLoading = false;
      this.modal.close('Yes');

    },
      error => {
        this.isLoading = false;
      });
  }
  // tslint:disable-next-line:typedef
  get editFormData() { return this.editForm.controls; }
  private setForm() {
    console.log(this.selectedrecord);
    this.editForm = this.formBuilder.group({
      id: [this.selectedrecord.id, Validators.required],
      student_national_id: [this.selectedrecord.student_national_id, Validators.required],
      student_name: [this.selectedrecord.student_name, Validators.required],
      // exam_id:[this.selectedrecord.exam_id, Validators.required],
      status: [this.selectedrecord.status, Validators.required],
    });
  }
}
