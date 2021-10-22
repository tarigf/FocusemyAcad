import {  ActivatedRoute } from '@angular/router';
import { Component, OnInit ,ViewChild, ViewContainerRef} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { LoaderService} from '../loader.service';
import { GlobalServices} from '../GlobalService.component';
import { ToastrService } from 'ngx-toastr';
import { AcademicService } from "../academic.service";


@Component({
  selector: 'app-editcls',
  templateUrl: './editcls.component.html',
  styleUrls: ['./editcls.component.css']
})
export class EditclsComponent implements OnInit {
  showLoader: boolean;
  resumeFile: File;
 

  postForm: FormGroup;
  public loading = false;
  cls_id:any;
  newFlag : boolean = false;

  constructor(
    public toastr:ToastrService,
    public route: ActivatedRoute,private fb:FormBuilder,
    private loaderService: LoaderService,
    vcr: ViewContainerRef,
    public service: AcademicService
  ) 
  {
    this.route.queryParams.subscribe(params => {
      if(this.route.snapshot.queryParams['id']){
        this.cls_id = params['id'];
      }else{
        this.newFlag = true;
      }
  });
  this.loadData();
    //this.toastr.setRootViewContainerRef(vcr); 
    this.postForm=this.fb.group({
      code:['',[Validators.required]],
      name:['',[Validators.required]],
      maximum_students:['',[Validators.required]],
      status:['',[Validators.required]],
      description:[''],
      cls_id: this.cls_id
    })

   }
  
   
  ngOnInit() { 
    if(!this.newFlag){
      this.loaderService.status.subscribe((val: boolean) => {
        this.showLoader = val;
      });
    }
  }
  
  loadData() {
    if(!this.newFlag){
    this.service.getClass({cls_id: this.cls_id})
    .then((resp:any) => {     
       //this.postForm.controls['jobtitle'] = resp.title;
       console.log(resp);
       this.postForm.patchValue({code: resp.code})
       this.postForm.patchValue({name: resp.name})
       this.postForm.patchValue({maximum_students: resp.maximum_students})
       this.postForm.patchValue({status: resp.status})
       this.postForm.patchValue({description: resp.description})
       
    });
  }
    
  }
 
  save():void
  {
    this.loaderService.display(true);
     let postresumedata=this.postForm.value;   
    const formdata:FormData = new FormData();  
    formdata.append('postresumedata', JSON.stringify(postresumedata));
  
    this.service.classUpdate(postresumedata).then((resp) => {
      if(resp)
      {
        //this.postForm.reset(),
          this.loaderService.display(false);        
         this.toastr.success('Class Updated Successfully!', 'Success!');         
      }
      else{
        this.loaderService.display(false);   
        this.toastr.error('Failed Update Class!', 'Job Update');       
          }
     
  });
  }

  saveNew():void
  {
    this.loaderService.display(true);
     let postresumedata=this.postForm.value;   
    const formdata:FormData = new FormData();  
    formdata.append('postresumedata', JSON.stringify(postresumedata));
  
    this.service.classNew(postresumedata).then((resp) => {
      if(resp)
      {
        //this.postForm.reset(),
          this.loaderService.display(false);        
         this.toastr.success('Class Inserted Successfully!', 'Success!');  
         this.postForm.reset();       
      }
      else{
        this.loaderService.display(false);   
        this.toastr.error('Failed Insert Class!', 'Job Update');       
          }
     
  });
  }
  clear():void
  {
    this.postForm.reset();
  } 
 

}
