import { Component, OnInit, NgZone } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDataService } from 'src/app/Services/adddata.service';
import { Subscription } from 'rxjs';
import { BanksService } from 'src/app/Services/allData';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subjects } from 'src/app/ViewModels/subjects';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css']
})
export class EditSubjectComponent implements OnInit {
  selectedapp: Subjects;
  editForm: FormGroup;
  isLoading = false;
  private subscription: Subscription[] = [];

  constructor(public modal: NgbActiveModal, private route: ActivatedRoute,private bankService: BanksService,
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
    this.usersService.updateSubject(this.editForm.value).subscribe(x => {
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
      name: [this.selectedapp.name, Validators.required],
      semester: [this.selectedapp.semester, Validators.required],
    });

  }

}
