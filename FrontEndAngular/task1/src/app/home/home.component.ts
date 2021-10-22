import { Component, OnInit } from '@angular/core';

import { GlobalServices } from '../GlobalService.component';
import { AcademicService } from '../academic.service';
import {FormBuilder,FormGroup,FormArray,FormControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  classesData:any="";
  Pageindex:number;
  classList:FormGroup;


  constructor(public toastr: ToastrService ,public academicService : AcademicService, public gServices : GlobalServices) { }

  ngOnInit(): void {
    this.loadListData();
  }  



  loadListData() {
    this.academicService.getList({user_id: this.gServices.getUserId()}).then((resp: Response) => {     
      this.classesData=resp;     
      //this.totaljobs=this.jobdata.length;
      this.Pageindex= 1;
      (error)=>console.log(error)      
    });
    
  }

  deleteCls(id){
    console.log(id);
    this.academicService.deleteClass({cls_id: id }).then((resp: Response) => {     
      this.loadListData();     
      this.toastr.success('Class Deleted Successful!', 'Success!');         
      this.Pageindex= 1;
      (error)=>console.log(error)      
    });
  }

}
