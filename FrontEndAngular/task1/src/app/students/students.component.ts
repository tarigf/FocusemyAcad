import { Component, OnInit } from '@angular/core';
import { AcademicService } from '../academic.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  studentsData:any="";
  ///dtOptions: DataTables.Settings = {};

  constructor(
    public service :AcademicService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadListData();
    // this.dtOptions = {
    //   pagingType: 'full_numbers'
    // };
  }

  loadListData() {
    this.service.getListStudents().then((resp: Response) => {     
      this.studentsData=resp;     
      //this.totaljobs=this.jobdata.length;
      (error)=>console.log(error)      
    });
    
  }

  deleteStd(id){
    console.log(id);
    this.service.deleteStd({std_id: id }).then((resp: Response) => {     
      this.loadListData();     
      this.toastr.success('Student Deleted Successful!', 'Success!');         
      (error)=>console.log(error)      
    });
  }

}
