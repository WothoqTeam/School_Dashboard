import { AuthGuard } from '../Guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLoginComponent } from './Pages/main-login/main-login.component';
import { LooginComponent } from './Pages/loogin/loogin.component';
import { ForgetPassComponent } from './Pages/forget-pass/forget-pass.component';
import { CodepassComponent } from './Pages/codepass/codepass.component';
import { ResetPassComponent } from './Pages/reset-pass/reset-pass.component';
import { DashboardSchoolComponent } from './Dashboard School/dashboard-school/dashboard-school.component';
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
import { CostsComponent } from './Dashboard School/DashboardPagesSchool/costs/costs.component';
import { AddBranchComponent } from './Dashboard School/Add-Component/add-branch/add-branch.component';
import { AddbankComponent } from './Dashboard School/Add-Component/addbank/addbank.component';
import { AddcostsComponent } from './Dashboard School/Add-Component/addcosts/addcosts.component';
import { AddExamComponent } from './Dashboard School/Add-Component/add-exam/add-exam.component';
import { AddteacherComponent } from './Dashboard School/Add-Component/addteacher/addteacher.component';
import { AddQuestionComponent } from './Dashboard School/Add-Component/add-question/add-question.component';
import { AddclassComponent } from './Dashboard School/Add-Component/addclass/addclass.component';
import { AddScheduleComponent } from './Dashboard School/Add-Component/add-schedule/add-schedule.component';
import { EditUserprofileComponent } from './Dashboard School/EditComponent/edit-userprofile/edit-userprofile.component';
import { ViewDetailRecComponent } from './Dashboard School/DashboardPagesSchool/view-detail-rec/view-detail-rec.component';
import { AddApplicationComponent } from './Dashboard School/Add-Component/add-application/add-application.component';
import { SubjectpageComponent } from './Dashboard School/DashboardPagesSchool/subjectpage/subjectpage.component';
import { AddsubjectComponent } from './Dashboard School/Add-Component/addsubject/addsubject.component';
import { AddclassesComponent } from './Dashboard School/DashboardPagesSchool/addclasses/addclasses.component';
import { AddclassTypeComponent } from './Dashboard School/Add-Component/addclass-type/addclass-type.component';


const routes: Routes = [
    { path: '', component: MainLoginComponent },
    { path: 'Loginschool', component: LooginComponent},
    { path: 'ForgetPass', component: ForgetPassComponent},
    { path: 'CodePass', component: CodepassComponent},
    { path: 'ResetPass', component: ResetPassComponent},
    { path: 'school/home', component: HomeComponent , canActivate: [AuthGuard]},
    { path: 'school/home/Editprofile', component: EditUserprofileComponent},
    { path: 'school/branch', component: BranchPageComponent},
    { path: 'school/bank', component: BankPageComponent},
    { path: 'school/record', component: RecordPageComponent},
    { path: 'school/exam', component: ExamPageComponent},
    { path: 'school/interview', component: InterviewPageComponent},
    { path: 'school/users', component: UsersPageComponent},
    { path: 'school/teacher', component: TeacherPageComponent},
    { path: 'school/schedule', component: ScedulePageComponent},
    { path: 'school/classes', component: ClassPageComponent},
    { path: 'school/subjects', component: SubjectpageComponent},
    { path: 'school/subjects/addsubject', component: AddsubjectComponent},
    { path: 'school/classes/addclass', component: AddclassComponent},
    { path: 'school/cost', component: CostsComponent},
    { path: 'school/branch/addbranch', component: AddBranchComponent},
    { path: 'school/bank/addbank', component: AddbankComponent},
    { path: 'school/cost/addcost', component: AddcostsComponent },
    { path: 'school/exam/addexam', component: AddExamComponent },
    { path: 'school/exam/addexam/addquestion', component: AddQuestionComponent },
    { path: 'school/teacher/addteacher', component: AddteacherComponent },
    { path: 'school/schedule/addschedule', component: AddScheduleComponent },
    { path: 'school/record/viewDetails', component: ViewDetailRecComponent },
    { path: 'school/record/addApplication', component: AddApplicationComponent },
    { path: 'school/Addclasses', component: AddclassesComponent},
    { path: 'school/Addclasses/addclasstype', component: AddclassTypeComponent},
    // { path: 'DashboardSchool', component: DashboardSchoolComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash:true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
