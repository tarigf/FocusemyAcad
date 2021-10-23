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
