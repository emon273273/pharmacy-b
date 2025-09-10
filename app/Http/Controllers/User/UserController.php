<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //

    public function login(Request $request)

    {

        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }


        $userId = User::where('email', $request->email)->value('id');
        $payload = [
            $userId,
            'iat' => time(),
            'exp' => time() + 60 * 60

        ];
        $token = JWT::encode($payload, env('JWT_SECRET'), 'HS256');


        return response()->json([
            'token' => $token,
            'message' => 'Login successful',
        ]);
    }
}
