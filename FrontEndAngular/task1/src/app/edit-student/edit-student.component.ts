import {  ActivatedRoute } from '@angular/router';
import { Component, OnInit ,ViewChild, ViewContainerRef} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { LoaderService} from '../loader.service';
import { GlobalServices} from '../GlobalService.component';
import { ToastrService } from 'ngx-toastr';
import { AcademicService } from "../academic.service";

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  showLoader: boolean = false;
  resumeFile: File;
 

  postForm: FormGroup;
  public loading = true;
  std_id:any;
  newFlag : boolean = false;
  classesData:any ="";

  constructor(
    public toastr:ToastrService,
    public route: ActivatedRoute,private fb:FormBuilder,
    private loaderService: LoaderService,
    vcr: ViewContainerRef,
    public service: AcademicService
  ) { 

    this.route.queryParams.subscribe(params => {
      if(this.route.snapshot.queryParams['id']){
        this.std_id = params['id'];
      }else{
        this.newFlag = true;
      }
  });
  this.loadData();
  this.loadClasses();
    //this.toastr.setRootViewContainerRef(vcr); 
    this.postForm=this.fb.group({
      first:['',[Validators.required]],
      last:['',[Validators.required]],
      dob:['',[Validators.required]],
      cls:['',[Validators.required]],
      std_id: this.std_id
    })
  }

  ngOnInit(): void {
    
  }

  loadData() {
    if(!this.newFlag){
    this.service.getStudent({std_id: this.std_id})
    .then((resp:any) => {     
       //this.postForm.controls['jobtitle'] = resp.title;
       console.log(resp);
       this.postForm.patchValue({first: resp.first_name})
       this.postForm.patchValue({last: resp.last_name})
       this.postForm.patchValue({dob: resp.date_of_birth})
       this.postForm.patchValue({cls: resp.classNo})
    });
  }
    
  }

  loadClasses() {
   
    this.service.getClassesListFree()
    .then((resp:any) => {     
       //console.log(resp);
       this.classesData = resp;
    });
  }

  save():void
  {
    this.showLoader = true;
     let postresumedata=this.postForm.value;   
    const formdata:FormData = new FormData();  
    formdata.append('postresumedata', JSON.stringify(postresumedata));
  
    this.service.studentUpdate(postresumedata).then((resp) => {
      if(resp)
      {
        //this.postForm.reset(),
        this.showLoader = false;        
         this.toastr.success('Student Updated Successfully!', 'Success!');         
      }
      else{
        this.showLoader = false;   
        this.toastr.error('Failed Update Student!', 'Student Update');       
          }
     
  });
  }

  saveNew():void
  {
    this.showLoader = true;
     let postresumedata=this.postForm.value;   
    const formdata:FormData = new FormData();  
    formdata.append('postresumedata', JSON.stringify(postresumedata));
  
    this.service.studentNew(postresumedata).then((resp) => {
      if(resp)
      {
        //this.postForm.reset(),
        this.showLoader = false;
                
         this.toastr.success('Student Inserted Successfully!', 'Success!');  
         this.postForm.reset();       
      }
      else{
        this.showLoader = false;   
        this.toastr.error('Student registeration Failed!', 'Register Student');       
          }
     
  });
  }

  clear():void
  {
    this.postForm.reset();
  } 

}
