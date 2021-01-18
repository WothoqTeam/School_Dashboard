import { Component, OnInit, ViewChild ,NgZone} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddDataService } from 'src/app/Services/adddata.service';
import { HeaderComponent } from 'src/app/Shared/header/header.component';
import { SideComponent } from 'src/app/Shared/side/side.component';

@Component({
  selector: 'app-addbank',
  templateUrl: './addbank.component.html',
  styleUrls: ['./addbank.component.css']
})
export class AddbankComponent implements OnInit {
  @ViewChild(SideComponent) side: SideComponent;
  @ViewChild(HeaderComponent) head: HeaderComponent;
  private subscription: Subscription[] = [];
  bankForm: FormGroup;
  constructor(private addService: AddDataService,private router: Router,
              private ngZone: NgZone,public fb: FormBuilder) { }

  ngOnInit(): void {
    this.addbank();
  }
  addbank() {
    this.bankForm = this.fb.group({
      name: [''],
      iban: ['']
    });
  }
  // tslint:disable-next-line:typedef
  submitFormBank() {
    this.addService.addNewBank(this.bankForm.value).subscribe(res => {
      console.log('Issue added!');
      this.ngZone.run(() => this.router.navigateByUrl('/school/bank'));
    });
  }

}
