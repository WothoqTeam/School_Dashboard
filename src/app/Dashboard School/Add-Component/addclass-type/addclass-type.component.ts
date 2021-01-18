import { Component, OnInit, ViewChild ,NgZone} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddDataService } from 'src/app/Services/adddata.service';
import { BanksService } from 'src/app/Services/allData';
import { HeaderComponent } from 'src/app/Shared/header/header.component';
import { SideComponent } from 'src/app/Shared/side/side.component';
import { Class } from 'src/app/ViewModels/class';

@Component({
  selector: 'app-addclass-type',
  templateUrl: './addclass-type.component.html',
  styleUrls: ['./addclass-type.component.css']
})
export class AddclassTypeComponent implements OnInit {
  @ViewChild(SideComponent) side: SideComponent;
  @ViewChild(HeaderComponent) head: HeaderComponent;
  private subscription: Subscription[] = [];
  bankForm: FormGroup;
  classList: any = [];
  class: Class[] = [];
  filterdArray: any[];
  constructor(private addService: AddDataService, private router: Router,
              private ngZone: NgZone, public fb: FormBuilder,private bankService: BanksService) { }

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
this.addbank();

  }
  // tslint:disable-next-line:typedef
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
  addbank() {
    this.bankForm = this.fb.group({
      name: [''],
      type: [''],
      class_id: ['']
    });
  }
  // tslint:disable-next-line:typedef
  submitFormBank() {
    this.addService.AddclassType(this.bankForm.value).subscribe(res => {
      console.log('Issue added!');
      this.ngZone.run(() => this.router.navigateByUrl('school/Addclasses'));
    });
  }

}
