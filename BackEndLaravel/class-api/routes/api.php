<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Http\Controllers\PostApiController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::post('/getStudentsList',[PostApiController::class, 'studentsList']);
Route::post('/getClassesList',[PostApiController::class, 'classesList']);
Route::post('/getClassesListFree',[PostApiController::class, 'classesListFree']);
Route::post('/classDelete',[PostApiController::class, 'classesDelete']);
Route::post('/getclass',[PostApiController::class, 'getClass']);
Route::post('/updateClass',[PostApiController::class, 'updateClass']);
Route::post('/newClass',[PostApiController::class, 'newClass']);
Route::post('/newStudent',[PostApiController::class, 'newStudent']);
Route::post('/studentDelete',[PostApiController::class, 'studentDelete']);
Route::post('/getstudent',[PostApiController::class, 'getStudent']);
Route::post('/updateStudent',[PostApiController::class, 'updateStudent']);







