import { Component, OnInit, NgZone } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Branch } from 'src/app/ViewModels/ibranches';
import { AddDataService } from 'src/app/Services/adddata.service';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.css']
})
export class EditBranchComponent implements OnInit {
  selectedbranch: Branch;
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
    this.usersService.updateBranch(this.editForm.value).subscribe(x => {
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
      name: [this.selectedbranch.name, Validators.required],
      city: [this.selectedbranch.city, Validators.required],
      district: [this.selectedbranch.district, Validators.required]
    });

  }

}
