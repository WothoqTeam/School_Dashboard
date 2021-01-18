import { Component, OnInit } from '@angular/core';
import { banks } from 'src/app/ViewModels/ibanks';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDataService } from 'src/app/Services/adddata.service';

@Component({
  selector: 'app-edit-bank',
  templateUrl: './edit-bank.component.html',
  styleUrls: ['./edit-bank.component.css']
})
export class EditBankComponent implements OnInit {
  selectedbank: banks;
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
    this.usersService.updateBank(this.editForm.value).subscribe(x => {
      this.isLoading = false;
      this.modal.close('Yes');

    },
      error => {
        this.isLoading = false;
      });
  }
  get editFormData() { return this.editForm.controls; }
  private setForm() {
    console.log(this.selectedbank);
    this.editForm = this.formBuilder.group({
      id: [this.selectedbank.id, Validators.required],
      name: [this.selectedbank.name, Validators.required],
      iban: [this.selectedbank.iban, Validators.required],
    });

  }

}
