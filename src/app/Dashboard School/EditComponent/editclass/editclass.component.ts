import { Component, OnInit, NgZone } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDataService } from 'src/app/Services/adddata.service';
import { Classes } from 'src/app/ViewModels/classes';

@Component({
  selector: 'app-editclass',
  templateUrl: './editclass.component.html',
  styleUrls: ['./editclass.component.css']
})
export class EditclassComponent implements OnInit {
  selectedbranch: Classes;
  editForm: FormGroup;
  isLoading = false;
  constructor(public modal: NgbActiveModal, private route: ActivatedRoute,
              private usersService: AddDataService, private ngZone: NgZone,
              private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.setForm();

  }
  onSubmit() {
    if (this.editForm.invalid || this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.usersService.updateClass(this.editForm.value).subscribe(x => {
      this.isLoading = false;
      this.modal.close('Yes');

    },
      error => {
        this.isLoading = false;
      });
  }
  get editFormData() { return this.editForm.controls; }
  
  private setForm() {
    console.log(this.selectedbranch);

    this.editForm = this.formBuilder.group({
      id: [this.selectedbranch.id, Validators.required],
      teacher_id: [this.selectedbranch.teacher.name, Validators.required],
      subject_id: [this.selectedbranch.subject.name, Validators.required],
      class_id: [this.selectedbranch.class_id, Validators.required], 
      start_time: [this.selectedbranch.start_time, Validators.required], 
      end_time: [this.selectedbranch.end_time, Validators.required],

    });

  }
}
