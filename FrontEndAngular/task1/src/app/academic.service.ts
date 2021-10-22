import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import { map } from "rxjs/operators";
import { HttpClient ,HttpHeaders} from '@angular/common/http';

@Injectable()
export class AcademicService { 
  constructor(public http:HttpClient) { }

  getValues() {
      let url=environment._userApiurl+'getChartData';
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      const options = { headers: headers};
      return new Promise((resolve, reject) => {
        this.http.get(url,options).pipe(map((res :any)=> res)).subscribe(data => {
          resolve(data);
        },err => {}//error      
        );//subscribe
      });
      //return this.http.get(url).map((response:Response)=>{return response.json();}).catch(this.handleerror);
  }
  getList(param){
      let url=environment._userApiurl+'getClassesList';  
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      const options = { headers: headers};
      return new Promise((resolve, reject) => {
        this.http.post(url,param,options).pipe(map((res :any)=> res)).subscribe(data => {
          resolve(data);
        },err => {}//error      
        );//subscribe
      });
  }

  deleteClass(param) {
    let url=environment._userApiurl+'classDelete';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = { headers: headers};
    return new Promise((resolve, reject) => {
      this.http.post(url,param,options).pipe(map((res :any)=> res)).subscribe(data => {
        resolve(data);
      },err => {}//error      
      );//subscribe
    });  
    //return this.http.post(url,param).map((response:Response)=>{return response.json();}).catch(this.handleerror);
  }

  getClass(jobdata) {
    // console.log(jobdata);
    let url=environment._userApiurl+'getclass';  
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = { headers: headers};
    return new Promise((resolve, reject) => {
      this.http.post(url,jobdata,options).pipe(map((res :any)=> res)).subscribe(data => {
        resolve(data);
      },err => {}//error      
      );//subscribe
    });
    //return this.http.post(url,jobdata).map((response:Response)=>{return response.json();}).catch(this.handleerror)
   }

   classUpdate(resumedata) {
    let url=environment._userApiurl+'updateClass';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = { headers: headers};
    return new Promise((resolve, reject) => {
      this.http.post(url,resumedata,options).pipe(map((res :any)=> res)).subscribe(data => {
        resolve(data);
      },err => {}//error      
      );//subscribe
    });  
  }
  classNew(resumedata) {
    let url=environment._userApiurl+'newClass';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = { headers: headers};
    return new Promise((resolve, reject) => {
      this.http.post(url,resumedata,options).pipe(map((res :any)=> res)).subscribe(data => {
        resolve(data);
      },err => {}//error      
      );//subscribe
    });  
  }

  getListStudents(){
    let url=environment._userApiurl+'getStudentsList';  
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = { headers: headers};
    return new Promise((resolve, reject) => {
      this.http.post(url,[],options).pipe(map((res :any)=> res)).subscribe(data => {
        resolve(data);
      },err => {}//error      
      );//subscribe
    });
}
getClassesListFree(){
  let url=environment._userApiurl+'getClassesListFree';  
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  const options = { headers: headers};
  return new Promise((resolve, reject) => {
    this.http.post(url,[],options).pipe(map((res :any)=> res)).subscribe(data => {
      resolve(data);
    },err => {}//error      
    );//subscribe
  });
}

studentNew(resumedata) {
  let url=environment._userApiurl+'newStudent';
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  const options = { headers: headers};
  return new Promise((resolve, reject) => {
    this.http.post(url,resumedata,options).pipe(map((res :any)=> res)).subscribe(data => {
      resolve(data);
    },err => {}//error      
    );//subscribe
  });  
}
deleteStd(param) {
  let url=environment._userApiurl+'studentDelete';
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  const options = { headers: headers};
  return new Promise((resolve, reject) => {
    this.http.post(url,param,options).pipe(map((res :any)=> res)).subscribe(data => {
      resolve(data);
    },err => {}//error      
    );//subscribe
  });  
  //return this.http.post(url,param).map((response:Response)=>{return response.json();}).catch(this.handleerror);
}
getStudent(jobdata) {
  // console.log(jobdata);
  let url=environment._userApiurl+'getstudent';  
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  const options = { headers: headers};
  return new Promise((resolve, reject) => {
    this.http.post(url,jobdata,options).pipe(map((res :any)=> res)).subscribe(data => {
      resolve(data);
    },err => {}//error      
    );//subscribe
  });
  //return this.http.post(url,jobdata).map((response:Response)=>{return response.json();}).catch(this.handleerror)
 }

 studentUpdate(resumedata) {
  let url=environment._userApiurl+'updateStudent';
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  const options = { headers: headers};
  return new Promise((resolve, reject) => {
    this.http.post(url,resumedata,options).pipe(map((res :any)=> res)).subscribe(data => {
      resolve(data);
    },err => {}//error      
    );//subscribe
  });  
}
}
