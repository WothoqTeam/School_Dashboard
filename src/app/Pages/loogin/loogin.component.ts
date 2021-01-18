import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LooginService } from './../../Services/loogin.service';
import { UserService } from './../../Services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-loogin',
  templateUrl: './loogin.component.html',
  styleUrls: ['./loogin.component.css']
})
export class LooginComponent implements OnInit {
    email: string;
    password: number;

  constructor(private LoginService: LooginService, private router: Router,
    private userStorage: UserService) { }

  ngOnInit(): void {

  }
  userAuth()
  {
    this.LoginService.userAuth(this.email,this.password).subscribe(
      (res:any)=>{
      
        this.LoginService.login(res.admin.access_token);
        this.userStorage.saveUserName(res.admin.name);
        console.log(res.admin.name);
        this.userStorage.saveUserId(res.admin.id);
        console.log(res.admin.id);
        this.router.navigateByUrl('/school/home');
      },
      err=>{console.log(err);
      }
    );
  }

}
