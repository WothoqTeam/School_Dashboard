import { Component, OnInit } from '@angular/core';
import { banks } from 'src/app/ViewModels/ibanks';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDataService } from 'src/app/Services/adddata.service';
import { Applications } from 'src/app/ViewModels/iapplications';
import { Teacher } from 'src/app/ViewModels/teacher';

@Component({
  selector: 'app-editteacher',
  templateUrl: './editteacher.component.html',
  styleUrls: ['./editteacher.component.css']
})
export class EditteacherComponent implements OnInit {
  selectedteach: Teacher;
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
    this.usersService.updateTeach(this.editForm.value).subscribe(x => {
      this.isLoading = false;
      this.modal.close('Yes');

    },
      error => {
        this.isLoading = false;
      });
  }
  get editFormData() { return this.editForm.controls; }
  private setForm() {
    console.log(this.selectedteach);
    this.editForm = this.formBuilder.group({
      id: [this.selectedteach.id, Validators.required],
      name: [this.selectedteach.name, Validators.required],
      email: [this.selectedteach.email, Validators.required],
      mobile: [this.selectedteach.mobile, Validators.required],
    });

  }
}
