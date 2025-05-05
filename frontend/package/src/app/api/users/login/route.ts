import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validation
    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      );
    }
    
    // Here you would typically:
    // 1. Check credentials against database
    // 2. Generate JWT token
    
    // For demo purposes, we'll simulate a successful login
    // with a mock token (don't use this in production)
    console.log("User logged in:", username);
    
    // Mock token - in a real app, use a proper JWT library
    const token = "mock-jwt-token-" + Date.now();
    
    return NextResponse.json(
      { 
        message: "Login successful",
        token,
        user: {
          username,
          name: "Demo User" 
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 }
    );
  }
} 