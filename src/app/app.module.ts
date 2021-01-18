import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule ,FormArray} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LooginComponent } from './Pages/loogin/loogin.component';
import { MainLoginComponent } from './Pages/main-login/main-login.component';
import { ForgetPassComponent } from './Pages/forget-pass/forget-pass.component';
import { CodepassComponent } from './Pages/codepass/codepass.component';
import { ResetPassComponent } from './Pages/reset-pass/reset-pass.component';
import { DashboardSchoolComponent } from './Dashboard School/dashboard-school/dashboard-school.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from '../Guards/auth.interceptor';
import { ModalModule , BsModalRef } from 'ngx-bootstrap/modal';
import { HomeComponent } from './Dashboard School/DashboardPagesSchool/home/home.component';
import { BranchPageComponent } from './Dashboard School/DashboardPagesSchool/branch-page/branch-page.component';
import { BankPageComponent } from './Dashboard School/DashboardPagesSchool/bank-page/bank-page.component';
import { RecordPageComponent } from './Dashboard School/DashboardPagesSchool/record-page/record-page.component';
import { ExamPageComponent } from './Dashboard School/DashboardPagesSchool/exam-page/exam-page.component';
import { InterviewPageComponent } from './Dashboard School/DashboardPagesSchool/interview-page/interview-page.component';
import { UsersPageComponent } from './Dashboard School/DashboardPagesSchool/users-page/users-page.component';
import { TeacherPageComponent } from './Dashboard School/DashboardPagesSchool/teacher-page/teacher-page.component';
import { ClassPageComponent } from './Dashboard School/DashboardPagesSchool/class-page/class-page.component';
import { ScedulePageComponent } from './Dashboard School/DashboardPagesSchool/scedule-page/scedule-page.component';
import { SideComponent } from './Shared/side/side.component';
import { CostsComponent } from './Dashboard School/DashboardPagesSchool/costs/costs.component';
import { HeaderComponent } from './Shared/header/header.component';
import { AddBranchComponent } from './Dashboard School/Add-Component/add-branch/add-branch.component';
import { AddbankComponent } from './Dashboard School/Add-Component/addbank/addbank.component';
import { AddcostsComponent } from './Dashboard School/Add-Component/addcosts/addcosts.component';
import { ViewDetailsRecComponent } from './Dashboard School/Add-Component/view-details-rec/view-details-rec.component';
import { AddExamComponent } from './Dashboard School/Add-Component/add-exam/add-exam.component';
import { AddQuestionComponent } from './Dashboard School/Add-Component/add-question/add-question.component';
import { AddteacherComponent } from './Dashboard School/Add-Component/addteacher/addteacher.component';
import { EditBranchComponent } from './Dashboard School/EditComponent/edit-branch/edit-branch.component';
import { EditBankComponent } from './Dashboard School/EditComponent/edit-bank/edit-bank.component';
import { EditcostComponent } from './Dashboard School/EditComponent/editcost/editcost.component';
import { EditrecordComponent } from './Dashboard School/EditComponent/editrecord/editrecord.component';
import { EditteacherComponent } from './Dashboard School/EditComponent/editteacher/editteacher.component';
import { AddclassComponent } from './Dashboard School/Add-Component/addclass/addclass.component';
import { EditscheduleComponent } from './Dashboard School/EditComponent/editschedule/editschedule.component';
import { AddScheduleComponent } from './Dashboard School/Add-Component/add-schedule/add-schedule.component';
import { ViewUserComponent } from './Dashboard School/DashboardPagesSchool/view-user/view-user.component';
import { EditUserprofileComponent } from './Dashboard School/EditComponent/edit-userprofile/edit-userprofile.component';
import { EditExamAppComponent } from './Dashboard School/EditComponent/edit-exam-app/edit-exam-app.component';
import { ViewDetailRecComponent } from './Dashboard School/DashboardPagesSchool/view-detail-rec/view-detail-rec.component';
import { AddApplicationComponent } from './Dashboard School/Add-Component/add-application/add-application.component';
import { SubjectpageComponent } from './Dashboard School/DashboardPagesSchool/subjectpage/subjectpage.component';
import { AddsubjectComponent } from './Dashboard School/Add-Component/addsubject/addsubject.component';
import { AddclassesComponent } from './Dashboard School/DashboardPagesSchool/addclasses/addclasses.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditSubjectComponent } from './Dashboard School/EditComponent/edit-subject/edit-subject.component';
import { EditclassComponent } from './Dashboard School/EditComponent/editclass/editclass.component';
import { AddclassTypeComponent } from './Dashboard School/Add-Component/addclass-type/addclass-type.component';
import { EditclasstypeComponent } from './Dashboard School/EditComponent/editclasstype/editclasstype.component';



@NgModule({
  declarations: [
    AppComponent,
    LooginComponent,
    MainLoginComponent,
    ForgetPassComponent,
    CodepassComponent,
    ResetPassComponent,
    DashboardSchoolComponent,
    HomeComponent,
    BranchPageComponent,
    BankPageComponent,
    RecordPageComponent,
    ExamPageComponent,
    InterviewPageComponent,
    UsersPageComponent,
    TeacherPageComponent,
    ClassPageComponent,
    ScedulePageComponent,
    SideComponent,
    CostsComponent,
    HeaderComponent,
    AddBranchComponent,
    AddbankComponent,
    AddcostsComponent,
    ViewDetailsRecComponent,
    AddExamComponent,
    AddQuestionComponent,
    AddteacherComponent,
    EditBranchComponent,
    EditBankComponent,
    EditcostComponent,
    EditrecordComponent,
    EditteacherComponent,
    AddclassComponent,
    EditscheduleComponent,
    AddScheduleComponent,
    ViewUserComponent,
    EditUserprofileComponent,
    EditExamAppComponent,
    ViewDetailRecComponent,
    AddApplicationComponent,
    SubjectpageComponent,
    AddsubjectComponent,
    AddclassesComponent,
    EditSubjectComponent,
    EditclassComponent,
    AddclassTypeComponent,
    EditclasstypeComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      progressBar: true
    }),

    ModalModule,
    NgbModule,
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,

  },
  BsModalRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
