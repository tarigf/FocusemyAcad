import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { EditclsComponent } from "./editcls/editcls.component";

import { AcademicService } from "./academic.service";

import { HttpClient,HttpClientModule } from '@angular/common/http';
import { GlobalServices } from "./GlobalService.component";

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderService} from './loader.service';
import { StudentsComponent } from './students/students.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
//import { DataTablesModule } from "angular-datatables";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    EditclsComponent,
    StudentsComponent,
    EditStudentComponent,
    SideMenuComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    //DataTablesModule,

  ],
  providers: [HttpClient ,AcademicService, GlobalServices,LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
