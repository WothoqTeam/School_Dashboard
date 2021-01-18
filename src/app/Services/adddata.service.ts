import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LooginService } from './loogin.service';
import { Branch } from '../ViewModels/ibranches';
import { retry, catchError, map } from 'rxjs/operators';
import { banks } from '../ViewModels/ibanks';
import { costs } from '../ViewModels/icosts';
import { Teacher } from '../ViewModels/teacher';
import { Profile } from '../ViewModels/profile';
import { Classes } from '../ViewModels/classes';
import { Exams } from '../ViewModels/IExams';
import { Applications } from '../ViewModels/iapplications';
import { Questions } from '../ViewModels/questions';
import { ClassType } from '../ViewModels/class-type';
import { Interviews } from '../ViewModels/interviews';
import { Schedule } from '../ViewModels/schedule';
import { Subjects } from '../ViewModels/subjects';

@Injectable({
  providedIn: 'root'
})
export class AddDataService {

  constructor(private http: HttpClient, private Service: LooginService) { }

  tooken = localStorage.getItem('usertoken');
  readonly BaseURI = 'https://school.wothoq.co/api';
  readonly BaseURII = 'http://school.wothoq.co/api';
  public searchResult: any;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  addBranch(branch: Branch): Observable<Branch> {
    const newBranch = this.http.post<Branch>(`${this.BaseURI}/admin/branches/store`, branch);
    return newBranch;
  }
  DeleteBranch(id: number): Observable<Branch> {
    const delBranch = this.http.post<Branch>(`${this.BaseURI}/admin/branches/destroy`, id);
    return delBranch;
  }
  //Branch Search
  searchBranches(name: string): Observable<Branch[]> {
    let searshableobject = { 'name': name };
    const newLocal = this.http.post<Branch[]>(`${this.BaseURI}/admin/branches/branches-search`, searshableobject);
    return newLocal;
  }

  // Update item by id
  updateBranch(branch: Branch): Observable<Branch> {
    return this.http.post<Branch>(`${this.BaseURI}/admin/branches/update`, branch);
  }

  // AddBank
  addNewBank(bank: banks): Observable<banks> {
    const newBank = this.http.post<banks>(`${this.BaseURI}/admin/banks/store`, bank);
    return newBank;
  }
  //deleteBank
  DeleteBank(id: number): Observable<banks> {
    const delBank = this.http.post<banks>(`${this.BaseURI}/admin/banks/destroy`, id);
    return delBank;
  }

  searchBanks(name: string): Observable<banks[]> {
    let searshableobject1 = { 'name': name };
    const newLocal = this.http.post<banks[]>(`${this.BaseURI}/admin/banks/banks-search`, searshableobject1);
    return newLocal;
  }
  // Update item by id
  updateBank(bank: banks): Observable<banks> {
    return this.http.post<banks>(`${this.BaseURI}/admin/banks/update`, bank);
  }

  // AddCost
  addCost(cost: costs): Observable<costs> {
    const newCost = this.http.post<costs>(`${this.BaseURI}/admin/cost/store`, cost);
    return newCost;
  }
  // DeleteCost
  DeleteCost(id: number): Observable<costs> {
    const delCost = this.http.post<costs>(`${this.BaseURI}/admin/cost/destroy`, id);
    return delCost;
  }
  // Update item by id
  updateCost(cost: costs): Observable<costs> {
    return this.http.post<costs>(`${this.BaseURI}/admin/cost/update`, cost);
  }

  // AddTeacher
  addTeacher(teach: Teacher): Observable<Teacher> {
    const newCost = this.http.post<Teacher>(`${this.BaseURI}/admin/teachers/store`, teach);
    return newCost;
  }
  // DeleteTeacher
  DeleteTeacher(id: number): Observable<Teacher> {
    const delTeach = this.http.post<Teacher>(`${this.BaseURI}/admin/teachers/destroy`, id);
    return delTeach;
  }
  // Update item by id
  updateTeach(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(`${this.BaseURI}/admin/teachers/update`, teacher);
  }
  searchTeach(name: string): Observable<Teacher[]> {
    let searshableobject1 = { 'name': name };
    const newLocal = this.http.post<Teacher[]>(`${this.BaseURI}/admin/teachers/search`, searshableobject1);
    return newLocal;
  }

  // AddClass
  addClasses(clas: Classes): Observable<Classes> {
    const newCost = this.http.post<Classes>(`${this.BaseURI}/admin/zoom/meetings`, clas);
    return newCost;
  }
  // DeleteClas
  DeleteClasses(id: number): Observable<Classes> {
    const delClas = this.http.post<Classes>(`${this.BaseURI}/admin/zoom/meetings/delete`, id);
    return delClas;
  }
  updateClass(clss: Classes): Observable<Classes> {
    return this.http.post<Classes>(`${this.BaseURI}/admin/zoom/meetings/update`, clss );
  }

  // AddExam
  addExams(exam: Exams): Observable<Exams> {
    const newCost = this.http.post<Exams>(`${this.BaseURI}/admin/exams/store`, exam);
    return newCost;
  }
  //Delete Exam
  DeleteExam(id: number): Observable<Exams> {
    const delClas = this.http.post<Exams>(`${this.BaseURI}/admin/exams/destroy`, id);
    return delClas;
  }
  // Addquestion
  addquestion(ques: Questions): Observable<Questions> {
    const newCost = this.http.post<Questions>(`${this.BaseURII}/admin/questions/store`, ques);
    return newCost;
  }
  // DeleteQuestions
  DeleteQues(id: number): Observable<Applications> {
    const delClas = this.http.post<Applications>(`${this.BaseURI}/admin/questions/destroy`, id);
    return delClas;
  }

  // DeleteApplication
  DeleteApp(id: number): Observable<Applications> {
    const delClas = this.http.post<Applications>(`${this.BaseURI}/admin/applications/destroy`, id);
    return delClas;
  }
  // Update item by id
  updateApp(application: Applications): Observable<Applications> {
    return this.http.post<Applications>(`${this.BaseURI}/admin/applications/update`, application);
  }
  updateInter(Interview: Interviews): Observable<Interviews> {
    return this.http.post<Interviews>(`${this.BaseURI}/admin/applications/update`, Interview);
  }
  addclasstyperec(type: ClassType): Observable<ClassType> {
    const newCost = this.http.post<ClassType>(`${this.BaseURI}/admin/applications/set-application-class`, type);
    return newCost;
  }
  // DeleteApplication
  // tslint:disable-next-line:variable-name
  DeleteType( class_type_id: number): Observable<ClassType> {
    const delClas = this.http.post<ClassType>(`${this.BaseURI}/admin/classes-type/destroy`, class_type_id);
    return delClas;
  }
  AddclassType(type: ClassType): Observable<ClassType>{
    const newCost = this.http.post<ClassType>(`${this.BaseURI}/admin/classes-type/store`, type);
    return newCost;
  }
  updatetype(type: ClassType): Observable<ClassType> {
    return this.http.post<ClassType>(`${this.BaseURI}/admin/classes-type/update`, type);
  }
  // AddInterview
  addInterview(inter: Interviews): Observable<Interviews> {
    const newCost = this.http.post<Interviews>(`${this.BaseURI}/admin/interview/store`, inter);
    return newCost;
  }

   // AddSubject
   addSubject(Sub: Subjects): Observable<Subjects> {
    const newCost = this.http.post<Subjects>(`${this.BaseURI}/admin/subjects/store`, Sub);
    return newCost;
  }
  //Delete Subject
  DeleteSubject(id: number): Observable<Subjects> {
    const delClas = this.http.post<Subjects>(`${this.BaseURI}/admin/subjects/destroy`, id);
    return delClas;
  }
  updateSubject(sub:Subjects):Observable<Subjects>{
    return this.http.post<Subjects>(`${this.BaseURI}/admin/subjects/update`, sub);
  }

  // DeleteSchedule
  DeleteSchedule(id: number): Observable<Schedule> {
    const delClas = this.http.post<Schedule>(`${this.BaseURI}/admin/schedules/destroy`, id);
    return delClas;
  }
  // Update item by id
  updateSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(`${this.BaseURI}/admin/schedules/update`, schedule);
  }
  // addSchedule
  addSchedule(sched: Schedule): Observable<Schedule> {
    const newCost = this.http.post<Schedule>(`${this.BaseURI}/admin/schedules/store`, sched);
    return newCost;
  }

  //search Application
  searchapp(name: string): Observable<Applications[]> {
    let searshableobject = { 'name': name };
    const newLocal = this.http.post<Applications[]>(`${this.BaseURI}/admin/applications/application-search`, searshableobject);
    return newLocal;
  }
  // Update item by id
  updateStatus(app:Applications): Observable<Applications> {
    return this.http.post<Applications>(`${this.BaseURI}/admin/applications/changeStatusSetExam`, app);
  }
  AddApplication(app:Applications):Observable<Applications>{
    const newCost = this.http.post<Applications>(`${this.BaseURII}/admin/applications/store`, app );

    return newCost;

  }
}

