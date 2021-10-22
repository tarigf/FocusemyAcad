<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\classes;
use App\Models\students;

use DB;


class PostApiController extends Controller
{
    //get All users
    public function index(){
        $post = User::all();
        return $post;
    }

///////////////////////////////////////////////////////////////////////////////////////////////
public function classesList(){
       
    $classes = DB::table('classes')
        ->select(['*'])->orderBy('created_at',"desc")
        ->get();

    return $classes;
}
public function classesListFree(){
       
    $classes = DB::table('classes')
        ->select(['*'])
        ->where('maximum_students','>' ,'0')
        ->where('status','opened')
        ->orderBy('created_at',"desc")
        ->get();

    return $classes;
}
public function classesDelete (){
    request()->validate([
        'cls_id' => 'required'
    ]);
    $id = request('cls_id');
    $post = DB::table('Classes')->delete($id);
    return true;
}
public function getClass(){
    request()->validate([
        'cls_id' => 'required'
    ]);
    $cls_id = request('cls_id');
    $cls = DB::table('Classes')->select("*")->where(['id'=> $cls_id])->get();
    
    return $cls[0];
}
public function updateClass (){
       
    request()->validate([
        'code'=> 'required',
        'name'=> 'required',
        'maximum_students'=> 'required',
        'status'=> 'required',
        'cls_id'=> 'required'
    ]);
    $post = DB::table('Classes')->where('id',request('cls_id'))->update([
        'code'=> request('code'),
        'name'=> request('name'),
        'maximum_students'=> request('maximum_students'),
        'status'=> request('status'),
        'description'=> request('description')
    ]);
    return $post;
}

public function newClass (){
       
    request()->validate([
        'code'=> 'required',
        'name'=> 'required',
        'maximum_students'=> 'required',
        'status'=> 'required'
    ]);
    $post = DB::table('Classes')->insert([
        'code'=> request('code'),
        'name'=> request('name'),
        'maximum_students'=> request('maximum_students'),
        'status'=> request('status'),
        'description'=> request('description')
    ]);
    return $post;
}

public function studentsList(){
   
    $post = DB::table('students')
        ->leftJoin('classes','students.classNo','=','classes.id')
        ->select(['students.*','classes.name'])->orderBy('students.created_at',"desc")
        ->get();
   // $post = Jobs::all();
    return $post;
}
public function newStudent (){
       
    request()->validate([
        'first'=> 'required',
        'last'=> 'required',
        'dob'=> 'required',
        'cls'=> 'required'
    ]);
    $cls_id = request('cls');
    $cls = DB::table('Classes')->select("maximum_students")->where(['id'=> $cls_id])->first();

    //print_r($cls);
    $maximum_students = $cls->maximum_students;
    //print($maximum_students);

    if( $maximum_students > "0" ){
        $post = DB::table('Students')->insert([
            'first_name'=> request('first'),
            'last_name'=> request('last'),
            'date_of_birth'=> request('dob'),
            'classNo'=> request('cls'),
        ]);

        DB::table('Classes')->where('id',$cls_id)->update([
            'maximum_students'=>  DB::raw('maximum_students-1')
        ]);

     }else{
         $post = "0";
     }
    return $post;

    
}
public function studentDelete (){
    request()->validate([
        'std_id' => 'required'
    ]);
    $stdInfo = students::where(['id'=> request('std_id')])->get();
    $classInfo = classes::where(['id'=> $stdInfo[0]['classNo']])->get();

    //print_r($stdInfo);
    $id = request('std_id');
    $post = DB::table('students')->delete($id);

    classes::where('id',$classInfo[0]['id'])->update([
        'maximum_students'=>  DB::raw('maximum_students+1')
    ]);
    return true;
}

public function getStudent(){
    request()->validate([
        'std_id' => 'required'
    ]);
    $std_id = request('std_id');
    $cls = DB::table('students')->select("*")->where(['id'=> $std_id])->get();
    
    return $cls[0];
}

public function updateStudent (){
       
    request()->validate([
        'first'=> 'required',
        'last'=> 'required',
        'dob'=> 'required',
        'cls'=> 'required',
        'std_id'=> 'required'

    ]);
    $post = DB::table('Students')->where('id',request('std_id'))->update([
        'first_name'=> request('first'),
        'last_name'=> request('last'),
        'date_of_birth'=> request('dob'),
        'classNo'=> request('cls'),
    ]);
    return $post;
    
}
///////////////////////////////////////////////////////////////////////////////////////////////



    public function chartData(){
        // $data = DB::table('users')
        // ->select(' DATEPART(week, created_at) AS Week,
        // COUNT(id) AS Registrations')
        // ->where("'2021-09-10' <= created_at
        // AND created_at < '2021-09-30'")
        // ->groupBy("DATEPART(week, created_at)")
        // ->orderBy("DATEPART(week, created_at)")
        // ->get();
        $data = DB::table('users') // the query builder doesn't care if it's a table or view
        ->select([
            DB::raw('CAST(created_at as date) as createddate'),
            DB::raw('COUNT(id) as numleads')
        ])
        // ->where('companyid', '001')
        ->groupBy('createddate', DB::raw('CAST(created_at as date)'))
        ->orderBy('createddate')
        ->get();


        return $data;

    }

    public function allJobs(){
        request()->validate([
            'user_id' => 'required'
        ]);
        $post = DB::table('jobs')
            ->leftJoin('job_applicants','job_applicants.job_id','=','jobs.id')
            ->select(['jobs.*','job_applicants.user_id'])->orderBy('jobs.created_at',"desc")
            ->get();

       // $post = Jobs::all();
        return $post;
    }
    
    public function searchJob(){
       $key = request('key');
        $jobs = DB::table('jobs')
            ->leftJoin('job_applicants','job_applicants.job_id','=','jobs.id')
            ->select(['jobs.*','job_applicants.user_id'])
            ->where('jobs.title', 'like', '%'.$key.'%' )
            ->orwhere('jobs.company', 'like', '%'.$key.'%' )
            ->orwhere('jobs.description', 'like', '%'.$key.'%' )
            ->orderBy('jobs.created_at',"desc")
            ->get();
        return $jobs;
    }
    public function searchUser(){
        $key = request('key');
         $users = DB::table('users')
             ->select(['*'])
             ->where('users.name', 'like', '%'.$key.'%' )
             ->orwhere('users.email', 'like', '%'.$key.'%' )
             ->orwhere('users.phone', 'like', '%'.$key.'%' )
             ->orderBy('users.created_at',"desc")
             ->get();
         return $users;
     }
    public function createJob (){
       
        request()->validate([
            'jobtitle'=> 'required',
            'companyname'=> 'required',
            'jobdescription'=> 'required'
        ]);

        $post = Jobs::create([
            'title'=> request('jobtitle'),
            'company'=> request('companyname'),
            'description'=> request('jobdescription')
        ]);
        return $post;
    }
    public function updateJob (){
       
        request()->validate([
            'jobtitle'=> 'required',
            'companyname'=> 'required',
            'jobdescription'=> 'required',
            'j_id'=> 'required'
        ]);
        $post = Jobs::where('id',request('j_id'))->update([
            'title'=> request('jobtitle'),
            'company'=> request('companyname'),
            'description'=> request('jobdescription')
        ]);
        return $post;
    }

    public function jobApply (){
        request()->validate([
            'user_id' => 'required',
            'job_id' => 'required'
        ]);
        $post = jobApplicants::create([
            'user_id'=> request('user_id'),
            'job_id'=> request('job_id')
        ]);
        return $post;
    }

    public function jobDelete (){
        request()->validate([
            'user_id' => 'required',
            'job_id' => 'required'
        ]);
        $id = request('job_id');
        $post = DB::table('Jobs')->delete($id);
        return $post;
    }

    public function create (){
        request()->validate([
            'fullName' => 'required',
            'email' => 'required|unique:users',
            'phoneNumber' => 'required',
            'password' => 'required'
        ]);
        $post = User::create([
            'name'=> request('fullName'),
            'email'=> request('email'),
            'phone'=> request('phoneNumber'),
            'password'=> md5(request('password'))
        ]);
        return $post;
    }
    public function updatePortal(){
        request()->validate([
            'user_id' => 'required'
        ]);

        $userId = request('user_id');
        //update CV
        $updateCv = User::where('id',$userId)->update(['cv'=>request('carrierObjective')]);

        // delete all old data
        education::where('user_id',$userId)->delete();
        skill::where('user_id',$userId)->delete();
        workExperience::where('user_id',$userId)->delete();

       // print_r(request('workHistry'));
        //insert new data
        $educations = request('educationBackground');
        foreach ($educations as $education){
            education::create([
                'user_id'       => request('user_id'),
                'highest_level' => $education['hightestlevel'],
                'school'        => $education['school'],
                'date_complete' => $education['fromDate']
            ]);
        }
        $skills = request('skills');
        foreach ($skills as $skill) {
            skill::create([
                'user_id'   => request('user_id'),
                'skill_name'=> $skill['skillName'],
            ]);
        }
        $workExperiences = request('workHistry');
        foreach ($workExperiences as $workExperience) {
            workExperience::create([
                'user_id'       => request('user_id'),
                'job_title'     => $workExperience['jobTitle'],
                'company_name'  => $workExperience['companyName'],
                'date_started'  => $workExperience['fromDate'],
                'industry'      => $workExperience['industry']
            ]);
        }

        return $updateCv;

    }
    public function getPortal(){
        request()->validate([
            'user_id' => 'required'
        ]);
        $user_id = request('user_id');
        $cv = User::where(['id'=> $user_id])->select("cv")->get();
        $educations = education::where(['user_id'=> $user_id])->get();
        $works = workExperience::where(['user_id'=> $user_id])->get();
        $skills = skill::where(['user_id'=> $user_id])->get();

        return ['user_id'=> $user_id,'cv'=>$cv[0]['cv'],'educations'=>$educations,'works'=>$works,'skills'=>$skills];
    }
   

    public function applicantsList(){
        request()->validate([
            'j_id' => 'required',
            'user_id' => 'required'
        ]);
        $j_id = request('j_id');
        //$job = Jobs::where(['id'=> $j_id])->select("*")->get();

        $job = DB::table('job_applicants')
        ->leftJoin('users','job_applicants.user_id','=','users.id')
        ->select(['users.name','users.email','users.phone','job_applicants.*'])
        ->orderBy('job_applicants.created_at',"desc")
        ->where(['job_applicants.job_id'=> $j_id])
        ->get();

        
        return $job;
    }


    public function find(){
        $post = User::find([
                 'id'=> request('id')
             ]);
         return $post;
     }

     public function authenticate(Request $request)
     {
         $credentials = $request->validate([
             'UserName' => ['required', 'email'],
             'Password' => ['required'],
         ]);
 
        $post = User::where([
            'email'=>request('UserName'),
            'password'=>md5(request('Password'))
        ])->get();
        if($post->isNotEmpty()){
            return $post[0];
        }
     }
     public function authenticateAdmin(Request $request)
     {
         $credentials = $request->validate([
             'UserName' => ['required'],
             'Password' => ['required'],
         ]);
 
        // $post = User::where([
        //     'email'=>request('UserName'),
        //     'password'=>md5(request('Password'))
        // ])->get();
        if(request('UserName')=='admin' && request('Password')=='admin'){
            return ['msg'=>'success'];
        }
     }
}
