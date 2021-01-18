import { Component, OnInit } from '@angular/core';
import { banks } from 'src/app/ViewModels/ibanks';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDataService } from 'src/app/Services/adddata.service';
import { ClassType } from 'src/app/ViewModels/class-type';
import { BanksService } from 'src/app/Services/allData';
import { Subscription } from 'rxjs';
import { Class } from 'src/app/ViewModels/class';

@Component({
  selector: 'app-editclasstype',
  templateUrl: './editclasstype.component.html',
  styleUrls: ['./editclasstype.component.css']
})
export class EditclasstypeComponent implements OnInit {
  selectedbank: ClassType;
  editForm: FormGroup;
  isLoading = false;
  classList: any = [];
  class: Class[] = [];
  filterdArray: any[];
  private subscription: Subscription[] = [];
  constructor(public modal: NgbActiveModal, private route: ActivatedRoute,
              private usersService: AddDataService, private bankService: BanksService,
              private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
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
    this.setForm();
  }
  onChange(event){
    let x = event.target.value;
    this.filterFunction(x);
    console.log("Assss",x);
    }

// tslint:disable-next-line:typedef
public filterFunction(x: any)
{
  this.filterdArray=this.classList.filter(v=>v.type.includes(x))
}
onSubmit() {
    if (this.editForm.invalid || this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.usersService.updatetype(this.editForm.value).subscribe(x => {
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
      class_type_id: [this.selectedbank.id, Validators.required],
      name: [this.selectedbank.name, Validators.required],
      type: [this.selectedbank.type, Validators.required],
      class_id : [this.selectedbank.classes.id,Validators.required],

    });

  }

}
