import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { banks } from '../ViewModels/ibanks';
import { Applications} from '../ViewModels/iapplications';
// import { Ibranches} from '../ViewModels/ibranches';
import { Branch} from '../ViewModels/ibranches';
import { LooginService } from 'src/app/Services/loogin.service';
import {costs} from '../ViewModels/icosts';
// import {IExams} from '../ViewModels/IExams';
import {Exams} from '../ViewModels/IExams';
import {Users} from '../ViewModels/iusers' ;
import {Teacher} from '../ViewModels/teacher' ;
import { Interviews } from '../ViewModels/interviews';
import { Classes } from '../ViewModels/classes';
import { Schedule } from '../ViewModels/schedule';
import { Class } from '../ViewModels/class';
import { Questions } from '../ViewModels/questions';
import { ClassType } from '../ViewModels/class-type';
import { Subjects } from '../ViewModels/subjects';

@Injectable({
  providedIn: 'root'
})
// const tooken:string =localStorage.getItem('usertoken');
export class BanksService {

  constructor(private http: HttpClient, private Service: LooginService) { }
  tooken = localStorage.getItem('usertoken');
  readonly BaseURI = 'http://school.wothoq.co/api';
  readonly BaseURII = 'https://school.wothoq.co/api';

  // GETAllBanks
  getAllBanks(): Observable<banks[]> {
    const newLocal = this.http.post<banks[]>(`${this.BaseURII}/admin/banks/get-all-banks`, this.tooken);
    return newLocal;
  }
  // // GETAllschedule
  // getAllschedule(): Observable<banks[]> {
  //   const newLocal = this.http.post<banks[]>(`${this.BaseURII}/admin/banks/get-all-banks`, this.tooken);
  //   return newLocal;
  // }
  // GETAllApplications
  getAllapplicatios(): Observable<Applications[]> {
    const newLocal = this.http.post<Applications[]>(`${this.BaseURII}/admin/applications/get-all-applications`, this.tooken);
    return newLocal;
  }
  // GETAllBranches
  getAllbranches(): Observable<Branch[]> {
    const newLocal = this.http.post<Branch[]>(`${this.BaseURII}/admin/branches/get-all-branches`, this.tooken);
    return newLocal;
  }

  // GET AllExams
  getAllExams(): Observable<Exams[]> {
    const newLocal = this.http.post<Exams[]>(`${this.BaseURII}/admin/exams/getAllExams`, this.tooken);
    return newLocal;
  }

   // GET AllQues
   getAllQues(): Observable<Questions[]> {
    const newLocal = this.http.post<Questions[]>(`${this.BaseURII}/admin/questions/get-all-questions`, this.tooken);
    return newLocal;
  }

  // GET AllCosts 
  getAllCosts(): Observable<costs[]> {
    const newLocal = this.http.post<costs[]>(`${this.BaseURII}/admin/cost/get-all-studyCosts`, this.tooken);
    return newLocal;
  }

  // GET AllUsers
  getAllUsers(): Observable<Users[]> {
    const newLocal = this.http.post<Users[]>(`${this.BaseURII}/users/get-all-users`, this.tooken);
    return newLocal;
  }
  //getOne User
  getuserById( user_id:number): Observable<Users> {
    //let x={"user_id":1}
    // let searshableobject1 = {'user_id':  user_id};
    const newLocal = this.http.post<Users>(`${this.BaseURII}/users/get-user-by-id`, user_id);
    return newLocal;
  }
  // GET Allclass
  getAllclass(): Observable<Class[]> {
    const newLocal = this.http.post<Class[]>(`${this.BaseURII}/admin/classes/get-all-classes`, this.tooken);
    return newLocal;
  }

    // GET Allinterviews
    getAllinterviews(): Observable<Interviews[]> {
      const newLocal = this.http.post<Interviews[]>(`${this.BaseURII}/admin/interview/get-all-interview`, this.tooken);
      return newLocal;
    }

  // GET AllTeacher
  getAllTeacher(): Observable<Teacher[]> {
    const newLocal = this.http.post<Teacher[]>(`${this.BaseURII}/admin/teachers/get-all-teachers`, this.tooken);
    return newLocal;
  }
  // GET AllClasses
  getAllClasses(): Observable<Classes[]> {
    const newLocal = this.http.post<Classes[]>(`${this.BaseURII}/admin/zoom/get-all-video-classes`, this.tooken);
    return newLocal;
  }
   // GET AllSchedule
   getAllSchedule(): Observable<Schedule[]> {
    const newLocal = this.http.post<Schedule[]>(`${this.BaseURII}/admin/schedules/get-schedule`, this.tooken);
    return newLocal;
  }
   // GET AllClassType
   getAllClassType(): Observable<ClassType[]> {
    const newLocal = this.http.post<ClassType[]>(`${this.BaseURII}/admin/classes-type/get-all-class-type`, this.tooken);
    return newLocal;
  }
   // GET AllClassType
   getAllSubject(): Observable<Subjects[]> {
    const newLocal = this.http.post<Subjects[]>(`${this.BaseURII}/admin/subjects/get-all-subjects`, this.tooken);
    return newLocal;
  }

    // GET AllClass
    getAllclasstype(): Observable<ClassType[]> {
      const newLocal = this.http.post<ClassType[]>(`${this.BaseURII}/admin/classes-type/get-all-class-type`, this.tooken);
      return newLocal;
    }
}

