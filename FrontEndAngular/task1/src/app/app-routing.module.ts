import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent} from './home/home.component';
import { EditclsComponent } from "./editcls/editcls.component";
import { CommonModule } from '@angular/common';
import { StudentsComponent } from "./students/students.component";
import { EditStudentComponent } from "./edit-student/edit-student.component";


const routes: Routes = [
  { path:'home',component:HomeComponent},
  { path:'updateCls',component:EditclsComponent},
  { path:'createCls',component:EditclsComponent},
  { path:'updateStudent',component:EditStudentComponent},
  { path:'registerStudent',component:EditStudentComponent},
  { path:'students',component:StudentsComponent},
  { path:'',redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{ relativeLinkResolution: 'legacy' }),
    CommonModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
