import { Component, OnInit, NgZone } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDataService } from 'src/app/Services/adddata.service';
import { costs } from 'src/app/ViewModels/icosts';

@Component({
  selector: 'app-editcost',
  templateUrl: './editcost.component.html',
  styleUrls: ['./editcost.component.css']
})
export class EditcostComponent implements OnInit {
  selectedcost: costs;
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
    this.usersService.updateCost(this.editForm.value).subscribe(x => {
      this.isLoading = false;
      this.modal.close('Yes');

    },
      error => {
        this.isLoading = false;
      });
  }
  get editFormData() { return this.editForm.controls; }
  private setForm() {
    console.log(this.selectedcost);

    this.editForm = this.formBuilder.group({
      id: [this.selectedcost.id, Validators.required],
      year: [this.selectedcost.year, Validators.required],
      type: [this.selectedcost.type, Validators.required],
      class_id: [this.selectedcost.class_id, Validators.required],
      study_type: [this.selectedcost.study_type, Validators.required],
      trip: [this.selectedcost.trip, Validators.required],
      cost: [this.selectedcost.cost, Validators.required],
    });

  }


}
