import { Component, OnInit, ViewChild ,NgZone} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddDataService } from 'src/app/Services/adddata.service';
import { HeaderComponent } from 'src/app/Shared/header/header.component';
import { SideComponent } from 'src/app/Shared/side/side.component';
import { Branch } from 'src/app/ViewModels/ibranches';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent implements OnInit {
  @ViewChild(SideComponent) side: SideComponent;
  @ViewChild(HeaderComponent) head: HeaderComponent;
  branchList: any = [];
  branch: Branch[] = [];
  private subscription: Subscription[] = [];
  issueForm: FormGroup;
  constructor(private addService: AddDataService,private router: Router,
              private ngZone: NgZone,public fb: FormBuilder) { }

  ngOnInit(): void {
    this.addbranch();
  }
  //AddBranch
  addbranch() {
    this.issueForm = this.fb.group({

      name: [''],
      city: [''],
      district: ['']
    })
  }
  submitForm() {
    this.addService.addBranch(this.issueForm.value).subscribe(res => {
      console.log('Issue added!');
      this.ngZone.run(() => this.router.navigateByUrl('/school/branch'));
    });
  }

}
