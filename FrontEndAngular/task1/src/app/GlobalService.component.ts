import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Injectable()
export class GlobalServices{
   
      public  user_id: any = 0;
      public loginFlag : boolean = false;

      public  getUserName(): string{
        let userName = (localStorage.getItem("UserName"));

        if(userName == "null")
        {
          userName = null;
        }
        return userName;
      }

      
      public static setUserName(userName:string){
        localStorage.setItem("UserName", userName);

        console.log("setUserName->UserNameStr: " +  userName);
      }

      public  setUserId(userId:any){
        localStorage.setItem("UserId", userId);
        this.user_id = userId;
      }

      public  getUserId(): any{
        //let userId = (localStorage.getItem("UserId"));
        return this.user_id;
        // if(userId == "null")
        // {
        //   userId = null;
        // }
        // return userId;
      }
      public setLogin(flag){
        this.loginFlag = flag;
      }
      public getLogin():boolean{
        return this.loginFlag;
      }

      public todayDate(){
        return new Date().toJSON().split('T')[0];
      }
      public static   dateLessThan(fromDate: string, toDate: string) {
        return (group: FormGroup): {[key: string]: any} => {
         let _fromDate = group.controls[fromDate];
         let _toDate = group.controls[toDate];     
         if (_fromDate.value > _toDate.value) {       
           return {
            daterange: "From Date Less Then To Date Please Change"
           };
         }     
         return {};
        }
      }
}